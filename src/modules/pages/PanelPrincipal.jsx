import React from "react";
import { Header } from "../../components/header";
import { MenuLateral } from "../../components/menulateral";
import { Footer } from "../../components/footer";
import "../../styles/menulatera.css";
export function PanelPrincipal() {
  return (
    <div className="contenido-general container mx-auto">
      <Header />
      <MenuLateral></MenuLateral>
      <Footer />
    </div>
  );
}
