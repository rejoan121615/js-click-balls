import { dynamicObjectData as database } from "./dabase.js";
import { generate as divOrganizer } from "./circle-library.js";

let mydatabase = database[0];

// variable

let allProducredElement = [];
// -------------------------------------------------------- take snap shot and store -------------------------
const clickDataSnapshot = [];
var snapShotCounter = 0;
var parentClickCounter = 0;

//--------------------------------------------------- child div creator --------------------------------------------------------------
const DivCreator = (data) => {
    // create div
    let div = document.createElement("div");
    div.classList.add("item");
    // bind event
    div.addEventListener("click", (e) => {
        // data stroge
        snapShotCounter++;
        clickDataSnapshot[snapShotCounter] = data;
        // data stroage
        const tl = gsap.timeline();
        tl.to(gsap.utils.toArray("#main .item"), {
            left: 0,
            top: 0,
            opacity: 0,
            duration: 1,
            onComplete: function () {
                // store click data
                removeOldElement();
                regularParentGenerator(data);
                dataBaseExecutor(data.data);
                //----------------------------- animation for list ----------------------------
                if (data.type == "list") {
                    gsap.from("#main .item", {
                        top: 0,
                        left: 0,
                        opacity: 0,
                        duration: 0.4,
                    });
                } else if (data.type == "text") {
                    const timeline = gsap.timeline();
                    let element = gsap.utils.toArray([".item", "#parent"]);
                    gsap.from(element[1], {
                        y: 150,
                        opacity: 0,
                        duration: 0.4,
                    });
                    gsap.from(
                        element[0],
                        {
                            y: -150,
                            opacity: 0,
                            duration: 0.4,
                        },
                        "<"
                    );
                }
            },
        });
    });
    // if undefine
    if (!data) {
        return;
    }
    // add text
    if (data.hasOwnProperty("text")) {
        let createHeading = document.createElement("h4");
        let createTextNode = document.createTextNode(data.text);
        createHeading.appendChild(createTextNode);
        div.appendChild(createHeading);
    }
    // add background
    let backgroundImg;
    if (data.hasOwnProperty("img")) {
        backgroundImg = document.createElement("img");
        backgroundImg.src = data.img;
        backgroundImg.alt = "background image";
        backgroundImg.classList.add("bg-img");
        div.appendChild(backgroundImg);
    }
    // image hover effect
    div.addEventListener("mouseenter", () => {
        if (data.hasOwnProperty("hoverImg")) {
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

// ------------------------------------------ generate regular parent --------------------------------
function removeOldElement(data) {
    document.querySelector("#parent").remove();
    // remove all child
    document.querySelectorAll("#main .item").forEach((item, index) => {
        item.remove();
    });
}
// ------------------------------------------------ last node creator -------------------------------------------
const NodeDescriptionCreator = (texts) => {
    // create div
    let div = document.createElement("div");
    div.classList.add("item");
    div.classList.add("description");
    // bind event
    div.addEventListener("click", (e) => {});
    // add text
    let createHeading = document.createElement("p");
    createHeading.innerHTML = texts;
    div.appendChild(createHeading);
    // return div
    document.querySelector(".container").appendChild(div);
    return div;
};

// -------------------------------------------------------parent producer ----------------------------------------------------------
const ParentCreator = (data) => {
    let parent = document.createElement("div");
    parent.id = "parent";
    document.querySelector(".container").appendChild(parent);
    // let parent = document.querySelector("#parent");
    // if undefine
    if (!data) {
        return;
    }
    // add text
    if (data.hasOwnProperty("text")) {
        let createHeading = document.createElement("h4");
        createHeading.innerHTML = data.text;
        parent.appendChild(createHeading);
    }
    // add background
    let img;
    if (data.hasOwnProperty("img")) {
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
        // ------------------------------------ gsap animation initialized --------------------------------------

        // add border animation class
        parent.classList.toggle("animate");
        // execute data
        if (data == clickDataSnapshot[snapShotCounter]) {
            dataBaseExecutor(data.data);
        }

        // start executing parent data list
        // --------------------------------------- here I am updating my animation ----------------------------------------
        if (!data.expanded) {
            data.expanded = true;
            // animation
            gsap.from(gsap.utils.toArray(".item"), {
                left: 0,
                top: 0,
                opacity: 0,
                duration: 0.5,
            });
        } else {
            data.expanded = false;
            // animation
            gsap.to(gsap.utils.toArray(".item"), {
                left: 0,
                top: 0,
                opacity: 0,
                duration: 0.5,
                onComplete: function () {
                    document
                        .querySelectorAll("#main .item")
                        .forEach((item, index) => {
                            item.remove();
                        });
                    snapShotCounter--;
                },
            });
        }
    });
    return parent;
};

// ---------------------------------------------------------- regular parent generator ----------------------------------

const regularParentGenerator = (data) => {
    let parent = document.createElement("div");
    parent.id = "parent";
    document.querySelector(".container").appendChild(parent);
    // add text
    // store new data to snap shot

    // check if it's exist
    if (data.hasOwnProperty("text")) {
        let createHeading = document.createElement("h4");
        createHeading.innerHTML = data.text;
        parent.appendChild(createHeading);
    }
    // add background
    let img;
    if (data.hasOwnProperty("img")) {
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
        // execute backtrack
        if (data.type === "text") {
            gsap.to("#parent", {
                y: 105,
                opacity: 0,
                duration: 0.4,
                onComplete: function (e) {
                    document.querySelector("#parent").remove();
                },
            });
            gsap.to(".description", {
                y: -105,
                opacity: 0,
                duration: 0.6,
                onComplete: function () {
                    document.querySelector(".description").remove();
                    let counter = --snapShotCounter;
                    if (counter > 0) {
                        regularParentGenerator(clickDataSnapshot[counter]);
                        dataBaseExecutor(clickDataSnapshot[counter].data);
                        gsap.from("#main .item", {
                            top: 0,
                            left: 0,
                            opacity: 1,
                            duration: 0.5,
                        });
                    } else {
                        ParentCreator(clickDataSnapshot[0]);
                        dataBaseExecutor(clickDataSnapshot[0].data);
                        gsap.from("#main .item", {
                            top: 0,
                            left: 0,
                            opacity: 1,
                            duration: 0.5,
                        });
                    }
                },
            });
        } else if (data.type === "list") {
            gsap.to("#main .item", {
                top: 0,
                left: 0,
                opacity: 0,
                duration: 0.4,
                onComplete: function () {
                    document
                        .querySelectorAll("#main .item")
                        .forEach((item, index) => {
                            item.remove();
                        });
                    document.querySelector("#parent").remove();
                    // new parent
                    let counter = --snapShotCounter;
                    if (counter > 0) {
                        regularParentGenerator(clickDataSnapshot[counter]);
                        dataBaseExecutor(clickDataSnapshot[counter].data);
                        gsap.from("#main .item", {
                            top: 0,
                            left: 0,
                            opacity: 1,
                            duration: 0.5,
                        });
                    } else {
                        ParentCreator(clickDataSnapshot[0]);
                        dataBaseExecutor(clickDataSnapshot[0].data);
                        gsap.from("#main .item", {
                            top: 0,
                            left: 0,
                            opacity: 1,
                            duration: 0.5,
                        });
                    }
                },
            });
        }
    });
    return parent;
};

// backward parent datasnap

// --------------------------------- execute backwards ----------------------------------------
function executeBackward() {
    // regularParentGenerator(clickDataSnapshot[snapShotCounter]);
    // console.log(data);
    // --snapShotCounter;
    // if (snapShotCounter <= 0) {
    //     snapShotCounter = 0
    // }
    // console.log('hello rejoan')
    // if ( mydatabase == clickDataSnapshot[snapShotCounter]) {
    //     console.log('mydatabase');
    //     console.log('click snap', clickDataSnapshot);
    // } else {
    //     regularParentGenerator(clickDataSnapshot[snapShotCounter]);
    //     dataBaseExecutor(clickDataSnapshot[snapShotCounter].data);
    //     console.log(clickDataSnapshot[snapShotCounter]);
    //     console.log(snapShotCounter)
    // }
}

//------------------------------------------------------ data executor -------------------------------------------------------------
const dataBaseExecutor = (dataArrray) => {
    let currentDivList = [];
    switch (typeof dataArrray) {
        case "object":
            dataArrray.forEach((item, index) => {
                currentDivList[index] = DivCreator(item);
            });
            // take data and decorate
            divOrganizer(dataArrray.length, 350, "main", currentDivList);
            break;
        case "string":
            NodeDescriptionCreator(dataArrray);
            break;
    }

    // push data into the html
    // return div list
    return currentDivList;
};

// ------------------------------------------- auto start exucution --------------------------------------------------------
do {
    clickDataSnapshot[snapShotCounter] = mydatabase;
    let another = ParentCreator(mydatabase);
} while (false);
