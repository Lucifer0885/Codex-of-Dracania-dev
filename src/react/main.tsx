import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router";
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home";
import General from "@pages/General";
import Inventory from "@pages/Inventory";
import Calculators from "@pages/Calculators";
import Services from "@pages/Services";
import Macros from "@pages/Macros";
import ThankYou from "@pages/ThankYou";
import GemCalculator from "@pages/calculators/GemCalculator";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/general" element={<General />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/services" element={<Services />} />
        <Route path="/macros" element={<Macros />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/calculators/gem" element={<GemCalculator />} />
      </Routes>
    </MainLayout>
  </HashRouter>
);
