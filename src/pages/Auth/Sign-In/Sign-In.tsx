import { ROUTES } from "@/constants/routes";
import { IAuthForm } from "@/types/Auth";
import { useFormik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values: IAuthForm) => {
      // Sign in from state management
    },
  });

  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form onSubmit={formik.handleSubmit}>
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Sign in</span>
              </center>
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700" htmlFor="username" />
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
                required
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium text-sm text-gray-700" htmlFor="password" />
              <div className="relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <NavLink to={ROUTES.signUp} className="">Sign Up</NavLink>

              <button
                type="submit"
                className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
