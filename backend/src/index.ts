import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';

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

  const res = await verify(token, c.env.JWT_SECRET);
  if(res.id){
    c.set('userId', res.userId);
    await next();
  }
  else{
    c.status(403);
    return c.json({
      message: "User not found",
    })
  }
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello gaurav');
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello gaurav');
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Blog ');
})

export default app
