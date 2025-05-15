"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React from "react";
// import LoginPage from "./pages/login/page";
import { Provider } from "react-redux";
import store from "./redux/Store";

const LoginPage = dynamic(() => import("./login/page"), {
  ssr: false,
});

const queryClient = new QueryClient();

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <LoginPage />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default Home;
