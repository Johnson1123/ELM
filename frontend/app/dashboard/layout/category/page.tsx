"use client";
import {
  useGetLayoutQuery,
  useInsertLayoutMutation,
  usePutLayoutMutation,
} from "@/redux/features/slice/layout";
import { btn, darkBg, iconBg } from "@/utils/style";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";

type Props = {};

const Category = (props: Props) => {
  const [category, setCategory] = useState([
    {
      title: "",
    },
  ]);

  const { data: dataCategory, refetch } = useGetLayoutQuery("Category", {
    refetchOnMountOrArgChange: true,
  });

  const [
    insertcategory,
    { isLoading, error, data: mutationData, isSuccess: mutationSuccessful },
  ] = dataCategory?.data?.category
    ? usePutLayoutMutation()
    : useInsertLayoutMutation();

  const handleCategory = () => {
    if (category[category.length - 1].title !== "") {
      const updatecategory = [...category];
      updatecategory.push({ title: "" });
      setCategory(updatecategory);
    } else {
      toast.error("Fill last category");
    }
  };

  const handleChannge = (index: number, value: string) => {
    const changecategory = [...category];
    const mapItem = (() => {
      return changecategory.map((item: any, i: number) =>
        i == index ? { ...item, title: value } : item
      );
    })();
    setCategory(mapItem);
  };

  const handeDelete = (index: number) => {
    if (category.length > 1) {
      const deletecategory = [...category];
      deletecategory.splice(index, 1);
      setCategory(deletecategory);
    }
  };

  const handleSubmit = async () => {
    const data = { type: "Category", category: category };
    await insertcategory(data);
  };
  useEffect(() => {
    if (dataCategory?.data?.category) {
      setCategory(dataCategory.data.category);
    }
  }, [dataCategory]);
  useEffect(() => {
    if (mutationSuccessful) {
      const message = mutationData.message || "Category inserted Successfully";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errData = error as any;
        toast.error(errData?.data.message);
      }
    }
  }, [mutationSuccessful, error]);
  return (
    <div className={`${darkBg} w-full pb-5`}>
      <div className="mt-5 w-[100%] md:w-[50%] p-5">
        <p className="font-bold text-lg mt-5">category Layout</p>
        {category.map((item: { title: string }, index: number) => {
          return (
            <div
              className={
                category.length > 0
                  ? "mb-5 flex flex-col"
                  : "mb-10 flex flex-col"
              }
            >
              <div className="flex w-full justify-between items-center">
                <p className="text-md">Category {index + 1}</p>
                {index >= 1 && (
                  <span
                    onClick={() => handeDelete(index)}
                    className="cursor-pointer"
                  >
                    <IoClose />
                  </span>
                )}
              </div>

              <input
                name="answer"
                placeholder="Answer"
                className="w-full mt-4 border border-1 border-slate-500 focus:outline-none py-2 rounded-md px-1"
                value={item.title}
                onChange={(e) => handleChannge(index, e.target.value)}
              />
            </div>
          );
        })}
        <button
          onClick={handleCategory}
          className={`${iconBg} mt-4 w-[25px] h-[25px] text-green-600 font-bold hover:bg-green-600 hover:text-white`}
        >
          <GoPlus />
        </button>
      </div>
      <div className="flex justify-center w-[100%] md:w-[50%] mt-10">
        <button className={`${btn}`} onClick={handleSubmit}>
          {isLoading ? (
            <ThreeDots height="24" color="#fff" radius="5" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default Category;
