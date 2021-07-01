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
        const tl = gsap.timeline();
        tl.to(gsap.utils.toArray("#main .item"), {
            left: 0,
            top: 0,
            opacity: 0,
            duration: 1,
        }).to("#parent", {
            scale: 0.9,
            duration: 0.5,
            onComplete: function (e) {
                // store current data
                clickDataSnapshot[snapShotCounter] = data;
                // store click data
                document.querySelector("#parent").remove();
                regularParentGenerator(data);
                // remove all child
                document
                    .querySelectorAll("#main .item")
                    .forEach((item, index) => {
                        item.remove();
                    });
                // create new element
                dataBaseExecutor(data.data);
                if (data.type == "list") {
                    gsap.from("#main .item", {
                        top: 0,
                        left: 0,
                        opacity: 0,
                        duration: 1,
                    });
                } else if (data.type == "text") {
                    const timeline = gsap.timeline();
                    let element = gsap.utils.toArray([".item", "#parent"]);
                    gsap.from(element[1], {
                        y: 150,
                        opacity: 0,
                        duration: 1,
                    });
                    gsap.from(element[0], {
                        y: -150,
                        opacity: 0,
                        duration: 1,
                    });
                }

                // }
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
            clickDataSnapshot[snapShotCounter] = data;
            snapShotCounter++;
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
    ++snapShotCounter;
    clickDataSnapshot[snapShotCounter] = data;
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
        const tl = gsap.timeline();
        const element = gsap.utils.toArray(["#main .item", ".description"]);
        tl.to(element, {
            top: 0,
            left: 0,
            opacity: 0,
            duration: 1,
            onComplete: function (e) {
                document.querySelector("#parent").remove();
                gsap.utils
                    .toArray(["#main .item", ".description"])
                    .forEach((item, index) => {
                        item.remove();
                    });

                // if (snapShotCounter >= 0) {
                //     backwardExecution()
                // } else {
                //     ParentCreator(mydatabase)
                // }
                backwardExecution()
                const element = gsap.utils.toArray("#main .item");
                const timeLine = gsap.timeline();
                timeLine.from(element, {
                    top: 0,
                    left: 0,
                    duration: 1,
                    opacity: 1,
                });
            },
        });

        // execute backtrack
        const backwardExecution = () => {
            // mydatabase == clickDataSnapshot[snapShotCounter] ? --snapShotCounter : null;
            if (mydatabase == clickDataSnapshot[--snapShotCounter]) {
                console.log(snapShotCounter);
                let parent = ParentCreator(clickDataSnapshot[snapShotCounter]);
                parent.classList.add("animate");
                dataBaseExecutor(clickDataSnapshot[snapShotCounter].data);
            } else {
                let counter = --snapShotCounter;
                if (counter) {
                    ParentCreator(mydatabase);
                    
                    document.querySelector('#parent').classList.toggle('animate');
                } else {
                    console.log(snapShotCounter)
                    regularParentGenerator(clickDataSnapshot[counter]);
                    dataBaseExecutor(clickDataSnapshot[counter].data);
                }
            }
        };

        // --------------------------------------- execute backward data -------------------------------------------
        // dataBaseExecutor(clickDataSnapshot[snapShotCounter])

        // execute data
        // if (data == clickDataSnapshot[snapShotCounter]) {
        //     dataBaseExecutor(data.data);
        //     clickDataSnapshot[snapShotCounter] = data;
        //     snapShotCounter++;
        // }

        // start executing parent data list
        // --------------------------------------- here I am updating my animation ----------------------------------------
        //     if (!data.expanded) {
        //         data.expanded = true;
        //         // animation
        //         gsap.from(gsap.utils.toArray(".item"), {
        //             left: 0,
        //             top: 0,
        //             opacity: 0,
        //             duration: 0.5,
        //         });
        //     } else {
        //         data.expanded = false;
        //         // animation
        //         gsap.to(gsap.utils.toArray(".item"), {
        //             left: 0,
        //             top: 0,
        //             opacity: 0,
        //             duration: 0.5,
        //             onComplete: function () {
        //                 document
        //                     .querySelectorAll("#main .item")
        //                     .forEach((item, index) => {
        //                         item.remove();
        //                     });
        //                 snapShotCounter--;
        //             },
        //         });
        //     }
        // });

        // ------------------------------------ gsap animation initialized --------------------------------------
        // execute data
        // if (data == clickDataSnapshot[snapShotCounter]) {
        //     dataBaseExecutor(data.data);
        //     clickDataSnapshot[snapShotCounter] = data;
        //     snapShotCounter++;
        // }

        // start executing parent data list
        // --------------------------------------- here I am updating my animation ----------------------------------------
        // if (!data.expanded) {
        //     data.expanded = true;
        //     console.log('run when false', data.expanded)
        // } else {
        //     console.log('run when true', data.expanded)
        //     data.expanded = false;
        // }
    });
    return parent;
};
// ------------------------------------------------ remove all property ---------------------------------------------------

// ------------------------------------------------- check if has property-----------------------------------------------

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
    // gsap.from(another, {
    //     scale: 0,
    //     rotateY: 200,
    //     duration: 2,
    //     delay: 0.3
    // })
} while (false);

// -------------------------------------- snap shot / state updater ------------------------------------------
