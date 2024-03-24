import { workFlow } from "@/utils/data";
import { darkBg } from "@/utils/style";
import React from "react";
import WorkflowCard from "./WorkflowCard";
import { CiSearch } from "react-icons/ci";
import { TbBrandBooking } from "react-icons/tb";
import { RiMedalLine } from "react-icons/ri";

type Props = {};

const WorkFlow = (props: Props) => {
  const icons = [CiSearch, TbBrandBooking, RiMedalLine];
  return (
    <div className={`w-full bg-[#f3f3f3] ${darkBg}`}>
      <div className="w-[92%] md:w-[75%] flex flex-col items-center md:justify-center mx-auto py-10">
        <h3 className="font-bold text-2xl font-Poppins">Our Work Flow</h3>
        <div className="flex flex-col md:flex-row justify-between mt-7 gap-8 md:gap-0">
          {workFlow &&
            workFlow.map((item, index) => {
              return (
                <WorkflowCard
                  title={item.title}
                  Icon={icons[index]}
                  content={item.content}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default WorkFlow;
