"use client";
import UserAnalysis from "@/app/components/analysis/user.analysis";
import { useGetCourseAnalyticsQuery } from "@/redux/features/slice/analytics";
import React from "react";
import { RotatingTriangles } from "react-loader-spinner";

type Props = {};

const page = (props: Props) => {
  const { data, isLoading } = useGetCourseAnalyticsQuery({});
  return (
    <div className="">
      <div className="">
        {isLoading ? <RotatingTriangles /> : <UserAnalysis />}
      </div>
    </div>
  );
};

export default page;
