import React, { useState } from "react";
import Wrapper from "@/components/wrapper";
import { FormInput } from "@/components/form/input";
import { toast } from "react-toastify";
import { RegisterApi } from "@/pages/api/serverApi";
import Spinner from "@/components/spinner";
import Link from "next/link";
import Button from "@/components/button";
import { useRouter } from "next/router";
import { AlertError, AlertSuccess } from "@/components/alert";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [repassword, setRepassword] = useState("");

  const RegisterFormHandler = (e) => {
    e.preventDefault();
    const userData = {
      phone_number: e.target.phone_number.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (repassword === userData.password) {
      setLoading(true);
      RegisterApi(userData)
        .then(() => {
          AlertSuccess("Create account is success.please login.");
          router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          AlertError("Your phone number or your email is exist already!!!");
        })
        .finally(() => setLoading(false));
    } else {
      AlertError("Your Password and Re-password not match!!!");
    }
  };

  return (
    <Wrapper className="flex min-h-screen px-2 h-full w-full items-center flex-col justify-center">
      <Link href="/">
        <h1 className="text-6xl font-chela">
          Book <span className="text-yellow-light font-chela">Land</span>
        </h1>
      </Link>
      <form
        onSubmit={RegisterFormHandler}
        className="min-h-[300px] border-2 rounded-lg p-5 flex items-center flex-col gap-5 h-full max-w-[500px] w-full shadow-inner bg-light"
      >
        <div className="flex mb-3 text-gray-700 text-lg font-bold gap-1">
          <h1>Register /</h1>
          <Link href="/login" className="text-yellow-light">
            Login
          </Link>
        </div>
        <FormInput
          type="text"
          label="Phone Number"
          placeholder="Enter your Phone Number"
          name="phone_number"
        />

        <FormInput
          type="email"
          label="Email"
          placeholder="Enter your Email"
          name="email"
        />
        <FormInput
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
        />

        <FormInput
          type="password"
          label="Re-Password"
          name="re_password"
          placeholder="Replay your password"
          event={(e) => setRepassword(e.target.value)}
        />
        <Button
          type="submit"
          className="text-sm rounded-lg py-2 px-3 bg-red-dark text-white"
        >
          {loading ? <Spinner /> : "Register"}
        </Button>
      </form>
    </Wrapper>
  );
};

export default Register;
