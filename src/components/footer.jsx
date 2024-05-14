import React, { useEffect } from "react";
import feather from "feather-icons";
import "../styles/menulatera.css";

export function Footer() {
  useEffect(() => {
    // Llamar a feather.replace() después de que los elementos se rendericen en el DOM
    feather.replace();
  }, []);

  return (
    <footer className="footer bg-green-400" aria-labelledby="footer-heading">
      {/* <h2 id="footer-heading" className="sr-only">
        Footer
      </h2> */}

      <div className="px-4 py-12  w-full bg-green-400">
        <div className="grid grid-cols-3 ">
          <img src="https://unsm.edu.pe/wp-content/uploads/2022/03/escudologotipo_unsm_2021_lateral_principal_siglas_PNG-370x142.png"></img>

          <div>
            <a
              href="/groups/footer/"
              className="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8"
            >
              CONTACTENOS
            </a>
            <div className="flex">
              <p className="w-1/2 mt-2 text-sm text-gray-500 grid grid-flow-col-dense">
                <a
                  href="https://www.facebook.com/unsmperu"
                  className="navbar__link"
                >
                  <i data-feather="facebook"></i>
                </a>
                <a
                  href="https://www.facebook.com/unsmperu"
                  className="navbar__link"
                >
                  <i data-feather="twitter"></i>
                </a>
                <a
                  href="https://www.instagram.com/unsmperu/"
                  className="navbar__link"
                >
                  <i data-feather="instagram"></i>
                </a>
              </p>
            </div>
          </div>
          <div className="grid ">
            <div className="grid">
              <div>
                <h3 className="text-sm font-bold tracking-wider text-blue-500 uppercase">
                  SOBRE NOSOTROS
                </h3>
                <ul role="list" className="mt-4 space-y-2">
                  <li>
                    <a
                      href="./pricing.html"
                      className="text-base font-normal text-gray-500 hover:text-blue-600"
                    >
                      ...
                    </a>
                  </li>
                  <li>
                    <a
                      href="./templates.html"
                      className="text-base font-normal text-gray-500 hover:text-blue-600"
                    >
                      ...
                    </a>
                  </li>
                  {/* Otros elementos de la lista */}
                </ul>
              </div>
              {/* Otro contenido */}
            </div>
            {/* Más contenido */}
          </div>
        </div>
      </div>
      <div className="px-4 py-12 mx-auto bg-green-400 flex justify-center">
        <div className="flex flex-wrap items-baseline">
          <span className="mt-2 text-sm font-light text-gray-500 flex">
            Copyright © 2024 - 2030
            <a
              href="https://wickedlabs.dev"
              className="mx-2 text-wickedblue hover:text-gray-500"
              rel="noopener noreferrer"
            >
              @informes@unsm.edu.pe
            </a>
            . Universidad Nacional de San Martin 2024
            <a className="navbar__link pl-6">
              <i data-feather="phone"></i>
            </a>
            +51 921 183 257
          </span>
        </div>
      </div>
    </footer>
  );
}
