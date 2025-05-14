"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/Store";

const Page = dynamic(() => import("../app/pages/Home/Home"), {
  ssr: false,
});

const queryClient = new QueryClient();

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <Page />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default Home;
