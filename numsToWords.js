let unit = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
let teens = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
let tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function getUnit(num) {
  return unit[num];
}

function getTeens(num) {
  return teens[num % 10];
}

function getTens(num) {
  return tens[Math.floor(num / 10)] + " " + unit[num % 10];
}

function getHundreds(num) {
  let word = "";
  word += unit[Math.floor(num / 100)] + " " + "hundred ";

  if (num % 100 == 0) {
    word += getUnit(num % 100);
  } else if (num % 100 < 10) {
    word += "and ";
    word += getUnit(num % 100);
  } else if (num % 100 >= 10 && num % 100 < 20) {
    word += "and ";
    word += getTeens(num % 100);
  } else if (num % 100 >= 20) {
    word += "and ";
    word += getTens(num % 100);
  }

  return word;
}

function getThousands(num) {
  let word = "";
  let floored = Math.floor(num / 1000);

  if (floored < 10) {
    word += getUnit(floored);
  } else if (floored >= 10 && floored < 20) {
    word += getTeens(floored);
  } else if (floored >= 20 && floored < 100) {
    word += getTens(floored);
  } else if (floored >= 100 && floored < 1000) {
    word += getHundreds(floored);
  }
  word += " thousand, ";

  let remain = num % 1000;
  if (remain == 0) {
    word += getUnit(remain);
  } else if (remain < 10 && remain > 0) {
    word += `and ${getUnit(remain)}`;
  } else if (remain >= 10 && remain < 20) {
    word += `and ${getTeens(remain)}`;
  } else if (remain >= 20 && remain < 100) {
    word += `and ${getTens(remain)}`;
  } else if (remain >= 100 && remain <= 999) {
    word += getHundreds(remain);
  }
  return word;
}

let cur = {
  naira: { name: "Naira", sign: "₦" },
  dollar: { name: "dollar", sign: "$" },
  pounds: { name: "pounds", sign: "£" },
  cedis: { name: "cedis", sign: "₵" },
};

function getWord() {
  let typeNum = document.getElementById("typeNum").value;
  let show = document.getElementById("show");
  let symbol;
  let symbolWord;

  symbol = cur[currency.value].sign;
  symbolWord = cur[currency.value].name;

  // if (!cur[currency.value]) {
  //   error.innerHTML = "select a currency";
  //   show.innerHTML = "";
  //   converted.innerHTML = "";
  // } else {
  // }

  let val = " ";

  if (typeNum.length == 1) {
    val = getUnit(typeNum);
  } else if (typeNum.length == 2 && typeNum < 20) {
    val = getTeens(typeNum);
  } else if (typeNum.length == 2 && typeNum > 20 && typeNum < 100) {
    val = getTens(typeNum);
  } else if (typeNum.length == 3 && typeNum >= 100 && typeNum < 1000) {
    val = getHundreds(typeNum);
  } else if (typeNum.length >= 4 && typeNum.length <= 6) {
    val = getThousands(typeNum);
  }
  show.innerHTML = `${val} ${symbolWord}`;

  // comma seperation-----------------------

  if (!Boolean(Number(typeNum))) {
    converted.innerHTML = "invalid currency";
    return;
  }

  let res = [];

  while (typeNum >= 1000) {
    remain = typeNum % 1000;
    typeNum = Math.floor(typeNum / 1000);
    res.unshift(remain.toString().padStart(3, "0"));
  }

  if (typeNum > 0) {
    res.unshift(typeNum.toString());
  }

  res.join(",");
  converted.innerHTML = symbol + " " + res;
}
