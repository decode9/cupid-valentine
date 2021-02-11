const heartAppear = () => {
    const hearts = document.getElementsByClassName('heart');
    const heart = document.createElement("img");
    heart.src = "./assets/img/heart.png";
    heart.className = 'heart'
    heart.width = 50;
    heart.height = 50;
    posX = Math.floor(Math.random() * (window.innerHeight - 50)) + 1;
    posY = Math.floor(Math.random() * (window.innerWidth - 50)) + 1;

    heart.style.position = 'absolute';
    heart.style.bottom = posX + 'px';
    heart.style.left = posY + 'px';

    if (!(hearts.length > 30)) {
        document.body.append(heart);
    }
}
