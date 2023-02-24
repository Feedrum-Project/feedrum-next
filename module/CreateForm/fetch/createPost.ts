interface bodyObj {
    body: string
    author:string
}

export default async function createPost({body}:bodyObj) {
    const result = await fetch("http://localhost:3000/api/posts", {
        method:"POST",
        body: body
    })
        .then(res => res.json())
    
    return result
}