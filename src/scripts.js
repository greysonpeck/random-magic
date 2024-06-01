console.log("start script");

var edhrecLink = "https://json.edhrec.com/pages/commanders/the-master-multiplied.json";
async function scryfallRandomCommander() {
  let response = await fetch(
    "https://api.scryfall.com/cards/random?q=%28type%3Acreature+type%3Alegendary%29+%28game%3Apaper%29+legal%3Acommander+&unique=cards&as=grid&is%3Afirstprinting&order=random"
  );

  // hardcode a Transforming card
  // "https://api.scryfall.com/cards/named?fuzzy=elesh+norn+argent"
  let card = await response.json();
  console.log(card);
  commanderName = card.name;
  commanderType = card.type_line;
  commanderPrice = card.prices.usd;
  commanderSetName = card.set_name;
  commanderReleaseDate = card.released_at;

  // Check for transforming card. Note: "card.layout" is unreliable
  if (commanderName.includes("//")) {
    imagePrimary = card.card_faces[0].image_uris.normal;
  } else {
    imagePrimary = card.image_uris.normal;
  }

  callEdhRec();
}

scryfallRandomCommander();

function callEdhRec() {
  //Set Commander Name
  console.log(commanderName);
  const commanderHeaderElement = document.getElementById("commander-name");
  commanderHeaderElement.innerText = commanderName;

  //Set Commander Type
  const commanderTypeElement = document.getElementById("commander-type");
  commanderTypeElement.innerText = commanderType;

  //Set Commander Set Name
  const commanderSetNameElement = document.getElementById("commander-set-name");
  commanderSetNameElement.innerText = commanderSetName + " (" + commanderReleaseDate.substring(0, 4) + ")";

  //Set Commander Price
  // const commanderPriceElement = document.getElementById("commander-price");
  // commanderPriceElement.innerText = commanderPrice;

  //   Replace Img Source
  document.getElementById("commander-image").src = imagePrimary;

  // Make string for EDHREC lookup
  var commanderDataName = commanderName;

  // Sanitize Commander name to EDHRec-friendly name
  function sanitize(string) {
    string = string.replace(", ", "-");
    string = string.replace(/\/\/.*$/, "");
    string = string.replace(/\s$/, "");
    // Trim initial "A-" for Alchemy cards
    string = string.replace(/^(A-)/, "");
    const map = {
      "'": "",
      " ": "-",
      "é": "e",
      "í": "i",
      "ú": "u",
      "á": "a",
      "ó": "o",
    };
    const reg = /['áéíóú\s]/gi;
    console.log("attempt " + string);

    return string.replace(reg, (match) => map[match]);
  }
  commanderDataName = sanitize(commanderDataName).toLowerCase();

  // Create EDHRec link
  const edhrecPre = "https://json.edhrec.com/pages/commanders/";
  const edhrecLink = edhrecPre.concat("", commanderDataName) + ".json";
  console.log("EDHRec Link: ", edhrecLink);

  async function edhrecQuery() {
    let response = await fetch(edhrecLink);

    let edhrecCard = await response.json();
    console.log(edhrecCard);
    console.log("done with edhrec");

    // Set Commander Rank
    let commanderRank = edhrecCard.container.json_dict.card.label;
    commanderRank = parseInt(commanderRank.replace(/[^#]+#/, ""), 10);
    console.log(commanderRank);
    var commanderRankTag = 0;
    if (commanderRank < 50) {
      commanderRankTag = "Most Popular";
    } else if (commanderRank < 100) {
      commanderRankTag = "Very Popular";
    } else if (commanderRank < 250) {
      commanderRankTag = "Fairly Popular";
    } else if (commanderRank < 500) {
      commanderRankTag = "Not Very Popular";
    } else if (commanderRank < 1000) {
      commanderRankTag = "Niche";
    } else if (commanderRank < 2000) {
      commanderRankTag = "Hyper-Niche";
    } else {
      commanderRankTag = "Nearly Unheard-of";
    }

    const commanderPopularity = "Rank #" + commanderRank + " – " + commanderRankTag;
    const commanderPopularityElement = document.getElementById("commander-popularity");
    commanderPopularityElement.innerText = commanderPopularity;

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
      var themeTwoText = edhrecCard.panels.tribelinks.themes[1].value;
      var divThemeTwo = document.createElement("div");
      divThemeTwo.id = "theme-two";
      document.getElementById("themes").appendChild(divThemeTwo);
      document.getElementById("theme-two").classList.add("theme-chip");
      document.getElementById("theme-two").innerHTML = themeTwoText;
      console.log(edhrecCard.panels.tribelinks.themes[1].value);

      // DITTO FOR TWO

      var themeThreeText = edhrecCard.panels.tribelinks.themes[2].value;
      var divThemeThree = document.createElement("div");
      divThemeThree.id = "theme-three";
      document.getElementById("themes").appendChild(divThemeThree);
      document.getElementById("theme-three").classList.add("theme-chip");
      document.getElementById("theme-three").innerHTML = themeThreeText;
      console.log(edhrecCard.panels.tribelinks.themes[2].value);
    } catch (e) {
      console.log(e);
    }
  }

  edhrecQuery();
}
