import CourseContent from "@/app/dashboard/createcourse/Course.Content";
import Coursecontent from "@/component/course.content";
import Coursedetails from "@/component/course.details";
import { useGetCourseContentQuery } from "@/redux/features/slice/course.api";
import VideoPlayer from "@/utils/Video.Player";
import React, { useEffect, useState } from "react";

type Props = {
  data: string;
  active: number;
  setActive: (num: number) => void;
};

const AccessCourseDetails = ({ data, active, setActive }: Props) => {
  const [courseData, setCourseData] = useState(null);
  const { data: course } = useGetCourseContentQuery(data);
  useEffect(() => {
    if (course) {
      setCourseData(course.data);
    }
  }, [course]);
  return (
    <div className="w-full">
      <div
        className="flex justify-between items-start w-[95%] md:w-[75%] h-full bg-transparent mx-auto"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <div className=""></div>
        <div className="w-[30%]">
          {courseData && <Coursecontent courseData={courseData} />}
          <VideoPlayer videoUrl="dd1c46f8f16f41afab035baa8b6a01d9" title="" />
        </div>
      </div>
    </div>
  );
};

export default AccessCourseDetails;
