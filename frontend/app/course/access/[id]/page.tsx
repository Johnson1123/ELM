"use client";
import AccessCourse from "@/app/components/course/AccessCourse";
import { useLoadUserQuery } from "@/redux/features/api/api.slice";
import Loading from "@/utils/Loading/Loading";
import { darkBg } from "@/utils/style";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  params: any;
};

const Page: React.FC<Props> = ({ params }) => {
  const navigate = useRouter();
  const { id } = params;

  const { data: userData, isLoading } = useLoadUserQuery(undefined);

  const isAccess =
    userData && userData?.data.courses.find((item: any) => item == id);

  useEffect(() => {
    if (isAccess) {
      navigate.push("/");
    }
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className={`w-full mt-[80px] ${darkBg} relative pb-10`}>
            {<AccessCourse id={id} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
