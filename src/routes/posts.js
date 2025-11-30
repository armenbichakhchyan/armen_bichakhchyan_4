import { Router } from "express";
import controller from "../controllers/posts.controller.js";
import authorize from "../middlewares/authorize.js";

const postsRouter = Router();

postsRouter.get("/posts", controller.getAllPosts)
postsRouter.get("/post", controller.getPostById)
postsRouter.get('/posts/search', controller.searchPosts)
postsRouter.get('/posts/pagination', controller.pagination)
postsRouter.get("/posts-by-userId", controller.getPostsByUserId)
postsRouter.post("/posts/add-post", authorize, controller.createPost)
postsRouter.put("/posts/update-post", authorize, controller.updatePost)
postsRouter.delete('/posts/delete-post', authorize, controller.deletePost)



export default postsRouter;