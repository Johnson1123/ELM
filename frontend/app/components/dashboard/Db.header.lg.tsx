import { darkBg, iconBg } from "@/utils/style";
import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { RxTriangleDown } from "react-icons/rx";
import Image from "next/image";
import Companylogo from "../Company.logo";
import Searchinput from "../Search.input";
import Notificationicon from "../Notification.icon";
import Dbheaderprofile from "./Db.header.profile";

type Props = {};

const Dbheaderlg = (props: Props) => {
  return (
    <div
      className={`${darkBg} w-full h-[80px] bg-white rounded-md p-3 flex justify-between items-center`}
    >
      <div className="flex items-center gap-5 w-[70%]">
        <Companylogo />
        <Searchinput />
      </div>
      <div className="flex items-center gap-5">
        <Notificationicon />
        <Dbheaderprofile />
      </div>
    </div>
  );
};

export default Dbheaderlg;
