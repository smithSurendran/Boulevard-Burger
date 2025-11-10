export type MenuItem = {
  name: string;
  desc?: string;
  price?: number;        // optional if you don't want to show prices yet
  badges?: string[];     // e.g., ["Vegan", "Spicy", "GF Bun"]
  image?: string;        // optional image path under /public, e.g. "/menu/classic.jpg"
  ingredients?: string[]; // optional list for hover details
  slug?: string;         // stable identifier for deep links
  basePrice?: number;    // base price used by builder
  options?: {
    buns?: string[];
    patties?: string[];
    cheeses?: string[];
    sauces?: string[];
    addOns?: { name: string; price?: number }[];
    recommendedSides?: string[];
  };
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
        { name: "Classic", slug: "classic", basePrice: 9.5, desc: "All-beef patty on brioche.", image: "/brand/hero.png", ingredients: ["Beef patty", "Brioche bun", "Pickles", "House sauce"], options: { buns: ["Brioche","Potato","Pretzel","Gluten Free"], patties: ["Beef","Vegan","Blended"], cheeses: ["American","Cheddar","Provolone","Mozzarella"], sauces: ["House Made","Hot","BBQ","Ranch","Blue Cheese"], addOns: [{name:"Bacon", price:1},{name:"Pulled Pork", price:2},{name:"Truffle Oil", price:1}], recommendedSides: ["French Fries","Sweet Potato Fries"] } },
        { name: "Classic Cheese", slug: "classic-cheese", basePrice: 10.5, desc: "American / Cheddar / Provolone / Mozzarella.", image: "/brand/hero.png", ingredients: ["Beef patty", "Brioche bun", "Choice of cheese"], options: { buns: ["Brioche","Potato","Pretzel","Gluten Free"], patties: ["Beef","Blended"], cheeses: ["American","Cheddar","Provolone","Mozzarella"], sauces: ["House Made","Hot","BBQ","Ranch","Blue Cheese"], addOns: [{name:"Bacon", price:1},{name:"Caramelized Onions", price:1}] } },
        { name: "The Italian", slug: "italian", basePrice: 11, desc: "Italian flair; add long hots for heat." , image: "/brand/menu/Italian.jpeg", options: { buns: ["Brioche","Potato","Pretzel"], patties: ["Beef","Blended"], cheeses: ["Provolone","Mozzarella","American","Cheddar"], sauces: ["House Made","Hot"], addOns: [{ name: "Long Hot Peppers", price: 1 }], recommendedSides: ["French Fries"] }},
        { name: "The Buffalo Burger", slug: "buffalo", basePrice: 11, badges: ["Spicy"], desc: "Buffalo glaze; choose Ranch or Blue Cheese.", image: "/brand/menu/the_buffalo_burger.jpeg",ingredients: ["Beef patty", "Buffalo glaze", "Ranch or Blue Cheese"], options: { buns: ["Brioche","Potato"], patties: ["Beef","Blended"], cheeses: ["American","Cheddar"], sauces: ["Hot","Ranch","Blue Cheese"], addOns: [{ name: "Fried Onions", price: 1 }] } },
        { name: "The Jersey Burger", slug: "jersey", basePrice: 11.5, image: "/brand/menu/The_Jersey_Burger.jpeg", desc: "With Taylor Ham (pork roll).", options: { buns: ["Brioche","Potato"], patties: ["Beef","Blended"], cheeses: ["American","Cheddar"], sauces: ["House Made","BBQ"], addOns: [{ name: "Bacon", price: 1 }, { name: "Fried Onions", price: 1 }], recommendedSides: ["Onion Rings"] } },
        { name: "Spud Burger", slug: "spud", basePrice: 10.5, image: "/brand/menu/spud_burger.jpeg", desc: "Mashed potatoes + cheddar.", ingredients: ["Beef patty", "Mashed potatoes", "Cheddar"], options: { buns: ["Brioche","Potato","Pretzel"], patties: ["Beef","Blended"], cheeses: ["Cheddar","American","Provolone","Mozzarella"], sauces: ["House Made","BBQ","Ranch"], addOns: [{ name: "Bacon", price: 1 }, { name: "Fried Onions", price: 1 }], recommendedSides: ["French Fries","Truffle Parmesan Fries"] } },
        { name: "BBQ Burger", slug: "bbq", basePrice: 11, image: "/brand/menu/BBQ_Burger.jpeg", desc: "Pulled pork + caramelized onions.", ingredients: ["Beef patty", "Pulled pork", "Caramelized onions", "BBQ sauce"], options: { addOns: [{name:"Extra Pulled Pork", price:2},{name:"Fried Onions", price:1}], recommendedSides: ["Truffle Parmesan Fries"] } },
        { name: "Three Alarm Burger", slug: "three-alarm", basePrice: 11.5, image: "/brand/menu/Three_Alarm_Burger.jpeg", badges: ["Spicy"], desc: "Hot peppers + house hot sauce.", options: { buns: ["Brioche","Potato"], patties: ["Beef","Blended"], cheeses: ["American","Cheddar"], sauces: ["Hot","House Made"], addOns: [{ name: "Long Hot Peppers", price: 1 }, { name: "House Hot Sauce", price: 1 }], recommendedSides: ["Sweet Potato Fries"] } },
        { name: "Vegan Burger", slug: "vegan", basePrice: 11, image: "/brand/menu/Vegan_Burger.jpeg", badges: ["Vegan"], ingredients: ["Plant-based patty", "Lettuce", "Tomato", "Onion", "Vegan bun"], options: { buns: ["Gluten Free","Pretzel","Potato"], patties: ["Vegan"], cheeses: [], sauces: ["House Made","Hot","BBQ"], addOns: [{ name: "Caramelized Onions", price: 1 }], recommendedSides: ["Cauliflower Fries","Vegan Wings"] } },
        { name: "Blended Burger", slug: "blended", basePrice: 12, image: "/brand/menu/Blended_Burger.jpeg", desc: "Short rib + brisket + chuck blend.", options: { buns: ["Brioche","Pretzel"], patties: ["Blended"], cheeses: ["American","Cheddar","Provolone"], sauces: ["House Made","BBQ"], addOns: [{ name: "Bacon", price: 1 }] } },
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
