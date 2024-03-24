import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const FormStep: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div>
      {options.map((option: any, key: number) => {
        return (
          <div className="py-4 flex" key={key}>
            <div
              className={`h-[30px] w-[30px] rounded-full flex justify-center items-center relative mr-2 ${
                active >= key ? "bg-blue-400" : "bg-slate-700"
              }`}
            >
              <IoMdCheckmark width={25} className="text-white font-bold" />
              {key < options.length - 1 && (
                <div
                  className={`h-[30px] w-1 absolute bottom-[-100%] ${
                    active >= key ? "bg-blue-400" : "bg-slate-700"
                  }`}
                ></div>
              )}
            </div>
            <p>{option}</p>
          </div>
        );
      })}
    </div>
  );
};
export default FormStep;
