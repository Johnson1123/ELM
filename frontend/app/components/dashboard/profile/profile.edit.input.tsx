import { userTypeProps } from "@/constant/data";
import { EditProfile } from "@/constant/profile.Icon";
import React from "react";
type Props = {
  valueText: string;
  inputText: string;
  toggle?: boolean;
  setToggle: (value: boolean) => void;
  field?: string;
  userProfile: userTypeProps;
  setUserProfile: (props: userTypeProps) => void;
};

const ProfileEditInput = ({
  valueText,
  inputText,
  toggle,
  field,
  userProfile,
  setUserProfile,
  setToggle,
}: Props) => {
  return (
    <div className="flex items-center w-full">
      <input
        className="bg-transparent focus:border-none focus:outline-none w-[60%]"
        type={inputText}
        placeholder={`Enter ${field ? field : ""}`}
        value={valueText}
        readOnly={toggle ? true : false}
      />
      <span
        className="cursor-pointer h-[30px] w-[30px] bg-[#c0cec6] rounded-full flex justify-center items-center"
        onClick={() => setToggle(!toggle)}
      >
        <EditProfile size={18} />
      </span>
    </div>
  );
};

export default ProfileEditInput;
