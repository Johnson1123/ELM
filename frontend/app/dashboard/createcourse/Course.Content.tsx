import React, { FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContent: any;
  setCourseContent: (courseContent: any) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContent,
  setCourseContent,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapse, setIsCollapse] = useState(
    Array(courseContent.lenght).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);
  const [editSection, setEditSection] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {};

  const handleCollapse = (index: number) => {
    const update = [...isCollapse];
    update[index] = !update[index];
    setIsCollapse(update);
  };
  const handleInputChange = (e: any, index: number) => {
    const update = [...courseContent];
    update[index][e.target.name] = e.target.value;
    setCourseContent(update);
  };
  const handleLinkDelete = (index: number, linkIndex: number) => {
    const update = [...courseContent];
    const updateDelete = update[index].link.filter((item: any, i: number) => {
      return linkIndex !== i;
    });
    const okay = update.map((item: any, i: number) => {
      return i == index ? { ...item, link: [...updateDelete] } : item;
    });
    setCourseContent(okay);
  };

  const handleChangeLink = (
    e: any,
    index: number,
    linkIndex: number,
    attr: string
  ) => {
    const update = [...courseContent];

    const okay = update[index].link.map((item: any, i: number) => {
      return linkIndex === i ? { ...item, [attr]: e.target.value } : item;
    });

    const savelink = update.map((item: any, i: number) => {
      return index === i ? { ...item, link: [...okay] } : item;
    });

    setCourseContent(savelink);
  };

  const handleAddLink = (index: number) => {
    const update = [...courseContent];
    update[index].link.push({ title: "", url: "" });
    setCourseContent(update);
  };

  const handleAddContent = () => {
    if (false) {
      toast.error("please, fill all feild");
    } else {
      let newVideoSection = "";

      if (courseContent.length > 0) {
        const lastVideoSection =
          courseContent[courseContent.length - 1].videoSection;
        alert(lastVideoSection);
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        link: [
          {
            title: "",
            url: "",
          },
        ],
        suggestion: "",
      };
      setCourseContent([...courseContent, newContent]);
    }
  };
  const handleAddNewSection = () => {
    if (false) {
      toast.error("Please, Fill all fields");
    } else {
      setActiveSection(activeSection + 1);

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        link: [
          {
            title: "",
            url: "",
          },
        ],
        suggestion: "",
      };

      setCourseContent([...courseContent, newContent]);
    }
  };
  const handlePrev = () => {
    setActive(active - 1);
  };
  const handleNext = () => {
    handleCourseSubmit();
    setActive(active + 1);
  };

  const editSectionTitle = () => {
    if (editSection) {
      inputRef.current?.readOnly;
    }
  };
  return (
    <div className="w-full">
      <form action="" onSubmit={handleSubmit}>
        {courseContent?.map((course: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            course.videoSection !== courseContent[index - 1].videoSection;
          return (
            <div
              className={`w-full bg-[#cdcBc817] ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
              key={index}
            >
              {showSectionInput && (
                <>
                  <div className="flex w-full items-center">
                    <input
                      type="text"
                      className={`text-[24px] ${
                        course.videoSection == "Untitled Section"
                          ? "w-min"
                          : "w-min"
                      } outline-none cursor-pointer text-black dark:text-white bg-transparent`}
                      value={course.videoSection}
                      onChange={(e: any) => {
                        const update = [...courseContent];
                        update[index].videoSection = e.target.value;
                        setCourseContent(update);
                      }}
                      ref={inputRef}
                    />
                    <BsPencil
                      className="dark:text-white text-black cursor-pointer"
                      onClick={editSectionTitle}
                    />
                  </div>
                  <br />
                </>
              )}
              <div className="w-full flex items-center justify-between my-0">
                {isCollapse[index] ? (
                  <>
                    {course.title ? (
                      <p className="dark:text-white text-black">
                        {index + 1}. {course.title}
                      </p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div className=""></div>
                )}

                {/* Delete and collapse button */}
                <div className="flex gap-2 items-center">
                  <AiOutlineDelete
                    className={`text-black dark:text-white text-[20px] ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={(e: any) => {
                      if (index > 0) {
                        const update = [...courseContent];
                        update.splice(index, 1);
                        setCourseContent(update);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    size={30}
                    className="text-black dark:text-white"
                    style={{
                      transform: isCollapse[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapse(index)}
                  />
                </div>
              </div>
              {!isCollapse[index] && (
                <>
                  <div className="my-3 flex flex-col gap-2 mt-4">
                    <label htmlFor="" className="font-bold">
                      Video Title
                    </label>
                    <input
                      type="text"
                      placeholder="Project plan..."
                      className="rounded-md py-2 px-2 md:w-[80%] focus:outline-none"
                      name="title"
                      value={course.title}
                      onChange={(e: any) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="my-3 flex flex-col gap-2 mt-4">
                    <label htmlFor="" className="font-bold">
                      Video URL
                    </label>
                    <input
                      type="text"
                      placeholder="Video url..."
                      className="rounded-md py-2 px-2 md:w-[80%] focus:outline-none"
                      name="videoUrl"
                      value={course.videoUrl}
                      onChange={(e: any) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="my-3 flex flex-col gap-2 mt-4">
                    <label htmlFor="" className="font-bold">
                      Video Description
                    </label>
                    <textarea
                      rows={8}
                      cols={30}
                      placeholder="Video url..."
                      className="rounded-md py-2 px-2 md:w-[80%] focus:outline-none"
                      name="description"
                      value={course.description}
                      onChange={(e: any) => handleInputChange(e, index)}
                    />
                    <br />
                    <br />
                    <br />
                  </div>
                  {course.link.map(
                    (
                      value: { title: string; url: string },
                      linkIndex: number
                    ) => {
                      return (
                        <div className="mb-3 block" key={index}>
                          <div className="flex justify-btweenr items-center w-full">
                            <label htmlFor="">Link {linkIndex + 1}</label>
                            <AiOutlineDelete
                              className={`text-black dark:text-white  text-[20px] ${
                                linkIndex == 0
                                  ? "cursor-no-drop"
                                  : "cursor-pointer"
                              }`}
                              onClick={() =>
                                linkIndex == 0
                                  ? null
                                  : handleLinkDelete(index, linkIndex)
                              }
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="source code... title"
                            className="rounded-md p-2 my-2 md:w-[80%] focus:outline-none"
                            value={value.title}
                            onChange={(e: any) =>
                              handleChangeLink(e, index, linkIndex, "title")
                            }
                          />
                          <br />
                          <input
                            type="url"
                            placeholder="source code... url "
                            value={value.url}
                            className="rounded-md p-2 my-2 md:w-[80%] focus:outline-none"
                            onChange={(e: any) =>
                              handleChangeLink(e, index, linkIndex, "url")
                            }
                          />
                        </div>
                      );
                    }
                  )}
                  <br />
                  <div className="">
                    <p
                      className="flex items-center gap-2 w-[140px] justify-center py-2 rounded-md text-green-600 cursor-pointer border border-1 border-green-600 hover:text-white hover:border-white"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg />
                      {"Add Link"}
                    </p>
                  </div>
                </>
              )}
              <div className="">
                {index === courseContent.length - 1 && (
                  <div>
                    <p
                      className="flex items-center gap-2 border border-green-600 text-green-600 w-[170px] justify-center py-2 rounded-md cursor-pointer text-small mt-5"
                      onClick={handleAddContent}
                    >
                      <AiOutlinePlusCircle />
                      {"Add New Content"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </form>
      <div className="">
        <div>
          <p
            className="flex items-center gap-2 text-green-600 w-[170px] justify-center py-2 rounded-md cursor-pointer text-small mt-5 border border-green-600"
            onClick={() => handleAddNewSection()}
          >
            <AiOutlinePlusCircle />
            {"Add New Section"}
          </p>
        </div>
      </div>
      <div className="flex justify-between item-center">
        <div>
          <p
            className="flex items-center gap-2 bg-green-600 w-[100px] justify-center py-2 rounded-md text-white cursor-pointer text-small mt-5"
            onClick={() => handlePrev()}
          >
            <LiaAngleLeftSolid />
            {"Previous"}
          </p>
        </div>
        <div>
          <p
            className="flex items-center gap-2 bg-green-600 w-[100px] justify-center py-2 rounded-md text-white cursor-pointer text-small mt-5"
            onClick={handleNext}
          >
            {"Next"}
            <LiaAngleRightSolid />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
