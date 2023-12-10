// React
import React from "react";
import ReactDOM from "react-dom/client";

// Source
import App from "./App";
import "./index.css";

// Mantine
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

// import { MantineThemeProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <VisibilityProvider> */}
    <MantineProvider defaultColorScheme="dark">
      <Notifications
        autoClose={3000}
        position="bottom-right"
        styles={{
          notification: {
            width: "50dvh",
            height: "50px",
            position: "absolute",
            bottom: "1%",
            right: "1%",
            zIndex: "100",
          },
        }}
      />
      <App />
    </MantineProvider>
    {/* </VisibilityProvider> */}
  </React.StrictMode>
);
