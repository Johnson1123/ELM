import { dot } from "@/constant/styles";
import { getHoursMinute } from "@/helps";
import React, { FC } from "react";

type Props = {
  course?: any;
  index?: number;
};

const CourseModule: FC<Props> = ({ course, index }) => {
  return (
    <div className="mt-1 py-4 px-3 shadow-md border border-slate-100 rounded-md hover:shadow-lg cursor-pointer">
      <div className="flex items-center gap-1 mt-1">
        <span style={dot}></span>
        <p className="text-slate-500 ">
          <span>1 Video</span> | <span>{}</span>
        </p>
      </div>
      <div className=""></div>
    </div>
  );
};

export default CourseModule;
