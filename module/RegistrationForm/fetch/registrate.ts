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

    if(body.password1 !== body.password2) return
    
    const newBody:bodyPreparing = {...body, password1: undefined, password2: undefined, password: body.password1}
    console.log(newBody)
    const result = await fetch("http://localhost:3000/api/auth/register", {
        method:"POST",
        body: newBody
    })
        .then(res => res.json())
    
    console.log(result)
}