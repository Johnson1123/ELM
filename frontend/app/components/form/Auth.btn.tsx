import { iconBg } from "@/utils/style";
import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

type Props = {};

const Authbtn = (props: Props) => {
  return (
    <div className="auth flex gap-3 mt-3 justify-center my-4">
      <span className={`${iconBg}`}>
        <FcGoogle
          className="text-[30px] md:text-[25px] text-blue-700"
          onClick={() => signIn("google")}
        />
      </span>
      <span className={`${iconBg}`}>
        <FaFacebookSquare className="text-[30px] md:text-[25px] text-blue-700" />
      </span>
      <span className={`${iconBg}`}>
        <FaGithub
          className="text-[30px] md:text-[25px]"
          onClick={() => signIn("github")}
        />
      </span>
    </div>
  );
};

export default Authbtn;
