import React from "react";
import CourseModule from "./Course.Module";
import LeftProgress from "./LeftProgress";

type Props = {};

const CoursesModulesContainer = (props: Props) => {
  return (
    <div className="flex gap-2">
      <LeftProgress modules={3} />
      <div className="">
        <CourseModule title="Introduction to Javascript" duration="30 min" />
      </div>
    </div>
  );
};

export default CoursesModulesContainer;
