"use client";

import AlertModal from "@/components/AlertModal";
import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import CollectionsAdmin from "@/components/CollectionsAdmin";
import ProductsAdmin from "@/components/ProductsAdmin";
import UsersAdmin from "@/components/UsersAdmin";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Admin() {
  const router = useRouter();
  const [selectedNav, setSelectedNav] = useState("Collections");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collections, setCollections] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("@next-project:TOKEN");
    const getProfile = async () => {
      try {
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          if (!response.data.admin) {
            router.push("/dashboard");
          }
        }
      } catch (error: any) {
        console.error("Failed to fetch user profile", error);
      }
    };

    if (token) {
      getProfile();
    } else {
      sessionStorage.removeItem("@next-project:TOKEN");
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const token = sessionStorage.getItem("@next-project:TOKEN");
    const getCollections = async () => {
      try {
        const response = await api.get("/collections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setCollections(response.data);
        }
      } catch (error: any) {
        console.error("Failed to get collections", error);
      }
    };

    const getProducts = async () => {
      try {
        const response = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error: any) {
        console.error("Failed to get products", error);
      }
    };

    const getUsers = async () => {
      try {
        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error: any) {
        console.error("Failed to get users", error);
      }
    };

    if (token) {
      getCollections();
      getProducts();
      getUsers();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener("load", () => {
      setIsLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  const navigation = [
    { name: "Collections", current: true },
    { name: "Products", current: false },
    { name: "Users", current: false },
  ];

  const signOut = () => {
    toast.success("Usuário deslogado com sucesso!");
    sessionStorage.removeItem("@next-project:TOKEN");
    router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      alt="Your Company"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      className="h-8 w-8"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => setSelectedNav(item.name)}
                          className={classNames(
                            item.name === selectedNav
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                            <span className="font-medium leading-none text-white">
                              AD
                            </span>
                          </span>
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <MenuItem key="Sign out">
                          <a
                            onClick={() => setIsModalOpen(true)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer"
                          >
                            Sign out
                          </a>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="block h-6 w-6 group-data-[open]:hidden"
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="hidden h-6 w-6 group-data-[open]:block"
                    />
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => setSelectedNav(item.name)}
                    className={classNames(
                      item.name === selectedNav
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    key="Sign out"
                    as="a"
                    onClick={() => setIsModalOpen(true)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
                  >
                    Sign out
                  </DisclosureButton>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {selectedNav === "Collections" && (
              <CollectionsAdmin
                collections={collections}
                setCollections={setCollections}
              />
            )}
            {selectedNav === "Products" && (
              <ProductsAdmin products={products} setProducts={setProducts} />
            )}
            {selectedNav === "Users" && (
              <UsersAdmin users={users} setUsers={setUsers} />
            )}
          </div>

          {isModalOpen && (
            <AlertModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={signOut}
              title="Are you sure?"
              description="Are you sure you want to sign out from your account?"
              confirmText="Yes, sign out"
            />
          )}
        </div>
      )}
    </>
  );
}
