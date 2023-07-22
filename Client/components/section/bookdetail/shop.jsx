/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import Use_Scroll_Num from "@/hook/use-scroll";
import SearchBox from "../../form/search";
import { useDispatch, useSelector } from "react-redux";
import { All_Products } from "@/redux/ProductSlice";
import { Cart } from "../../cart";

const ShopSection = () => {
  const scrollNumber = Use_Scroll_Num();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(All_Products());
  }, [dispatch]);

  return (
    <section
      id="shop"
      className={`min-h-screen transition-all duration-300 ${
        scrollNumber > 290 ? "opacity-100" : "opacity-0"
      }`}
    >
      <SearchBox />

      {/* product  */}

      <ul className="my-10 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((item) => (
          <li key={item.id} className="flex justify-center items-center">
            <Cart data={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ShopSection;
