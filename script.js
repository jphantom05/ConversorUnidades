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

//longitud base metros
const factoresLongitud = {
    metros: 1,
    kilómetros: 1000,
    millas: 1609.34,
    pies: 0.3048,
    pulgadas: 0.0254,
    centímetros: 0.01,
    milímetros: 0.001
};

//masa base gramos
const factoresMasa = {
    gramos: 1,
    kilogramos: 1000,
    libras: 453.592,
    onzas: 28.3495
};

//velocidad base m/s
const factoresVelocidad = {
    "km/h": 0.277778,
    "m/s": 1,
    "mph": 0.44704,
    "nudos": 0.514444
};

//temperatura base Celsius
const factoresTemperatura = {
    "Celsius": {
        toCelsius: (temp) => temp,
        fromCelsius: (temp) => temp
    },
    "Fahrenheit": {
        toCelsius: (temp) => (temp - 32) * 5 / 9,
        fromCelsius: (temp) => (temp * 9 / 5) + 32
    },
    "Kelvin": {
        toCelsius: (temp) => temp - 273.15,
        fromCelsius: (temp) => temp + 273.15
    }
};

const inputOrigen = document.getElementById("valor");//input de la cantidad a convertir
const inputResultado = document.getElementById("resultado");//Resultado de la conversion

// Agrupamos las tablas de factores en un solo objeto para acceder dinámicamente
const tablaConversion = {
    longitud: factoresLongitud,
    masa: factoresMasa,
    velocidad: factoresVelocidad,
    temperatura: factoresTemperatura
}

//función para realizar la conversión
function convertir(valor, unidadOrigen, unidadDestino, tipoConversion) {
    if (isNaN(valor)) return "";

    //para temperatura se maneja de forma diferente
    if (tipoConversion === "temperatura") {
        const toCelsius = tablaConversion[tipoConversion][unidadOrigen].toCelsius;
        const fromCelsius = tablaConversion[tipoConversion][unidadDestino].fromCelsius;
        const valorCelsius = toCelsius(parseFloat(valor));
        return fromCelsius(valorCelsius);
    } else {
        const factorOrigen = tablaConversion[tipoConversion][unidadOrigen];
        const factorDestino = tablaConversion[tipoConversion][unidadDestino];
        return (parseFloat(valor) * factorOrigen) / factorDestino;
    }

    // Para otras categorías, se realiza la conversión utilizando los factores de conversión
    const factorOrigen = tablaConversion[tipoConversion][unidadOrigen];
    const factorDestino = tablaConversion[tipoConversion][unidadDestino];
    return (parseFloat(valor) * factorOrigen) / factorDestino;  
}

 // Cuando escribes en el primer cuadro (modifica el segundo)
 function actualizarValoraResultado() {
    if (inputOrigen.value === "") {inputResultado.value = "";}
    const valor = parseFloat(inputOrigen.value);
    const resultado = convertir(valor, unidadOrigen.value, unidadDestino.value, selectorTipo.value);
    inputResultado.value = resultado  !== "" ? Number(resultado.toFixed(4)) : "";
}

// Cuando escribes en el segundo cuadro (modifica el primero)
function actualizarValorOrigen() {
    if (inputResultado.value === "") {inputOrigen.value = "";}
    const valor = parseFloat(inputResultado.value);
    const resultado = convertir(valor, unidadDestino.value, unidadOrigen.value, selectorTipo.value);
    inputOrigen.value = resultado !== "" ? Number(resultado.toFixed(4)) : "";
}

//escuchar cambios en los selectores de unidad para actualizar la conversión
unidadOrigen.addEventListener("change", actualizarValoraResultado);
unidadDestino.addEventListener("change", actualizarValoraResultado);
inputOrigen.addEventListener("input", actualizarValoraResultado);
inputResultado.addEventListener("input", actualizarValorOrigen);