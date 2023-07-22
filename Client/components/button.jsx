import React from "react";
import Link from "next/link";

const Button = ({ event, children, className, active = false, type }) => {
  return (
    <button
      className={`bg-gray-300 w-max transition-shadow hover:shadow-sm text-gray-700 rounded-md shadow-[0_4px_10px_rgba(0,0,0,.1)] ${className}`}
      onClick={event}
      disabled={active}
      type={type}
    >
      {children}
    </button>
  );
};
export default Button;

// header navigation Button
export const NavBtn = ({ link, content }) => {
  return (
    <Link href={link}>
      <Button className="flex justify-center text-sm md:text-lg items-center gap-1 px-2 md:px-3 h-7 md:h-9 min-w-10 w-max hover:text-red-400 hover:bg-gray-200 transition-colors">
        {content}
      </Button>
    </Link>
  );
};

export const NavBtnDetail = ({ children, event, className }) => {
  return (
    <button
      className={`text-lg border-2 rounded-md  font-bold px-3 ${className}`}
      onClick={event}
    >
      {children}
    </button>
  );
};
