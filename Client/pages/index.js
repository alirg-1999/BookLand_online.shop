import Wrapper from "@/components/wrapper";
import Header from "@/components/header/header";
import HeroSection from "@/components/section/hero";
import ShopSection from "@/components/section/bookdetail/shop";
import React from "react";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>BookLand</title>
      </Head>
      <Wrapper>
        <Header />
        <main className="max-w-[1440px] mx-auto px-5">
          <HeroSection />
          <ShopSection />
        </main>
      </Wrapper>
    </>
  );
};
export default Home;
