import { Hono } from "hono";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addBlog, updateBlog, getAllBlogs, getBlog  } from "../controllers/blog.controller";
const route = new Hono();
route.use(verifyJWT)
route.post("/", addBlog).put("/", updateBlog);
route.get("/bulk", getAllBlogs);
route.get("/:id", getBlog);

export default route;