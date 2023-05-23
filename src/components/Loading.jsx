import React from "react";
import "../styles/components/Loading.css"

const Loading = () => {
  return (
    <>
      <div className="loading">
        <div class="loader"></div>
        <p>Chargment...</p>
      </div>
    </>
  );
};

export default Loading;