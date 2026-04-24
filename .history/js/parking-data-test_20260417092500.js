import {parkingData} from "./data/parkingData.js";
const container = document.querySelector(".parkingData");
if (container) {
    container.innerHTML = parkingData.map(item => `
        <div>
        <h3>${item.name}</h3>
        <p>${item.location}</p>
        <span>${item.price}</span>
        `)
}