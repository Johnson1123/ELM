// import { courses } from "@/utils/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { darkBg } from "@/utils/style";
import { useGetAllCourseQuery } from "@/redux/features/slice/course.api";

type Props = {};

const HomeCourse = (props: Props) => {
  const [courses, setCourses] = useState<any[]>();

  const { data, isLoading } = useGetAllCourseQuery({});

  useEffect(() => {
    if (data) {
      setCourses(data.data);
    }
  }, [data]);
  return (
    <div>
      <div className={`${darkBg} py-5 bg-[#f3f3f3]`}>
        <h3 className="font-Poppins text-lg md:text-2xl font-[900] leading-[1.6] md:leading-[1.7] dark:text-white text-center my-10">
          Our Featured Courses
        </h3>
        <div className="w-[92%] md:w-[75%] grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 rounded-md justify-center  flex-wrap flex-col md:flex-row">
          {courses &&
            courses.length > 0 &&
            courses.map((item, index) => {
              return (
                <CourseCard
                  image={item.thumbnail.url}
                  price={item.price}
                  students={item.purchase}
                  review={item.review.length}
                  tags={item.tags.split(" ")[0]}
                  title={item.title}
                  modules={item.courseData.length}
                  key={index}
                  id={item._id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomeCourse;
