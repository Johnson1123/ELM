"use client";
import React, { useEffect, useReducer, useState } from "react";
import CourseModule from "./Course.Module";
import { getHoursMinute } from "@/helps";
import { VscTriangleDown } from "react-icons/vsc";
import { course } from "@/constant/data";

interface IModules {
  url: string;
  title: string;
  duration: number;
  // author: string;
}

type Props = {};

interface ICourse {}

const CouseContent = (props: Props) => {
  const [courseData, setCourseData]: any = useState(null);
  const [toggle, setToggle] = useState(0);

  const getTotalCourse = () => {
    if (courseData) return courseData.courseData.length;
  };
  const getTotalCourseHours = () => {
    let total: number = 0;
    courseData &&
      courseData?.courseData.map((item: any, i: any) => {
        total += item.videoLenght;
      });
    return getHoursMinute(total);
  };
  const total = getTotalCourseHours();
  const totalCourse = getTotalCourse();
  useEffect(() => {
    if (course) {
      setCourseData(course);
    }
  }, [course]);
  return (
    <div className="w-[33%] bg-white py-1 px-2 rounded-sm overflow-auto">
      <h3 className="font-Poppins text-lg leading-[1.4] mt-3">
        Course Content
      </h3>
      <p>
        <span className="font-bold text-sm text-slate-400">Lecture </span>
        <span>{`(${totalCourse})`}</span>
        <span className="font-bold text-sm text-slate-400"> duration </span>
        <span className="text-sm">{` ${total[0]}hrs | ${total[1]}min`}</span>
      </p>
      <div className=""></div>
      {courseData &&
        courseData.courseData.map((item: any, i: any) => {
          const [h, m] = getHoursMinute(item.videoLenght);
          return (
            <div className="">
              <div
                className="flex justify-between px-2 mt-2 items-center cursor-pointer"
                onClick={() => {
                  setToggle(i + 1);
                }}
              >
                <p className="text-md font-semibold">Module {i + 1}</p>
                <p className="text-md font-semibold">
                  <span></span>
                  <span>{h > 0 ? h : null}hrs </span>
                  <span>{m}mins</span>
                </p>
                <VscTriangleDown />
              </div>
              {toggle === i + 1 ? (
                <CourseModule course={item} index={i} />
              ) : null}
            </div>
          );
        })}
    </div>
  );
};
export default CouseContent;
