import Image from "next/image";
import React, { useState } from "react";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import DbsideProfilemodal from "./Db.sideProfile.modal";
import CustomModal from "../CustomModal/Custom.modal.children";

type Props = {};

const Dbheaderprofile = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  return (
    <div className="flex relative items-center gap-4">
      <div
        className=""
        onClick={() => {
          setImageModal(!imageModal);
        }}
      >
        <Image
          src={require("../../../asset/images/face_two.avif")}
          alt="Johnson"
          className="h-[40px] w-[40px] rounded-full object-cover cursor-pointer"
        ></Image>
      </div>
      <div className="w-[150px] flex gap-1 items-center">
        <p className="truncate text-lg">Johnson Onifade damilola</p>
        {open ? (
          <button onClick={() => setOpen(false)}>
            <RxTriangleUp className="cursor-pointer" size="25" />
          </button>
        ) : (
          <button onClick={() => setOpen(true)}>
            <RxTriangleDown className="cursor-pointer" size="25" />
          </button>
        )}
      </div>
      {open && <DbsideProfilemodal />}
      {imageModal && (
        <CustomModal
          openModal={imageModal}
          setOpenModal={setImageModal}
          width="40%"
        >
          <div className="flex justify-center w-full">
            <Image
              src={require("../../../asset/images/face_two.avif")}
              alt="Johnson"
              className="md:h-[500px] md:w-[500px] rounded-full object-cover cursor-pointer"
            ></Image>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Dbheaderprofile;
