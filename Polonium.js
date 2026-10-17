// mod_polonio.js
// Cargar en: sandboxels.r74n.com/?mods=URL_DE_TU_MOD

addElement("polonium", {
    color: "#C8A832",
    colorRandom: 15,
    category: "solids",
    state: "solid",
    density: 9200,
    conduct: 0.03,
    temp: 27,
    tempLow: -10,
    stateLow: "polonium",
    tempHigh: 254,
    stateHigh: "polonium_gas",
    name: "Polonio",
    desc: "Metaloide radiactivo. Emite radiación alfa.",
    tick: function(pixel) {
        // Radiación descontrolada
        for (let i = 0; i < 4; i++) {
            let rx = pixel.x + Math.round((Math.random()-0.5)*8);
            let ry = pixel.y + Math.round((Math.random()-0.5)*8);
            if (inBounds(rx, ry) && isEmpty(rx, ry)) {
                createPixel("radiation", rx, ry);
            }
        }
        // Desintegración en plomo
        if (Math.random() < 0.00003) {
            pixel.element = "lead";
        }
        pixel.temp += 0.1;
    }
});

addElement("radiation", {
    color: "#FF6600",
    category: "energy",
    state: "gas",
    density: -1,
    name: "Radiación α",
    desc: "Partícula alfa del polonio.",
    tick: function(pixel) {
        pixel.x += Math.round((Math.random()-0.5)*3);
        pixel.y -= 1;
        if (Math.random() < 0.2) deletePixel(pixel.x, pixel.y);
        pixel.temp = 500;
    }
});
