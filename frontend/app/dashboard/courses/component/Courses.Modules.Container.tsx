import React from "react";
import CourseModule from "./Course.Module";
import LeftProgress from "./LeftProgress";

type Props = {};

const CoursesModulesContainer = (props: Props) => {
  return (
    <div className="flex gap-2">
      <LeftProgress modules={3} />
      <div className="">
        <CourseModule course="Introduction to Javascript" />
      </div>
    </div>
  );
};

export default CoursesModulesContainer;
