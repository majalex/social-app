import './Home.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = (props) => {
    const [posts, setPosts] = useState([])

    const getLatestPosts = () => {
        axios
            .post("https://akademia108.pl/api/social-app/post/latest")
            .then((res) => {
                setPosts(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getNextPosts = () => {
        axios
            .post("https://akademia108.pl/api/social-app/post/older-then", { date: posts[posts.length - 1].created_at })
            .then((res) => {
                setPosts(posts.concat(res.data))
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getLatestPosts();
    }, [props.user])

    return (
        <div className="home">
            <div className="postList">
                {posts.map((post) => {
                    return <Post post={post} key={post.id} />
                })}
                <button className='btn loadMore' onClick={getNextPosts}>Load more</button>
            </div>
        </div>
    );
};

export default Home;