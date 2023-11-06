import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Outlet } from "react-router-dom";
import OverlayMenu from "../../Components/OverlayMenu";


export default function Master() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <OverlayMenu/>
    </>
  );
}
