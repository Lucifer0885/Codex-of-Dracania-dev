import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router";
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home";
import General from "@pages/General";
import Inventory from "@pages/Inventory";
import Services from "@pages/Services";
import Macros from "@pages/Macros";
import ThankYou from "@pages/ThankYou";
import { PinnedLinkProvider } from "@context/PinnedLinkContext";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <PinnedLinkProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/general" element={<General />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/services" element={<Services />} />
          <Route path="/macros" element={<Macros />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </MainLayout>
    </PinnedLinkProvider>
  </HashRouter>
);

