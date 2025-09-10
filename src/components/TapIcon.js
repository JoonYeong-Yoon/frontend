import React, { useState } from "react";

const TapIcon = ({ content, isItSelected }) => {
  if (isItSelected) {
    return <h1>{content}</h1>;
  } else {
    return <p>{content}</p>;
  }
};

export default TapIcon;
