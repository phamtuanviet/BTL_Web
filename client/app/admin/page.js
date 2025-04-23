"use client";
import React from "react";
import Sidebar from "../_components/Sidebar";
import HearderAdmin from "../_components/HearderAdmin";

const page = () => {
  return (
    <div className="h-screen w-full flex">
      <Sidebar type="big" />
      <div className="flex-1">
        <HearderAdmin />
        <div></div>
      </div>
    </div>
  );
};

export default page;
