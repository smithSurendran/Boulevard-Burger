export type MenuItem = {
  name: string;
  desc?: string;
  price?: number;        // optional if you don’t want to show prices yet
  badges?: string[];     // e.g., ["Vegan", "Spicy", "GF Bun"]
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
        { name: "Classic", desc: "All-beef patty on brioche." },
        { name: "Classic Cheese", desc: "American / Cheddar / Provolone / Mozzarella." },
        { name: "The Italian", desc: "Italian flair; add long hots for heat." },
        { name: "The Buffalo Burger", badges: ["Spicy"], desc: "Buffalo glaze; choose Ranch or Blue Cheese." },
        { name: "The Jersey Burger", desc: "With Taylor Ham (pork roll)." },
        { name: "Spud Burger", desc: "Mashed potatoes + cheddar." },
        { name: "BBQ Burger", desc: "Pulled pork + caramelized onions." },
        { name: "Three Alarm Burger", badges: ["Spicy"], desc: "Hot peppers + house hot sauce." },
        { name: "Vegan Burger", badges: ["Vegan"] },
        { name: "Blended Burger", desc: "Short rib + brisket + chuck blend." },
      ],
    },
    {
      id: "dogs_steak",
      title: "Steak & Dogs",
      items: [
        { name: "Rib Eye Cheese Steak" },
        { name: "All American Dog", desc: "Single or Double." },
        { name: "Italian Dog", desc: "Single or Double." },
        { name: "Vegan Dog", badges: ["Vegan"] },
      ],
    },
    {
      id: "sides",
      title: "Sides",
      items: [
        { name: "French Fries" },
        { name: "Sweet Potato Fries" },
        { name: "Truffle Parmesan Fries" },
        { name: "Tater Tots" },
        { name: "Loaded Tater Tots" },
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
