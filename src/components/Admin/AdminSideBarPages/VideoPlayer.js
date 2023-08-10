import React, { useState } from "react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiTwotoneDislike,
} from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import "../css/videoplayer.css";
import { toast } from "react-toastify";

const VideoPlayer = ({ videoUrl, title }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleClickDisLike = () => {
    setIsDisliked((prev) => !prev);
  };

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
    if(isLiked){
      toast.success("Liked Successfully");
    }else{
      toast.warning("Removed Liked")
    }
  };

  const videoPlayerStyle = {
    position: "relative",
    overflow: "hidden",
  };

  const videoStyle = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit:
      "cover" /* Fill the entire container while maintaining aspect ratio */,
    zIndex: 1 /* Add zIndex to ensure the video stays above other elements */,
  };

  return (
    <div style={videoPlayerStyle}>
      <video style={videoStyle} src={videoUrl} controls />
      <div className="subtitle">
        <h2 style={{ fontFamily: "Calibri" }}>{title}</h2>
        <div className="like-section">
          <div className="like-button-section">
            {isLiked ? (
              <button className="like-button" onClick={handleClickLike}>
                <AiTwotoneLike fontSize={20} />
                <span>Like</span>
              </button>
            ) : (
              <button className="like-button" onClick={handleClickLike}>
                <AiOutlineLike fontSize={20} />
                <span>Like</span> 
              </button>
            )}
          </div>
          <div className="disLike-button-section">
            {isDisliked ? (
              <button className="like-button" onClick={handleClickDisLike}>
                <AiTwotoneDislike fontSize={20} />
                <span>Dislike</span>
              </button>
            ) : (
              <button className="like-button" onClick={handleClickDisLike}>
                <AiOutlineDislike fontSize={20} />
                <span>Dislike</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="comment-section">
        <form>
          <p>
            <BiComment fontSize={20} />
            &nbsp; Comment
          </p>
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
          />
          <div className="comment-buttons">
            <button className="cancel-button">Cancel</button>
            <button className="comment-button">Comment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoPlayer;
