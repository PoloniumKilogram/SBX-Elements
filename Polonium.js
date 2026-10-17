elements.polonium = {
    color: "#a0aab0", // Color gris metalizado / plateado característico
    behavior: behaviors.solid,
    category: "solids",
    state: "solid",
    density: 9320, // Densidad real aproximada del polonio (9.32 g/cm³)
    temp: 100,     // Alta temperatura inicial debido al auto-calentamiento por radiación
    conduct: 0.6,  // Buena conductividad térmica
    tick: function(pixel) {
        // Radiación descontrolada en el área circundante (matriz 3x3)
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                let x = pixel.x + i;
                let y = pixel.y + j;
                
                if (!isEmpty(x, y)) {
                    let target = pixelMap[x][y];
                    // Eleva drásticamente la temperatura de los píxeles adyacentes
                    target.temp += 30;
                    
                    // Probabilidad alta de corromper y transformar materia en fallout
                    if (Math.random() < 0.20 && target.element !== "polonium") {
                        changePixel(target, "fallout");
                    }
                } else {
                    // Libera partículas radiactivas al espacio libre
                    if (Math.random() < 0.1) {
                        trySpawn("fallout", x, y);
                    }
                }
            }
        }
    }
};
