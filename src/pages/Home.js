import React, { useState } from "react";

// pages
// import DiseaseJudgement from "./DiseaseJudgement.js";
import DiseaseJudgementTwo from "./DiseaseJudgementTwo.js";
import Introduce from "./Introduce";
import News from "./News";
import QnA from "./QnA";
import Login from "./Login.js";
// components
import TapIcon from "../components/TapIcon";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [userUid, setUserUid] = useState("testing@daum.net");
  const [password, setPassword] = useState("1234abAB");
  const [isItLogined, setBeingLogined] = useState(true);

  const tabClickHandler = (index) => {
    if (index !== 4 && index !== 0 && isItLogined === false) {
      setActiveIndex(4);
    } else {
      setActiveIndex(index);
    }
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
      "Introducd",
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
    </div>
  );
};

export default Home;
