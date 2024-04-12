import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
	signupInput,
	signinInput,
} from "@star_dust1/medium-common";
import {sign} from "hono/jwt";
import {setCookie, deleteCookie} from "hono/cookie"

async function handleUserSignUp(c: any) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    console.log(body);
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct",
        });
    }
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
        },
    });

    const token = await sign(
        {
            id: user.id,
        },
        c.env.JWT_SECRET
    );

    return c.json({
        jwt: token,
    });
}
async function handleUserSignIn(c: any) {
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs not correct",
		}); 
	}
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password: body.password,
		},
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign(
		{
			id: user.id,
		},
		c.env.JWT_SECRET
	);
    setCookie(c, 'jwt', jwt)
	return c.json({ message : "logged in successfully" });
}
async function handleUserSignOut(c : any){
    deleteCookie(c, 'jwt')
	return c.json({message : 'user logged out successfully'})
}
export { handleUserSignUp, handleUserSignIn, handleUserSignOut}