import { IUser } from "types/User";

interface IBody {
    body: {
        title: string;
        body: string;
        images?: File[];
    };
    user: IUser;
}

export default async function createPost(body: IBody) {
    console.log(body);
    const result = await fetch("http://localhost:3000/api/posts", {
        method:"POST",
        body: JSON.stringify(body)
    })
        .then(res => res.json());
    
    return result;
}