import Image from "next/image";
import React from "react";

type Props = {};

function DbsideProfilemodal() {
  return (
    <div className="w-[350px] h-[70vh] bg-[var(--bg-primary)] absolute z-50 top-[60px] right-0  shadow-lg">
      <div className="w-full h-full p-5 flex flex-col items-center">
        <div className="flex justify-center flex-col items-center p-5">
          <Image
            src={require("../../../asset/images/face_two.avif")}
            alt="Johnson"
            className="h-[70px] w-[70px] rounded-full object-cover cursor-pointer border-5 border-white"
          ></Image>
          <p className="font-Poppins mt-1 text-md">Delight Academia</p>
        </div>
      </div>
    </div>
  );
}

export default DbsideProfilemodal;
