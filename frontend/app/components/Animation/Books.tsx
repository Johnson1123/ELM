import React from "react";
import { GiNotebook } from "react-icons/gi";
type Props = {};

const BooksICon = (props: Props) => {
  return (
    <div className="py-1 px-3 w-[60px] bg-slate-700 rounded-md flex justify-center items-center absolute left-[2%] md:left-[5%]  top-[50%] md:top-[60%] z-30 md:z-10">
      <GiNotebook className="text-white text-[30px] font-[700]" />
    </div>
  );
};

export default BooksICon;
