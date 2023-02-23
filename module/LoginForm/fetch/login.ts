interface bodyObj {
    email:string
    password:string
}

export default async function login(body:bodyObj) {
    const result = await fetch("http://localhost:3000/api/auth/login", {
        method:"POST",
        body: body
    })
        .then(res => res.json())
    
    return result
}