const Engine = () => {
    const cupid = document.getElementById("cupid");
    const interval = setInterval(heartAppear, 2000);

    let data = { count: 0, max: 10, initialTime: 2000, interval: interval }

    const handler = (event) => {
        const direction = { w: 'vertical', s: 'vertical', a: 'horizontal', d: 'horizontal' }
        const move = { w: 1, s: -1, a: -1, d: 1 }
        movement(cupid, move[event.key], direction[event.key])
        data = checkCollisions(data, handler)
    }

    document.addEventListener('keydown', handler)

}


Engine();