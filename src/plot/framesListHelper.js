//ебейший супер-костыль, даже нет, это целая инвалидная коляска потому что чертов нейтив не может в динамический импорт!
//ENG: for dev only
const jsonData = require("./plot.json");

const arrayOfKeys = [];

for (const key in jsonData) {
  // p for all. pb for pb :/
  if (/^pb\d+$/.test(key)) {
    arrayOfKeys.push(key);
  }
}

const imageString = arrayOfKeys
  .map((key) => `${key}: require("./images/${key.slice(1)}.jpg")`)
  .join(",\n");
// making list because react native does not support dynamic imports!!!!!!!!11
console.log(imageString);
