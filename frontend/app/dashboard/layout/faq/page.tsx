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
import { MdDelete } from "react-icons/md";
import { HiMinusSm } from "react-icons/hi";

type Props = {};

const page = (props: Props) => {
  const [faq, setFaq] = useState<
    { question: string; answer: string; _id?: string }[]
  >([{ question: "", answer: "" }]);
  const [collapse, setCollaspe] = useState(-1);

  const { data: faqData, refetch } = useGetLayoutQuery("Faq", {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (faqData) {
      setFaq(faqData?.data.faq);
    }
  }, [faqData]);
  const [insertFAQ, { isLoading, data, error, isSuccess }] = faqData?.data.faq
    ? usePutLayoutMutation()
    : useInsertLayoutMutation();
  const handleFAQ = () => {
    if (
      faq[faq.length - 1].answer !== "" &&
      faq[faq.length - 1].question !== ""
    ) {
      const updateFAQ = [...faq];
      updateFAQ.push({ question: "", answer: "", _id: "" });
      setFaq(updateFAQ);
    } else {
      toast.error("Fill last FAQ");
    }
  };

  const handleChangeQuestion = (index: number, value: string) => {
    const changeFAQ = [...faq];
    const mapItem = (() => {
      return changeFAQ.map((item, i) =>
        i == index ? { ...item, question: value } : item
      );
    })();
    setFaq(mapItem);
  };
  const handleChangeAnswer = (index: number, value: string) => {
    const changeFAQ = [...faq];
    const mapItem = (() => {
      return changeFAQ.map((item, i) =>
        i == index ? { ...item, answer: value } : item
      );
    })();
    setFaq(mapItem);
  };

  const handeDelete = (index: number) => {
    if (faq.length > 1) {
      const deleteFaq = [...faq];
      deleteFaq.splice(index, 1);
      setFaq(deleteFaq);
    }
  };

  const handleSubmit = async () => {
    await insertFAQ({ type: "Faq", faq });
  };
  const handleCollapse = (id: number) => {
    const check = id == collapse ? true : false;
    if (check) {
      setCollaspe(-1);
    } else {
      setCollaspe(id);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      const message = data.message || "Faq inserted Successfully";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errData = error as any;
        toast.error(errData?.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className={`${darkBg} w-full pb-5`}>
      <div className="mt-5 b w-[100%] md:w-[50%] p-5">
        <p className="py-3 font-bold text-lg">FAQ Layout</p>
        <div className="">
          {faq.map(
            (
              item: { question: string; answer: string; _id?: string },
              index: number
            ) => {
              return (
                <div
                  className={
                    faq.length > 0
                      ? "mb-5 flex flex-col"
                      : "mb-10 flex flex-col"
                  }
                  key={index}
                >
                  <p className="text-md">Faq {index + 1}</p>
                  <div className="flex flex-row justify-start items-center mt-4 bg-slate-800 px-3">
                    <input
                      name="question"
                      placeholder="Question"
                      value={item.question}
                      className="w-full !bg-transparent border-b border-1 border-slate-700 focus:outline-none py-2  px-2"
                      onChange={(e) =>
                        handleChangeQuestion(index, e.target.value)
                      }
                    />
                    <span>
                      {collapse != index ? (
                        <GoPlus
                          className="dark:text-white text-slate-900 text-[20px] pt-1"
                          onClick={() => handleCollapse(index)}
                        />
                      ) : (
                        <HiMinusSm
                          className="dark:text-white text-slate-900 text-[20px] pt-1"
                          onClick={() => handleCollapse(index)}
                        />
                      )}
                    </span>
                  </div>
                  <input
                    name="answer"
                    placeholder="Answer"
                    className={`${
                      collapse != index ? "hidden" : "inline-block"
                    } w-full mt-4 bg-transparent border-b border-1 border-slate-700 focus:outline-none py-2 px-2`}
                    value={item.answer}
                    onChange={(e) => handleChangeAnswer(index, e.target.value)}
                  />

                  {index >= 1 && (
                    <span
                      onClick={() => handeDelete(index)}
                      className="cursor-pointer mt-2"
                    >
                      <MdDelete className="text-red-800 text-2xl" />
                    </span>
                  )}
                </div>
              );
            }
          )}
          <button
            onClick={handleFAQ}
            className={`${iconBg} mt-4 w-[25px] h-[25px] text-green-600 font-bold hover:bg-green-600 hover:text-white`}
          >
            <GoPlus />
          </button>
        </div>
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

export default page;
