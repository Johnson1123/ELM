"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useGetAllUsersQuery } from "@/redux/features/slice/user.api";
import Heading from "@/utils/Heading";
import DisplayUserAdmin from "@/app/components/Role.User.Admin";
import { Rings } from "react-loader-spinner";
import { btnPrimary } from "@/utils/style";

type Props = {};
const AdminUser = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error } = useGetAllUsersQuery({});

  return (
    <>
      {!data ? (
        <Rings />
      ) : (
        <>
          <Heading
            title="P&JTech solution users"
            description="P&JTech solution users are fortunate people learning programming online"
            keywords="P&JTech solution users"
          />
          <div className={` w-full mt-[20px]`}>
            <div className="w-full flex justify-end">
              <div
                className={`${btnPrimary} w-[150px] dark:bg-transparent dark:text-white dark:border dark:bottom-1 dark:border-white`}
              >
                Add Admin
              </div>
            </div>
            <DisplayUserAdmin theme={theme} data={data} isTeam={true} />
          </div>
        </>
      )}
    </>
  );
};

export default AdminUser;
