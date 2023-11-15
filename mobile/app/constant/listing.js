const p1 = require("../../assets/explore/p1.png");
const p2 = require("../../assets/explore/p2.png");
const p3 = require("../../assets/explore/p3.png");
const p4 = require("../../assets/explore/p4.jpeg");
const p5 = require("../../assets/profilepic.jpeg");

const listing = [
  {
    id: 1,
    type: "product",
    name: "Cup Cake",
    description: "Ever delicious and tasty",
    price: 3500,
    unit:"Pieces",
    brand: "Bik's Pasteries",
    condition: "New",
    image: [
      p2,
      p2,
      p2,
    ],
    location: {
      latitude: 8.4905382,
      longitude: 4.5108319,
      address: "Oloje Estate, Ilorin",
    },
    stock: {
      available: true,
      quantity: 50,
    },
    user: {
      id: "user123",
      username: "Bik's Pasteries",
      email: "john.doe@example.com",
      image: p5,
      rating: 4.5,
      location: "Oloje Estate, Ilorin"
    },
    tags: ["food", "pasteries", "cake"],
  },
  {
    id: 2,
    type: "product",
    name: "Chocolate Cake",
    description: "Highly delicious chocolate cake",
    price: 4000,
    unit: "Pieces",
    brand: "Bik's Pasteries",
    condition: "New",
    image: [
      p4,
      p4,
      p4,
    ],
    location: {
        latitude: 8.4905382,
        longitude: 4.5108319,
        address: "Oloje Estate, Ilorin",
    },
    stock: {
      available: true,
      quantity: 50,
    },
    user: {
        id: "user123",
        username: "Bik's Pasteries",
        email: "john.doe@example.com",
        image: p5,
      rating: 4.5,
      location: "Oloje Estate, Ilorin"
    },
    tags: ["food", "pasteries", "cake"],
  },
  {
    id: 3,
    type: "event",
    name: "Sip and Paint",
    description: "Explore the artisty of sipping and painting",
    date: "2023-06-15",
    time: "9am-10am",
    price: 3500,
    unit: "Ticket",
    location: "City Convention Center",
    organizer: "JT Art Gallery",
    image: [
      p1,
      p1,
      p1,
    ],
    location: {
      latitude: 8.49053815436,
      longitude: 4.51083194631,
      address: "City Convention Center",
    },
    user: {
      id: "user123",
      username: "JT Art Gallery",
      email: "john.doe@example.com",
      image: p5,
      rating: 4.5,
      location: "City Convention Center"
    },
    tags: ["art", "design", "business"],
  },
  {
    id: 4,
    type: "event",
    name: "Art Exhibition",
    description: "Explore a collection of contemporary art pieces.",
    price: 5000,
    unit: "Ticket",
    date: "2023-07-20",
    time: "9am-10am",
    location: "Art Gallery",
    organizer: "JT Art Gallery",
    image: [
        p1,
        p1,
        p1,
    ],
    location: {
        latitude: 8.49053815436,
        longitude: 4.51083194631,
      address: "123 Tech Street, TechCity",
    },
    user: {
      id: "user123",
      username: "JT Art Gallery",
      email: "john.doe@example.com",
      image: p5,
      rating: 4.3,
      location: "City Convention Center"
    },
    tags: ["art", "exhibition", "contemporary"],
  },
  {
    id:5,
    type: "service",
    name: "Photography",
    description: "Professional photogtrapher using modern tools",
    price: 3500,
    unit:"Session",
    provider: "Hibee Visual",
    available: "Mon-Fri",
    time: "9am - 5pm",
    image: [
      p3,
      p3,
      p3,
    ],
    location: {
      latitude: 8.49053815436,
      longitude: 4.51083194631,
      address: "123 Tech Street, TechCity",
    },
    user: {
      id: "user123",
      username: "Hibee Visual",
      email: "john.doe@example.com",
      image: p5,
      rating: 4.1,
      location: "123 Tech Street, TechCity"
    },
    tags: ["birthday", "photoshoot", "photo"],
  },
  
];

export default listing;
