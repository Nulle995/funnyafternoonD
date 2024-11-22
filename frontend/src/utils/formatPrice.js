export default function formatPrice(price) {
  const newPrice = price.toString().split("");
  const newArr = structuredClone(newPrice).reverse();
  let newNumber = "";
  newArr.forEach((number, idx) => {
    newNumber += number;
    if ((idx + 1) % 3 === 0 && idx > 1 && idx + 1 !== newArr.length) {
      newNumber += ".";
      // finalArr = [...finalArr.slice(0, idx), number, ...finalArr.slice(idx)];
    }
    return number;
  });
  return newNumber.split("").reverse().join("");
}
