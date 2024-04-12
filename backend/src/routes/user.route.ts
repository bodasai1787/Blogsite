import { Hono } from "hono";
import {handleUserSignUp, handleUserSignIn, handleUserSignOut} from "../controllers/user.controller"
import { verifyJWT } from "../middlewares/auth.middleware";
const route = new Hono();

route.post("/signup", handleUserSignUp);
route.post("/signin", handleUserSignIn);
route.post("/signout", verifyJWT, handleUserSignOut);

export default route;