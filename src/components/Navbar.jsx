import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const navigation = [
  {
    name: "Archivos de Gestión",
    href: "/resoluciones",
    message: "verresolucion/criteriomayor/1",
    current: false,
  },
  {
    name: "Oficinas Académicas",
    href: "/resoluciones",
    message: "verresolucion/criteriomayor/2",
    current: false,
  },
  {
    name: "Vicerrectoría de Investigación",
    href: "/resoluciones",
    message: "verresolucion/criteriomayor/3",
    current: false,
  },
  {
    name: "Oficinas Administrativas",
    href: "/resoluciones",
    message: "verresolucion/criteriomayor/4",
    current: false,
  },
  {
    name: "Archivos Externos",
    href: "/resoluciones",
    message: "verresolucion/criteriomayor/5",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (href, message) => {
    localStorage.setItem("navMessage", message);
    navigate(href);
    if (href === "/resoluciones") {
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("token");
        Swal.fire("¡Sesión cerrada con éxito!", "", "success");
        navigate("/panelprincipal");
      } else {
        Swal.fire("¡Error al cerrar la sesión!", "", "error");
        console.error("Error al cerrar la sesión");
      }
    } catch (error) {
      Swal.fire("¡Error al cerrar la sesión!", "", "error");
      console.error("Error al cerrar la sesión:", error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-green-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex-shrink-0 items-center">
                <img
                  className="h-14 w-auto cursor-pointer"
                  src="../../unsm.png"
                  alt="Your Company"
                  onClick={() => navigate("/paginaprincipal")}
                />
              </div>
              <div className="hidden sm:block">
                <div className="ml-6 flex space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href, item.message)}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-green-400 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              {isAuthenticated && (
                <div className="ml-3 relative">
                  <Menu>
                    <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
                        alt="avatar"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/perfil"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Tu perfil
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full px-4 py-2 text-left text-sm text-gray-700"
                              )}
                            >
                              Cerrar sesión
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.message)}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
