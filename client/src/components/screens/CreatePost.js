import React from "react";
const createPost = () => {
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
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
        <div className="waves-effect waves-light btn-large #42a5f5 blue lighten-1">
          <span>Upload image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="waves-effect waves-light btn-large #42a5f5 blue lighten-1">
        Create post
      </button>
    </div>
  );
};

export default createPost;
