import PostValidator from "../middlewares/posts.validator.js";
import {
    createPost,
    getAll,
    getById,
    updatePost,
    deletePost,
    getByUserId, searchPostsByQuery, paginationPosts
} from "../models/posts.js";

export default {
    async getAllPosts(req, res, next) {
        try {
            const posts = await getAll();

            res.json({
                success: true,
                count: posts.length,
                data: posts,
            });
        } catch (e) {
            next(e);
        }
    },

    async getPostById(req, res, next) {
        try {
            const { id } = req.query;

            if (!id)
                return res.status(400).json({ success: false, message: "ID is required" });

            const post = await getById(id);

            if (!post)
                return res.status(404).json({ success: false, message: "Post not found" });

            res.json({ success: true, data: post });
        } catch (e) {
            next(e);
        }
    },

    async createPost(req, res, next) {
        try {
            const { title, content } = req.body;
            const userId = req.userId; // authorize middleware → token decode

            const errors = PostValidator.postValidator({ title, content, userId });
            if (Object.keys(errors).length)
                return res.status(400).json({ success: false, errors });

            const post = await createPost({ title, content, userId });

            res.status(201).json({
                success: true,
                data: post,
            });
        } catch (e) {
            next(e);
        }
    },

    async updatePost(req, res, next) {
        try {
            const { id } = req.query;
            const { title, content } = req.body;
            const userId = req.userId;

            if (!id)
                return res.status(400).json({ success: false, message: "ID is required" });

            const post = await getById(id);

            if (!post)
                return res.status(404).json({ success: false, message: "Post not found" });

            if (post.userId !== userId)
                return res.status(403).json({
                    success: false,
                    message: "You can update only your own posts",
                });

            const updated = await updatePost(id, { title, content });

            res.json({
                success: true,
                message: "Post updated successfully",
                data: updated,
            });
        } catch (e) {
            next(e);
        }
    },

    async deletePost(req, res, next) {
        try {
            const { id } = req.query;
            const userId = req.userId;

            if (!id)
                return res.status(400).json({ success: false, message: "ID is required" });

            const post = await getById(id);

            if (!post)
                return res.status(404).json({ success: false, message: "Post not found" });

            if (post.userId !== userId)
                return res.status(403).json({
                    success: false,
                    message: "You can delete only your own posts",
                });

            const deleted = await deletePost(id);

            res.json({
                success: true,
                message: "Post deleted",
                deleted,
            });
        } catch (e) {
            next(e);
        }
    },

    async getPostsByUserId(req, res, next) {
        try {
            const userId = req.userId;

            if(!userId) {
                return res.status(400).json({
                    success: false,
                    message: "ID is required"
                })
            }

            const posts = await getByUserId(userId);

            res.json({
                success: true,
                count: posts.length,
                data: posts,
            });
        } catch (e) {
            next(e);
        }
    },

    //BONUS TASKS

    async searchPosts(req, res, next) {
        try {
            const { query } = req.query;

            if (!query || query.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Query parameter is required"
                });
            }

            const filtered = await searchPostsByQuery(query);

            if (!filtered.length) {
                return res.status(200).json({
                    success: true,
                    data: [],
                    message: "No posts found"
                });
            }

            res.status(200).json({
                success: true,
                count: filtered.length,
                data: filtered
            });

        } catch (e) {
            next(e);
        }
    },

    async pagination(req, res, next) {
        try {
            const page = +(req.query.page) || 1;
            const limit = +(req.query.limit) || 10;

            if(!page || page < 1) {
                res.status(400).json({
                    success: false,
                    message: "Page and Limit parameters is required"
                })
            }

            const result = await paginationPosts(page, limit);

            res.status(200).json({
                success: true,
                ...result
            });
        }catch (e) {
            next(e);
        }
    }
};
