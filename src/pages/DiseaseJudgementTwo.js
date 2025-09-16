import axios from "axios";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import onDropZoneImage from "../img/onDropZoneOnDiseaseJudgementPage.jpg";
import "../css/DiseaseJudgement.css";

const DiseaseJudgementTwo = ({}) => {
  const [result, setResult] = useState(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      console.log(acceptedFiles);
      const formData = new FormData();
      formData.append("image", acceptedFiles[0], acceptedFiles[0].name);
      const response = await axios.post(
        "http://localhost:5000/api/predict/",
        formData,
        { withCredentials: true }
      );
      console.log("response", response);
      setResult(response.data.message);
      // setResult("개가 아프네요");
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const reloardDiseaseJudgementPage = () => {
    setResult(null);
  };

  return (
    <>
      <div className="disease-judgement">
        {result === null ? (
          <>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div>
                  <div className="disease-judgement">
                    <img
                      className="dog-img-on-drop"
                      src={onDropZoneImage}
                      alt="사진 주세요"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="disease-judgement">
                    <img
                      className="dog-img"
                      src={onDropZoneImage}
                      alt="사진 주세요"
                    />
                    <h2>이미지를 주세요</h2>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <p>{result}</p>
            <button onClick={reloardDiseaseJudgementPage}>다시</button>
          </>
        )}
      </div>
    </>
  );
};

export default DiseaseJudgementTwo;
