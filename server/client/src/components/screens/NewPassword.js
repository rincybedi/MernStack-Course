import React, { useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { token } = useParams();
  console.log(token);
  const PostData = () => {
    fetch("/newpassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        } else {
          M.toast({ html: data.message, classes: "#4caf50 green" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="waves-effect waves-light btn-large #42a5f5 blue lighten-1"
          onClick={() => {
            PostData();
          }}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
