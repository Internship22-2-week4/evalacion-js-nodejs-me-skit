const rename = (nombres) => {
  let cuenta = {}

  let index = 1;
  const result = [...nombres];

  while (index < result.length) {
    const current = result[index];
    for (let before = 0; before < index; before++) {
      if (current === result[before]) {
        cuenta[current] = cuenta[current] ? cuenta[current] + 1 : 1;
        result[index] = current + `(${cuenta[current]})`;
        index--;
        break;
      }
    }

    index++;
  }

  return result;
}

files = ['photo', 'postcard', 'photo', 'photo', 'video'];
let answer = rename(files); // ['photo', 'postcard', 'photo(1)', 'photo(2)', 'video']
console.log(answer);

files2 = ['file', 'file', 'file', 'game', 'game']
answer = rename(files2) // ['file', 'file(1)', 'file(2)', 'game', 'game(1)']
console.log(answer)

files4 = ['file', 'file(1)', 'icon', 'icon(1)', 'icon(1)']
answer = rename(files4) // ['file', 'file(1)', 'icon', 'icon(1)', 'icon(1)(1)']
console.log(answer)

files3 = ['file', 'file(1)', 'file(1)', 'file', 'icon', 'icon(1)', 'icon(1)', 'icon(1)']
answer = rename(files3) // ['file', 'file(1)', 'icon', 'icon(1)', 'icon(1)(1)']
console.log(answer)

