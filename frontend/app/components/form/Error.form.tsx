import React, { FC } from "react";

type IProps = {
  err: any;
  property: string;
};

const ErrorForm: FC<IProps> = ({ err, property }) => {
  return (
    <>
      {err[property] && <p className="text-red-500">{err[property].message}</p>}
    </>
  );
};

export default ErrorForm;
