"use client";
import React, { useState } from "react";
import CourseInfomation from "./Course.Info";
import FormStep from "./Form.Step";
import { darkBg } from "@/utils/style";
import CourseData from "./Course.Data";
import CourseContent from "./Course.Content";
import CoursePreview from "./Course.Preview";
import { useCreateCourseMutation } from "@/redux/features/slice/course.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {};

const Createcourse = (props: Props) => {
  const [active, setActive] = useState(0);
  const navigate = useRouter();

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    level: "",
    description: "",
    tags: "",
    demoUrl: "",
    thumbnail: "",
    price: "",
    estimatedPrice: "",
    category: "",
  });
  const [benefit, setBenefit] = useState([{ title: "" }]);
  const [prerequisites, setPrerequiste] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      link: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const [createCourse, { error, isLoading, data, isSuccess }] =
    useCreateCourseMutation();

  const handleSubmit = () => {
    const FBenefits = benefit.map((item) => ({ title: item.title }));
    const Fprerequisites = prerequisites.map((value: { title: string }) => ({
      title: value.title,
    }));
    const FCourseContent = courseContentData.map((item) => ({
      videoUrl: item.videoUrl,
      title: item.title,
      description: item.description,
      videoSection: item.videoSection,
      link: item.link.map((item) => ({
        title: item.title,
        url: item.url,
      })),

      suggestion: item.suggestion,
    }));
    const data = {
      name: courseInfo.name,
      level: courseInfo.level,
      description: courseInfo.description,
      tags: courseInfo.tags,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      benefits: FBenefits,
      perequisite: Fprerequisites,
      courseData: FCourseContent,
      totalVideo: FCourseContent.length,
    };
    setCourseData(data);
  };
  const handleCreateCourse = async () => {
    try {
      await createCourse(courseData);
      navigate.push("/dashboard/all-course");
      toast.success("Course created successfully");
    } catch (error: any) {
      if ("data" in error) {
        const errData = error as any;
        toast.error(errData?.data.message);
      }
    }
  };
  return (
    <div className={`${darkBg} w-full flex p-5 justify-between h-auto`}>
      <div className="w-[70%]">
        {active == 0 && (
          <CourseInfomation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
        {active == 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefit}
            setBenefits={setBenefit}
            prerequisites={prerequisites}
            setPrerequiste={setPrerequiste}
          />
        )}
        {active == 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContent={courseContentData}
            setCourseContent={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active == 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCreateCourse={handleCreateCourse}
          />
        )}
      </div>
      {/* form step option */}
      <div className="w-[20%]">
        <FormStep active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default Createcourse;
