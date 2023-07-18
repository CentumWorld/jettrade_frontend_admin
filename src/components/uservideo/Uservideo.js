import React, { useState } from 'react';
import axios from "axios";

const Uservideo = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [upload, setupload] = useState('');


  const handleTitleChange = (event) => {
    setVideoTitle(event.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    const formdata=new FormData();
    formdata.append("title",videoTitle);
    for(var i=0;i<upload.length;i++){
      formdata.append("videoOne",upload[i]);
    }
    try {
      await axios.post('/admin/createvideo', formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      alert('Video uploaded successfully!');
    } catch (error) {
      alert('Failed to upload video!');
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
        height: '300px',
        padding: '20px',
        margin: '50px auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        boxSizing: 'border-box',
        transition: 'box-shadow 0.3s ease-in-out',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Video Upload</h1>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="videoTitle" style={{ marginBottom: '5px' }}>
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
      <div style={{ marginBottom: '10px' }}>
        {/* Add your video upload component here */}
        <input type="file" style={{ width: '100%' }} defaultValue={upload} onChange={(e) => setupload(e.target.files)} />
      </div>
      <br />
      <button
        onClick={handleUpload}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Upload Video
      </button>
    </div>
  );
};

export default Uservideo;
