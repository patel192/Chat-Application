import React from "react";
import { UserNavbar } from "./UserNavbar";
import { UserSidebar } from "./UserSidebar";
export const UserDashBoard = () => {
  return (
    <>
      <div className="flex">
        <UserSidebar />
        <div className="flex-1">
          <UserNavbar />
          <main className="p-6"></main>
        </div>
      </div>
    </>
  );
};
