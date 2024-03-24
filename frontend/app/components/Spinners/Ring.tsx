import React from "react";

import { Rings } from "react-loader-spinner";

type Props = {};

const Ring = (props: Props) => {
  return (
    <div>
      <Rings
        height="10"
        width="10"
        color="#f3f3f3"
        radius="2"
        wrapperStyle={{
          height: "10px",
          color: "#f3f3f3",
          with: "10px",
          padding: "0px",
        }}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};
