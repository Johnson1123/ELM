import Coursecontent from "@/component/course.content";
import { useGetCourseQuery } from "@/redux/features/slice/course.api";
import Heading from "@/utils/Heading";
import Loading from "@/utils/Loading/Loading";
import VideoPlayer from "@/utils/Video.Player";
import React, { useEffect, useState } from "react";
import AccessCourseDetails from "./AccessCourseDetails";
import { object } from "yup";

type Props = {
  id: string;
};

const AccessCourse: React.FC<Props> = ({ id }) => {
  const [course, setCourse] = useState<any>(null);
  const {
    data: courseData,
    isLoading,
    error,
  } = useGetCourseQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (courseData) {
      setCourse(JSON.parse(courseData.data));
    }
  }, [courseData]);
  const [activeVideo, setActiveVideo] = useState(0);
  return (
    <div>
      {!courseData ? (
        <Loading />
      ) : (
        <div>
          <Heading
            title={course?.name}
            description={course?.courseData[1].description}
            keywords="Python course online"
          />
          <div className="">
            {course && (
              <AccessCourseDetails
                data={id}
                active={activeVideo}
                setActive={setActiveVideo}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessCourse;
