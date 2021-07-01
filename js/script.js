import { dynamicObjectData as database } from "./dabase.js";
import { generate as divOrganizer } from "./circle-library.js";

let mydatabase = database[0];

// variable

let allProducredElement = [];
// -------------------- take snap shot and store -------------------------
const clickDataSnapshot = [];
var snapShotCounter = 0;
var parentClickCounter = 0;

//--------------------------- child div creator --------------------------------------------------
const DivCreator = (data) => {
    // create div
    let div = document.createElement("div");
    div.classList.add("item");
    // bind event
    div.addEventListener("click", (e) => {
        const tl = gsap.timeline();
        tl.to(gsap.utils.toArray('#main .item'), {
            left: 0,
            top: 0,
            opacity: 0,
            duration: 1
        }).to('#parent', {
            scale: 0.4,
            duration: 0.8,
            onComplete: function (e) {
                // let parent = document.querySelector("#parent");
                // parent.classList.remove('animate');
                // document.querySelector('#parent img').remove();
                // let img = document.createElement('img');
                // img.classList.add('bg-img');
                // img.src = data.img;
                // parent.appendChild(img)
                console.log(data)
            }
        }).to("#parent", {
            scale: 1
        })
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
    parent.addEventListener("click", (e) => {
        // ------------ gsap animation initialized --------------------------

        // add border animation class
        parent.classList.toggle("animate");
        // store all child dive element
        let childDivList;
        // start executing parent data list
        if (!data.expanded) {
            data.data != clickDataSnapshot[snapShotCounter]
                ? (childDivList = dataBaseExecutor(data.data))
                : console.log("no data added");
            data.expanded = true;
            console.log(data.expanded);
            // animation 
            gsap.from(gsap.utils.toArray('.item'), {
                left: 0,
                top: 0,
                opacity: 0,
                duration: 1
            })
        } else {
            data.expanded = false;
            // animation 
            gsap.to(gsap.utils.toArray('.item'), {
                left: 0,
                top: 0,
                opacity: 0,
                duration: 1,
                onComplete: function () {
                    location.reload()
                }
            })
        }
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
        currentDivList[index] = DivCreator(item);
    });
    // push data into the html
    clickDataSnapshot[snapShotCounter] = dataArrray;
    // take data and decorate
    divOrganizer(dataArrray.length, 350, "main", currentDivList);
    // return div list
    return currentDivList;
};

// parent click handler ----------------------------------------
document.querySelector('#parent').addEventListener('click', () => {

})

// gsap child animation
// function animation(targetedItem, clicked) {
//     const elements = gsap.utils.toArray(targetedItem);
//     const bounds = [];

//     let collapsed;

//     elements.forEach((item, index) => {
//         let curBounds = (bounds[index] = item.getBoundingClientRect());
//         clicked.addEventListener("click", () => {
//             collapsed = !collapsed;
//             gsap.to(elements, {
//                 x: (i) => (collapsed ? curBounds.left - bounds[i].left : 0),
//                 y: (i) => (collapsed ? curBounds.top - bounds[i].top : 0),
//                 stagger: 0.2,
//                 overwrite: true,
//             });
//         });
//     });
// }

// auto start exucution --------------------------------------------------------
do {
    let another = ParentCreator(mydatabase);
    // gsap.from(another, {
    //     scale: 0,
    //     rotateY: 200,
    //     duration: 2,
    //     delay: 0.3
    // })
} while (false);
