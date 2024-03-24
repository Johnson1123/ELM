"use client";
import { navItem } from "@/constant/data";
import { ThemeSwitcher } from "@/utils/ToggleButton";
import { darkBg } from "@/utils/style";
import Link from "next/link";
import React, { FC } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Props {
  setActiveItem: number;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const NavItems: FC<Props> = ({ setActiveItem, isMobile, setIsMobile }) => {
  const year = new Date().getFullYear();

  const user = useSelector((state: any) => state.auth.user);
  const navigate = useRouter();
  return (
    <>
      <div className="hidden md:flex items-center gap-2">
        {navItem &&
          navItem.map((item, index) => {
            return (
              <Link href={item.url} passHref key={index}>
                <span
                  className={`${
                    setActiveItem === index
                      ? "dark:text-slate-300 text-slate-900"
                      : "dark:text-white text-dark"
                  } md:py-2 md:px-1 lg:px-2 p-2 gap-2 font-Poppins font-[300] text-[15px] hover:dark:text-slate-400 hover:text-[#fd661f] duration-300`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        <ThemeSwitcher />
        <Link href={"/profile"}>
          <div className="">
            <Link href={user ? "/dashboard" : "/login"}>
              <div className="h-[30px] w-[30px] rounded-full object-cover border-2 border-slate-500 flex justify-center items-center md:ml-3 lg:ml-5">
                <FaRegUser className="dark:text-white" />
              </div>
            </Link>
          </div>
        </Link>
      </div>
      {isMobile && (
        <div
          className={`absolute w-full h-max left-0 top-[78px] p-5 bg-[var(--bg-primary)] ${darkBg} md:hidden`}
        >
          <div className="">
            {navItem.map((item, index) => {
              return (
                <Link href={item.url} key={index}>
                  <span className="text-[16px] text-center w-full inline-flex border-b border-slate-400 py-3 my-3">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-5 flex items-center gap-3 text-lg">
            <div className="h-[50px] w-[50px] rounded-full object-cover border-2 border-slate-500 flex justify-center items-center md:ml-3 lg:ml-5">
              <FaRegUser
                className="dark:text-white text-[30px]"
                onClick={() => {
                  setIsMobile(false);
                  navigate.push(user ? "/dashboard" : "/login");
                }}
              />
            </div>
            <p className="text-Poppins text-lg">{user && user.name}</p>
          </div>
          <div className="mt-5 mx-auto w-[50%]">
            <p className="text-center">
              <span className="text-lg">
                {year} <span>&#169;</span> all right reserved
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
