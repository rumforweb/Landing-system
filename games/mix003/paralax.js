function is_touch_device() {
    return 'ontouchstart' in window // works on most browsers
        ||
        navigator.maxTouchPoints; // works on IE10/11 and Surface
};

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
    limitY: 0
});

var bgScene = document.getElementById('bg-scene');
var parallaxInstanceBG = new Parallax(bgScene, {
    limitY: 0
});

function checkParallax() {
    if(!!is_touch_device() || window.innerWidth < 500) {
        parallaxInstance.destroy();
        parallaxInstanceBG.destroy();
    }
}

checkParallax();

window.addEventListener('resize', function () {
    checkParallax();
});