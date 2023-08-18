import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Admin/css/Video.css";
import Thumbnail from "./Thumbnail";
import VideoPlayer from "./VideoPlayer";
import { Button, Popconfirm, Spin } from "antd";
import noVideoFound from "../../../img/no-video.jpg";
import baseUrl from "../../../baseUrl";

const apiurl = baseUrl.apiUrl;

const Video = () => {
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoLength, setVideosLength] = useState(0);
  const [spin, setSpin] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [like,setLike] =useState(null);
  const [particularVideoId,setParticularId] = useState("");
  const [dislike,setDislike]=useState("")
  const [confirmVisible, setConfirmVisible] = useState(false);
  
console.log("partic",particularVideoId);
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
  const handleThumbnailClick = (videoUrl, title,like,id,dislike) => {
    setSelectedVideo(videoUrl);
    setTitle(title);
    setLike(like);
    setDislike(dislike);
    setParticularId(id)
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const token = localStorage.getItem("adminToken");
      console.log("token", token);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`/admin/delete-video/${videoId}`, config);
      setConfirmVisible(false); // Close the confirmation dialog
      getApiVideos(); // Assuming you have a function to refresh video data
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {!spin ? (
        <div className="video-framing">
          {videoLength > 0 ? (
            <div className="video-player-container">
              <VideoPlayer videoUrl={selectedVideo} title={title} liked={like} particularVideoId={particularVideoId} dislike={dislike}/>
            </div>
          ) : (
            <img src={noVideoFound} className="noVideoImg" />
          )}
          <div className="thumbnail-list">
            {videos.map((video) => (
              <div className="single-thumbnail">
                <Thumbnail
                  key={video.id}
                  imageUrl={video.thumbnail}
                  title={video.title}
                  onClick={() =>
                    handleThumbnailClick(video.videoOne,
                      video.title,
                      video.likes,
                      video._id,
                      video.dislikes,)
                  }
                />
                <Popconfirm
                  title="Are you sure you want to delete this video?"
                  visible={confirmVisible}
                  onConfirm={() => handleDeleteVideo(video._id)}
                  onCancel={() => setConfirmVisible(false)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button onClick={() => setConfirmVisible(true)} className="cancel-btn">
                    Delete
                  </Button>
                </Popconfirm>
              </div>
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
