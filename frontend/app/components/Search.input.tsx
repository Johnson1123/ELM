import React from "react";
import { LuSearch } from "react-icons/lu";

type Props = {};

const Searchinput = (props: Props) => {
  return (
    <div className="flex w-[70%]">
      <form action="" className="flex gap-3 items-center w-full">
        {true && (
          <input
            type="text"
            className="border border-[bg-[var(--bg-primary)] rounded-md h-[35px] focus:outline-none p-1 w-[70%]"
          />
        )}
        <button>
          <span
            className={`group bg-green-600 flex items-center justify-center hover:text-white hover:bg-white h-[30px] w-[30px] rounded-full border border-green-600`}
          >
            <LuSearch className="text-white group-hover:text-green-600" />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Searchinput;
