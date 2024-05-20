const products = document.querySelector('.products');
function req(url) {
    return fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}


const minPrice = document.querySelector('.min-price');
const maxPrice = document.querySelector('.max-price');
let result;

function minElement(result) {
    let min = 80000000;
    for (res in result) {
        if (min > result[res].price) {
            min = result[res].price;
        }
    }
    return min;
}
function maxElement(result) {
    let max = -1;
    for (res in result) {
        if (max < result[res].price) {
            max = result[res].price
        }
    }
    return max;
}



window.addEventListener('load', async () => {
    const url = "https://odinkeane.github.io/web-developer/data.json";
    result = await req(url);
    showCount(18);
    const min = minElement(result);
    const max = maxElement(result);
    minPrice.value = min * 90;
    maxPrice.value = max * 90;



})

const countBtns = document.querySelectorAll('.count-btn');

function showCount(counter) {
    for (btn of countBtns) {
        if (btn.innerHTML == counter) {
            btn.style.color = "white";
            btn.style.backgroundColor = "var(--hover-color)";
        }
        else {
            btn.style.color = "var(--text-color)";
            btn.style.backgroundColor = "white";
        }
    }
    show(result, counter);
}

const categoryCheckbox = document.querySelectorAll('.category-checkbox');
const brandCheckbox = document.querySelectorAll('.brand-checkbox');


function show(result, counter = 18) {
    const min = minPrice.value;
    const max = maxPrice.value;
    products.innerHTML = "";
    let i = 0;
    for (res in result) {
        
        if (result[res].price * 90 < min || result[res].price * 90 > max) {
            continue;
        }

        let brandOn = false;
        for (brand of brandCheckbox){
            if (brand.checked && brand.value == result[res].brand){
                brandOn = true;
            }
        }
        if (!brandOn){
            continue;
        }

        let categyOn = false;
        for (category of categoryCheckbox){
            if (category.checked && category.value == result[res].category){
                categyOn = true;
            }
        }
        if (!categyOn){
            continue;
        }



        products.innerHTML += `
            <figure class='product'>
                <img src='${result[res].imageURL}'>
                <figcaption>
                    <h3>${result[res].name}</h3>
                    <p class='product-art'>Артикул: ${result[res].id}</p>
                    <p class='product-price'>${result[res].price * 90} ₽</p>
                </figcaption>
            </figure>
        `;
        i++;
        if (i == counter) {
            break;
        }
    }
}



const sort = document.querySelector('.sort');
function showProducts(value = "") {
    result = chooseSort(sort);
    if (value != "") {
        showCount(value);
    } else {
        for (let btn of countBtns) {
            if (btn.style.backgroundColor == "var(--hover-color)") {
                showCount(Number(btn.innerHTML));
            }
        }
    }
}


function chooseSort(element) {
    if (element.value == "expensive") {
        return expensiveSort();
    }
    if (element.value == "cheaper") {
        return cheaperSort();
    }
    if (element.value == "default") {
        return defaultSort();
    }
}


function defaultSort() {
    let newArray = [];
    for (let res in result) {
        newArray.push(result[res]);
    }
    for (let j = 0; j < newArray.length - 1; j++) {
        for (let i = 0; i < newArray.length - 1; i++) {
            if (Number(newArray[i].id) > Number(newArray[i + 1].id)) {
                const temp = newArray[i];
                newArray[i] = newArray[i + 1];
                newArray[i + 1] = temp;
            }
        }
    }
    return newArray;
}





function cheaperSort() {
    let newArray = [];
    for (let res in result) {
        newArray.push(result[res]);
    }
    for (let j = 0; j < newArray.length - 1; j++) {
        for (let i = 0; i < newArray.length - 1; i++) {
            if (Number(newArray[i].price) > Number(newArray[i + 1].price)) {
                const temp = newArray[i];
                newArray[i] = newArray[i + 1];
                newArray[i + 1] = temp;
            }
        }
    }
    return newArray;
}
function expensiveSort() {
    let newArray = [];
    for (let res in result) {
        newArray.push(result[res]);
    }
    for (let j = 0; j < newArray.length - 1; j++) {
        for (let i = 0; i < newArray.length - 1; i++) {
            if (Number(newArray[i].price) < Number(newArray[i + 1].price)) {
                const temp = newArray[i];
                newArray[i] = newArray[i + 1];
                newArray[i + 1] = temp;
            }
        }
    }
    return newArray;
}



// let results = [];
// for (let i = 0; i < 50; i += 5) {
//     if (i % 10 == 0 || i % 9 == 0) {
//         results.push(i);
//     }
// }
// console.log(results.length);
// i % 10 == 0 - 0 10 20 30 40 
// i % 9 == 0 - 45
// Ответ 6
// array = [15, 457, 2, 24, 72, 82, 3];
// let sum = 0;
// for (let el of arr) {
//     if (el > 10) {
//         el = 10;
//     }
//     sum += el;
// }
// 
// [10, 10, 2, 10, 10, 10, 3]



// let x = [1, 178, 8235, 13, 1, 72, 846, 389, 3689];
// let sum = 0;
// for (let X of x) {
//     if (x % 2 == 0) {
//         x += sum;
//     }
// }
// if (X % 2 == 0)
// sum += X