import * as fs from "fs/promises";

const dataPath = "./src/data";
export const postsPath = "./src/data/posts.json";
export const usersPath = "./src/data/users.json";


export async function initializeDataFile() {
    await fs.mkdir(dataPath, { recursive: true });

    try {
        await fs.access(postsPath);
    } catch {
        await fs.writeFile(postsPath, JSON.stringify([], null, 2), "utf-8");
    }

    try {
        await fs.access(usersPath);
    } catch {
        await fs.writeFile(usersPath, JSON.stringify([], null, 2), "utf-8");
    }
}
