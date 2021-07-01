var theta = [];

var setup = function (n, r, id, divList) {
    var main = document.getElementById(id);
    var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
    var circleArray = [];
    for (var i = 0; i < n; i++) {
        // 
        circleArray.push(divList[i]);
        circleArray[i].posx = Math.round(r * (Math.cos(theta[i]))) + 'px';
        circleArray[i].posy = Math.round(r * (Math.sin(theta[i]))) + 'px';
        circleArray[i].style.position = "absolute";
        circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
        circleArray[i].style.left = ((mainHeight/ 2 ) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
        main.appendChild(circleArray[i]);
    }
};

export var generate = function(n, r, id, list) {
    var frags = 360 / n;
    for (var i = 0; i <= n; i++) {
        theta.push((frags / 180) * i * Math.PI);
    }
    setup(n, r, id, list)
}
// generate(number of element, radius, container id, arraylist);