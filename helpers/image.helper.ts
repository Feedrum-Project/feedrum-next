import formidable from "formidable";
import { join } from "path";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { access, mkdir, readFile } from "fs/promises";
import WTFError from "errors/WTF";
import ImageFile from "types/ImageFile";
import { ImageFormat } from "@prisma/client";

const getImageFormat = (mimetype: string) =>
    mimetype.split("/")[1].toUpperCase() as ImageFormat;

export async function sendImage(
    res: NextApiResponse,
    id: string,
    type: ImageFormat,
) {
    const image = await readFile(
        join(process.cwd(), `/uploads/${id}.${type.toLowerCase()}`),
    );

    res.setHeader("Content-Type", `image/${type}`);
    res.status(200).send(image);
}

export function parseImages(req: NextApiRequest): Promise<ImageFile[]> {
    return new Promise(async (resolve, reject) => {
        const uploadDir = join(process.cwd(), "/uploads/");

        await access(uploadDir).catch(async () => await mkdir(uploadDir));

        const form = formidable({
            uploadDir,
            maxFiles: 3,
            keepExtensions: true,
            maxFileSize: 2 * 1024 * 1024, // 2mb
            filename: (_name, ext, _part, _form) => `${randomUUID()}${ext}`,
            filter: (part) => {
                if (part.mimetype === null) return false;
                if (!part.mimetype?.includes("image")) return false;

                const fileType = getImageFormat(part.mimetype);
                const allowedFiletypes: ImageFormat[] = ["JPEG", "PNG", "GIF"];

                return allowedFiletypes.includes(fileType);
            },
        });

        form.parse(req, (err, _fields, files) => {
            if (err) reject(err);
            else
                resolve(
                    Object.values(files).map((file) => {
                        if (Array.isArray(file)) throw new WTFError();
                        const id = file.newFilename.split(".")[0];

                        return {
                            id,
                            type: getImageFormat(file.mimetype ?? "unknown"),
                        };
                    }),
                );
        });
    });
}
