
let upElement = document.querySelectorAll("chevron-up");
let downElement = document.querySelectorAll("chevron-down");
let numberElement = document.querySelectorAll("number");

upElement.forEach(
    btn => btn.addEventListener("click", () => {
    const currentNumber = Number(numberElement.textContent);
    numberElement.textContent = currentNumber + 1;
}));

downElement.forEach(
    btn => btn.addEventListener("click", () => {
    const currentNumber = Number(numberElement.textContent);
    numberElement.textContent = currentNumber - 1;
}));

/*
upElement.addEventListener("click", e => {
  
  const currentNumber = Number(numberElement.textContent);

  numberElement.textContent = currentNumber + 1;
});
*/
/*
downElement.addEventListener("click", e => {
  const currentNumber = Number(numberElement.textContent);
  numberElement.textContent = currentNumber - 1;
});
*/

/*
let addToCartButtons = document.querySelectorAll("a.addtocartbutton");
let cartCount = document.querySelector("span.cartcount");

addToCartButtons.forEach(btn => btn.addEventListener("click", (event) => {
    event.preventDefault();
    cartCount.style.display = "inline";
}));
*/
/*
let clicks = document.getElementById("clicks");
            let onClickBtn = document.getElementById("up");
            onClickBtn.addEventListener("click", () => {
                currentNumber = Number(clicks.textContent);
                currentNumber += 1;
                document.getElementById("clicks").innerHTML = currentNumber;
            })
*/

<form action="/cusLogin/<%=restaurant.id %>/<%=URL1 %>"></form>