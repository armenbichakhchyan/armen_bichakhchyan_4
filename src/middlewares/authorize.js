import moment from "moment";
import HttpErrors from "http-errors";
import { decrypt } from '../services/auth.service.js';
import { findUserByID } from '../models/users.js';

const { AUTH_SECRET } = process.env;

export default async function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.includes(" ")
        ? authHeader.split(" ")[1]
        : authHeader;

    let data;

    try {
        data = JSON.parse(decrypt(token, AUTH_SECRET));
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const user = await findUserByID(data.userId);

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    if (moment().isAfter(data.expiresIn)) {
        return res.status(401).json({ message: "Token expired" });
    }

    req.userId = user.id;

    next();
}
