import React, { StrictMode, useState } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom";

// pages
// import DiseaseJudgement from "./DiseaseJudgement.js";
import DiseaseJudgementTwo from "./DiseaseJudgementTwo.js";
import Introduce from "./Introduce.js";
import News from "./News.js";
import QnA from "./QnA.js";
import Login from "./Login.js";
// components
import TapIcon from "../components/TapIcon";
import ModalOnHome from "../components/ModalOnHome.js";
// css
import "../css/HomeCss.css";

Modal.setAppElement(document.getElementById("root"));

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [userUid, setUserUid] = useState("testing@daum.net");
  const [password, setPassword] = useState("1234abAB");
  const [isItLogined, setBeingLogined] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
    // if (index !== 2 && index !== 0 && isItLogined === false) {
    //   setActiveIndex(2);
    //   setModalTitle("로그인해주세요");
    //   openModal();
    // } else {
    //   setActiveIndex(index);
    // }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    setUserUid("");
    setPassword("");
    setBeingLogined(false);
    setActiveIndex(2);
    setModalTitle("로그아웃 완료");
    openModal();
  };

  function aTab(content, page, indexToSelected) {
    return {
      tabTitle: (
        <li
          className={activeIndex === indexToSelected ? "is-active" : ""}
          onClick={() => tabClickHandler(indexToSelected)}
        >
          {" "}
          <TapIcon
            content={content}
            isItSelected={activeIndex === indexToSelected}
          />{" "}
        </li>
      ),
      tabCont: page,
    };
  }

  const tabContArr = [
    aTab("Home", <DiseaseJudgementTwo />, 0),
    aTab("Q & A", <QnA />, 1),
    aTab(
      "Login",
      <Login
        userUid={userUid}
        setUserUid={setUserUid}
        password={password}
        setPassword={setPassword}
        isItLogined={isItLogined}
        setBeingLogined={setBeingLogined}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        openModal={openModal}
      />,
      2
    ),
  ];

  return (
    <div>
      <div className="app-name">
        <p>나랑 같이 갈 개</p>
      </div>

      <ul>
        <div className="navbar">
          {tabContArr.map((section, index) => {
            return <div>{section.tabTitle}</div>;
          })}
        </div>
      </ul>
      <div className="home-content">{tabContArr[activeIndex].tabCont}</div>
      {/* <button onClick={logout}>로그아웃</button> */}
      <div>
        {isModalOpen && (
          <ModalOnHome onClose={closeModal}>
            <h2>{modalTitle}</h2>
            <p>{modalContent}</p>
            <button style="float: right;" onClick={closeModal}>
              닫기
            </button>
          </ModalOnHome>
        )}
      </div>
    </div>
  );
};

export default Home;
