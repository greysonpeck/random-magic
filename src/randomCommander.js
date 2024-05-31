console.log("Starting");

// Define the API URL
const scryfallApi = "https://api.scryfall.com/cards/random?q=is%3Acommander";
var commanderName = "default";

// Make a GET request
fetch(scryfallApi)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    const card = data;
    console.log(card);

    // List all of the card's properties
    for (let property in card) {
      //   console.log(`${property}: ${card[property]}`);
    }
    commanderName = card.name;
    console.log(commanderName);
    return commanderName;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function grabName() {
  const card = data;
  console.log(card.name);
  console.log("we did it");
}

window.addEventListener(
  "load",
  function () {
    const paraPara = document.getElementById("test-para");
    paraPara.innerHTML = "fuck";
    const commanderHeader = document.getElementById("commander-name");
    commanderHeader.innerHTML = commanderName;
    console.log("done");
  },
  false
);
