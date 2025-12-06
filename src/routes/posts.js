import { Router } from "express";
import controller from "../controllers/posts.controller.js";
import authorize from "../middlewares/authorize.js";

const postsRouter = Router();

postsRouter.get("/", controller.getAllPosts)
postsRouter.get("/:id", controller.getPostById)
postsRouter.get('/search', controller.searchPosts)
postsRouter.get('/posts/pagination', controller.pagination)
postsRouter.get("/user/:userid", controller.getPostsByUserId)


postsRouter.post("/", authorize, controller.createPost)

postsRouter.put("/:id", authorize, controller.updatePost)

postsRouter.delete('/:id', authorize, controller.deletePost)



export default postsRouter;ա