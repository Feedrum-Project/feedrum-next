interface bodyObj {
    name:string
    email:string
    password1:string
    password2:string
}

interface bodyPreparing {
    name:string
    email:string
    password:string
    password1:undefined
    password2:undefined
}

export default async function registrate(body:bodyObj) {

    if(body.password1 !== body.password2) return "mistake"
    
    const form = new FormData()
    const newBody:bodyPreparing = {...body, password1: undefined, password2: undefined, password: body.password1}
    form.append("json", JSON.stringify(newBody))
    
    const result = await fetch("http://localhost:3000/api/auth/register", {
        method:"POST",
        body: form
    })
        .then(res => res.json())
        .then(e => console.log(e))
    
    return result
}