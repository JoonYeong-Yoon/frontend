import React, { useState } from "react";

const TapIcon = ({ content }) => {
  console.log("content", content);
  const { title, setTitle } = useState(content);
  return (
    <>
      <p>{content}</p>
    </>
  );
};

export default TapIcon;
