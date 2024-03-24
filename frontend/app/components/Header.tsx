"use client";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import NavItems from "./NavItems";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { darkBg } from "@/utils/style";
import { ThemeSwitcher } from "@/utils/ToggleButton";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/slice/auth.api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
}

const Header: FC<IProps> = ({ activeItem }) => {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data } = useSession();
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useRouter();

  const [socialResRequest, { data: myData, isSuccess, error }] =
    useSocialAuthMutation();

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  useEffect(() => {
    if (user) {
      if (data) {
        const parameter = {
          email: data.user?.email,
          name: data.user?.name,
          avatar: data.user?.image,
        };
        socialResRequest(parameter);
      }
    }
    if (isSuccess) {
      const message = myData.message || "Authentication successful";
      toast.success(message);
      navigate.push("/");
    }
    if (error) {
      if ("data" in error) {
        console.log(error);
      }
    }
  }, [data]);
  return (
    <div className="w-full relative">
      <div
        className={`${
          true
            ? `${darkBg} h-[80px] bg-[#eaf1ed] fixed top-0 left-0 z-[80] border-b dark:border-white shadow-xl duration-300 transition`
            : "w-full dark:shadow-lg dark:border-b border-[#fff] z-[80] dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-[#eaf1ed] shadow-lg"
        }`}
      >
        <div className="w-[95%] md:w-[75%] h-full flex justify-between items-center bg-transparent mx-auto">
          <Link href="/" passHref>
            <h3 className="text-xl font-[500] font-rubik text-black dark:text-white cursor-pointer">
              GalaxyTech
            </h3>
          </Link>
          <div className="flex items-center">
            <NavItems
              setActiveItem={activeItem}
              setIsMobile={setIsMobile}
              isMobile={isMobile}
            />
          </div>

          <div className="md:hidden flex gap-3">
            <ThemeSwitcher />
            {!isMobile ? (
              <FaBars
                onClick={() => setIsMobile(!isMobile)}
                className="dark:text-white"
              />
            ) : (
              <IoMdClose
                onClick={() => setIsMobile(!isMobile)}
                className="dark:text-white"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
