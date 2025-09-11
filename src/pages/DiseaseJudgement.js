import axios from "axios";
import { useState, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

function DiseaseJudgement() {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const handleClickDropArea = () => {
    fileInputRef.current.click();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    console.log("여기에 이미지를 끌어 놓으세요!");
    e.preventDefault();
    console.log(e.dataTransfer.files);
    setUploadFiles(e.dataTransfer.files);
  };

  const handleChange = (event) => {
    const files = event.target.files;
    setUploadFiles(files);
    // console.log("uploadFiles", uploadFiles);
  };
  const handleUpload = async () => {
    setLoading(true);

    // 일부러 대기 시키는 코드 (나중에 삭제)
    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await sleep(10000);

    setResult("분석결과 00% 확률로 ~~로 예상됩니다");
    try {
      console.log("Click!");
      console.log("업로드 성공!", uploadFiles);
      const files = Array.from(uploadFiles);
      const formData = new FormData();
      files.forEach((f) => {
        formData.append("files", f);
      });
      console.log(files, formData);
      const URL = "http://localhost:8000/upload";
      const res = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res", res);
      setResult(res);
    } catch (e) {
      console.log("error", e);
      alert("요청 중 오류가 발생하였습니다!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {result === null ? (
        <>
          <div
            className="drop-area"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "green",
            }}
            onClick={handleClickDropArea}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          ></div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg"
            // multiple
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <button onClick={handleUpload}>업로드</button>
          <button onClick={handleUpload}>병원찾기</button>
        </>
      ) : (
        <>
          <div>
            <h3>분석결과</h3>
            <p>{result}</p>
          </div>
        </>
      )}
      {loading && <LoadingSpinner />}
    </>
  );
}

export default DiseaseJudgement;
