import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "./blogForm";
import "./user.css";

function UserDash() {
  const params = useParams();
  const { username } = params;
  const { auth } = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth !== null) {
        if (auth === false) {
            navigate("/");
        }
    }
  }, [auth])
  
  return (
    <section className="page profile__wrapper">
      <h2>Welcome {username}</h2>
      <BlogForm />
    </section>
  );
}

export default UserDash;
