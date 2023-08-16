import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Admin/css/Video.css";
import Thumbnail from "./Thumbnail";
import VideoPlayer from "./VideoPlayer";
import { Button, Spin } from "antd";
import noVideoFound from "../../../img/no-video.jpg";
import baseUrl from "../../../baseUrl";
const apiurl = baseUrl.apiUrl;
const Video = () => {
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoLength, setVideosLength] = useState(0);
  const [spin, setSpin] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // State to track selected video URL
  //   const [selectedVideo, setSelectedVideo] = useState(videos[0].videoUrl);
  useEffect(() => {
    getApiVideos();
  }, []);
  const getApiVideos = () => {
    setSpin(true);
    const token = localStorage.getItem("adminToken");
    console.log("token", token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("/admin/fetch-all-videos", config)
      .then((response) => {
        setVideos(response.data.videos);
        console.log(response.data.videos.length);
        setVideosLength(response.data.videos.length);
        setSpin(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  const handleThumbnailClick = (videoUrl, title) => {
    setSelectedVideo(videoUrl);
    setTitle(title);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const token = localStorage.getItem("adminToken");
      console.log("token", token);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

    await  axios.delete(`/admin/delete-video/${videoId}`, config);
    getApiVideos();
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <>
      {!spin ? (
        <div className="video-framing">
          {videoLength > 0 ? (
            <div className="video-player-container">
              <VideoPlayer videoUrl={selectedVideo} title={title} />
            </div>
          ) : (
            <img src={noVideoFound} className="noVideoImg" />
          )}
          <div className="thumbnail-list">
            {videos.map((video) => (
              <>
                <Thumbnail
                  key={video.id}
                  imageUrl={video.thumbnail}
                  title={video.title}
                  onClick={() =>
                    handleThumbnailClick(video.videoOne, video.title)
                  }
                />

                <Button  onClick={() => handleDeleteVideo(video._id)}>
                  delete
                </Button>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
};
export default Video;
