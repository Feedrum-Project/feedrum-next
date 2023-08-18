import { ImageFormat } from "@prisma/client";

export default interface ImageFile {
    id: string;
    type: ImageFormat;
}
