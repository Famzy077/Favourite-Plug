"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/Store";

// Dynamically import the Page component
const Page = dynamic(() => import("@/Pages/Home/Home"), {
  ssr: false,
});

function Home() {
  return (
    <Provider store={store}>
      <div>
        <Page />
      </div>
    </Provider>
  );
}

export default Home;