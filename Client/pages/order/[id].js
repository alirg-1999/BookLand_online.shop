import React, { useEffect, useState } from "react";
import Wrapper from "@/components/wrapper";
import Header from "@/components/header/header";
import { useSelector } from "react-redux";
import Button from "@/components/button";
import Link from "next/link";
import { GetBookDetail, OrderCart, PaymentSendApi } from "../api/serverApi";
import { useRouter } from "next/router";
import Image from "next/image";
import Spinner from "@/components/spinner";
import { AlertError, AlertSuccess } from "@/components/alert";

const Order = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [book, setBook] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.userToken);
  useEffect(() => {
    if (id) {
      OrderCart(id, token).then((res) => {
        setData(res.data);
        GetBookDetail(res.data.product.slug).then((res) => setBook(res.data));
      });
    }
  }, [id]);

  const PaymentHandler = () => {
    PaymentSendApi(data.order_id, { status: "PAID" }, token)
      .then(() => {
        router.push(`/profile/${user.id}`);
        AlertSuccess("Payment Success");
      })
      .catch(() => AlertError("Something to wrong , please try later."));
  };

  return (
    <Wrapper>
      <Header />
      {user ? (
        <section className="w-max max-w-[700px] mx-auto flex flex-col justify-center items-center mt-16 h-max bg-gray-200 rounded-md py-10 px-6 shadow-lg">
          {book ? (
            <div className="flex flex-col items-center gap-3">
              {book.book_img ? (
                <Image
                  src={book.book_img}
                  alt="book detail image"
                  width={500}
                  height={500}
                  priority="true"
                  className="w-[200px] h-max"
                />
              ) : null}

              <h3 className="text-md md:text-2xl text-center font-bold">
                {book.book_title}
              </h3>
              <div className="my-2 text-center">
                <h3>{user.email}</h3>
                <h3>{user.phone_number}</h3>
              </div>
              <Button
                className="text-2xl bg-yellow-light py-3 px-4 text-white font-bold"
                event={PaymentHandler}
              >
                Internet Payment {data.total_price}$
              </Button>
            </div>
          ) : (
            <Spinner />
          )}
        </section>
      ) : (
        <div>
          <h2>Please Login</h2>
          <Link href="/login">
            <Button className={"text-2xl"}>Login</Button>
          </Link>
        </div>
      )}
    </Wrapper>
  );
};
export default Order;
