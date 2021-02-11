const getPositions = (element) => {
    const elStyle = window.getComputedStyle(element);

    let pos = {
        bottom: Number(elStyle.getPropertyValue("bottom").replace("px", "")),
        left: Number(elStyle.getPropertyValue("left").replace("px", ""))
    };
    let width = element.clientWidth;
    let height = element.clientHeight;

    return [[pos.left, pos.left + width], [pos.bottom, pos.bottom + height]];
}

const destroyElement = (element, count) => {
    const counter = document.getElementById("count");
    count++

    counter.innerHTML = count.toString();
    element.remove();
    return count
}

const comparePositions = (p1, p2) => {
    let x1 = p1[0] < p2[0] ? p1 : p2;
    let x2 = p1[0] < p2[0] ? p2 : p1;
    return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

const gameOver = (count) => {
    const text = document.createElement("h1");
    text.className = 'gameOver'
    text.width = 50;
    text.height = 50;
    text.style.position = 'absolute';
    text.style.bottom = 0;
    text.style.left = 0;
    text.style.right = 0;
    text.style.top = 0;
    text.style.margin = 'auto';
    text.style.width = 'fit-content';
    text.style.height = 'fit-content';
    text.innerHTML = "Perdiste! has alcanzado un total de " + count
    document.body.append(text);
}

const checkCollisions = (data, handler) => {
    const hearts = document.getElementsByClassName('heart');

    for (let heart of hearts) {
        let pos = getPositions(heart);
        let pos2 = getPositions(cupid);
        let horizontalMatch = comparePositions(pos[0], pos2[0]);
        let verticalMatch = comparePositions(pos[1], pos2[1]);
        let match = horizontalMatch && verticalMatch;
        if (match) data['count'] = Number(destroyElement(heart, data['count']));
    }

    if (data['count'] > data['max']) {
        data['max'] += 10;
        clearInterval(data['interval']);
        data['initialTime'] -= 300;
        data['interval'] = setInterval(heartAppear, data['initialTime']);
    }

    if (hearts.length > 50) {
        clearInterval(data['interval']);
        document.removeEventListener('keydown', handler);
        gameOver(data['count']);
    }

    return data;
}

