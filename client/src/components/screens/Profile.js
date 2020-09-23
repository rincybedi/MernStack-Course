import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [mypics, setMyPics] = useState([]);
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch("/myposts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.myposts);
        setMyPics(data.myposts);
      });
  }, []);

  useEffect(() => {
    if (image) {
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
          updatePicInner(data.url);
        })
        .catch((data) => {
          console.log(data);
        });
    }
  }, [image]);

  const updatePicInner = (url) => {
    fetch("updatepic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ pic: url }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ pic: data.pic, ...state })
        );
        dispatch({ type: "UPDATEPIC", payload: data.pic });
        console.log(data);
      });
  };

  const updatePhoto = (file) => {
    console.log(file);
    setImage(file);
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0 auto" }}>
      <div
        style={{
          padding: "16px 0",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              src={state ? state.pic : "loading"}
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            />
          </div>
          <div>
            <h4>{state ? state.name : "loading"}</h4>
            <h4>{state ? state.email : "loading"}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "117%",
              }}
            >
              <h5>{mypics.length} posts</h5>
              <h5>{state ? state.following.length : 0} following</h5>
              <h5>{state ? state.followers.length : 0} followers</h5>
            </div>
          </div>
        </div>
        <div className="file-field input-field">
          <div className="waves-effect waves-light btn-large #42a5f5 blue lighten-1">
            <span>Update Pic</span>
            <input
              type="file"
              onChange={(e) => {
                updatePhoto(e.target.files[0]);
              }}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return <img className="item" src={item.photo} alt={item.title} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
