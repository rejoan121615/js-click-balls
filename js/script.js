import { dynamicObjectData as database } from "./dabase.js";
import { generate as divOrganizer } from "./circle-library.js";

let mydatabase = database[0];

// variable

let allProducredElement = [];
// -------------------- take snap shot and store -------------------------
const clickDataSnapshot = [];
var snapShotCounter = 0;

//--------------------------- child div creator --------------------------------------------------
const DivCreator = (data) => {
    // create div
    let div = document.createElement("div");
    div.classList.add("item");
    // bind event
    div.addEventListener("click", (e) => {
        console.log("just clicked an a item");
    });
    // if undefine
    if (!data) {
        return;
    }
    // add text
    if (hasPro(data, "text")) {
        let createHeading = document.createElement("h4");
        let createTextNode = document.createTextNode(data.text);
        createHeading.appendChild(createTextNode);
        div.appendChild(createHeading);
    }
    // add background
    let backgroundImg;
    if (hasPro(data, "img")) {
        backgroundImg = document.createElement("img");
        backgroundImg.src = data.img;
        backgroundImg.alt = "background image";
        backgroundImg.classList.add("bg-img");
        div.appendChild(backgroundImg);
    }
    // image hover effect
    div.addEventListener("mouseenter", () => {
        if (hasPro(data, "hoverImg")) {
            backgroundImg.src = data.hoverImg;
        } else {
            backgroundImg.src = data.img;
        }
    });
    div.addEventListener("mouseleave", () => {
        backgroundImg.src = data.img;
    });
    // add dive size class
    div.classList.add(data.size);
    return div;
};

// ----------------------parent producer ---------------------------------------------
const ParentCreator = (data) => {
    let parent = document.querySelector("#parent");
    // if undefine
    if (!data) {
        return;
    }
    // add text
    if (hasPro(data, "text")) {
        let createHeading = (document.createElement("h4").innerHTML =
            data.text);
        parent.appendChild(createHeading);
    }
    // add background
    let img;
    if (hasPro(data, "img")) {
        img = document.createElement("img");
        img.src = data.img;
        img.alt = "background image";
        img.classList.add("bg-img");
        parent.appendChild(img);
    }
    // image hover effect
    parent.addEventListener("mouseenter", () => {
        img.src = data.hoverImg;
    });
    parent.addEventListener("mouseleave", () => {
        img.src = data.img;
    });
    // click event
    parent.addEventListener("click", () => {
        parent.classList.toggle("animate");
        // start executing parent data list
        dataBaseExecutor(data.data);
    });
    return parent;
};

// check if has property
const hasPro = (obj, property) => {
    return obj.hasOwnProperty(property);
};

// data executor
const dataBaseExecutor = (dataArrray) => {
    let currentDivList = [];
    dataArrray.forEach((item, index) => {
         currentDivList[index] = DivCreator(item)
    });
    // push data into the html
    clickDataSnapshot[snapShotCounter] = dataArrray;
    divOrganizer(dataArrray.length, 350, "main", currentDivList);
    // console.log(clickDataSnapshot);
    console.log(currentDivList)
};

do {
    ParentCreator(mydatabase);
} while (false);
