"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/Store";

// Dynamically import the Page component
const Page = dynamic(() => import("../app/pages/Home/Home"), {
  ssr: false,
});

function Home() {
  return (
    <main className="bg-black">
      <Provider store={store}>
      <div>
        <Page />
      </div>
    </Provider>
    </main>
  );
}

export default Home;