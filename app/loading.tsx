import React from "react";
import { TailSpin } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="loadingBackdrop">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#475467"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
};

export default loading;
