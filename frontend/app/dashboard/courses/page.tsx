import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import CouseContent from "./component/Couse.Content";

type Props = {};

const courses = (props: Props) => {
  return (
    <div className="flex justify-between mt-3 p-4">
      <div className="video-container w-[65%] bg-white rounded-sm"></div>
      <CouseContent />
    </div>
  );
};

export default courses;
