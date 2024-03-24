import React, { FC, useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { FiEye } from "react-icons/fi";

type Props = {
  name: string;
  register: any;
  label: string;
  open: boolean;
  setOpen: (props: boolean) => void;
};

const GroupPassword: FC<Props> = ({ name, register, open, setOpen, label }) => {
  return (
    <div className={`flex flex-col gap-2 mt-3`}>
      <label
        htmlFor={name}
        className="font-[500] text-md dark:text-white
              "
      >
        {label}
      </label>
      <div className="relative h-[45px]">
        <input
          type={open ? "password" : "text"}
          id={name}
          {...register(name)}
          className="h-[45px] focus:outline-none px-2 rounded-md bg-white absolute top-0 left-0 w-full "
        />
        {open ? (
          <span
            className="absolute right-2 top-[50%] -translate-y-[50%]"
            onClick={() => setOpen(!open)}
          >
            <GoEyeClosed />
          </span>
        ) : (
          <span
            className="absolute right-2 top-[50%] -translate-y-[50%]"
            onClick={() => setOpen(!open)}
          >
            <FiEye />
          </span>
        )}
      </div>
    </div>
  );
};
export default GroupPassword;
