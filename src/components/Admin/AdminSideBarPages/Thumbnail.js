import React from "react";
import "../css/thumbnail.css"

const Thumbnail = ({ imageUrl, onClick, title }) => {
  return (
    <div className="thumbnail" onClick={onClick}>
      <div className="thumnail-box">
        <img
          src={imageUrl}
          alt="Thumbnail"
          style={{
            width:"200px",
            height: "120px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        />
        <p className="thumbnail-title">{title}</p>
      </div>
    </div>
  );
};

export default Thumbnail;
