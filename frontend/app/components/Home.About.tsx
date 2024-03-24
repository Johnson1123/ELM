import { btnPrimary, darkBg } from "@/utils/style";
import Image from "next/image";
import React from "react";

type Props = {};

const HomeAbout = (props: Props) => {
  return (
    <div className={`${darkBg} py-5 w-full bg-[#f3f3f3]`}>
      <div className="flex flex-col md:flex-row w-[92%] md:w-[75%] my-5 md:justify-between mx-auto">
        <div className="left md:w-[55%] md:ml-3 overflow-hidden">
          <Image
            src={require("../../asset/images/about.png")}
            alt="about image"
          ></Image>
        </div>
        <div className="right flex flex-col w-[92%] md:w-[40%] gap-3 mt-5 md:justify-center ">
          <p className="font-Poppins text-2xl text-center md:text-left md:text-3xl font-[900] leading-[1.6] md:leading-[1.7] dark:text-white">
            We Make Your Learning <br />
            Through Awesome
          </p>
          <p className="">
            Become the dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet.
          </p>
          <button className={`${btnPrimary} px-5 py-4 w-[150px] mt-5`}>
            Laern More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
