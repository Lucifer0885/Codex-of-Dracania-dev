import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router";
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home";
import General from "@pages/General";
import Inventory from "@pages/Inventory";
import Calculators from "@pages/Calculators";
import Settings from "@pages/Settings";
import Macros from "@pages/Macros";
import ThankYou from "@pages/ThankYou";
import { calculatorRouteConfig } from "@routes/calculatorRouteConfig";
import { UserProvider } from "@context/UserContext";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <UserProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/general" element={<General />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/macros" element={<Macros />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {calculatorRouteConfig.map((route) => (
            <Route key={route.key} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </MainLayout>
    </UserProvider>
  </HashRouter>
);
