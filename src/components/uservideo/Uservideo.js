import React, { useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";

import baseUrl from "../../baseUrl";
import "../../css/Uservideo.css"; 
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const apiurl = baseUrl.apiUrl;

const Uservideo = () => {
  const navigate = useNavigate();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // New state for upload progress

  const handleTitleChange = (event) => {
    setVideoTitle(event.target.value);
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!videoTitle || !videoFile || !thumbnailFile) {
      alert("Please fill all fields and select both video and thumbnail files");
      return;
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("videoOne", videoFile);
    formData.append("thumbnail", thumbnailFile);

    try {
      setIsUploading(true);
      setUploadProgress(0); // Reset progress before starting the upload

      await axios.post(`${apiurl}`+"/admin/createvideo", formData, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("adminToken") ||
            localStorage.getItem("videoCreatorToken")
          }`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress); // Update the progress state with the current percentage
        },
      });

      setUploadSuccess(true);
      setVideoFile(null);
      setThumbnailFile(null);
      // Clear the file inputs by resetting their values to an empty string
      document.getElementById("videoFile").value = "";
      document.getElementById("thumbnailFile").value = "";
    } catch (error) {
      setUploadError(true);
    } finally {
      setIsUploading(false);
      setVideoTitle("");
    }
  };

  const gotoHome =()=>{
    navigate("/admindashboard/dashboard")
  }
  return (
    <div className="upload-container">
      <h5 className="upload-heading"><BiArrowBack onClick={gotoHome} style={{cursor:'pointer'}}/> &nbsp;Video Upload</h5>

      {uploadError && (
        <div className="upload-error">
          Failed to upload video and/or thumbnail!
        </div>
      )}
      <div className="form-group">
        <label htmlFor="videoTitle" className="form-label">
          Video Title:
        </label>
        <input
          type="text"
          id="videoTitle"
          value={videoTitle}
          onChange={handleTitleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="videoFile" className="form-label">
          Video File:
        </label>
        <input
          type="file"
          id="videoFile"
          onChange={handleVideoFileChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="thumbnailFile" className="form-label">
          Thumbnail:
        </label>
        <input
          type="file"
          id="thumbnailFile"
          onChange={handleThumbnailFileChange}
          className="form-input"
        />
      </div>
      <br />
      <button onClick={handleUpload} className="upload-button">
        {isUploading ? (
          <FiUploadCloud className="upload-icon" />
        ) : (
          "Upload Video"
        )}
      </button>
      {isUploading && (
        <div className="upload-loader">Uploading... {uploadProgress}%</div>
      )}
      {uploadSuccess && (
        <div className="upload-success">
          Video and Thumbnail uploaded successfully!
        </div>
      )}
    </div>
  );
};

export default Uservideo;

//jjjjjjjj

// import React, { useState } from "react";
// import { Upload, message, Button, Input } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import baseUrl from "../../baseUrl";
// import "../../css/Uservideo.css"; // Import the CSS file for styling

// const apiurl = baseUrl.apiUrl;

// const Uservideo = () => {
//   const [videoTitle, setVideoTitle] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [thumbnailFile, setThumbnailFile] = useState(null);

//   const handleTitleChange = (event) => {
//     setVideoTitle(event.target.value);
//   };

//   const handleVideoFileChange = (file) => {
//     setVideoFile(file);
//   };

//   const handleThumbnailFileChange = (file) => {
//     setThumbnailFile(file);
//   };

//   const handleUpload = async () => {
//     if (!videoTitle || !videoFile || !thumbnailFile) {
//       message.error("Please fill all fields and select both video and thumbnail files");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", videoTitle);
//     formData.append("videoOne", videoFile);
//     formData.append("thumbnail", thumbnailFile);

//     try {
//       const response = await axios.post(`${apiurl}/admin/createvideo`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         message.success("Video and Thumbnail uploaded successfully!");
//         setVideoTitle("");
//         setVideoFile(null);
//         setThumbnailFile(null);
//       } else {
//         message.error("Failed to upload video and/or thumbnail!");
//       }
//     } catch (error) {
//       message.error("Failed to upload video and/or thumbnail!");
//     }
//   };

//   const props = {
//     beforeUpload: () => false,
//   };

//   return (
//     <div className="upload-container">
//       <h1 className="upload-heading">Video Upload</h1>
//       <div className="form-group">
//         <label htmlFor="videoTitle" className="form-label">
//           Video Title:
//         </label>
//         <Input
//           type="text"
//           id="videoTitle"
//           value={videoTitle}
//           onChange={handleTitleChange}
//           className="form-input"
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="videoFile" className="form-label">
//           Video File:
//         </label>
//         <Upload {...props} onChange={handleVideoFileChange}>
//           <Button icon={<UploadOutlined />}>Select Video</Button>
//         </Upload>
//       </div>
//       <div className="form-group">
//         <label htmlFor="thumbnailFile" className="form-label">
//           Thumbnail:
//         </label>
//         <Upload {...props} onChange={handleThumbnailFileChange}>
//           <Button icon={<UploadOutlined />}>Select Thumbnail</Button>
//         </Upload>
//       </div>
//       <br />
//       <Button onClick={handleUpload} className="upload-button" type="primary">
//         Upload Video
//       </Button>
//     </div>
//   );
// };

// export default Uservideo;
