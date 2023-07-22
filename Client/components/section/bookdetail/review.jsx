import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { GetBookReview } from "@/pages/api/serverApi";
import userIcons from "@/public/user_icons.svg";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const Review = ({ book_id }) => {
  const [reviewData, setReviewData] = useState([]);
  const stars = Array(5).fill(0);

  useEffect(() => {
    let mounted = true;
    GetBookReview(book_id).then((res) => setReviewData(res.data));
    return () => {
      mounted = false;
    };
  }, [setReviewData]);

  return (
    <>
      {reviewData.length !== 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper p-10"
        >
          {reviewData.map((item) => (
            <SwiperSlide key={item.id} className="p-3 rounded-md bg-gray-200">
              <div className="flex gap-2 items-center">
                <Image
                  src={userIcons}
                  alt="user icons"
                  width={50}
                  height={50}
                />

                <div className="text-sm">
                  <h4 className="text-sm font-light">{item.user.email}</h4>
                  <div className="flex">
                    {stars.map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < item.rating_value ? "red" : "gray"}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <h3 className="text-sm text-center">{item.comment_title}</h3>

                <div
                  className="text-sm font-thin p-1"
                  dangerouslySetInnerHTML={{
                    __html: item.comment_content,
                  }}
                ></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h2 className="text-center py-10">
          We can not find review for this book
        </h2>
      )}
    </>
  );
};
export default Review;
