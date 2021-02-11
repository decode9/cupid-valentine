const movement = (element, move, direction) => {

    const velocity = 10;
    const directionMove = (direction == 'vertical')
    const max = (direction == "vertical") ? window.innerHeight : window.innerWidth;
    const elementSize = (direction == "vertical") ? element.clientHeight : element.clientWidth;

    let elStyle = window.getComputedStyle(element);
    let moveValue = (directionMove) ?
        Number(elStyle.getPropertyValue("bottom").replace("px", "")) :
        Number(elStyle.getPropertyValue("left").replace("px", ""));

    let negativeMovement = (moveValue || move > 0)
    let positiveMovement = (moveValue < (max - elementSize) || move < 0)

    if ((negativeMovement && positiveMovement) && !isNaN(move)) {
        let destination = moveValue + (move * velocity) + "px";
        let bottomMovement = (directionMove) ? destination : elStyle.getPropertyValue("bottom");
        let leftMovement = (!directionMove) ? destination : elStyle.getPropertyValue("left");

        let elStyleSheet = document.getElementById(element.id + "-movement");
        if (!elStyleSheet) {
            elStyleSheet = document.createElement("style");
            elStyleSheet.id = element.id + "-movement";
            document.head.appendChild(elStyleSheet);
        }

        let elId = element.id;
        if (!elId) { throw ("Cannot move an element without an ID!"); }

        elStyleSheet.innerHTML = `
           #` + elId + `.moved
           {
              transition: all 1s linear;
              -webkit-transition: all 0s linear;
              -moz-transition: all 0s linear;
              -o-transition: all 0s linear;
              bottom: ` + bottomMovement + `;
              left: ` + leftMovement + `;
           }
        `;

        element.classList.add("moved");
    }
}