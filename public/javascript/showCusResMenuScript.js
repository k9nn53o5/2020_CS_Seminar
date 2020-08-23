function addNum(x){
    let count = document.getElementById(x);
    let curNum = Number(count.textContent);
    curNum+=1;
    count.innerHTML = curNum;
}
function substractNum(x){
    let count = document.getElementById(x);
    let curNum = Number(count.textContent);
    if(curNum > 0){
        curNum-=1;
    }
    count.innerHTML = curNum;
}

const button = document.getElementById('submitButton');
button.addEventListener('click', function(e) {
    console.log('button was clicked');

    fetch('/submited', {method: 'POST'})
        .then(function(response) {
        if(response.ok) {
            console.log('click was recorded');
            return;
        }
        throw new Error('Request failed.');
        })
        .catch(function(error) {
        console.log(error);
});
/*
setInterval(function() {
    fetch('/clicks', {method: 'GET'})
        .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
        })
        .then(function(data) {
        document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
        })
        .catch(function(error) {
        console.log(error);
        });
    }, 1000);
*/
});
