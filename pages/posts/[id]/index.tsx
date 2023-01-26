fetch('http://localhost:3000/posts/1')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

export default function Post() {
  return (
    <span>Post</span>
  )
}