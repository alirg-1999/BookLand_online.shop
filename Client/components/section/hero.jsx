import React from "react";
import heroImg from "@/public/hero_home.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";

const HeroSection = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row gap-5 items-center md:min-h-[80vh] mb-20 justify-between max-w-[1400px] mx-auto">
      <div className="flex w-full lg:w-1/3 flex-col gap-5 items-center lg:items-start">
        <h1 className="text-3xl lg:text-5xl font-light">
          Let&apos;s Celebrate together
        </h1>
        <h1 className="text-3xl lg:text-5xl font-bold">Happy World Book day</h1>
        <p className="text-[12px] lg:text-[14px] font-light text-center lg:text-start text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          veniam eaque ducimus labore, reiciendis, quas atque quaerat dolorem
          deserunt quos nulla expedita repellendus debitis quisquam ipsam harum
          excepturi. Laborum, mollitia?
        </p>
        <div>
          <Link href="#shop">
            <Button className="bg-yellow-light text-white px-10 py-2">
              Shop New
            </Button>
          </Link>
        </div>
      </div>
      <Image
        src={heroImg}
        alt="hero image"
        className="w-[90%] lg:w-1/2"
        width={500}
        height={500}
      />
    </section>
  );
};

export default HeroSection;
