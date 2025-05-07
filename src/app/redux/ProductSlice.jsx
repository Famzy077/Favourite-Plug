import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      "id": 1,
      "name": "Apple iPhone 14 Pro Max",
      "price": 1099.99,
      "image": "/Images/Products/iphone14pro.jpg",
      "description": "The Apple iPhone 14 Pro Max is a high-end smartphone with a large display, powerful A16 Bionic chip, and advanced camera system. It features a 6.7-inch Super Retina XDR display, 5G connectivity, and a triple-camera setup with ProRAW and ProRes video recording capabilities.",
      "category": "Smartphones",
    },
    {
      "id": 2,
      "name": "Samsung Galaxy S22 Ultra",
      "price": 1199.99,
      "image": "/Images/Products/samsunggalaxy.jpg",
      "description": "The Samsung Galaxy S22 Ultra is a high-end Android smartphone with a large display, powerful Snapdragon 8 Gen 1 chip, and advanced camera system. It features a 6.8-inch Dynamic AMOLED display, 5G connectivity, and a quad-camera setup with 108MP main sensor.",
      "category": "Smartphones",
    },
    {
      "id": 3,
      "name": "Sony PlayStation 5",
      "price": 499.99,
      "image": "/Images/Products/ps5.jpg",
      "description": "The Sony PlayStation 5 is a next-generation gaming console with a powerful AMDZen 2 CPU, Radeon Navi GPU, and advanced SSD storage. It features a custom-designed DualSense controller with haptic feedback and adaptive triggers, and supports 4K gaming at up to 120fps.",
      "category": "Gaming Consoles",
    },
    {
      "id": 4,
      "name": "Microsoft Xbox Series X",
      "price": 499.99,
      "image": "/Images/Products/xbox.jpg",
      "description": "The Microsoft Xbox Series X is a next-generation gaming console with a powerful AMD Zen 2 CPU, RDNA 2 GPU, and advanced SSD storage. It features a custom-designed controller with improved ergonomics and supports 4K gaming at up to 120fps.",
      "category": "Gaming Consoles",
    },
    {
      "id": 5,
      "name": "Apple MacBook Pro (M1)",
      "price": 1299.99,
      "image": "/Images/Products/macbook.jpg",
      "description": "The Apple MacBook Pro (M1) is a high-performance laptop powered by Apple's M1 chip. It features a Retina display, long battery life, and advanced graphics capabilities, making it ideal for creative professionals and power users.",
      "category": "Laptops",
    },
    {
      "id": 6,
      "name": "Dell XPS 13",
      "price": 999.99,
      "image": "/Images/Products/dellxps.jpg",
      "description": "The Dell XPS 13 is a premium ultrabook with a sleek design, powerful Intel Core processors, and a stunning InfinityEdge display. It offers long battery life and excellent performance for productivity tasks.",
      "category": "Laptops",
    },
    {
      "id": 7,
      "name": "Apple iPad Pro",
      "price": 799.99,
      "image": "/Images/Products/ipadpro.jpg",
      "description": "The Apple iPad Pro is a high-end tablet with a powerful M1 chip, Liquid Retina display, and support for the Apple Pencil and Magic Keyboard. It offers advanced multitasking capabilities and is ideal for creative professionals.",
      "category": "Tablets",
    },
    {
      "id": 8,
      "name": "Samsung Galaxy Tab S7",
      "price": 649.99,
      "image": "/Images/Products/samsungtab.jpg",
      "description": "The Samsung Galaxy Tab S7 is a premium Android tablet with a large display, powerful Snapdragon 865+ chip, and support for the S Pen. It offers excellent performance for productivity and entertainment tasks.",
      "category": "Tablets",
    }
  ]
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;