import { DBNAVITEM } from "@/constant";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

const DbNavItem: FC<DBNAVITEM> = ({ path, name, Icon }) => {
  const router = useRouter();
  return (
    <button
      className="group flex gap-2 items-center py-[5px] pl-2 pr-4 hover:border-l-4 border-green-600 hover:bg-green-100 duration-[.3s]"
      onClick={() => router.push(`/dashboard/${path}`)}
    >
      <span>
        <Icon className="group-hover:text-[var(--color-red)] text-[22px]" />
      </span>
      <span className="group-hover:text-[var(--color-red)] text-[18px]">
        {name}
      </span>
    </button>
  );
};

export default DbNavItem;
