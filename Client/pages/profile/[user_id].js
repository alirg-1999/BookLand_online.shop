import React, { useEffect } from "react";
import Header from "@/components/header/header";
import ProfileNav from "@/components/header/profileNav";
import UserInfo from "@/components/section/profile/info";
import UserOrders from "@/components/section/profile/userorder";
import Spinner from "@/components/spinner";
import Wrapper from "@/components/wrapper";
import Use_Scroll_Num from "@/hook/use-scroll";
import { useSelector } from "react-redux";
import Password from "@/components/section/profile/password";
import { useRouter } from "next/router";

const UserProfile = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.userToken);
  const scroll = Use_Scroll_Num();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  });

  return (
    <Wrapper>
      <Header />
      <main className="px-2 flex flex-col items-center gap-2 max-w-[900px] mx-auto relative">
        <ProfileNav scrollNum={scroll} />
        {user ? <UserInfo user={user} token={token} /> : <Spinner />}
        {user ? (
          <UserOrders scroll={scroll} user_id={user.id} token={token} />
        ) : (
          <Spinner />
        )}
        <Password scroll={scroll} user={user} token={token} />
      </main>
    </Wrapper>
  );
};

export default UserProfile;
