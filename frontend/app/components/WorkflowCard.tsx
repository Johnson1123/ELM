import React from "react";
import { ReactNode } from "react";
import { FC } from "react";

type Props = {
  Icon: any;
  title: string;
  content: string;
};

const WorkflowCard: FC<Props> = ({ Icon, title, content }) => {
  return (
    <div className="p-4 bg flex flex-col items-center gap-2  md:w-[32%] rounded-md hover:bg-white hover:text-black duration-500">
      <p className="py-5 bg-[#00938d] hover:bg-[var(--color-red)] w-[90px] rounded-md text-[30px] flex justify-center items-center font-[900] shadow-xl mt-5 duration-500">
        {<Icon className="text-white" />}
      </p>
      <p className="text-xl font-[700] mt-5">{title}</p>
      <p className="text-justify ">{content}</p>
    </div>
  );
};

export default WorkflowCard;
