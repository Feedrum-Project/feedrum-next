import ImagesMissingError from "errors/ImagesMissing";
import InvalidPermissionError from "errors/InvalidPermission";
import ObjectNotFoundError from "errors/ObjectNotFound";

import prisma from "@database";
import ImageFile from "types/ImageFile";

export default class ImageController {
    static async createImages(images: ImageFile[], userId: number) {
        if (images.length === 0) throw new ImagesMissingError()

        return Promise.all(images.map(image =>
            prisma.image.createImage(image.id, userId, image.type)))
    }

    static async get(id: string) {
        const image = await prisma.image.getImageById(id)
        if (image === null) throw new ObjectNotFoundError("Image");

        return image;
    }

    static async delete(id: string, userId: number) {
        const image = await this.get(id)
        if (image.userId !== userId) throw new InvalidPermissionError();

        await prisma.image.deleteImageById(id);

        return image
    }
}
