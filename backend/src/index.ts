import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();


app.use("/api/*", cors());

import userRouter from "./routes/user.route"
import blogRouter from "./routes/blog.route"

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app;