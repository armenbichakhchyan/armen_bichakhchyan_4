import 'dotenv/config';
import express from 'express';
import { initializeDataFile } from "./src/models/index.js";
import { ErrorHandler } from "./src/services/utils.js";

import usersRouter from "./src/routes/users.js";
import postsRouter from "./src/routes/posts.js";

const app = express();

app.use(express.json());

await initializeDataFile();

app.use('/api', usersRouter);
app.use('/api', postsRouter);

app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
