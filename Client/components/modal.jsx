import React from "react";
import Wrapper from "./wrapper";
import Button from "./button";
import { GrFormClose } from "react-icons/gr";
import { FormInput } from "./form/input";
import { useSelector } from "react-redux";
import { AlertError, AlertSuccess } from "./alert";
import { useRouter } from "next/router";
import axios from "axios";

const Modal = ({ event, data }) => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.userToken);
  const reviewHandler = async (e) => {
    e.preventDefault();
    const review = {
      book: data.product.id,
      comment_title: e.target.comment_title.value,
      comment_content: e.target.comment_content.value,
      rating_value: e.target.rate_review.value,
    };

    try {
      return await axios
        .post(`http://localhost:8000/api/review/`, review, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          AlertSuccess("Save your review");
          router.push(`/detail/${data.product.slug}`);
        })
        .catch(() => AlertError("Your review is exist"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper className="min-h-screen z-50 top-0 left-0 right-0 fixed bg-black/60 flex justify-center items-center">
      <form
        onSubmit={reviewHandler}
        className="max-w-[600px] gap-5 p-3 w-full items-center h-max rounded-md py-5 bg-light flex flex-col"
      >
        <div className="flex gap-5 w-full">
          <Button className="text-2xl" event={event}>
            <GrFormClose />
          </Button>
          <h2 className="text-center w-full">{data.product.book_title}</h2>
        </div>

        <div className="flex flex-col w-full">
          <h5 className="px-2 text-gray-600">Book Review Rating</h5>
          <select
            name="rate_review"
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <FormInput
          type={"text"}
          placeholder="Enter Comment Title for this book"
          name="comment_title"
          label="Comment Title"
        />

        <div className="w-full">
          <h5 className="px-2 text-gray-600">Description Comment</h5>
          <textarea
            placeholder="Enter Commnet description"
            rows="4"
            className="w-full shadow rounded-md p-3"
            name="comment_content"
          ></textarea>
        </div>
        <Button className="bg-yellow-light text-lg font-bold px-5 text-white py-2">
          Save Review
        </Button>
      </form>
    </Wrapper>
  );
};

export default Modal;
