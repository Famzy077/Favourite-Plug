'use client'
import React, { useState } from "react";

const Docs = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="px-16 py-20 max-sm:px-5 bg-blue-200 max-sm:hidden">
      <main className="p-7 max-sm:px-3 bg-white rounded-xl shadow-xl">
        <h1 className="text-2xl max-sm:text-xl py-2 font-semibold text-zinc-800">
          Favorite Plug - Trusted Tech & Gadget Destination
        </h1>
        <h2 className="max-sm:text-[17px] text-xl py-1 font-bold text-zinc-600">
          Shop Premium Gadgets & Accessories in One Click
        </h2>
        <p className="text-zinc-600 max-sm:text-[15px]">
          Welcome to Favorite Plug, your go-to online store in Nigeria for high-quality phones, laptops, smartwatches, accessories, and more...
        </p>

        {/* Conditionally render the rest of the content */}
        {showMore && (
          <>
            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              Tech You Love at Prices You Deserve
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              We're passionate about bringing you authentic gadgets from globally trusted brands like Apple, Samsung, Oraimo, Xiaomi, JBL, and more.
            </p>

            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              Level Up Your Digital Lifestyle
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              Stay stylish and productive with gadgets that suit your lifestyle. Whether you're a content creator, gamer, student, or business pro, we’ve got:
            </p>
            <ul className="text-zinc-600 max-sm:text-[15px] list-disc pl-5">
              <li><span className="font-bold">Smartphones & Tablets</span> – iPhones, Galaxies, Androids, and iPads</li>
              <li><span className="font-bold">Laptops & Accessories</span> – MacBooks, HP, Dell, Microsoft Surface, keyboards, mice</li>
              <li><span className="font-bold">Wearables & Audio</span> – Smartwatches, AirPods, Bluetooth speakers</li>
              <li><span className="font-bold">Power & Protection</span> – Power banks, durable cables, and rugged phone cases</li>
            </ul>

            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              Genuine Products. Guaranteed Satisfaction.
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              At Favorite Plug, we prioritize quality and trust...
            </p>

            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              Fast Delivery Across Nigeria
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              Order today and get your products delivered fast...
            </p>

            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              Plug Into Exclusive Offers
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              Don’t miss out on our regular tech drops...
            </p>

            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              🛒 Start Shopping with Favorite Plug Today
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              Whether you need a new phone, a better headset, or a gift...
            </p>
          </>
        )}

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 text-blue-600 hover:underline font-semibold"
        >
          {showMore ? "Show Less ▲" : "Read More ▼"}
        </button>
      </main>
    </div>
  );
};

export default Docs;
