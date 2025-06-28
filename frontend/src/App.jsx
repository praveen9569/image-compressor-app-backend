import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [quality, setQuality] = useState(80);
  const [compressedImage, setCompressedImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme class to <body> on mount & toggle
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCompress = async () => {
    if (!image) return alert("Please upload an image first.");
    const formData = new FormData();
    formData.append('image', image);
    formData.append('quality', quality);
    try {
      const res = await axios.post('http://localhost:5000/api/compress', formData, {
        responseType: 'blob'
      });
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      setCompressedImage(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Compression failed.");
    }
  };

  return (
    <div className="app-container">
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>Image Compressor</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br /><br />
      <label>Quality: {quality}</label>
      <input
        type="range"
        min="10"
        max="100"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
      />
      <br /><br />
      <button className="compress-btn" onClick={handleCompress}>Compress</button>

      {compressedImage && (
        <>
          <h3>Compressed Image:</h3>
          <img src={compressedImage} alt="Compressed" style={{ maxWidth: '300px' }} />
          <br />
          <a className="download-link" href={compressedImage} download="compressed.jpg">Download</a>
        </>
      )}

      <div className="table-container">
        <h2>Quality Reference Table</h2>
        <table>
          <thead>
            <tr>
              <th>Quality (%)</th>
              <th>Expected Compression</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>90-100</td>
              <td>Minimal compression, best quality</td>
              <td>Printing, design</td>
            </tr>
            <tr>
              <td>70-89</td>
              <td>Balanced compression and quality</td>
              <td>Web, documents</td>
            </tr>
            <tr>
              <td>50-69</td>
              <td>Smaller file size, visible compression</td>
              <td>Social media, quick preview</td>
            </tr>
            <tr>
              <td>10-49</td>
              <td>Heavy compression, quality loss</td>
              <td>Low bandwidth, thumbnails</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
