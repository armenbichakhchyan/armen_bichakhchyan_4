import { v7 as uuidv7 } from 'uuid';
import { ReadJSON, WriteJSON } from "../services/utils.js";
import { postsPath } from "./index.js";

export async function createPost({ title, content, userId }) {
    const posts = await ReadJSON(postsPath);

    const newPost = {
        id: uuidv7(),
        userId,
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    posts.push(newPost);
    await WriteJSON(postsPath, posts);

    return newPost;
}

export async function getAll() {
    return await ReadJSON(postsPath);
}

export async function getById(id) {
    const posts = await ReadJSON(postsPath);
    return posts.find(p => p.id === id);
}

export async function updatePost(id, updatedData) {
    const posts = await ReadJSON(postsPath);
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) return null;

    posts[index] = {
        ...posts[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
    };

    await WriteJSON(postsPath, posts);
    return posts[index];
}

export async function deletePost(id) {
    const posts = await ReadJSON(postsPath);
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) return null;

    const deleted = posts.splice(index, 1)[0];
    await WriteJSON(postsPath, posts);

    return deleted;
}

export async function getByUserId(userId) {
    const posts = await ReadJSON(postsPath);
    return posts.filter(post => post.userId === userId);
}

export async function searchPostsByQuery(query) {
    const posts = await ReadJSON(postsPath);

    const q = query.toLowerCase().trim();

    return posts.filter(post =>
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q)
    );
}

export async function paginationPosts(page = 1, limit = 10) {
    const posts = await ReadJSON(postsPath);

    const skip = (page - 1) * limit;

    const paginated = posts.slice(skip, skip + limit);

    return {
        total: posts.length,
        page,
        limit,
        data: paginated
    }
}