import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "./blogForm";
import "./user.css";
import Article from "../../components/article";

function UserDash() {
  const params = useParams();
  const { username } = params;
  const { auth } = useSelector(state => state.user);
  const { blogs } = useSelector(state => state.user.userProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth !== null) {
      if (auth === false) {
        navigate("/");
      }
    }
  }, [auth]);

  return (
    <section className="page profile__wrapper">
      <h2>Welcome {username}</h2>
      <BlogForm />
      {blogs ?
        <>
          <h2>Your Blogs</h2>
          <div className='blogs__wrapper'>
            {blogs.map(blog => {
              return <Article id={blog._id} src={blog.src} content={blog.content} title={blog.title} key={blog._id} date={blog.createdDate} />
            })}
          </div>
        </> : null
      }
    </section>
  );
}

export default UserDash;
