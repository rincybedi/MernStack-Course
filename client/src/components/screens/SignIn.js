import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="waves-effect waves-light btn-large #42a5f5 blue lighten-1">
          Sign In
        </button>
        <h5>
          <Link to="signup">Dont have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default SignIn;
