"use client";
import { btn, btnPrimary, darkBg, iconBg, titleText } from "@/utils/style";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchemas } from "@/utils/schema";
import GroupInput from "../components/form/GroupInput";
import GroupPassword from "../components/form/Group.Password";
import ErrorForm from "../components/form/Error.form";
import Authbtn from "../components/form/Auth.btn";
import Otpverify from "../components/CustomModal/Otp.verify";
import CustomModal from "../components/CustomModal/Custom.Modal";
import { useRegisterUserMutation } from "@/redux/features/slice/auth.api";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import NotForUser from "@/hooks/useDenialUser";

type IProps = {};
interface IFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [routes, setRoutes] = useState<string>("/");
  const [passHidden, setPassHidden] = useState<Boolean>(true);
  const [conPassHidden, setConPassHidden] = useState<Boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ resolver: yupResolver(registerSchemas) });
  const [registerRequest, { error, data, isSuccess, isLoading }] =
    useRegisterUserMutation();

  const onSubmit = async (data: IFormData) => {
    const { name, email, password } = data;
    const formData = {
      name,
      email,
      password,
    };
    await registerRequest(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Registration Successful");
      setOpenModal(true);
    }
    if (error) {
      if ("data" in error) {
        const errData = error as any;
        toast.error(errData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <NotForUser>
      <>
        <div
          className={`${darkBg}} bg-[#f3f3f3]  mt-[80px]`}
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <div className="w-[92%] md:w-[40%] flex mx-auto py-5 justify-center items-center h-full">
            <div className="w-[85%]">
              <h3 className={`${titleText} text-center`}>
                Register as Customer
              </h3>
              <form
                action=""
                className="mt-5 flex flex-col justify-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <GroupInput name="name" register={register} label="Name" />
                <ErrorForm err={errors} property="name" />
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
                <GroupPassword
                  name="confirmPassword"
                  label="Confirm Password"
                  register={register}
                  open={conPassHidden as boolean}
                  setOpen={setConPassHidden}
                />
                <ErrorForm err={errors} property="confirmPassword" />

                <button
                  type="submit"
                  className={`${btn} mt-7 mb-5 mx-auto w-[150px] font-bold cursor-pointer hover:bg-[var(--color-red)]`}
                >
                  {isLoading ? (
                    <ThreeDots height="24" color="#fff" radius="5" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
              <Authbtn />
              <p className="dark:text-white text-center md:text-md md:my-2 md:font-Rubik">
                already have account with us?{" "}
                <span className="text-blue-700 font-[500] ml-1 cursor-pointer">
                  <Link href="/login">Sign In</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        {openModal && (
          <CustomModal
            open={openModal as boolean}
            setOpen={setOpenModal}
            component={Otpverify}
            setRoutes={setRoutes}
          />
        )}
      </>
    </NotForUser>
  );
};

export default Register;
