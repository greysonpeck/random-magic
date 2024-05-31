console.log("start shoaib");
var commanderName = "default";
var commanderType = "default type";
var commanderDataName = "default data name";
// var themeOne = "";
// var themeTwo = "";
// var themeThree = "";

var edhrecLink = "https://json.edhrec.com/pages/commanders/the-master-multiplied.json";
async function scryfallRandomCommander() {
  let response = await fetch("https://api.scryfall.com/cards/random?q=is%3Acommander");
  let card = await response.json();
  commanderName = card.name;
  commanderType = card.type_line;
  console.log(commanderType);
  console.log("image_uris I GUESS");
  imagePrimary = card.image_uris.png;
}

scryfallRandomCommander();
// console.log(scryfallRandomCommander());

setTimeout(function () {
  //Set Commander Name
  console.log(commanderName);
  const commanderHeaderElement = document.getElementById("commander-name");
  commanderHeaderElement.innerText = commanderName;

  //Set Commander Type
  const commanderTypeElement = document.getElementById("commander-type");
  commanderTypeElement.innerText = commanderType;

  //   Replace Img Source
  document.getElementById("commander-image").src = imagePrimary;

  // Make string for EDHREC lookup
  var commanderDataName = commanderName;
  // Replace commas and spaces with hyphen.
  commanderDataName = commanderDataName.replace(/[, ]+/g, "-").toLowerCase();
  // Trim initial "A-" for Alchemy cards
  commanderDataName = commanderDataName.replace(/^(A-)/, "");
  console.log(commanderDataName);

  const edhrecPre = "https://json.edhrec.com/pages/commanders/";
  const edhrecLink = edhrecPre.concat("", commanderDataName) + ".json";
  console.log("EDHRec Link: ", edhrecLink);

  async function edhrecQuery() {
    let response = await fetch(edhrecLink);

    let edhrecCard = await response.json();
    console.log(edhrecCard);
    console.log("done with edhrec");

    // Grab and set Themes
    try {
      // Make a div, set its ID
      var divThemeOne = document.createElement("div");
      divThemeOne.id = "theme-one";

      // Append the div, add its classes
      document.getElementById("themes").appendChild(divThemeOne);
      document.getElementById("theme-one").classList.add("theme-chip");

      // Set the innerHTML
      document.getElementById("theme-one").innerHTML = edhrecCard.panels.tribelinks.themes[0].value;
      console.log(edhrecCard.panels.tribelinks.themes[0].value);

      // DITTO FOR TWO
      var divThemeTwo = document.createElement("div");
      divThemeTwo.id = "theme-two";
      document.getElementById("themes").appendChild(divThemeTwo);
      document.getElementById("theme-two").classList.add("theme-chip");
      document.getElementById("theme-two").innerHTML = edhrecCard.panels.tribelinks.themes[1].value;
      console.log(edhrecCard.panels.tribelinks.themes[1].value);

      // DITTO FOR TWO
      var divThemeThree = document.createElement("div");
      divThemeThree.id = "theme-three";
      document.getElementById("themes").appendChild(divThemeThree);
      document.getElementById("theme-three").classList.add("theme-chip");
      document.getElementById("theme-three").innerHTML = edhrecCard.panels.tribelinks.themes[2].value;
      console.log(edhrecCard.panels.tribelinks.themes[2].value);
    } catch (e) {
      console.log(e);
    }
  }

  edhrecQuery();
}, 500);
