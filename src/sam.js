function sanitize(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "",
    "é": "e",
    "í": "i",
    "ú": "u",
    "á": "a",
    "ó": "o",
  };
  const reg = /[&<>"'áéíóú]/gi;
  return string.replace(reg, (match) => map[match]);
}

oldName = "Glóin's, Dwarf // Emissary";
newName = sanitize(oldName);
newName = newName.replace(", ", "-");
console.log(newName);
