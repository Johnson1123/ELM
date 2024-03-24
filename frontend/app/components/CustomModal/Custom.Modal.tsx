import React, { FC } from "react";
import { Modal, Box } from "@mui/material";

type IProps = {
  open: boolean;
  setOpen: (props: boolean) => void;
  setRoutes?: (props: string) => void;
  component: any;
};

const CustomModal: FC<IProps> = ({
  open,
  setOpen,
  component: Component,
  setRoutes,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal label title"
        aria-describedby="modal label description"
      >
        <Box className="absolute shadow-xl w-[82%] md:w-[50%] p-5 py-10 rounded-lg top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-slate-900">
          <Component setOpen={setOpen} setRoute={setRoutes}></Component>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
