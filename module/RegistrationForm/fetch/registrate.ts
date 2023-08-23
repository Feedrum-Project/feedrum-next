interface bodyObj {
  name: string;
  email: string;
  password1: string | undefined;
  password2: string | undefined;
}

interface bodyPreparing {
  name: string;
  email: string;
  password: string;
  password1: undefined;
  password2: undefined;
}
export default async function registrate(body: bodyObj) {
  if (body.password1 !== body.password2) return "mistake";
  const newBody = { ...body, password: body.password1 } as bodyPreparing &
    BodyInit;
  delete newBody.password1;
  delete newBody.password2;

  const result = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(newBody),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": [
        "http://192.168.0.29:3000",
        "https://feedrum.com"
      ].join(", ")
    }
  }).then((res) => res.json());
  console.log(result);

  return result;
}
