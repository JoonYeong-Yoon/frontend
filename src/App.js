import React, { useState } from "react";
import "./App.css";

// pages
import Introduce from "./pages/Introduce";
import News from "./pages/News";
import QnA from "./pages/QnA";
import Login from "./pages/Login.js";
// components
import TapIcon from "./components/TapIcon";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          {" "}
          <TapIcon content={"Introduce"} />{" "}
        </li>
      ),
      tabCont: <Introduce />,
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          {" "}
          <TapIcon content={"News"} />{" "}
        </li>
      ),
      tabCont: <News />,
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 2 ? "is-active" : ""}
          onClick={() => tabClickHandler(2)}
        >
          {" "}
          <TapIcon content={"QnA"} />{" "}
        </li>
      ),
      tabCont: <QnA />,
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 3 ? "is-active" : ""}
          onClick={() => tabClickHandler(3)}
        >
          {" "}
          <TapIcon title={"Login"} />{" "}
        </li>
      ),
      tabCont: <Login />,
    },
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
}

export default App;
