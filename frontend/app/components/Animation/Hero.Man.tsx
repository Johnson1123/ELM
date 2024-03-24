import Image from "next/image";
import React from "react";

type Props = {
  url: string;
};

const HeroMan = ({ url }: Props) => {
  return (
    <div className="absolute top-0 left-0 z-20 flex justify-center w-full h-full overflow-hidden pt-5">
      <Image
        src={url}
        alt="hero image"
        width={500}
        height={500}
        className="overflow-hidden md:ml-10 object-contain absolute z-10"
      />
      <div className="h-[300px] w-[300px] absolute z-9 bg-[red] rounded-full animate-ping top-[50%] -translate-y-[50%]"></div>
    </div>
  );
};

export default HeroMan;
