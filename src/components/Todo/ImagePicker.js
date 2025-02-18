import React, { useEffect, useRef, useState } from "react";

const ImagePicker = (props) => {
  const { handleImage, clearImage } = props;
  const [previewURL, setPreviewURL] = useState(null);
  const imageUploadRef = useRef(null);

  useEffect(() => {
    if (clearImage) {
      resetImage();
    }
  }, [clearImage]);

  const resetImage = () => {
    setPreviewURL(null);
    handleImage(null);
    if (imageUploadRef.current) {
      imageUploadRef.current.value = "";
    }
  };

  const handleImageChange = (event) => {
    const file = event?.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
        handleImage(reader.result); // Directly use the result for handleImage
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(null);
      handleImage(null);
    }
  };

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
          <br />
          <button type="button" className="btn btn-danger btn-sm my-2" onClick={resetImage}>
            <i className="bi bi-trash me-2"></i>Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
