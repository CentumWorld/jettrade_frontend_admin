import React from "react";

const Thumbnail = ({ imageUrl, onClick, title }) => {
  return (
    <div className="thumbnail" onClick={onClick}>
      <div style={{display:"flex", gap:"10px"}}>
        <img
          src={imageUrl}
          alt="Thumbnail"
          style={{
            width: "200px",
            height: "100px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        />
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Thumbnail;
