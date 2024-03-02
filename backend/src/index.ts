import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { signupInput, signinInput, createBlogInput, updateBlogInput } from '@star_dust1/medium-common';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	},
  Variables: {
    userId: string
  }
}>();

app.get('/', async (c) => {
  

  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs not correct"
    })
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    }
  })

  const token = await sign({
    id: user.id
  }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  })
})

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs not correct"
    })
  }
  const user = await prisma.user.findUnique({
    where: {
      email : body.email,
      password : body.password,
    }
  })

  if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

  const jwt = await sign({
    id: user.id 
  }, c.env.JWT_SECRET);

	return c.json({ jwt });
})

app.use('/api/v1/blog/*', async (c, next)=>{
  const token = c.req.header("authorization") || "";

  const payload = await verify(token, c.env.JWT_SECRET);
  if(payload.id){
    c.set('userId', payload.id);
    await next();
  }
  else{
    c.status(403);
    return c.json({
      message: "User not found",
    })
  }
})

app.post('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const userId = c.get('userId');
  console.log(userId);
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs not correct"
    })
  }
  const title = body.title;
  const content = body.content;

  const post = await prisma.post.create({
    data: {
      authorId: userId,
      title,
      content,
    }
  })

  return c.json({id: post.id});
})

app.put('/api/v1/blog', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs not correct"
    })
  }
	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

app.get('/api/v1/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  const post = await prisma.post.findUnique({
    where: {
      id : id,
    },
  })

  if(post){
    return c.json({
      post,
    })
  }
  else{
    c.status(403);
    return c.json({
      message: 'Post not found',
    })
  }
})

export default app
