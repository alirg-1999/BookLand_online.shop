import React from "react";
import Wrapper from "../../wrapper";

const Description = ({ content }) => {
  return (
    <Wrapper>
      <div
        className="text-md font-light p-5"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
    </Wrapper>
  );
};

export default Description;
