import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const navigation = [
  { name: "Archivos de Gestion", href: "/tablas", message: "verdocumento/criteriomayor/1", current: false },
  { name: "Oficinas Academicas", href: "/tablas", message: "verdocumento/criteriomayor/2", current: false },
  { name: "Vicerrectoria de Investigacion", href: "/tablas", message: "verdocumento/criteriomayor/3", current: false },
  { name: "Oficinas Administrativas", href: "/tablas", message: "verdocumento/criteriomayor/4", current: false },
  { name: "Archivos Externos", href: "/tablas", message: "verdocumento/criteriomayor/5", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleNavigation = (href, message) => {
    localStorage.setItem('navMessage', message);
    navigate(href);
    if (href === "/tablas") {
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
        localStorage.removeItem('token');
        Swal.fire("¡Sesión cerrada con éxito!", "", "success");
        navigate("/panelprincipal");
      } else {
        Swal.fire("¡Error al cerrar la sesión!", "", "error");
        console.error('Error al cerrar la sesión');
      }
    } catch (error) {
      Swal.fire("¡Error al cerrar la sesión!", "", "error");
      console.error('Error al cerrar la sesión:', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-green-600">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-14 w-auto"
                    src="../../unsm.png"
                    alt="Your Company"
                  />
                </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 my-2">
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
              </div>
              {isAuthenticated && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://media-lim1-1.cdn.whatsapp.net/v/t61.24694-24/431456529_1474737929807753_3430680412980144425_n.jpg?ccb=11-4&oh=01_Q5AaIAjcBajM6uNcoDs_y97yVBWQ5DISS4sznIbmuzyDmJbm&oe=66562317&_nc_sid=e6ed6c&_nc_cat=111"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/perfil"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
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
                              Sign out
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
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="button"
                    onClick={() => handleNavigation(item.href, item.message)}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
