import React from "react";

const Profile = () => {
  return (
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
            src="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/15876808_1494164850611890_6867322195685670912_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&_nc_ohc=pAYmcvP6DvwAX9H_Nh6&oh=28666d486bf86f1e2d4bc83af013af25&oe=5F869028"
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
          />
        </div>
        <div>
          <h4>Manpreet Bedi</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "117%",
            }}
          >
            <h5>40 Posts</h5>
            <h5>40 following</h5>
            <h5>40 followers</h5>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          className="item"
          src="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/15876808_1494164850611890_6867322195685670912_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&_nc_ohc=pAYmcvP6DvwAX9H_Nh6&oh=28666d486bf86f1e2d4bc83af013af25&oe=5F869028"
        />
        <img
          className="item"
          src="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/15876808_1494164850611890_6867322195685670912_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&_nc_ohc=pAYmcvP6DvwAX9H_Nh6&oh=28666d486bf86f1e2d4bc83af013af25&oe=5F869028"
        />
        <img
          className="item"
          src="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/15876808_1494164850611890_6867322195685670912_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&_nc_ohc=pAYmcvP6DvwAX9H_Nh6&oh=28666d486bf86f1e2d4bc83af013af25&oe=5F869028"
        />
        <img
          className="item"
          src="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/15876808_1494164850611890_6867322195685670912_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&_nc_ohc=pAYmcvP6DvwAX9H_Nh6&oh=28666d486bf86f1e2d4bc83af013af25&oe=5F869028"
        />
        <img
          className="item"
          src="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/15876808_1494164850611890_6867322195685670912_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&_nc_ohc=pAYmcvP6DvwAX9H_Nh6&oh=28666d486bf86f1e2d4bc83af013af25&oe=5F869028"
        />
        <img
          className="item"
          src="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/15876808_1494164850611890_6867322195685670912_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&_nc_ohc=pAYmcvP6DvwAX9H_Nh6&oh=28666d486bf86f1e2d4bc83af013af25&oe=5F869028"
        />
      </div>
    </div>
  );
};

export default Profile;
