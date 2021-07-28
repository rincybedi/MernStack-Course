import React from "react";
export const ProgressBar = () => {
  //   const showProgressBar = () => {
  //     $(".preloader-wrapper").show();
  //   };
  //   const hideProgressBar = () => {
  //     $(".preloader-wrapper").hide();
  //   };
  return (
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  );
};
