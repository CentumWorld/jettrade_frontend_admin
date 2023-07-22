import React, { useState } from 'react';
import axios from "axios";

const Uservideo = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

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
      alert('Please fill all fields and select both video and thumbnail files');
      return;
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("videoOne", videoFile);
    formData.append("thumbnail", thumbnailFile);

    try {
      await axios.post('/admin/createvideo', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'
        },
      });

      alert('Video and Thumbnail uploaded successfully!');
      // Optionally, you can reset the form after successful upload
      setVideoTitle('');
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (error) {
      alert('Failed to upload video and/or thumbnail!');
    }
  };

 
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '400px',
          height: '400px',
          padding: '20px',
          margin: '50px auto',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          boxSizing: 'border-box',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Video Upload</h1>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label htmlFor="videoTitle" style={{ marginBottom: '5px', display: 'block' }}>
            Video Title:
          </label>
          <input
            type="text"
            id="videoTitle"
            value={videoTitle}
            onChange={handleTitleChange}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label htmlFor="videoFile" style={{ marginBottom: '5px', display: 'block' }}>
            Video File:
          </label>
          <input
            type="file"
            id="videoFile"
            onChange={handleVideoFileChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label htmlFor="thumbnailFile" style={{ marginBottom: '5px', display: 'block' }}>
            Thumbnail:
          </label>
          <input
            type="file"
            id="thumbnailFile"
            onChange={handleThumbnailFileChange}
            style={{ width: '100%' }}
          />
        </div>
        <br />
        <button
          onClick={handleUpload}
          style={{
            backgroundColor: '#3b03d8',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '300px',
            transition: 'background-color 0.2s ease',
          }}
        >
          Upload Video
        </button>
      </div>
    );
  };
  
  export default Uservideo;
  
