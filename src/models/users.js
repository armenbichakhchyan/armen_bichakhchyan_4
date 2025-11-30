import { v7 as uuidv7 } from 'uuid';
import {ReadJSON, WriteJSON} from "../services/utils.js";
import { hashPassword } from "../services/auth.service.js";
import { usersPath } from "./index.js";

const USER_SECRET = process.env.USER_SECRET;

export function CheckPassword(storedPassword, enteredPassword) {
    const hashedEntered = hashPassword(enteredPassword, USER_SECRET);

    return storedPassword === hashedEntered;
}

export async function findUserByEmailOrUsername(email, username = null) {
    const users = await ReadJSON(usersPath);

    return users.find(u =>
        (email && u.email === email) ||
        (username && u.username === username)
    );
}

export async function findUserByID(userId) {
    const users = await ReadJSON(usersPath);

    return users.find(u => u.id === userId);
}

export async function createUser({ name, email, username, password }) {
    const users = await ReadJSON(usersPath);

    if (await findUserByEmailOrUsername(email, username)) {
        throw new Error("User already exists");
    }

    const newUser = {
        id: uuidv7(),
        name,
        email,
        username,
        password: hashPassword(password, USER_SECRET),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    users.push(newUser);

    await WriteJSON(usersPath, users);

    return newUser;
}
