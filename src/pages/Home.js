import React, { StrictMode, useState } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom";

// pages
// import DiseaseJudgement from "./DiseaseJudgement.js";
import DiseaseJudgementTwo from "./DiseaseJudgementTwo.js";
import Introduce from "./Introduce";
import News from "./News";
import QnA from "./QnA";
import Login from "./Login.js";

// components
import TapIcon from "../components/TapIcon";
import ModalOnHome from "../components/ModalOnHome.js";
// css
import "../css/Home.css";

Modal.setAppElement(document.getElementById("root"));

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [userUid, setUserUid] = useState("testing@daum.net");
  const [password, setPassword] = useState("1234abAB");
  const [isItLogined, setBeingLogined] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabClickHandler = (index) => {
    if (index !== 4 && index !== 0 && isItLogined === false) {
      setActiveIndex(4);
      setModalTitle("로그인해주세요");
      openModal();
    } else {
      setActiveIndex(index);
    }
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
    setActiveIndex(4);
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
    // aTab(
    //   "Home",
    //   <DiseaseJudgement userUid={userUid} isItLogined={isItLogined} />,
    //   0
    // ),
    aTab("Home", <DiseaseJudgementTwo />, 0),
    // aTab("Home", <p>DiseaseJudgement</p>, 0),
    aTab(
      "Introduce",
      <Introduce userUid={userUid} isItLogined={isItLogined} />,
      1
    ),
    aTab("News", <News userUid={userUid} isItLogined={isItLogined} />, 2),
    aTab("Q & A", <QnA userUid={userUid} isItLogined={isItLogined} />, 3),
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
      4
    ),
  ];

  return (
    <div>
      <ul className="tabs is-boxed">
        {tabContArr.map((section, index) => {
          return section.tabTitle;
        })}
      </ul>
      <div>{tabContArr[activeIndex].tabCont}</div>
      <button onClick={logout}>로그아웃</button>

      {isModalOpen && (
        <ModalOnHome onClose={closeModal}>
          <h2>{modalTitle}</h2>
          <p>{modalContent}</p>
          <button onClick={closeModal}>닫기</button>
        </ModalOnHome>
      )}
    </div>
  );
};

export default Home;
