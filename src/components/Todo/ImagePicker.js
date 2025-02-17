import React, { useState } from 'react';

const ImagePicker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [previewURL, setPreviewURL] = useState(null); // For previewing before conversion

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Preview the image before conversion (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
        console.log(previewURL);
      };
      reader.readAsDataURL(file);

      // Convert to Base64 (asynchronously)
      const base64Reader = new FileReader();
      base64Reader.onload = (e) => {
        setBase64Image(e.target.result);
      };
      base64Reader.readAsDataURL(file);
    } else {
        setSelectedFile(null);
        setBase64Image(null);
        setPreviewURL(null);
    }
  };

  const handleSave = () => {
    if (base64Image) {
      // Here you would typically send the base64Image to your backend
      // or store it in your application's state (e.g., using Zustand, Context, etc.)
      console.log("Base64 Image:", base64Image);
      alert('Image saved (check console)');

    } else {
        alert('No image to save')
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {previewURL && (
        <div>
          <h2>Image Preview:</h2>
          <img src={previewURL} alt="Image Preview" style={{ maxWidth: '100px' }} />
        </div>
      )}

      {base64Image && (
        <div>
          <div>Base64 Representation (Check Console):</div>
          {/* You can display a truncated version for demonstration */}
          {/* <p>{base64Image.slice(0, 200)}...</p> */}
        </div>
      )}
    </div>
  );
}

export default ImagePicker;