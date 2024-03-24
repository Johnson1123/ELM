import { useGetLayoutQuery } from "@/redux/features/slice/layout";
import React, { FC, useState } from "react";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
};

const CourseInfomation: FC<Props> = ({
  active,
  courseInfo,
  setActive,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data: categoryData } = useGetLayoutQuery("Category", {
    refetchOnMountOrArgChange: true,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handlefile = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState == 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragStart = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full">
      <div className="flex gap-2 flex-col">
        <label htmlFor="" className="text-lg">
          Course Name
        </label>
        <input
          type="text"
          placeholder="name"
          className=" h-[40px] rounded-md focus:outline-none px-1 border border-1 border-slate-300"
          value={courseInfo.name}
          onChange={(e: any) =>
            setCourseInfo({ ...courseInfo, name: e.target.value })
          }
        />
      </div>
      <br />
      <div className="flex gap-2 flex-col">
        <label htmlFor="" className="text-lg">
          Course Description
        </label>
        <textarea
          cols={20}
          rows={8}
          className="rounded-md focus:outline-none px-1 py-2  border border-1 border-slate-300"
          value={courseInfo.description}
          onChange={(e: any) =>
            setCourseInfo({ ...courseInfo, description: e.target.value })
          }
        />
      </div>
      <br />
      <div className="">
        <div className="flex flex-wrap w-[100%] justify-between">
          <div className="flex flex-col gap-2 w-[48%]">
            <label htmlFor="" className="text-lg">
              Course Price
            </label>
            <input
              type="text"
              placeholder="price"
              className=" h-[40px] rounded-md focus:outline-none px-1 border border-1 border-slate-300"
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2 w-[48%]">
            <label htmlFor="" className="text-lg">
              Estimated Price (optional)
            </label>
            <input
              type="text"
              placeholder="estimatedPrice"
              className=" h-[40px] rounded-md focus:outline-none px-1 border border-1 border-slate-300"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
            />
          </div>
        </div>
        <br />
        <div className="flex flex-wrap w-[100%] justify-between">
          <div className="flex flex-col gap-2 w-[48%]">
            <label htmlFor="" className="text-lg">
              Course Tags
            </label>
            <input
              type="text"
              placeholder="tags"
              className=" h-[40px] rounded-md focus:outline-none px-1 border border-1 border-slate-300"
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2 w-[48%]">
            <label htmlFor="" className="text-lg">
              Category
            </label>
            <select
              placeholder="estimatedPrice"
              className=" h-[40px] rounded-md focus:outline-none py-2 px-1 border border-1 border-slate-300"
              value={courseInfo.category}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
            >
              <option value="" className="py-2">
                Select Category
              </option>
              {categoryData?.data &&
                categoryData?.data.category.map((item: any, i: number) => {
                  return (
                    <option value={item.title} className="py-2">
                      {item.title}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap w-[100%] justify-between"></div>
        <br />
        <div className="flex flex-wrap w-[100%] justify-between">
          <div className="flex flex-col gap-2 w-[48%]">
            <label htmlFor="" className="text-lg">
              Course Level
            </label>
            <input
              type="text"
              placeholder="level"
              className=" h-[40px] rounded-md focus:outline-none px-1 border border-1 border-slate-300"
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2 w-[48%]">
            <label htmlFor="" className="text-lg">
              Demo Url
            </label>
            <input
              type="text"
              placeholder="url"
              className=" h-[40px] rounded-md focus:outline-none px-1 border border-1 border-slate-300"
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div
        className={`mt-4 w-full h-[200px] border border-dashed border-1 border-green-600 dark:border-slate-300 rounded-md flex justify-center items-center ${
          dragging ? "bg-blue-500" : "bg-transparent"
        }`}
        onDragOver={onDragStart}
        onDragLeave={onDragLeave}
        onDrop={handleDrop}
      >
        <input type="file" id="file" className="hidden" onChange={handlefile} />
        <label
          className="dark:text-white text-green-600 cursor-pointer"
          htmlFor="file"
        >
          {courseInfo.thumbnail ? (
            <img src={courseInfo.thumbnail} alt="course thumbnails" />
          ) : (
            "Drag and drop your image here"
          )}
        </label>
      </div>
      <div className="flex justify-end">
        <input
          type="submit"
          value="Next"
          className="bg-green-600 text-white py-2 px-7 text-[18px] cursor-pointer rounded-md my-5"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CourseInfomation;
