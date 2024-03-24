"use client";
import Coursedetails from "@/component/course.details";
import { useGetCourseQuery } from "@/redux/features/slice/course.api";

import Heading from "@/utils/Heading";
import { darkBg } from "@/utils/style";
import React, { useEffect, useState } from "react";

type Props = {
  params: any;
};

const page: React.FC<Props> = ({ params }) => {
  const id = params?.id;
  const [course, setCourse] = useState<any>();
  const { data } = useGetCourseQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (data) {
      setCourse(JSON.parse(data.data));
    }
  }, [data]);

  return (
    <div>
      <Heading
        title={course?.name}
        description="Reliable and relevant platform"
        keywords="Education, easy learning"
      />
      <div className={`w-full mt-[80px] ${darkBg} relative pb-10`}>
        {course && <Coursedetails course={course} />}
      </div>
    </div>
  );
};

export default page;
