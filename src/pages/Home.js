import React, { useState } from "react";

// pages
import DiseaseJudgement from "./DiseaseJudgment.js";
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

  const tabClickHandler = (index) => {
    setActiveIndex(index);
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
    aTab("Home", <DiseaseJudgement />, 0),
    aTab("Introducd", <Introduce />, 1),
    aTab("News", <News />, 2),
    aTab("Q & A", <QnA />, 3),
    aTab(
      "Login",
      <Login
        userUid={userUid}
        setUserUid={setUserUid}
        password={password}
        setPassword={setPassword}
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
      <p>{userUid}</p>
      <div>{tabContArr[activeIndex].tabCont}</div>
    </div>
  );
};

export default Home;
