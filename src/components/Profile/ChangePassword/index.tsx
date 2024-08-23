"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { schema } from "./changePasswordSchema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/services/api";

export default function ChangePassword({user}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("@next-project:TOKEN");
      const response = await api.patch(
        `/users/${user.id}/change-password`,
        {
          current_password: data.current_password,
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.statusText === "OK") {
        toast.success("Senha alterada com sucesso");
      }
    } catch (error: any) {
      toast.error(`Erro ao alterar a senha: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Change password
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Update your password associated with your account.
          </p>
        </div>

        <form
          className="md:col-span-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="current_password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Current password
              </label>
              <div className="mt-2">
                <input
                  id="current_password"
                  {...register("current_password")}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-2 border-gray-300 bg-white py-1.5 pl-4 text-black shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                {errors.current_password && (
                  <p className="text-sm text-red-500">
                    {errors.current_password.message as React.ReactNode}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="new_password"
                className="block text-sm font-medium leading-6 text-black"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  id="new_password"
                  {...register("new_password")}
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-2 border-gray-300 bg-white py-1.5 pl-4 text-black shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                {errors.new_password && (
                  <p className="text-sm text-red-500">
                    {errors.new_password.message as React.ReactNode}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirm_password"
                  {...register("confirm_password")}
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-2 border-gray-300 bg-white py-1.5 pl-4 text-black shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                {errors.confirm_password && (
                  <p className="text-sm text-red-500">
                    {errors.confirm_password.message as React.ReactNode}
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
                "Change password"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
