import React, { useState } from "react";
import "../styles/menulatera.css";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">
      <div className="flex flex-col max-w-screen-xl p-5 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          {/* <a
            className="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8"
            href="/groups/header/"
          >
            wickedblocks
          </a> */}
          <img className="w-20 h-20" src="../../unsm.png"></img>
          <button
            className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
            onClick={() => setOpen(!open)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
                style={{ display: open ? "none" : "block" }}
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={`flex-col items-center flex-grow pb-4 border-blue-600 md:pb-0 md:flex md:justify-end md:flex-row lg:border-l-2 lg:pl-2 ${
            open ? "flex" : "hidden"
          }`}
        >
          <a
            className="px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline"
            href="#"
          >
            About
          </a>
          <a
            className="px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline"
            href="#"
          >
            Contact
          </a>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm text-left text-gray-500 md:w-auto md:inline md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline"
            >
              <span>Tipos de archivos</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${
                  open ? "rotate-180" : "rotate-0"
                } md:-mt-1`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {open && (
              <div className="absolute right-0 z-30 mt-2 origin-top-right rounded-md shadow-lg md:w-48">
                <div className="px-2 py-2 bg-white rounded-md shadow">
                  <a
                    className="block px-4 py-2 mt-2 text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    Archivos internos
                  </a>
                  <a
                    className="block px-4 py-2 mt-2 text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    Archivos externos
                  </a>
                  <a
                    className="block px-4 py-2 mt-2 text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    Archivos ...
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <form
              action=""
              method="post"
              id="revue-form"
              name="revue-form"
              target="_blank"
              className="p-1 transition duration-500 ease-in-out transform border2 bg-gray-50 rounded-xl sm:max-w-lg sm:flex"
            >
              <div className="flex-1 min-w-0 revue-form-group">
                <label htmlFor="member_email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform bg-transparent border border-transparent rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3 revue-form-actions">
                <button
                  type="submit"
                  value="Subscribe"
                  name="member[subscribe]"
                  id="member_submit"
                  className="block w-full px-5 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 sm:px-10"
                >
                  Notify me
                </button>
              </div>
            </form>
          </div>
        </nav>
      </div>
      <div className="p-5 overflow-y-auto whitespace-nowrap scroll-hidden bg-gray-50">
        <ul className="inline-flex items-center list-none">
          <li>
            <a
              href="#"
              className="navbar__link flex px-4 py-1 mr-1 text-base text-gray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow
-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600"
            >
              <i data-feather="home"></i>
              <h2 className="pl-2">HOME</h2>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="navbar__link flex px-4 py-1 mr-1 text-base text-gray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600"
            >
              <i data-feather="users"></i>
              <h2 className="pl-2">NOSOTROS</h2>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="navbar__link flex px-4 py-1 mr-1 text-base text-gray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600"
            >
              <i data-feather="folder"></i>
              <h2 className="pl-2">INSTITUCIONAL</h2>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="navbar__link flex px-4 py-1 mr-1 text-base text-gray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600"
            >
              <i data-feather="search"></i>
              <h2 className="pl-2">BUSQUEDA</h2>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
