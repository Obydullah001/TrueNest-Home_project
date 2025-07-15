import React from "react";
// import { Sparkles } from "lucide-react";

const MagicLoaderSpinner = () => {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
    //   <div className="relative flex flex-col items-center gap-4">
    //     <div className="relative animate-pulse">
    //       <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-spin-slow shadow-lg blur-sm opacity-70" />
    //       <Sparkles
    //         className="absolute top-1/2 left-1/2 text-white animate-ping w-12 h-12 -translate-x-1/2 -translate-y-1/2"
    //         strokeWidth={1.5}
    //       />
    //     </div>
    //     <h2 className="text-white text-xl font-semibold tracking-wide animate-pulse">
    //       Loading Magic...
    //     </h2>
    //   </div>
    // </div>
    /* Tailwind CSS + inline styles for custom parts */

<div className="my-46">
  <div className="relative flex justify-center items-center mx-auto h-[70px] w-[70px]">
  <div
    className="block h-[35px] w-[35px] origin-center animate-[spin_1.2s_linear_infinite]"
    style={{ position: "relative" }}
  >
    {[...Array(7)].map((_, i) => {
      const positions = [
        { left: "0", top: "0" },
        { left: "-12.6px", top: "7px" },
        { left: "-12.6px", top: "-7px" },
        { left: "0", top: "-12.6px" },
        { left: "12.6px", top: "-7px" },
        { left: "12.6px", top: "7px" },
        { left: "0", top: "12.6px" },
      ];
      const pos = positions[i];
      return (
        <span
          key={i}
          className="block rounded-full border-2 border-pink-600 h-full w-full absolute"
          style={{ left: pos.left, top: pos.top }}
        />
      );
    })}
  </div>
</div>
</div>

  );
};

export default MagicLoaderSpinner;
