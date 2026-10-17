elements.polonium = {
    color: "#a0aab0",
    behavior: behaviors.solid,
    category: "solids",
    state: "solid",
    density: 9320,
    temp: 100,
    conduct: 0.6,
    tick: function(pixel) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                let x = pixel.x + i;
                let y = pixel.y + j;
                
                if (!isEmpty(x, y)) {
                    let target = pixelMap[x][y];
                    target.temp += 30;
                    
                    if (Math.random() < 0.20 && target.element !== "polonium") {
                        changePixel(target, "fallout");
                    }
                } else {
                    if (Math.random() < 0.1) {
                        trySpawn("fallout", x, y);
                    }
                }
            }
        }
    }
};
