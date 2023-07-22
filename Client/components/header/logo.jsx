import React from "react";
import { useRouter } from "next/router";

const Logo = ({ scrollNumber }) => {
  const router = useRouter();
  return (
    <h1 className="w-1/3">
      <span className="text-3xl md:text-5xl font-chela drop-shadow-[0_10px_10px_rgba(0,0,0,.3)">
        Book<span className="text-yellow-light font-chela">Land</span>
        {scrollNumber > 400 ? (
          <span className="text-xl md:text-3xl font-chela">
            {router.pathname == "/" ? ".Store" : null}
          </span>
        ) : null}
      </span>
    </h1>
  );
};

export default Logo;
