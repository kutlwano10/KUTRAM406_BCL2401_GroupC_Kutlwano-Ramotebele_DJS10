import { useState, useEffect } from "react";

const App =()=> {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error(`Fetch Broken`);
        }
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        setError(error);
      }
    };
    getData();
  }, []);

  /**Maps from posts individual value pair */
  const postsElements = posts.map(post => (
    <div key={post.id}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  ));

  return (
    <div className="container">
      <h1>Posts</h1>
      {error ? (
        <div>
          <h1>Data fetching Failed</h1>
        </div>
      ) : (
        <div>{postsElements}</div>
      )}
    </div>
  );
}

export default App;
