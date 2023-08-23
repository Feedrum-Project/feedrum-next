interface bodyObj {
  email: string;
  password: string;
}

export default async function login(body: bodyObj) {
  const result = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
      // "Access-Control-Allow-Origin": "http://localhost:3000"
    }
  }).then((res) => res.json());

  return result;
}
