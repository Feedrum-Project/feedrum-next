interface bodyObj {
    email:string
    password:string
}

export default async function login(body:bodyObj) {
    const form = new FormData()
    form.append("json", body)
    const result = await fetch("http://localhost:3000/api/auth/login", {
        method:"POST",
        body: form
    })
        .then(res => res.json())
        .then(e => console.log(e))
    
    return result
}