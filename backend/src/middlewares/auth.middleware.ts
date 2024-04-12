import {verify} from "hono/jwt";
import { getCookie } from 'hono/cookie'
async function verifyJWT(c : any, next : any){
    const token = getCookie(c, 'jwt') || c.req.header("authorization");
	const payload = await verify(token, c.env.JWT_SECRET);
	if (payload.id) {
		c.set("userId", payload.id);
		await next();
	} else {
		c.status(403);
		return c.json({
			message: "User not found",
		});
	}
}
export {verifyJWT}