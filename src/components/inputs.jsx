import React from "react";

export function Inputs() {
  return (
    <div className=" bg-zinc-800 text-black grid grid-rows-2 justify-center ">
      <div className="py-3">
        {" "}
        <input className="username " type="text" />
      </div>
      <div>
        <input className="password " type="password" />
      </div>
    </div>
  );
}
