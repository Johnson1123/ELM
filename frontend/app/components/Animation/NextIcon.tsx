import React from "react";
import { TbBrandNextjs } from "react-icons/tb";

type Props = {};

const NextIcon = (props: Props) => {
  return (
    <div className="py-1 px-3 w-[60px] bg-[var(--color-red)] rounded-md flex justify-center items-center absolute right-[3%] md:right-[5%] top-[35%] z-30 md:z-10 ">
      <TbBrandNextjs className="text-white text-[30px] font-[700]" />
    </div>
  );
};

export default NextIcon;
