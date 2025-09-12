import axios from "axios";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import onDropZoneImage from "../img/onDropZoneOnDiseaseJudgementPage.jpg";

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
      setResult(response.data.message);
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {result === null ? (
        <>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div
                style={{
                  width: "600px", // 너비
                  height: "380px", // 높이
                  backgroundColor: "blue", // 전달받은 색상
                  margin: "10px",
                }}
              ></div>
            ) : (
              <div>
                <div>
                  <img src={onDropZoneImage} alt="사진 주세요" />
                  <h2>이미지를 주세요</h2>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <p>result</p>
        </>
      )}
    </>
  );
};

export default DiseaseJudgementTwo;
