import React, { useState } from "react";
import Wrapper from "../../wrapper.jsx";
import { FormInput } from "@/components/form/input.jsx";
import Button from "@/components/button.jsx";
import Link from "next/link.js";
import { AlertError } from "@/components/alert.jsx";
import { ChangePasswordApi } from "@/pages/api/serverApi.js";

const Password = ({ scroll, user, token }) => {
  const [repass, setRepass] = useState("");
  const changePasswordHandler = (e) => {
    console.log(token);
    e.preventDefault();
    const password = {
      old_password: e.target.oldpassword.value,
      new_password: e.target.newpassword.value,
    };

    if (repass === password.new_password) {
      ChangePasswordApi(password, user.phone_number, token)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    } else {
      AlertError("New password and repeat Password is not match!");
    }
  };
  return (
    <Wrapper className="w-full h-max mb-10">
      <div
        id="password"
        className={scroll > 900 ? "opacity-100 w-full" : "opacity-0"}
      >
        <h1
          id="info"
          className="text-center w-full font-bold text-2xl bg-gray-200 text-gray-700 py-4"
        >
          Password
        </h1>
        <form
          onSubmit={changePasswordHandler}
          className="flex flex-col gap-8 my-10 px-10 justify-center items-center"
        >
          <FormInput
            type="password"
            placeholder="Enter old password"
            label="Old Password"
            name="oldpassword"
          />

          <FormInput
            type="password"
            placeholder="Enter new password"
            label="New Password"
            name="newpassword"
          />

          <FormInput
            type="password"
            placeholder="Repeat new password"
            label="Repeat New Password"
            name="repassword"
            event={(e) => setRepass(e.target.value)}
          />

          <Link
            href="#"
            className="w-full text-gray-400 hover:text-gray-600 px-4"
          >
            Forget password?
          </Link>

          <Button
            type="submit"
            className="w-full bg-yellow-light py-2 px-10 text-white"
          >
            Change Password
          </Button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Password;
