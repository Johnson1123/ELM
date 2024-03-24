import React from "react";
import { IoMdNotifications } from "react-icons/io";

type Props = {};

const Notificationicon = (props: Props) => {
  return (
    <div className="relative cursor-pointer">
      <span className="h-[7px] w-[7px] bg-[var(--color-red)] flex rounded-full absolute right-0 top-0 text-white justify-center items-center text-[10px]"></span>
      <IoMdNotifications className="text-green-600" size="25" />
    </div>
  );
};

export default Notificationicon;
