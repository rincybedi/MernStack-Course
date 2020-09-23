import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { ProgressBar } from "./ProgressBar";
import { Link } from "react-router-dom";

const MyFollowingPost = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  const likePost = (id) => {
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(data);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            console.log(result);
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLikePost = (id) => {
    fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((d) => d._id != result._id);
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = (postId, commentId) => {
    fetch(`/deletecomment`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId, commentId }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((d) => d._id != result._id);
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("/getsubposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);
  return (
    <div className="home=">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            {item.postedBy._id == state._id && (
              <i
                className="material-icons"
                style={{ float: "right" }}
                onClick={() => {
                  deletePost(item._id);
                }}
              >
                delete
              </i>
            )}
            <h5>
              <Link
                className="each-post-postedBy"
                to={
                  item.postedBy._id !== state._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>
            </h5>

            <div className="card-image">
              <img src={item.photo}></img>
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unLikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((response) => {
                return (
                  <h6 key={response._id}>
                    {response.postedBy._id == state._id && (
                      <i
                        className="material-icons"
                        onClick={() => {
                          deleteComment(item._id, response._id);
                        }}
                      >
                        delete
                      </i>
                    )}
                    <span style={{ fontWeight: "500" }}>
                      {response.postedBy.name}
                    </span>
                    <span> {response.text}</span>
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                  e.target[0].value = "";
                }}
              >
                <input type="text" placeholder="Add comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyFollowingPost;
