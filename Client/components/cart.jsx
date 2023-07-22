import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { FaStar, FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { DeleteOrderApi } from "@/pages/api/serverApi";
import Button from "./button";
import { useRouter } from "next/router";
import Modal from "@/components/modal";

export const Cart = ({ data }) => {
  const stars = Array(5).fill(0);
  return (
    <div className="w-full relative max-w-[220px] h-[300px] overflow-hidden">
      <Image
        src={data.book_img}
        alt={data.book_title}
        width={500}
        height={500}
        className="w-[220px] h-[300px] object-contain"
      />
      {data.discount_book ? (
        <div className="absolute top-5 -left-7 -rotate-[40deg] bg-red-500 w-[150px] text-white text-center">
          Offer
        </div>
      ) : null}
      <Link
        href={`/detail/${data.slug}`}
        className=" absolute top-0 w-full h-full rounded-xl opacity-0 hover:opacity-100 hover:bg-black/80 flex flex-col gap-3 items-center justify-center p-3"
      >
        <h3 className="text-sm text-white text-center">{data.book_title}</h3>
        <div className="flex">
          {stars.map((_, index) => (
            <FaStar
              key={index}
              color={index < data.average_rating ? "yellow-light" : "gray"}
            />
          ))}
        </div>
      </Link>
    </div>
  );
};
//=================================================
export const OrderCart = ({ book, openModal }) => {
  const [openModel, setOpenModal] = useState(false);

  return (
    <li className="w-full flex gap-2 lg:w-1/2 bg-light shadow p-1 rounded-md hover:bg-gray-300 h-max max-h-[130px] lg:max-h-[150px]">
      <Image
        src={book.product.book_img}
        width={300}
        height={300}
        alt={book.product.book_title}
        className="w-[70px] object-contain"
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-sm font-light">{book.product.book_title}</h3>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-gray-700 text-center">
            <span className="font-light"> price:</span>
            {book.total_price}$
          </h2>

          <h2 className="text-xl font-bold text-gray-700 text-center">
            <span className="font-light"> Id:</span>
            {book.order_id}$
          </h2>
        </div>
        <div className="flex w-full gap-1 justify-between">
          <Link
            href="#"
            className="text-sm bg-gray-600 flex justify-center px-4 gap-2 items-center rounded-sm py-1 text-center text-white font-bold"
          >
            Download PDF
            <FaDownload />
          </Link>
          <Button
            event={() => setOpenModal(true)}
            className="bg-yellow-light px-3 rounded-sm text-white"
          >
            Reveiw this Book
          </Button>
        </div>
      </div>

      {openModel ? (
        <Modal data={book} event={() => setOpenModal(false)} />
      ) : null}
    </li>
  );
};

export const MassageCart = ({ item }) => {
  const token = useSelector((state) => state.auth.userToken);
  const router = useRouter();

  const deleteOrderHandler = () => {
    DeleteOrderApi(item.order_id, token).then((res) => {
      console.log(res);
      router.reload();
    });
  };
  return (
    <li className="h-max w-full flex bg-light shadow rounded-md">
      <Image
        src={item.product.book_img}
        width={150}
        height={150}
        alt={item.product.book_title}
      />
      <div className="flex flex-col gap-3 py-2">
        <h2 className="text-lg font-bold text-yellow-light">
          <span className="font-medium text-gray-700">Order Id : </span>
          {item.order_id}
        </h2>
        <h2 className="text-lg font-bold">{item.product.book_title}</h2>
        <h2 className="text-lg font-bold">
          {" "}
          <span className="font-medium text-gray-700">Price : </span>
          {item.total_price}$
        </h2>
        <div className="flex gap-2">
          <Button className="bg-yellow-light px-12 py-1 text-white">
            <Link href={`/order/${item.order_id}`}>Paiding Order</Link>
          </Button>

          <Button
            className="px-10 py-1 text-gray-800"
            event={deleteOrderHandler}
          >
            Delete Order
          </Button>
        </div>
      </div>
    </li>
  );
};
