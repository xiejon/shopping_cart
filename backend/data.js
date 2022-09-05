import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Jonathan",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true
    },
    {
      name: "Bob",
      email: "bob@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false
    },
  ],
  products: [
    {
      name: "Signature Pu'er",
      price: 13,
      url: "imgs/signature-puer.jpg",
    },
    {
      name: "Green Sanctuary Roast",
      price: 10,
      url: "imgs/green-sanctuary-roast.jpg",
    },
    {
      name: "Buddha's Vert",
      price: 12,
      url: "imgs/buddha-vert.jpg",
    },
    {
      name: "Dragon's Back",
      price: 10,
      url: "imgs/dragon-back.jpg",
    },
    {
      name: "Wild Chrysanthemum",
      price: 11,
      url: "imgs/wild-chrysanthemum.jpg",
    },
    {
      name: "Kunlu Wild",
      price: 14,
      url: "imgs/kunlu-wild.jpg",
    },
  ],
};

export default data;
