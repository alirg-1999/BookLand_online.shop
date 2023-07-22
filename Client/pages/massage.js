import React from "react";
import Wrapper from "@/components/wrapper";
import { useSelector } from "react-redux";
import Header from "@/components/header/header";
import Spinner from "@/components/spinner";
import { MassageCart } from "@/components/cart";

const Massages = () => {
  const loading = useSelector((state) => state.order.loading);
  const pendingOrder = useSelector((state) => state.order.pendingCart);

  if (pendingOrder.length > 0) {
    return (
      <Wrapper>
        <Header />
        {loading ? (
          <Spinner />
        ) : (
          <ul className="flex flex-col gap-3 mb-20 max-w-[800px] mx-auto">
            <h3 className="text-3xl pb-20 pt-2 font-bold text-center">
              Pending or Cancel Order
            </h3>
            {pendingOrder.map((item) => (
              <MassageCart item={item} key={item.id} />
            ))}
          </ul>
        )}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Header />
        <h3 className="text-center mt-10 font-bold text-xl">
          You not have Pending order
        </h3>
      </Wrapper>
    );
  }
};

export default Massages;
