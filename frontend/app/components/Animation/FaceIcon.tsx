import Image from "next/image";
import React from "react";
import { FiPlus } from "react-icons/fi";

type Props = {};

export default function FaceIcon({}: Props) {
  return (
    <div className="py-3 px-4 w-[18  0px] flex justify-center items-center bg-white rounded-md absolute left-[5%] top-[15%] md:left-[15%] md:top-[20%] z-10 ">
      <div className="">
        <p className="font-[500] text-md dark:text-black">13k+Students</p>
        <div className="">
          <div className="flex mt-2">
            <Image
              src={require("../../../asset/images/face_one.avif")}
              alt="student face"
              className="rounded-full w-[35px] h-[35px] object-cover"
            />
            <Image
              src={require("../../../asset/images/face_two.avif")}
              alt="student face"
              className="rounded-full w-[35px] h-[35px] object-cover -ml-[15px]"
            />
            <Image
              src={require("../../../asset/images/face_three.avif")}
              alt="student face"
              className="rounded-full w-[35px] h-[35px] object-cover -ml-[15px]"
            />
            <Image
              src={require("../../../asset/images/face.avif")}
              alt="student face"
              className="rounded-full w-[35px] h-[35px] object-cover -ml-[15px]"
            />
            <span className="flex justify-center items-center rounded-full w-[35px] h-[35px] object-cover -ml-[15px]  bg-[var(--bg-primary)]">
              <FiPlus className="dark:text-black" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
