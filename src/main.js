import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

function makeOrder(delay, shouldResolve){
    const promise = new Promise((resolve, reject) =>
        setTimeout(() => {
            if(shouldResolve === true){
                resolve(delay)
            }
            else{
                reject(delay)
            }
        }, delay)
    )
    return promise
}

function addOrderRow(Name){
const li = document.createElement("li");
li.classList.add("row-pending");
li.textContent = `⏳ ${Name} · у роботі…` 
orderLog.append(li)
return li
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const drink = formData.get("drink")
    const state = formData.get("state")
    const delay = PREP_TIME[drink]
    const shouldResolve = state === "fulfilled"
    const row = addOrderRow(drink);

    makeOrder(delay, shouldResolve)
.then((delay) =>{
    row.classList.replace("row-pending", "row-ok")
    row.textContent = `✅ ${drink} · готове · ${delay} ms`
})
.catch((delay) => {
    row.classList.replace("row-pending", "row-err")
    row.textContent = `❌ ${drink} · скасовано · ${delay} ms`
})
.finally(() => {
    row.textContent += ` · ${new Date().toLocaleTimeString("uk-UA")}`
})
})