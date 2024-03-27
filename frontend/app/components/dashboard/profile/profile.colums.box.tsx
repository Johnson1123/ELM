import React from "react";

type Props = {
  children: React.ReactNode;
};

const ProfileColumnsBox = ({ children }: Props) => {
  return (
    <div className="py-5 mt-5 px-3 border-b border-[#d0d8d4] flex flex-col md:flex-row justify-center md:justify-start md:items-center">
      {children}
    </div>
  );
};

export default ProfileColumnsBox;
