import React from "react";
import Image from "next/image";
import Wrapper from "../../wrapper";
import userIcons from "@/public/user_icons.svg";
import Description from "./description";

const Author = ({ author }) => {
  return (
    <Wrapper className="p-3 flex flex-col md:flex-row">
      <aside className="w-full md:w-1/3 flex flex-col items-center gap-3">
        <Image
          src={author.author_img ? author.author_img : userIcons}
          width={300}
          height={300}
          alt={author.author_name}
          className="rounded-xl w-[200px] h-[200px] object-cover"
          priority={true}
        />
        <h2 className="text-center font-bold text-xl">{author.author_name}</h2>
      </aside>

      <aside className="w-full md:w-2/3">
        {author.author_discription ? (
          <Description content={author.author_discription} />
        ) : (
          <h2 className="text-center">Not found description for this Author</h2>
        )}
      </aside>
    </Wrapper>
  );
};

export default Author;
