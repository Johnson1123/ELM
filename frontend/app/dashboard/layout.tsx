"use client";
import { darkBg } from "@/utils/style";
import React from "react";
import Dbheaderlg from "../components/dashboard/Db.header.lg";
import Dbsidebar from "../components/dashboard/Db.sidebar";
import Protected from "@/hooks/useUserProtected";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Protected>
        <div className={`${darkBg}} mt-[80px]`}>
          <div className="flex w-full m-h-full h-auto mx-auto p-5 justify-between">
            <div
              className={`${darkBg} dark:text-white bg-[#c0cec6] md:w-[20%] h-[100%] rounded-md p-5 shadow-sm hover:shadow-md`}
            >
              <Dbsidebar />
            </div>
            <div
              className={`${darkBg} md:w-[78%] dark:text-white bg-[var(--bg-primary)] rounded-md p-2`}
            >
              {/* <div className={`${darkBg}`}>
                <Dbheaderlg />
              </div> */}
              <div className={`${darkBg}`}>{children}</div>
            </div>
          </div>
        </div>
      </Protected>
    </>
  );
}
