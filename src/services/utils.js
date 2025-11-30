import fs, {writeFile} from 'fs/promises';

export async function ReadJSON(dataPath) {
     const data = await fs.readFile(dataPath, 'utf-8');
     return JSON.parse(data);
}

export async function WriteJSON(dataPath, data) {
    await writeFile(dataPath, JSON.stringify(data, null, 2));
}


export const ErrorHandler = (err, req, res) => {
    console.error("Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
