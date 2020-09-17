import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {
    fetch("http://localhost:5000/signup", {
      method: "post",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        email: "",
        password: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => PostData()}
          className="waves-effect waves-light btn-large #42a5f5 blue lighten-1"
        >
          Sign Up
        </button>
        <h5>
          <Link to="signin">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default SignUp;
