import React from "react";

type Props = {
  text: string;
  para?: string;
};

const ProfileColumnsTitle = ({ text, para }: Props) => {
  return (
    <div className="w-[45%]">
      <p className="text-lg font-semibold">{text}</p>
      {para && <p className="mt-[1px]">{para}</p>}
    </div>
  );
};

export default ProfileColumnsTitle;
