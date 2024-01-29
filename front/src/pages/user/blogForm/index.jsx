import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../../redux/slices/uiSlice";

function BlogForm() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleRegex = /^[A-Za-z0-9\s]+$/;
    const contentRegex = /^[A-Za-z0-9\s.!?]+$/;

    const isTitleValid = titleRegex.test(title);
    const isContentValid = contentRegex.test(content);

    if (!isTitleValid) {
      dispatch(
        showError(
          "Title is not valid. It should contain only letters, numbers, and spaces."
        )
      );
      return;
    }

    if (!isContentValid) {
      dispatch(
        showError(
          "Content is not valid. It should contain only letters, numbers, spaces, and basic punctuation."
        )
      );
      return;
    }

    const blogPost = {
      image: image ? image : null,
      title: title,
      content: content
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create",
        blogPost,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (response.status === 201) {
        dispatch(showSuccess("Blog post created successfully!"));
      }
    } catch (error) {
      dispatch(showError("Error creating blog post"));
    }
    setImage(null);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h3>Create a New Blog Post</h3>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button type="submit">Create Blog Post</button>
      </form>
    </div>
  );
}

export default BlogForm;