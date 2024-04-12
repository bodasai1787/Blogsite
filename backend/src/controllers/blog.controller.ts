import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
    createBlogInput,
	updateBlogInput,
} from "@star_dust1/medium-common";

async function addBlog(c : any){
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const userId = c.get("userId");
	console.log(userId);
	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs not correct",
		});
	}
	const title = body.title;
	const content = body.content;

	const post = await prisma.post.create({
		data: {
			authorId: userId,
			title,
			content,
		},
	});

	return c.json({ id: post.id });
}
async function updateBlog(c : any){
    const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs not correct",
		});
	}
	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId,
		},
		data: {
			title: body.title,
			content: body.content,
		},
	});

	return c.text("updated post");
}
async function getAllBlogs(c:any) {
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const blogs = await prisma.post.findMany({
		select: {
			title: true,
			content: true,
			id: true,
			published: true,
			author: {
				select: {
					name: true,
				},
			},
		},
	});

	return c.json({
		blogs,
	});
}
async function getBlog(c : any) {
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const id = c.req.param("id");
	const post = await prisma.post.findUnique({
		where: {
			id: id,
		},
		select: {
			title: true,
			content: true,
			author: {
				select: {
					name: true,
				},
			},
		},
	});

	if (post) {
		return c.json({
			post,
		});
	} else {
		c.status(403);
		return c.json({
			message: "Post not found",
		});
	}
}
export {addBlog, updateBlog, getAllBlogs, getBlog}