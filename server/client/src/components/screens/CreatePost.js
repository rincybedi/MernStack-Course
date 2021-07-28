import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const historyState = useHistory();
  useEffect(() => {
    if (url) {
      CreatePost();
    }
  }, [url]);

  const PostDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "rinalshcloud");

    fetch("https://api.cloudinary.com/v1_1/rinalshcloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const CreatePost = () => {
    fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
        title,
        body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        } else {
          console.log(data);
          M.toast({
            html: "Post created successfully",
            classes: "#4caf50 green",
          });
          historyState.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <div className="file-field input-field">
        <div className="waves-effect waves-light btn-large #42a5f5 blue lighten-1">
          <span>Upload image</span>
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files);
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        onClick={() => {
          PostDetails();
        }}
        className="waves-effect waves-light btn-large #42a5f5 blue lighten-1"
      >
        Create post
      </button>
    </div>
  );
};

export default CreatePost;
