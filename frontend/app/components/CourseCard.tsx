import Image from "next/image";
import React from "react";
import { CgUserAdd } from "react-icons/cg";
import { TbClipboardList } from "react-icons/tb";
import { IoMdArrowForward } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import CourseRating from "./Course.Rating";
import Link from "next/link";

export type ICourse = {
  title: string;
  price: number;
  modules: number;
  students: number;
  tags: string;
  image: string;
  // review: {
  //   total: number;
  //   average: number;
  // };
  review: number;
  id: string;
  isPurcahsed?: boolean;
};

const CourseCard = (props: ICourse) => {
  return (
    <div className="p-5 hover:bg-white rounded-lg w-[100%] md:max-w-[32%]  shadow-md duration-500 hover:shadow-xl hover:text-black">
      <div className="w-full h-[200px]">
        <Image
          src={props.image}
          height={250}
          width={300}
          alt={props.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="py-1 mt-2 flex justify-between items-center">
        <p className="p-1 px-2 text-white bg-[var(--color-red)] opacity-80 rounded-md">
          {props.tags}
        </p>
        <p className="text-[var(--color-red)] text-md font-bold">
          {props.price > 0 ? ` $${props.price}` : "free"}
        </p>
      </div>
      <p className="text-lg font-Poppins font-[500] text-left my-5 truncate">
        {props.title}
      </p>
      <div className="py-1 flex justify-between items-center">
        <p className="hover:text-[var(--color-red)] text-md flex gap-2">
          <span className="flex gap-1 items-center">
            <TbClipboardList /> {props.modules}
          </span>
          <span> Modoules</span>
        </p>
        <p
          className={
            props.isPurcahsed
              ? `hidden md:inline`
              : `hover:text-[var(--color-red)] text-md  flex gap-2 `
          }
        >
          <span className="flex gap-1 items-center">
            <CgUserAdd /> {props.students}
          </span>
          <span>Students</span>
        </p>
      </div>
      <div className="w-[70%] h-[2px] rounded-lg bg-[var(--color-red)] opacity-20 mx-auto my-5"></div>
      <div className="py-1 flex justify-between items-center">
        <div className="text-md flex gap-2">
          <span className="flex gap-1 items-center hover:text-[var(--color-red)]">
            {/* {(props.review.total / props.review.average).toFixed(1)} */}
            {props?.review}
          </span>
          <CourseRating rating={4.5} />
          <p className="hover:text-[var(--color-red)]">{`(${props.review})`}</p>
        </div>

        <Link
          href={
            !props.isPurcahsed
              ? `/course/${props?.id}`
              : `/course-access/${props?.id}`
          }
          className="h-[30px] w-[30px] rounded-full flex justify-center items-center bg-[#00938d]"
        >
          <IoMdArrowForward className="text-white cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
