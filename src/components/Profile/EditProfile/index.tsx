"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./editProfileSchema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { RotatingLines } from "react-loader-spinner";

export default function EditProfile({ user, setUser }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      country: user?.country || "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("@next-project:TOKEN");
      data.email = data.email.toLowerCase();
      const response = await api.patch(`/users/${user.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText === "OK") {
        toast.success("Usuário editado com sucesso");
        setUser(response.data);
      }
    } catch (error: any) {
      toast.error(`Erro ao editar usuário: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-black"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  {...register("firstName")}
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-2 border-gray-300 bg-white py-1.5 pl-4 text-black shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message as React.ReactNode}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-black"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  {...register("lastName")}
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-2 border-gray-300 bg-white py-1.5 pl-4 text-black shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message as React.ReactNode}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-2 border-gray-300 bg-white py-1.5 pl-4 text-black shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message as React.ReactNode}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-black"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md border-2 border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
                  <input
                    id="username"
                    {...register("username")}
                    type="text"
                    autoComplete="username"
                    className="flex-1 border-0 bg-transparent py-1.5 pl-4 text-black focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message as React.ReactNode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-black"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  {...register("country")}
                  className="block w-full rounded-md border-2 border-gray-300 bg-white py-1.5 pl-4 text-black shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                >
                  <option value="United States">United States</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Canada">Canada</option>
                </select>
                {errors.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message as React.ReactNode}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {loading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
