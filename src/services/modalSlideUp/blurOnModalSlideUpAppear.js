export function blurOnModalSlidingUp(modalSlidedUpValue){
    let myHtmlElementTest = document.querySelector('#zone-to-blur');
    if (modalSlidedUpValue) {
        myHtmlElementTest.classList.add("blurZone");
    }else{
        myHtmlElementTest.classList.remove("blurZone");
    }
}
