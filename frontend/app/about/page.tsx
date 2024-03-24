import { apiDomain } from "@/helps";
import React from "react";

type Props = {};

const page = (props: Props) => {
  console.log(apiDomain());
  return <div>about</div>;
};

export default page;
