import { btnPrimary, iconBg } from "@/utils/style";
import React, { FC } from "react";
import { GoPlus } from "react-icons/go";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequiste: (benefits: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequiste,
  active,
  setActive,
}) => {
  const handleBenefits = (index: number, value: string) => {
    const updateBenefit = [...benefits];
    updateBenefit[index].title = value;
    setBenefits(updateBenefit);
  };
  const handleBenefitButton = () => {
    const updateBenefit = [...benefits];
    updateBenefit.push({ title: "" });
    setBenefits(updateBenefit);
  };
  const handleprerequisites = (index: number, value: string) => {
    const updatePrerequisites = [...prerequisites];
    updatePrerequisites[index].title = value;
    setPrerequiste(updatePrerequisites);
  };
  const handleprerequisitesButton = () => {
    const handleprerequisitesButton = [...prerequisites];
    handleprerequisitesButton.push({ title: "" });
    setPrerequiste(handleprerequisitesButton);
  };
  const handleNext = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handlePrev = (e: any) => {
    e.preventDefault();
    setActive(active - 1);
  };
  return (
    <div className="w-full">
      <div className="">
        <h1>What benefits of taking this course</h1>
        <div className="">
          {benefits.map((benefit: any, index: number) => {
            return (
              <div key={index}>
                <input
                  type="text"
                  placeholder="The benefit of taking this course"
                  className="w-full mt-4 border border-1 border-slate-500 focus:outline-none py-2 rounded-md px-1"
                  value={benefits[index].title}
                  onChange={(e) => handleBenefits(index, e.target.value)}
                  required
                  name="Benefit"
                />
              </div>
            );
          })}
          <button
            onClick={handleBenefitButton}
            className={`${iconBg} mt-4 w-[25px] h-[25px] text-green-600 font-bold hover:bg-green-600 hover:text-white`}
          >
            <GoPlus />
          </button>
        </div>
        <br />
        <h1 className="">What Prerequites of taking this course </h1>
        <div className="">
          {prerequisites.map((prerequisite, index: number) => {
            return (
              <div key={index}>
                <input
                  type="text"
                  placeholder="The benefit of taking this course"
                  className="w-full mt-4 border border-1 border-slate-500 focus:outline-none py-2 rounded-md px-1"
                  value={prerequisites[index].title}
                  onChange={(e) => handleprerequisites(index, e.target.value)}
                  required
                  name="Benefit"
                />
              </div>
            );
          })}
          <br />
          <button
            onClick={handleprerequisitesButton}
            className={`${iconBg} w-[25px] h-[25px] text-green-600 font-bold hover:bg-green-600 hover:text-white`}
          >
            <GoPlus />
          </button>
        </div>
        <br />
        <br />
        <div className="w-full flex justify-between items-center">
          <button
            className={`${btnPrimary} px-10 bg-green-600`}
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className={`${btnPrimary} px-10 bg-green-600`}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseData;
