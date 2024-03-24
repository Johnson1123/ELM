import CourseRating from "@/app/components/Course.Rating";
import VideoPlayer from "@/utils/Video.Player";
import { btnPrimary } from "@/utils/style";
import React, { FC } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCreateCourse: () => void;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCreateCourse: createCourse,
}) => {
  const discountPer =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discount = discountPer.toFixed(0);

  const handlePrev = () => {
    setActive(active - 1);
  };
  const handleCreateCourse = () => {
    createCourse();
  };
  return (
    <div className="w-[90%] py-5 m-auto mt-5">
      <div className="w-full relative">
        <div className="mt-5">
          <VideoPlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex gap-2 items-center mt-5">
          <h4 className="">
            {courseData?.price === 0 ? "free" : `${courseData?.price}$`}
          </h4>
          <sup className="line-through text-red-600">
            {courseData?.estimatedPrice}$
          </sup>

          <h5 className="">{discount}%</h5>
        </div>
        <button className={`${btnPrimary} bg-red-700 px-7 mt-5`}>
          Buy Now
        </button>
        <div className="mt-5">
          <form action="">
            <input
              type="text"
              className="round-md py-1 focus:outline-none px-1 w-[60%]"
            />
            <button className="bg-green-800 rounded-lg px-5 py-1 ml-4 text-white">
              Apply
            </button>
          </form>
        </div>
        <p className="pt-1">1. Source Coded included</p>
        <p className="pt-1">2. Full lifetime access</p>
        <p className="pt-1">3. Certificate of completion</p>
        <p className="pt-1">4. Premium Support</p>
      </div>
      <div className="mt-4 justify-between">
        <h2 className="capitalize text-lg font-Poppins ">{courseData?.name}</h2>
        <div className="">
          <div className="flex items-center">
            <CourseRating rating={3} />
            <h5>0 Reviews</h5>
          </div>
          <h4 className="mt-4 font-Poppins">
            Number of Student:{" "}
            <span className="font-Rubik text-sm ml-2">0 Students</span>
          </h4>
        </div>
        <br />
      </div>
      <h1 className="font-Poppins text-md font-bold">
        What will you learn from this course
      </h1>
      {courseData?.benefit?.map((item: { title: string }, index: number) => {
        return (
          <div className="flex items-center w-full py-1" key={index}>
            <div className="w-[5%] ml-2">
              <IoCheckmarkDoneOutline size={20} className="text-green-700" />
            </div>
            <p className="pl-2">{item.title}</p>
            <br />
            <br />
          </div>
        );
      })}
      <br />
      <h1 className="font-Poppins text-md font-bold">
        prerequisites for this course
      </h1>
      {courseData?.prerequisites?.map(
        (item: { title: string }, index: number) => {
          return (
            <div className="flex items-center w-full py-1" key={index}>
              <div className="w-[5%] ml-2">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item.title}</p>
              <br />
              <br />
            </div>
          );
        }
      )}
      <br />
      <div className="w-full">
        <h3 className="text-[25px font-Poppins]">Course Details</h3>
        <p>{courseData.description}</p>
      </div>
      <br />
      <br />
      <div className="w-full flex justify-between">
        <button
          className={`${btnPrimary} px-10 bg-green-600`}
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className={`${btnPrimary} px-10 bg-green-600 `}
          onClick={handleCreateCourse}
        >
          Create Course
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;

// https://dev.vdocipher.com/api/videos/dd1c46f8f16f41afab035baa8b6a01d9/otp
