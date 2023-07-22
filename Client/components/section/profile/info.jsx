import React, { useState } from "react";
import { AlertError, AlertSuccess } from "@/components/alert";
import { FormInput } from "@/components/form/input";
import Wrapper from "@/components/wrapper";
import { ChangeUserInfo } from "@/pages/api/serverApi";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";

const UserInfo = ({ user, token }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    password: user.password,
  });

  const changeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const ChangeProfile = (e) => {
    setLoading(true);
    e.preventDefault();
    ChangeUserInfo(user.phone_number, userData, token)
      .then(() => {
        AlertSuccess("Change user information success");
        router.reload();
      })
      .catch(() => AlertError("Change user info unsuccess.please try later."))
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper className="w-full rounded-md ">
      <h1
        id="info"
        className="text-center font-bold text-2xl bg-gray-200 text-gray-700 py-4 mb-10"
      >
        User Information
      </h1>
      <form
        onSubmit={ChangeProfile}
        className="w-full md:w-2/3 mx-auto bg-light px-5 shadow-inner rounded-md py-5 flex flex-col gap-5"
      >
        <FormInput
          type={"email"}
          name="email"
          label={"Email"}
          placeholder={user.email}
          event={changeInput}
        />
        <FormInput
          type={"text"}
          name="first_name"
          label={"First Name"}
          placeholder={
            user.first_name ? user.first_name : "Enter your First Name"
          }
          event={changeInput}
        />

        <FormInput
          type={"text"}
          name="last_name"
          label={"Last Name"}
          placeholder={user.last_name ? user.last_name : "Enter your Last Name"}
          event={changeInput}
        />

        <FormInput
          type={"text"}
          name="phone_number"
          label={"Phone Number"}
          placeholder={user.phone_number}
          event={changeInput}
        />
        <button
          type="submit"
          className="bg-yellow-light text-light py-1 rounded-md shadow-xl text-lg"
        >
          {loading ? <Spinner /> : "Save"}
        </button>
      </form>
    </Wrapper>
  );
};

export default UserInfo;
