// Polonio (Po-210) - Metaloide radiactivo
elements["polonium"] = {
  color: "#C8A832",
  behavior: [
    ["emission", "radiation"],
    ["solid", "powder"]
  ],
  category: "solid",
  state: "solid",
  temp: 27,
  name: "Polonio",
  desc: "Metaloide altamente radiactivo. Emite radiación alfa de manera descontrolada.",
  hardness: 2,

  tick: function(x, y) {
    // Emitir radiación en direcciones aleatorias
    for (let i = 0; i < 3; i++) {
      let angle = Math.random() * Math.PI * 2;
      let dist = Math.floor(Math.random() * 5) + 1;
      let rx = x + Math.round(Math.cos(angle) * dist);
      let ry = y + Math.round(Math.sin(angle) * dist);

      if (isEmpty(rx, ry)) {
        // Crear partícula de radiación alfa
        changePixel(rx, ry, "radiation");
      } else {
        // Irradiar y dañar elementos cercanos
        let target = pixelMap[rx]?.[ry];
        if (target && target.element !== "polonium") {
          // Calentar y dañar el elemento objetivo
          changeTemp(rx, ry, Math.random() * 15);

          // Probabilidad de convertir en ceniza/polvo
          if (Math.random() < 0.02) {
            changePixel(rx, ry, "ash");
          }
        }
      }
    }

    // El polonio se desintegra lentamente (vida media simulada)
    if (Math.random() < 0.00005) {
      changePixel(x, y, "lead"); // Se convierte en Plomo (Pb-206)
    }

    // Genera calor constante
    changeTemp(x, y, 0.05);
  }
};

// Elemento de radiación alfa emitida por el polonio
elements["radiation"] = {
  color: "#FF4500",
  behavior: behaviors.POWDER,
  category: "gas",
  state: "gas",
  temp: 200,
  name: "Radiación α",
  desc: "Partícula alfa emitida por el polonio. Ioniza y daña lo que toca.",
  hardness: 0,

  tick: function(x, y) {
    // La radiación se mueve en línea recta aleatoriamente
    let dx = Math.sign(Math.random() - 0.5);
    let dy = Math.sign(Math.random() - 0.5);

    if (isEmpty(x + dx, y + dy)) {
      movePixel(x, y, x + dx, y + dy);
    }

    // La radiación alfa tiene corto alcance, se disipa rápido
    if (Math.random() < 0.15) {
      deletePixel(x, y);
    }

    // Daña y calienta lo que toca
    for (let nx = x - 1; nx <= x + 1; nx++) {
      for (let ny = y - 1; ny <= y + 1; ny++) {
        let neighbor = pixelMap[nx]?.[ny];
        if (neighbor && neighbor.element !== "radiation" && neighbor.element !== "polonium") {
          changeTemp(nx, ny, Math.random() * 10);
          if (Math.random() < 0.01) {
            changePixel(nx, ny, "ash");
          }
        }
      }
    }
  }
};
