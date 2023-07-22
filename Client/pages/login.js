import React, { useEffect } from "react";
import Wrapper from "@/components/wrapper";
import Link from "next/link";
import { FormInput } from "@/components/form/input";
import { loginData } from "@/redux/Authslice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/spinner";
import Logo from "@/components/header/logo";
import Button from "@/components/button";
import { useRouter } from "next/router";
import { AlertError } from "@/components/alert";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.userToken);

  const LoginFormHandler = (e) => {
    e.preventDefault();

    const userData = {
      phone_number: e.target.phone_number.value,
      password: e.target.password.value,
    };

    dispatch(loginData(userData));

    if (error) {
      AlertError("Your phone number or password is not correct.");
    }
  };

  useEffect(() => {
    if (token) router.push("/");
  }, [dispatch, router, token]);

  return (
    <Wrapper className="flex min-h-screen items-center flex-col justify-center">
      <Link href="/">
        <Logo />
      </Link>
      <form
        onSubmit={LoginFormHandler}
        className="min-h-[300px] border-2 rounded-lg p-5 flex items-center flex-col gap-5 h-full max-w-[500px] w-full shadow-inner bg-gray-100"
      >
        <div className="flex text-gray-700 text-lg font-bold gap-1">
          <h1>Login /</h1>
          <Link href="/register" className="text-yellow-light">
            Register
          </Link>
        </div>
        <FormInput
          type="text"
          label="Phone Number"
          placeholder="Enter your Phone Number"
          name="phone_number"
        />
        <FormInput
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
        />

        <Button
          type="submit"
          className={`px-10 py-2 bg-red-dark text-white font-bold`}
        >
          {loading ? <Spinner /> : "Login"}
        </Button>

        <p className="text-[11px] text-center">
          Your login means acceptance of
          <span className="font-bold mx-1">
            Book<span className="text-yellow-light">Land</span>
          </span>
          privacy rules
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
