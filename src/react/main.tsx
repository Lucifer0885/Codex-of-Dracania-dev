import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router";
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home";
import Events from "@pages/Events";
import Inventory from "@pages/Inventory";
import Calculators from "@pages/Calculators";
import Settings from "@pages/Settings";
import Macros from "@pages/Macros";
import ThankYou from "@pages/ThankYou";
import { calculatorRouteConfig } from "@routes/calculatorRouteConfig";
import { UserProvider } from "@context/UserContext";
import { eventRouteConfig } from "@routes/eventRouteConfig";
import BonusCodes from "@pages/BonusCodes";
import BonusCode from "@pages/BonusCode";
import BonusCodesHistory from "@pages/BonusCodesHistory";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <UserProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/events" element={<Events />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/macros" element={<Macros />} />
          <Route path="/bonus-codes" element={<BonusCodes />} />
          <Route path="/bonus-codes/:id" element={<BonusCode />} />
          <Route path="/bonus-codes/history" element={<BonusCodesHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {calculatorRouteConfig.map((route) => (
            <Route key={route.key} path={route.path} element={<route.element />} />
          ))}
          {eventRouteConfig.map((route) => (
            <Route key={route.key} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </MainLayout>
    </UserProvider>
  </HashRouter>
);
