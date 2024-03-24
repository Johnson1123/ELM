import React, { FC } from "react";
import DbNavItem from "./Db.NavItem";
import { DBNAVITEM } from "@/constant";

const DbNavBox: FC<DBNAVITEM> = ({ path, name, Icon }) => {
  return (
    <div className="px-5 hover:px-0 duration-[.3s]">
      <DbNavItem path={path} name={name} Icon={Icon} />
    </div>
  );
};

export default DbNavBox;
