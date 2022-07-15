const coins = [1, 2, 5, 10, 20, 50];

const calcCoins = quantity => {
  result = [0, 0, 0 ,0 ,0, 0];

  let index = coins.length - 1;
  while (index >= 0 && quantity > 0) {
    num = Math.floor(quantity / coins[index]);
    quantity -= num * coins[index];
    result[index] = num;
    index--;
  }

  return result;
}

console.log(calcCoins(51)) // [1, 0, 0, 0, 0, 1] -> una moneda de 1 céntimo y otra de 50 céntimos
console.log(calcCoins(3)) // [1, 1, 0, 0, 0, 0] -> una moneda de 1 céntimo y otra de 2
console.log(calcCoins(5)) // [0, 0, 1, 0, 0, 0] -> una moneda de 5 céntimos
console.log(calcCoins(16)) // [1, 0, 1, 1, 0, 0] -> una moneda de 1 céntimo, una de 5 y una de 10
console.log(calcCoins(100)) // [0, 0, 0, 0, 0, 2] -> dos monedas de 50 céntimos