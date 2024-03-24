import React, { FC } from "react";
import { dashboard } from "../dashboard/Db.Icon";

type Props = {
  name: string;
  label: string;
  register: any;
  isDashboard?: boolean;
};

const GroupInput: FC<Props> = ({ name, register, label, isDashboard }) => {
  return (
    <div className={`flex flex-col gap-2 mt-3`}>
      <label
        htmlFor={name}
        className={`font-[500] text-md dark:text-white
             ${isDashboard ? "text-white" : null} `}
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        {...register(name)}
        className="h-[45px] focus:outline-none px-2 rounded-md bg-white"
      />
    </div>
  );
};
export default GroupInput;
