import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import UserContext from "./Context/UserContext.jsx";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")).render(
  <>
    <UserContext>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </ThemeProvider>
    </UserContext>
    <Toaster />
  </>
);
