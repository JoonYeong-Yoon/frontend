import axios from "axios";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";

const DiseaseJudgementTwo = ({}) => {
  const [result, setResult] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    try {
      console.log(acceptedFiles);
      const formData = new FormData();
      formData.append("image", acceptedFiles[0], acceptedFiles[0].name);
      const response = axios.post(
        "http://localhost:5000/api/predict/",
        formData,
        { withCredentials: true }
      );
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {result === null ? (
        <>
          <p>사진 줘요!</p>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div
                style={{
                  width: "100px", // 너비
                  height: "100px", // 높이
                  backgroundColor: "red", // 전달받은 색상
                  margin: "10px",
                }}
              ></div>
            ) : (
              <div
                style={{
                  width: "100px", // 너비
                  height: "100px", // 높이
                  backgroundColor: "blue", // 전달받은 색상
                  margin: "10px",
                }}
              ></div>
            )}
          </div>
        </>
      ) : (
        <>
          <p>결과</p>
        </>
      )}
    </>
  );
};

export default DiseaseJudgementTwo;
