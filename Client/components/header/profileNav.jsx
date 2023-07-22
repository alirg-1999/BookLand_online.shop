import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiUser, BiShoppingBag } from "react-icons/bi";
import { MdOutlinePassword } from "react-icons/md";

const NavLink = ({ to, content, select, event }) => {
  return (
    <Link
      href={"#" + to}
      className={`text-xl md:text-3xl rounded-md p-1 ${
        select === to ? "bg-light text-gray-600" : "text-white"
      }`}
      onClick={event}
    >
      {content}
    </Link>
  );
};

const ProfileNav = ({ scrollNum }) => {
  const [sectionId, setSectionId] = useState("info");

  useEffect(() => {
    if (scrollNum < 300) {
      setSectionId("info");
    }
    if (scrollNum > 300) {
      setSectionId("orders");
    }
    if (scrollNum > 900) {
      setSectionId("password");
    }
  }, [scrollNum]);

  return (
    <div className="fixed flex md:flex-col z-50 items-center justify-center gap-8 md:rounded-md shadow-xl left-0 w-full md:w-max md:left-4 bottom-0 md:top-1/2 md:-translate-y-1/2 bg-gray-400 px-3 py-2 md:py-4">
      <NavLink
        to="info"
        content={<BiUser />}
        select={sectionId}
        event={() => setSectionId("info")}
      />
      <NavLink
        to="orders"
        content={<BiShoppingBag />}
        select={sectionId}
        event={() => setSectionId("orders")}
      />
      <NavLink
        to="password"
        content={<MdOutlinePassword />}
        select={sectionId}
        event={() => setSectionId("password")}
      />
    </div>
  );
};

export default ProfileNav;
