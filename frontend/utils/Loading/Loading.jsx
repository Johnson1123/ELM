import React from "react";
import { darkBg } from "../style";
import "./Loading.css";

const Loading = () => {
  return (
    <div
      className={`${darkBg}`}
      style={{
        height: "calc(100vh - 80px)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 100,
      }}
    >
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <div className="loading"></div>
      </div>
    </div>
  );
};

export default Loading;
