import { btnPrimary, darkBg } from "@/utils/style";
import Image from "next/image";
import React from "react";

type Props = {};

const HomeFeedback = (props: Props) => {
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
          <p className="text-center md:text-left">
            I appreciate the effort you've put into creating this learning
            platform, and I believe addressing these points could make it an
            even more effective tool for aspiring programmers.
          </p>
          <div className="mt-5 flex flex-col items-center md:block">
            <h3 className="text-xl font-bold">Onah Pius</h3>
            <p className="font-[300] font-Rubik">Oyo, Nigeria</p>
          </div>

          <div
            className={`md:w-[150px] mt-2 flex gap-3 justify-center md:justify-start`}
          >
            <span className="h-[4px] w-[30px] border border-black dark:border-white rounded-lg cursor-pointer bg-[#00938d]"></span>
            <span className="h-[4px] w-[30px] border rounded-lg cursor-pointer border-black dark:border-white"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeedback;
