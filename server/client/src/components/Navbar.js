import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../App";
const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const { state, dispatch } = useContext(UserContext);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li key="7">
          <i data-target="modal1" className="material-icons modal-trigger">
            search
          </i>
        </li>,
        <li key="1">
          <Link to="/profile">
            <img className="user-img" src={state ? state.pic : ""}></img>
          </Link>
        </li>,
        <li key="2">
          <Link to="/create">Create Post</Link>
        </li>,
        <li key="3">
          <Link to="/myfollowingpost">My following Post</Link>
        </li>,
        <li key="4">
          <button
            className="waves-effect waves-light btn-large #42a5f5 blue lighten-1"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Sign Out
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="5">
          <Link to="/signin">Sign In</Link>
        </li>,
        <li key="6">
          <Link to="/signup">SignUp</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setSearchedUsers(result.users);
      });
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black", padding: "10px" }}
      >
        <input
          type="text"
          placeholder="Search Users"
          value={search}
          onChange={(e) => {
            fetchUsers(e.target.value);
          }}
        />
        <ul className="collection" style={{ color: "black !important" }}>
          {searchedUsers &&
            searchedUsers.map((item) => {
              return (
                <li className="collection-item">
                  <Link onClick={()=>{ 
                    let instance = M.Modal.getInstance(searchModal.current);
                    instance.close();
                  }}
                  to={
                    item._id !== state._id
                      ? "/profile/" + item._id
                      : "/profile"
                  }>
                  
                    {item.email}
                  </Link>
                </li>
              );
            })}
        </ul>

        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              setSearchedUsers("");
            }}
          >
            Close
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
