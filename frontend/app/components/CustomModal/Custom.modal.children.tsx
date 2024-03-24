import { Box, Modal } from "@mui/material";
import React, { FC } from "react";

type Props = {
  openModal: boolean;
  setOpenModal: (props: boolean) => void;
  children: React.ReactNode;
  width?: string;
};

const CustomModal: FC<Props> = ({
  children,
  openModal,
  width,
  setOpenModal,
}) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal label title"
        aria-describedby="modal label description"
      >
        <div
          className={`${
            width ? `w-[${width}]` : "w-[80%]"
          } absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50 dark:bg-slate-900`}
        >
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
