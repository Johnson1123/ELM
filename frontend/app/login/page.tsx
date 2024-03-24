"use client";
import { darkBg, titleText, btn } from "@/utils/style";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GroupInput from "../components/form/GroupInput";
import GroupPassword from "../components/form/Group.Password";
import ErrorForm from "../components/form/Error.form";
import { loginSchemas } from "@/utils/schema";
import Authbtn from "../components/form/Auth.btn";
import { useLoginUserMutation } from "@/redux/features/slice/auth.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import NotForUser from "@/hooks/useDenialUser";

interface IFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [passHidden, setPassHidden] = useState<Boolean>(true);
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ resolver: yupResolver(loginSchemas) });

  const [loginRequest, { error, isLoading, data, isSuccess }] =
    useLoginUserMutation();

  const onSubmit = async (data: IFormData) => {
    await loginRequest(data);
  };
  useEffect(() => {
    if (isSuccess) {
      console.log(data.message);
      const message = data.message || "login Successful";
      toast.success(message);
      navigate.push("/");
    }
    if (error) {
      if ("data" in error) {
        const errData = error as any;
        console.log(errData);
        toast.error(errData?.data.message);
      }
    }
  });

  return (
    <NotForUser>
      <>
        <div
          className={`${darkBg}} bg-[#f3f3f3]  mt-[80px]`}
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="w-[92%] md:w-[40%] flex mx-auto py-5 justify-center items-center h-full ">
            <div className="w-[85%]">
              <h3 className={`${titleText} text-center`}>Login as Customer</h3>
              <form
                action=""
                className="mt-5 flex flex-col justify-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <GroupInput name="email" register={register} label="Email" />
                <ErrorForm err={errors} property="email" />
                <GroupPassword
                  label="Password"
                  name="password"
                  register={register}
                  open={passHidden as boolean}
                  setOpen={setPassHidden}
                />
                <ErrorForm err={errors} property="password" />
                <div className="flex justify-start items-center gap-2 mt-3">
                  <input
                    type="checkbox"
                    className="h-[20px] w-[20px] bg-white"
                  />
                  <label htmlFor="" className="dark:text-white">
                    Remember Me
                  </label>
                </div>
                <button
                  type="submit"
                  className={`${`${btn} mt-7 mb-5 mx-auto w-[150px] font-bold cursor-pointer hover:bg-[var(--color-red)]`}`}
                >
                  {isLoading ? (
                    <ThreeDots height="24" color="#fff" radius="5" />
                  ) : (
                    "Login In"
                  )}
                </button>
              </form>
              <Authbtn />
              <p className="dark:text-white text-center md:text-md md:my-2 md:font-Rubik">
                already have account with us?{" "}
                <span className="text-blue-700 font-[500] ml-1 cursor-pointer">
                  <Link href="/register">Sign Up</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </>
    </NotForUser>
  );
};

export default Login;
