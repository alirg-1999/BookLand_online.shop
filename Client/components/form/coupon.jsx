import React from "react";
import { FormInput } from "./input";
import Button from "../button";
import Spinner from "../spinner";

const CouponForm = ({ event, loading }) => {
  return (
    <form onSubmit={event} className="w-full flex gap-1">
      <FormInput type="text" name="coupon" placeholder="Enter Coupon Code" />
      <Button
        type="submit"
        className="right-0 p-2 bg-gray-800 font-bold text-white"
      >
        {loading ? <Spinner /> : "Check"}
      </Button>
    </form>
  );
};

export default CouponForm;
