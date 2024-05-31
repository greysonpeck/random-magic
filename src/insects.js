console.log("dsup");

// Define the API URL
const scryfallApi =
  "https://api.scryfall.com/cards/search?as=grid&order=name&q=type%3Ainsect+%28game%3Apaper%29";

// A FOR LOOP THAT WORKS
// for (let i = 0; i < cards.length; i++) {
//   console.log(cards[i].name);
//   console.log(`Type: ${cards[i].type_line}`);
//   console.log("-----------");
// }

// // Make a GET request
fetch(scryfallApi)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    const cards = data.data;
    console.log(cards);

    for (let i = 0; i < cards.length; i++) {
      console.log(cards[i].name);
      console.log(`Type: ${cards[i].type_line}`);
      console.log("-----------");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
