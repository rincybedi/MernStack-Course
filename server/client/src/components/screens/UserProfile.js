import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setProfile] = useState(null);
  const { userid } = useParams();

  const [showFollow, setShowFollow] = useState(
    state ? !state.followers.includes(userid) : true
  );
  const followUser = () => {
    fetch("/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const followers = prevState.user.followers.filter(
            (i) => i != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: followers,
            },
          };
        });
        setShowFollow(true);
      });
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, []);

  return (
    <>
      {!userProfile ? (
        <h2>Loading..</h2>
      ) : (
        <div style={{ maxWidth: "550px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "16px 0",
              borderBottom: "1px solid grey",
            }}
          >
            <div>
              <img
                src={userProfile.user.pic}
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              {showFollow ? (
                <button
                  className="waves-effect waves-light btn-large #42a5f5 blue lighten-1"
                  onClick={() => {
                    followUser();
                  }}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="waves-effect waves-light btn-large #42a5f5 blue lighten-1"
                  onClick={() => {
                    unfollowUser();
                  }}
                >
                  Unfollow
                </button>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "117%",
                }}
              >
                <h5>{userProfile.posts.length} posts</h5>
                <h5>{userProfile.user.following.length} following</h5>
                <h5>{userProfile.user.followers.length} followers</h5>
              </div>
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((item) => {
              return <img className="item" src={item.photo} alt={item.title} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
