//libreta de unidades
const unidadesCategoria = {
    longitud: ["metros", "kilómetros", "millas", "pies", "pulgadas", "centímetros", "milímetros"],
    masa: ["gramos", "kilogramos", "libras", "onzas"],
    velocidad: ["km/h", "m/s", "mph", "nudos"],
    temperatura: ["Celsius", "Fahrenheit", "Kelvin"]
};

const selectorTipo = document.getElementById("tipoConversion");//selector del tipo de conversion
const unidadOrigen = document.getElementById("unidadOrigen");//selector de la unidad de origen
const unidadDestino = document.getElementById("unidadDestino");//selector de la unidad de destino

// Agregar un evento de cambio al selector de tipo de conversión
selectorTipo.addEventListener("change", function() {
    const categoriaSeleccionada = selectorTipo.value;
    
    const listaUnidades = unidadesCategoria[categoriaSeleccionada];
    
    let opcionesHTML = "";
    listaUnidades.forEach(function(unidad) {
        opcionesHTML += `<option value="${unidad}">${unidad}</option>`;
    });
    unidadOrigen.innerHTML = opcionesHTML;
    unidadDestino.innerHTML = opcionesHTML;
});