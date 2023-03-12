interface IBody {
    body: {
        title: string;
        body: string;
        // userId: number;
    };
    user: {
        id: number;
        email: string;
        name: string;
        iat: number;
        exp: number;
    }
}

export default async function createPost(body: IBody) {
    
    const result = await fetch("http://localhost:3000/api/posts", {
        method:"POST",
        body: JSON.stringify(body)
    })
        .then(res => res.json());
    
    return result;
}