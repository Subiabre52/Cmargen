

document.addEventListener("DOMContentLoaded", function() {
    const costoBrutoInput = document.getElementById("costoBruto")
    const precioVentaInput = document.getElementById("precioVenta")
    const calcularBtn = document.getElementById("calcularBtn");
    const costoTotalOutput = document.getElementById("costoTotal");
    const margenBrutoOutput = document.getElementById("margenBruto");
    const margenVentaOutput = document.getElementById("margenVenta");

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

        let comisiones = precioVenta * 0.17
        let costoTotal = costoBruto + despacho + comisiones
        let margenBruto = precioVenta - costoTotal
        let margenVenta = margenBruto / precioVenta

        console.log("Costo Total:", costoTotal)
        console.log("Margen Bruto:", margenBruto)
        console.log("Margen Venta:", margenVenta)

        costoTotalOutput.textContent = formatNumber(costoTotal.toFixed(2))
        margenBrutoOutput.textContent = margenBruto.toFixed(2)
        margenVentaOutput.textContent = (margenVenta * 100).toFixed(2) + '%'
        document.getElementById("despachoValue").textContent = formatNumber(despacho.toFixed(2));
        document.getElementById("comisionesValue").textContent = formatNumber(comisiones.toFixed(2));
        document.getElementById("costoTotal").textContent = formatNumber(costoTotal.toFixed(2));
        document.getElementById("margenBruto").textContent = formatNumber(margenBruto.toFixed(2));
    }

    function formatNumber(num) {
        return '$' + parseFloat(num).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    
    calcularBtn.addEventListener("click", calcularMargen);
});