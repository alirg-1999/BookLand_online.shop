import React, { useEffect, useState } from "react";
import Wrapper from "@/components/wrapper";
import { GetOrderUserCart } from "@/pages/api/serverApi";
import Link from "next/link";
import Button from "@/components/button";
import { OrderCart } from "@/components/cart";

const UserOrders = ({ scroll, user_id, token }) => {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    let mounted = true;
    GetOrderUserCart(user_id, token).then((res) => setOrder(res.data));
    return () => {
      mounted = false;
    };
  }, [setOrder]);

  if (order) {
    return (
      <Wrapper className="w-full py-33">
        <div id="orders" className={scroll > 280 ? "opacity-100" : "opacity-0"}>
          <h1
            id="info"
            className="text-center w-full font-bold text-2xl bg-gray-200 text-gray-700 py-4"
          >
            User Order
          </h1>
          <ul className="flex flex-col h-[100vh] overflow-y-scroll lg:flex-row gap-3 my-5 w-full">
            {order.map((item) => (
              <OrderCart
                book={item}
                key={item.id}
                openModal={() => setOpenModal(true)}
              />
            ))}
          </ul>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <div>
        <h3>You not have order yet.</h3>
        <Link href="/#shop">
          <Button className="text-white text-lg font-bold px-4 py-1 bg-yellow-light">
            Shop new
          </Button>
        </Link>
      </div>
    );
  }
};

export default UserOrders;
