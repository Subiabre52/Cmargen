

document.addEventListener("DOMContentLoaded", function() {
    const costoBrutoInput = document.getElementById("costoBruto")
    const precioVentaInput = document.getElementById("precioVenta")
    const calcularBtn = document.getElementById("calcularBtn")
    const costoTotalOutput = document.getElementById("costoTotal")
    const margenBrutoOutput = document.getElementById("margenBruto")
    const margenVentaOutput = document.getElementById("margenVenta")
    const plataformaInput = document.getElementById("plataforma")
    const comisionesPlataforma = {
        "Mercado Libre": 0.17,
        "Mercado Shops": 0.027,
        // "Tienda": 0
    }
    const rangosColores = [
        { limiteSuperior: 10, color: 'red' },   // Menos de 10%
        { limiteInferior: 10, limiteSuperior: 20, color: 'yellow' }, // Entre 10% y 20%
        { limiteInferior: 20, color: 'green' } // 20% o más
    ]

    let ubicacionUsuario = prompt("Por favor, ingresa tu localidad:");
    console.log("El usuario está en:", ubicacionUsuario);
    
    if (ubicacionUsuario) {
        document.getElementById("localidadUsuario").textContent = ubicacionUsuario;
    } else {
        document.getElementById("localidadUsuario").textContent = "Sin ubicación"
        console.log("El usuario no ingresó su localidad.");
    }

    function calcularMargen() {
        let costoBruto = parseFloat(costoBrutoInput.value)
        let precioVenta = parseFloat(precioVentaInput.value)

        console.log("Costo Bruto:", costoBruto)
        console.log("Precio Venta:", precioVenta)
        
        let despacho = 3500;
        if (precioVenta >= 16990) {
            let additionalAmount = precioVenta - 16990;
            let increaseSteps = Math.floor(additionalAmount / 10000)
            for (let i = 0; i < increaseSteps; i++) {
                despacho += 500
            }
        } else {
            despacho = 0;
        }
        // let despacho = precioVenta > 16990 ? 4000 : 0
        let nombrePlataforma = plataformaInput.value
        let comision = comisionesPlataforma[nombrePlataforma]
        let costoTotal = costoBruto + despacho + (precioVenta * comision)
        let margenBruto = precioVenta - costoTotal
        let margenVenta = margenBruto / precioVenta

        console.log("Costo Total:", costoTotal)
        console.log("Margen Bruto:", margenBruto)
        console.log("Margen Venta:", margenVenta)

        costoTotalOutput.textContent = formatNumber(costoTotal.toFixed(2))
        margenBrutoOutput.textContent = margenBruto.toFixed(2)
        margenVentaOutput.textContent = (margenVenta * 100).toFixed(2) + '%'
        document.getElementById("despachoValue").textContent = formatNumber(despacho.toFixed(2))
        document.getElementById("comisionesValue").textContent = formatNumber(comision.toFixed(2))
        document.getElementById("costoTotal").textContent = formatNumber(costoTotal.toFixed(2))
        document.getElementById("margenBruto").textContent = formatNumber(margenBruto.toFixed(2))

        let margenVentaPorcentaje = parseFloat(margenVenta * 100).toFixed(2)
        
        let colorSeleccionado = 'black'
        for (let rango of rangosColores) {
            if (rango.limiteInferior !== undefined && margenVentaPorcentaje >= rango.limiteInferior && (rango.limiteSuperior === undefined || margenVentaPorcentaje < rango.limiteSuperior)) {
                colorSeleccionado = rango.color
                break
            }else if (rango.limiteSuperior !== undefined && margenVentaPorcentaje < rango.limiteSuperior) {
                colorSeleccionado = rango.color
                break;

            }
        }
        margenVentaOutput.style.color = colorSeleccionado
    }

    function formatNumber(num) {
        return '$' + parseFloat(num).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    
    calcularBtn.addEventListener("click", calcularMargen)
})
