import Wrapper from "@/components/wrapper";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CouponValidate, GetBookDetail, SendOrderCart } from "../api/serverApi";
import Header from "@/components/header/header";
import Spinner from "@/components/spinner";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Button, { NavBtnDetail } from "@/components/button";
import Description from "@/components/section/bookdetail/description";
import Author from "@/components/section/bookdetail/author";
import Review from "@/components/section/bookdetail/review";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CouponForm from "@/components/form/coupon";
import GenerateOrderID from "@/components/lib/util";
import { AlertError, AlertSuccess } from "@/components/alert";

const BookFeature = ({ title, content }) => {
  return (
    <div className="flex gap-2">
      <h4 className="text-gray-400 text-lg">{title}</h4>:
      <h3 className="text-gray-800 text-lg">{content}</h3>
    </div>
  );
};

const BookDetail = () => {
  const stars = Array(5).fill(0);
  const router = useRouter();
  const { slug } = router.query;
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.userToken);
  const [data, setData] = useState(null);
  const [select, setSelect] = useState("description");
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    if (slug) GetBookDetail(slug).then((res) => setData(res.data));
  }, [slug]);

  const DetailFeature = () => {
    switch (select) {
      case "description":
        return <Description content={data.description} />;
      case "review":
        return <Review book_id={data.id} />;
      case "author":
        return <Author author={data.book_author} />;
    }
  };

  const couponHandler = (e) => {
    e.preventDefault(e);
    setLoading(true);
    CouponValidate(e.target.coupon.value, token)
      .then((res) => {
        AlertSuccess("This coupon code is true.");
        setCoupon(res.data.id);
      })
      .catch(() => {
        AlertError("This coupon code is Invalid or Duplicate.");
      })
      .finally(() => setLoading(false));
  };

  const sendOrderHandler = () => {
    const orderid = GenerateOrderID();
    const order = {
      order_id: orderid,
      coupon: coupon,
      total_price: data.discount_book ? data.discount_book : data.price,
      product: data.id,
      user_item: user.id,
    };
    SendOrderCart(order, token).then(() =>
      router.push(`/order/${order.order_id}`)
    );
  };

  if (data) {
    return (
      <Wrapper>
        <Header />
        <section className="my-6 max-w-[1000px] mx-auto px-5">
          <h3 className="text-center bg-light text-xl text-gray-800 font-bold py-3 rounded-md shadow">
            {data.book_title}
          </h3>
          <div className="flex flex-col justify-center items-center md:justify-between md:items-start md:flex-row md:gap-10 mt-5">
            <aside className="w-full md:w-1/2">
              <Image
                src={data.book_img}
                alt={data.book_title}
                width={500}
                height={500}
                className="max-w-[360px] mx-auto"
              />
            </aside>
            <aside className="w-full md:w-1/2 my-8 flex flex-col gap-3 items-center md:items-start">
              <div className="text-xl flex items-center">
                Rating(
                {stars.map((_, index) => (
                  <FaStar
                    key={index}
                    color={index < data.average_rating ? "red" : "gray"}
                  />
                ))}
                )
              </div>
              <BookFeature
                title="Author"
                content={data.book_author.author_name}
              />

              <BookFeature
                title="Pages"
                content={data.book_publisher.publisher_name}
              />
              <BookFeature
                title="Translator"
                content={data.tranaslator ? data.tranaslator : "--"}
              />
              <BookFeature title="Language" content={data.language} />
              <BookFeature title="Ages" content={data.audience_age} />
              <BookFeature title="Pages" content={data.pages} />

              <div className="flex flex-col w-full justify-center gap-2 items-center bg-gray-200 p-2 rounded-md">
                {data.discount_book ? null : (
                  <CouponForm event={couponHandler} loading={loading} />
                )}
                <div className="flex gap-2">
                  <Button
                    event={sendOrderHandler}
                    className={` text-white font-light text-lg py-2 px-10 mt-3 ${
                      data.discount_book
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-yellow-light"
                    }`}
                    active={data.discount_book ? true : false}
                  >
                    Buy : {data.price}$
                  </Button>
                  {data.discount_book ? (
                    <Button
                      event={sendOrderHandler}
                      className="bg-yellow-light text-white mt-3 font-light text-lg py-2 px-10"
                    >
                      Buy : {data.price - data.discount_book}$
                    </Button>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/*book description*/}
        <section className="mt-20 min-h-screen flex flex-col">
          <div className="w-full flex gap-4 md:gap-10 justify-center">
            <NavBtnDetail
              event={() => setSelect("description")}
              className={
                select === "description"
                  ? "border-yellow-light text-gray-700"
                  : "border-transparent"
              }
            >
              Description
            </NavBtnDetail>

            <NavBtnDetail
              event={() => setSelect("author")}
              className={
                select === "author"
                  ? "border-yellow-light text-gray-700"
                  : "border-transparent"
              }
            >
              Book Author
            </NavBtnDetail>

            <NavBtnDetail
              event={() => setSelect("review")}
              className={
                select === "review"
                  ? "border-yellow-light text-gray-700"
                  : "border-transparent"
              }
            >
              Review
            </NavBtnDetail>
          </div>
          <div className="bg-light p-6 shadow-inner w-full mt-4 max-w-[1000px] mx-auto rounded-md">
            <DetailFeature />
          </div>
        </section>
      </Wrapper>
    );
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
};
export default BookDetail;
