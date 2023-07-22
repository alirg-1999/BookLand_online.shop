/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaUser, FaBell } from "react-icons/fa";
import { GetOrderPendingCart, GetUserApi } from "@/pages/api/serverApi";
import Cookies from "js-cookie";
import { userInfo } from "@/redux/Authslice";
import { NavBtn } from "../button";
import Use_Scroll_Num from "@/hook/use-scroll";
import { PendingCartApi } from "@/redux/OrderSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.userToken);
  const order = useSelector((state) => state.order.pendingCart);
  const scrollNumber = Use_Scroll_Num();

  useEffect(() => {
    let mounted = true;
    const phone = Cookies.get("user");
    if (phone)
      GetUserApi(phone, token)
        .then((res) => {
          if (mounted) dispatch(userInfo(res.data));
        })
        .catch((error) => console.log(error));
    return () => {
      mounted = false;
    };
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      dispatch(PendingCartApi(user.id, token));
    }
  }, [dispatch, user]);

  return (
    <header
      className={`h-[70px] md:h-[100px] px-3 md:px-10 mx-auto flex justify-between items-center ${
        scrollNumber > 400 ? "sticky top-0 shadow-lg bg-white z-50" : ""
      }`}
    >
      <Link href="/">
        <Logo scrollNumber={scrollNumber} />
      </Link>

      <nav className="flex gap-2 items-center">
        <NavBtn
          link="/massage"
          content={<FaBell color={order.length > 0 ? "yellow" : null} />}
        />
        {user ? (
          <NavBtn
            link={`/profile/${user.id}`}
            content={
              <div className="flex items-center justify-center gap-1">
                <FaUser />
                <span className="text-[9px] md:text-sm font-ligth truncate max-w-[100px]">
                  {user.email}
                </span>
              </div>
            }
          />
        ) : (
          <NavBtn
            link="/login"
            content={
              <div className="flex items-center justify-center gap-1">
                <FaUser />
              </div>
            }
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
