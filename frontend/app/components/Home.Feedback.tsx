"use client";
import { btnPrimary, darkBg } from "@/utils/style";
import Image from "next/image";
import React, { useState } from "react";
import { homeFeedback, homeFeedbackPrps } from "@/constant/data";

type Props = {};

const HomeFeedback = (props: Props) => {
  const [toggle, setToggle] = useState(0);

  const adaptableText = (value: string, len: number): string => {
    const commentLenght = value.length;
    if (commentLenght <= len) {
      return value;
    } else {
      const truncate = `${value.slice(0, len)} ...`;
      return truncate;
    }
  };

  const handleToggle = (value: number) => {
    setToggle(value);
  };
  return (
    <div className={`${darkBg} py-5 w-full bg-[#f3f3f3]`}>
      <div className="flex flex-col md:flex-row w-[92%] md:w-[75%] my-5 md:justify-between mx-auto">
        <div className="left md:w-[55%] md:ml-3 overflow-hidden">
          <Image
            src={require("../../asset/images/feedback.png")}
            alt="about image"
          ></Image>
        </div>
        <div className="right flex flex-col w-[92%] md:w-[40%] gap-3 mt-5 md:justify-center ">
          <p className="font-Poppins text-2xl text-center md:text-left md:text-3xl font-[900] leading-[1.6] md:leading-[1.7] dark:text-white">
            Our Students Feedback
          </p>
          <p className="text-center md:text-justify">
            {adaptableText(homeFeedback[toggle].comment, 185)}
          </p>
          <div className="mt-5 flex flex-col items-center md:block">
            <h3 className="text-xl font-semibold">
              {adaptableText(homeFeedback[toggle].name, 40)}
            </h3>
            {homeFeedback[toggle].location && (
              <p className="font-[300] font-Rubik">
                {adaptableText(homeFeedback[toggle].location, 100)}
              </p>
            )}
          </div>

          <div
            className={`md:w-[150px] mt-2 flex gap-3 justify-center md:justify-start`}
          >
            {homeFeedback[toggle] &&
              homeFeedback.map((item: homeFeedbackPrps, index: number) => {
                return (
                  <span
                    className={`h-[4px] w-[30px] border border-black dark:border-white rounded-lg cursor-pointer ${
                      index == toggle ? "bg-[#00938d]" : ""
                    }`}
                    key={index}
                    onClick={() => handleToggle(index)}
                  ></span>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeedback;
