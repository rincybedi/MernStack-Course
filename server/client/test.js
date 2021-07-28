let arr = [1, 2, 3, 4, 5];

//map
let newArra = arr.map((el) => {
  if (el != 2) {
    return el * el;
  }
});
console.log(newArra);

let a = [
  {
    name: "A",
    count: 10,
  },
  {
    name: "B",
    count: 20,
  },
  {
    name: "A",
    count: 30,
  },
];
giveresult(a);

function giveresult(a) {
  var map = new Map();
  for (let item of a) {
    var key = item.name;
    var val = item.count;
    if (map.get(item.name) == null) {
      map.set(key, val);
    } else {
      var element = map.get(item.name);
      console.log(element);
      map.set(key, element + val);
    }
  }

  return map.entries();
}
