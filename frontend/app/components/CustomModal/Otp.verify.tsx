import { btnPrimary } from "@/utils/style";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useActivationTokenMutation } from "@/redux/features/slice/auth.api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type IVerify = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

interface IProps {
  setRoutes: () => void;
  setOpen: (open: boolean) => void;
}

const Otpverify: FC<IProps> = ({ setOpen }) => {
  const [errorVerify, setErrorVerify] = useState<Boolean>(false);
  const navigate = useRouter();

  const [verifyCodes, setVerifyCodes] = useState<IVerify>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [activateToken, { error, data, isSuccess }] =
    useActivationTokenMutation();

  const token = useSelector((state: any) => state?.auth?.token);

  const refElement = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInput = (index: number, value: string) => {
    setErrorVerify(false);
    const newVerifyToken = { ...verifyCodes, [index]: value };
    setVerifyCodes(newVerifyToken);
    if (value === "" && index > 0) {
      refElement[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      refElement[index + 1].current?.focus();
    }
  };

  const onSubmit = async () => {
    const count = Object.values(verifyCodes);
    if (count.length != 4) {
      setErrorVerify(true);
      return;
    }
    const code = count.join("");
    const data = {
      activationCode: code,
      activationToken: token,
    };
    await activateToken(data);
  };
  useEffect(() => {
    if (isSuccess) {
      const message = data.message || "Verification Successful";
      toast.success(message);
      navigate.push("/login");
    }
    if (error) {
      if ("data" in error) {
        const errData = error as any;
        console.log(errData);
      }
    }
  });
  return (
    <div className="">
      <div className="flex flex-col items-center gap-3 my-3">
        <h3 className="text-xl font-Poppins mb-5">Verify your Account</h3>
        <MdVerifiedUser className="text-[50px] mb-5" />
      </div>
      <div className="flex gap-3 justify-center">
        {Object.keys(verifyCodes).map((key, i) => {
          return (
            <input
              type="number"
              key={key}
              ref={refElement[i]}
              className={`h-[50px] w-[50px] rounded-lg text-center focus:outline-none text-black dark:bg-white ${
                errorVerify
                  ? "shakeError border border-red-700"
                  : "border border-slate-500"
              }`}
              placeholder=""
              maxLength={1}
              value={verifyCodes[key as keyof IVerify]}
              onChange={(e) => {
                handleInput(i, e.target.value);
              }}
            />
          );
        })}
      </div>
      <div className=" flex justify-center">
        <button
          className={`${btnPrimary} px-5 py-3 mx-auto w-[150px] mt-5`}
          onClick={onSubmit}
        >
          Verify
        </button>
      </div>
      <p className="text-lg mt-3 py-1 text-center">
        Go back to{" "}
        <button
          onClick={() => setOpen(false)}
          className="text-blue-500 font-bold cursor-pointer"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Otpverify;
