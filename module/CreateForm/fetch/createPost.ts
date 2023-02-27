interface bodyObj {
    body: string
    author:string
}

export default async function createPost({body}:bodyObj) {
    const form = new FormData();
    form.append("json", JSON.stringify(body))
    const result = await fetch("http://localhost:3000/api/posts", {
        method:"POST",
        body: form
    })
        .then(res => res.json())
    
    return result
}