"use client";
import React, { useEffect, useState } from "react";
import {
  useCreateCourseMutation,
  useGetAllCourseQuery,
} from "@/redux/features/slice/course.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CourseInfomation from "../../createcourse/Course.Info";
import { darkBg } from "@/utils/style";
import FormStep from "../../createcourse/Form.Step";
import CourseData from "../../createcourse/Course.Data";
import CourseContent from "../../createcourse/Course.Content";
import CoursePreview from "../../createcourse/Course.Preview";

type Props = {};

const EditCourse = ({ params }: any) => {
  const id = params?.id;
  const { data: course, error: courseError } = useGetAllCourseQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [active, setActive] = useState(0);
  const navigate = useRouter();

  let editData: any;

  if (course) {
    editData = course.data.find((item: any) => item._id === id);
  }

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    level: "",
    description: "",
    tags: "",
    demoUrl: "",
    thumbnail: "",
    price: "",
    estimatedPrice: "",
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
    const Fprerequisites = prerequisites.map((value) => ({
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
      benefit: FBenefits,
      prerequisites: Fprerequisites,
      courseData: FCourseContent,
      totalVideo: FCourseContent.length,
    };
    setCourseData(data);
  };
  const handleCreateCourse = async () => {
    try {
      await createCourse(courseData);
      navigate.push("/dashboard/all-courses");
      toast.success("Course created successfully");
    } catch (error: any) {
      if ("data" in error) {
        const errData = error as any;
        toast.error(errData);
      }
    }
  };
  useEffect(() => {
    if (editData) {
      setCourseInfo({
        name: editData.name,
        level: editData.level,
        description: editData.description,
        tags: editData.tags,
        demoUrl: editData.demoUrl,
        thumbnail: editData.thumbnail.url,
        price: editData.price,
        estimatedPrice: editData.estimatedPrice,
      });
      setBenefit(editData.benefits);
      setPrerequiste(editData.perequisite);
      setCourseContentData(editData.courseData);
    }
  }, [course]);
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
      <div className="w-[20%]">
        <FormStep active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
