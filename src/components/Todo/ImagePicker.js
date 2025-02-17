import React, { useEffect, useRef, useState } from "react";

const ImagePicker = (props) => {
  const { handleImage, clearImage } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [saveAgreement, setSaveAgreement] = useState(false);
  const imageUploadRef = useRef(null);

  useEffect(() => {
    if (saveAgreement && base64Image) {
      console.log("Image saved with todo");
      handleImage(base64Image);
    }
  }, [base64Image, saveAgreement]);

  useEffect(()=> {
    console.log(clearImage);
    if (clearImage) {
      setSaveAgreement(false);
      setSelectedFile(null);
      handleImageChange(null);
    }
  }, [clearImage]);

  const handleImageChange = (event) => {
    const file = event?.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Preview the image before conversion (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
        // console.log(previewURL);
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

  // const handleSave = () => {
  //   if (base64Image) {
  //     // Here you would typically send the base64Image to your backend
  //     // or store it in your application's state (e.g., using Zustand, Context, etc.)

  //   } else {
  //       alert('No image to save')
  //   }
  // };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={imageUploadRef}
        onChange={handleImageChange}
        className="my-2"
      />

      {previewURL && (
        <div>
          <h2>Image Preview:</h2>
          <img
            src={previewURL}
            alt="Image Preview"
            style={{ maxWidth: "100px" }}
          />
        </div>
      )}

      {base64Image && (
        <div className="form-group form-check my-2">
          <input
            type="checkbox"
            checked={saveAgreement}
            onChange={(e) => setSaveAgreement(!saveAgreement)}
            className="form-check-input"
            id="agreement"
          />
          <label className="form-check-label" htmlFor="agreement">
            Save Image with Todo
          </label>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
