"use client";
import ProductsCollection from "@/components/ProductsCollection";
import ProductsMyList from "@/components/ProductsMyList";
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
import Profile from "@/components/Profile";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import CollectionForm from "@/components/CollectionForm";
import ProductForm from "@/components/ProductForm";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import ProductView from "@/components/ProductView";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function getInitials({
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
}): string {
  const firstInitial = firstName?.charAt(0).toUpperCase() || "";
  const lastInitial = lastName?.charAt(0).toUpperCase() || "";
  return firstInitial + lastInitial;
}

export default function Dashboard() {
  const router = useRouter();
  const [selectedNav, setSelectedNav] = useState("Collections");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [creationType, setCreationType] = useState("Product");
  const [collections, setCollections] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCreationType(event.target.value);
  };

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
          console.log(response.data);
          setUser(response.data);
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
          console.log(response.data);
          setCollections(response.data);
        }
      } catch (error: any) {
        console.error("Failed to get collections", error);
      }
    };

    if (token) {
      getCollections();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener("load", () => {
      setIsLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  const navigation = user.admin
    ? [
        { name: "Collections", href: "#", current: true },
        { name: "Admin", href: "#", current: false },
      ]
    : [
        { name: "Collections", href: "#", current: true },
        { name: "My List", href: "#", current: false },
        { name: "Profile", href: "#", current: false },
      ];

  const handleSignOutClick = () => {
    setIsModalOpen(true);
  };

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
                        <a
                          key={item.name}
                          href={item.href}
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
                        </a>
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
                              {getInitials(user)}
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
                            onClick={handleSignOutClick} // Alteração: aciona a abertura do modal
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
                    href={item.href}
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
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <span className="font-medium leading-none text-white">
                      {getInitials(user)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    key="Sign out"
                    as="a"
                    onClick={handleSignOutClick} // Alteração: aciona a abertura do modal
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
              <ProductsCollection collections={collections} />
            )}
            {selectedNav === "My List" && <ProductsMyList user={user} />}
            {selectedNav === "Profile" && (
              <Profile user={user} setUser={setUser} />
            )}
            {selectedNav === "Admin" && (
              <>
                <label
                  htmlFor="creation"
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  Creation Type
                </label>
                <select
                  id="creation"
                  name="creation"
                  value={creationType}
                  onChange={handleCreationTypeChange}
                  className="mt-2 mb-5 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="Product">Product</option>
                  <option value="Collection">Collection</option>
                </select>
                {creationType === "Collection" && <CollectionForm />}
                {creationType === "Product" && (
                  <ProductForm collections={collections} />
                )}
              </>
            )}
          </div>

          {/* Renderiza o AlertModal se o isModalOpen for true */}
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
