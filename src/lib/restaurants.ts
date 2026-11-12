export const restaurants = [
  { name: "McDonald's", image: "/assets/all-images/png/media/mcdonalds-store.png" },
  { name: "Chick-fil-A", image: "/assets/all-images/png/media/chick-fil-a.png" },
  { name: "Subway", image: "/assets/all-images/png/media/subway.png" },
  { name: "Five Guys", image: "/assets/all-images/png/media/five-guys.png" },
];
export function pickRestaurantOrder(previousName: string | null, random: () => number = Math.random) {
  const choices = restaurants.filter(r => r.name !== previousName);
  const restaurant = choices[Math.min(choices.length - 1, Math.floor(random() * choices.length))];
  return { restaurant, itemCount: 5 + Math.min(10, Math.floor(random() * 11)) };
}
