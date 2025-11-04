export type MenuItem = {
  name: string;
  desc?: string;
  price?: number;        // optional if you don't want to show prices yet
  badges?: string[];     // e.g., ["Vegan", "Spicy", "GF Bun"]
  image?: string;        // optional image path under /public, e.g. "/menu/classic.jpg"
  ingredients?: string[]; // optional list for hover details
};
export type MenuCategory = {
  id: "burgers" | "dogs_steak" | "sides";
  title: string;
  items: MenuItem[];
};

export const addOns = {
  included: [
    "Pickles", "Mayonnaise", "Ketchup", "Mustard",
    "Mushrooms", "Artichokes", "Caramelized Onions", "Fried Onions",
  ],
  premium: [
    "Long Hot Peppers", "Pulled Pork", "House Hot Sauce",
    "Bacon", "House Burger Sauce", "Truffle Oil",
  ],
};

export const menu: { categories: MenuCategory[] } = {
  categories: [
    {
      id: "burgers",
      title: "Burgers",
      items: [
        { name: "Classic", desc: "All-beef patty on brioche.", image: "/brand/hero.png", ingredients: ["Beef patty", "Brioche bun", "Pickles", "House sauce"] },
        { name: "Classic Cheese", desc: "American / Cheddar / Provolone / Mozzarella.", image: "/brand/hero.png", ingredients: ["Beef patty", "Brioche bun", "Choice of cheese"] },
        { name: "The Italian", desc: "Italian flair; add long hots for heat." , image: "/brand/menu/Italian.jpeg"},
        { name: "The Buffalo Burger", badges: ["Spicy"], desc: "Buffalo glaze; choose Ranch or Blue Cheese.", image: "/brand/menu/the_buffalo_burger.jpeg",ingredients: ["Beef patty", "Buffalo glaze", "Ranch or Blue Cheese"] },
        { name: "The Jersey Burger", image: "/brand/menu/The_Jersey_Burger.jpeg", desc: "With Taylor Ham (pork roll)." },
        { name: "Spud Burger", image: "/brand/menu/spud_burger.jpeg", desc: "Mashed potatoes + cheddar.", ingredients: ["Beef patty", "Mashed potatoes", "Cheddar"] },
        { name: "BBQ Burger", image: "/brand/menu/BBQ_Burger.jpeg", desc: "Pulled pork + caramelized onions.", ingredients: ["Beef patty", "Pulled pork", "Caramelized onions", "BBQ sauce"] },
        { name: "Three Alarm Burger", image: "/brand/menu/Three_Alarm_Burger.jpeg", badges: ["Spicy"], desc: "Hot peppers + house hot sauce." },
        { name: "Vegan Burger", image: "/brand/menu/Vegan_Burger.jpeg", badges: ["Vegan"], ingredients: ["Plant-based patty", "Lettuce", "Tomato", "Onion", "Vegan bun"] },
        { name: "Blended Burger", image: "/brand/menu/Blended_Burger.jpeg", desc: "Short rib + brisket + chuck blend." },
      ],
    },
    {
      id: "dogs_steak",
      title: "Steak & Dogs",
      items: [
        { name: "Rib Eye Cheese Steak",image: "/brand/menu/Steak & Dogs.jpeg"},
        { name: "All American Dog", desc: "Single or Double." ,image: "/brand/menu/Steak & Dogs.jpeg"},
        { name: "Italian Dog", desc: "Single or Double." ,image: "/brand/menu/Steak & Dogs.jpeg"},
        { name: "Vegan Dog", badges: ["Vegan"] ,image: "/brand/menu/Steak & Dogs.jpeg"},
      ],
    },
    {
      id: "sides",
      title: "Sides",
      items: [
        { name: "French Fries" ,image: "/brand/menu/French Fries.jpeg"},
        { name: "Sweet Potato Fries" ,image: "/brand/menu/Sweet Potato.jpeg"},
        { name: "Truffle Parmesan Fries",image: "/brand/menu/Truffle Parmesan Fries.jpeg" },
        { name: "Tater Tots" ,image: "/brand/menu/Tater Tots.jpeg"},
        { name: "House Made Potato Chips" },
        { name: "Buffalo Bites" },
        { name: "Thai Chili Bites" },
        { name: "BBQ Bites" },
        { name: "Vegan Wings", badges: ["Vegan"] },
        { name: "Cauliflower Fries" },
        { name: "Onion Rings" },
        { name: "Cheese Steak Spring Rolls" },
        { name: "Buffalo Chicken Spring Rolls" },
      ],
    },
  ],
};

