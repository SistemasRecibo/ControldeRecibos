let presentismoActual = 0; // Variable global para guardar el valor de presentismo ajustado
let descuentoSindicato = 0; // Variable global para guardar el valor del descuento por sindicato
let retencionJudicial = 0; // Variable global para guardar el valor de descuento por retención judicial

const currencyFormatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

// AUSENTISMO

// Mostrar motivo del ausentismo si es necesario
function mostrarMotivoAusentismo() {
    const ausentismo = document.getElementById('ausentismo').value;
    const motivoAusentismo = document.getElementById('motivo-ausentismo');
    const cantidadAusencias = document.getElementById('cantidad-ausencias');

    if (ausentismo === "si") {
        motivoAusentismo.style.display = "block";
        // También reseteamos los valores al mostrar el motivo
        document.getElementById('motivo').value = "";
        document.getElementById('numero-ausencias').value = "";
    } else {
        motivoAusentismo.style.display = "none";
        cantidadAusencias.style.display = "none";
        document.getElementById('numero-ausencias').value = ""; // Resetea el campo de número de ausencias
        actualizarPresentismo(); // Restablecer presentismo si no hubo ausentismo
    }
}

// Actualizar el motivo del ausentismo y el presentismo ajustado
function actualizarMotivo() {
    const motivo = document.getElementById('motivo').value;
    const cantidadAusencias = document.getElementById('cantidad-ausencias');

    if (motivo === "injustificada") {
        cantidadAusencias.style.display = "none"; // Oculta el campo de número de ausencias
        document.getElementById('numero-ausencias').value = ""; // Resetea el valor del campo de número de ausencias
        actualizarPresentismo(); // Actualiza el presentismo inmediatamente
    } else if (motivo === "justificada") {
        cantidadAusencias.style.display = "block"; // Muestra el campo de número de ausencias
    } else {
        cantidadAusencias.style.display = "none"; // Oculta el campo si no hay selección válida
    }
}

// Función para actualizar el presentismo basado en el motivo del ausentismo y el número de ausencias
function actualizarPresentismo() {
    const motivo = document.getElementById('motivo').value;
    const cantidadAusencias = parseInt(document.getElementById('numero-ausencias').value) || 0;
    const presentismo = parseFloat(document.getElementById('presentismo').value) || 0; // Obtener el valor actualizado del formulario

    let presentismoCalculado = presentismo; // Usamos una variable local para calcular el presentismo ajustado

    if (motivo === "injustificada") {
        presentismoCalculado = 0; // Si es injustificado, presentismo = 0
    } else if (motivo === "justificada") {
        if (cantidadAusencias === 1) {
            presentismoCalculado = presentismo; // Primera ausencia, se paga completo
        } else if (cantidadAusencias === 2) {
            presentismoCalculado = presentismo - (presentismo * 0.1); // Segunda ausencia, se pierde el 10%
        } else if (cantidadAusencias === 3) {
            presentismoCalculado = presentismo - (presentismo * 0.2); // Tercera ausencia, se pierde el 20%
        } else if (cantidadAusencias >= 4) {
            presentismoCalculado = presentismo - (presentismo * 0.3); // Cuarta o más ausencias, se pierde el 30%
        }
    } else {
        presentismoCalculado = presentismo; // Si no hay motivo válido, mantén el presentismo original
    }

// Actualizar el campo de resultado del presentismo ajustado
    document.getElementById('presentismo-ajustado').textContent = currencyFormatter.format(presentismoCalculado);

// Guardar el valor calculado en la variable global
    presentismoActual = presentismoCalculado;
}

// HORAS EXTRAS

    document.getElementById('horas_si').addEventListener('change', function() {
            document.getElementById('horasCampos').style.display = 'block';
            // Si el usuario elige 'sí', no se modifican los valores de los inputs
        });

        document.getElementById('horas_no').addEventListener('change', function() {
            document.getElementById('horasCampos').style.display = 'none';
            // Si el usuario elige 'no', se ponen los valores de los inputs en 0
            document.getElementById('horas_50').value = 0;
            document.getElementById('horas_100').value = 0;
            document.getElementById('horas_noturnas_50').value = 0;
            document.getElementById('horas_noturnas_100').value = 0;
        });

// VACACIONES

    document.getElementById('vacaciones_si').addEventListener('change', function() {
            document.getElementById('vacacionesCampos').style.display = 'block';
            // Si el usuario elige 'sí', no se modifican los valores de los inputs
        });

        document.getElementById('vacaciones_no').addEventListener('change', function() {
            document.getElementById('vacacionesCampos').style.display = 'none';
            // Si el usuario elige 'no', se ponen los valores de los inputs en 0
            document.getElementById('vacaciones').value = 0;
            document.getElementById('adicional_vacaciones').value = 0;
        });        


// SINDICATO  

// Asegura de que actualizar Motivo se llame cada vez que el motivo del ausentismo cambia 
    document.getElementById('motivo').addEventListener('change', actualizarMotivo);
    document.getElementById('numero-ausencias').addEventListener('input', actualizarPresentismo);
    document.getElementById('ausentismo').addEventListener('change', mostrarMotivoAusentismo);

// Funcion para seleccionar entre 3% y 3.5%
    document.getElementById('gremio').addEventListener('change', function() {
            var descuentoOptions = document.getElementById('descuentoOptions');
            if (this.value === 'si') {
                descuentoOptions.style.display = 'block';
            } else {
                descuentoOptions.style.display = 'none';
            }
        });

// Evento para actualizar la variable con el descuento seleccionado
        document.getElementById('descuento').addEventListener('change', function() {
            descuentoSindicato = parseFloat(this.value);
            console.log('Descuento seleccionado:', descuentoSindicato);
        });


// RETENCIÓN JUDICIAL
        document.getElementById('retencion_jud').addEventListener('change', function() {
        var retencionOptions = document.getElementById('retencionOptions');
        var retencion = document.getElementById('retencion');

        if (this.value === 'si') {
            retencionOptions.style.display = 'block';
            retencion.required = true;
        } else {
            retencionOptions.style.display = 'none';
            retencion.required = false;
            retencion.value = ''; // Limpiar el valor si el campo está oculto
            retencionJudicial = 0; // Establecer la variable a 0 cuando el campo está oculto
        }
    });

    document.getElementById('retencion').addEventListener('input', function() {
        // Convertir el valor del campo a número y actualizar la variable
        retencionJudicial = parseFloat(this.value) || 0;
    });

// LICENCIA ENFERMEDAD
    document.getElementById('licencia_si').addEventListener('change', function() {
            document.getElementById('licenciaCampos').style.display = 'block';
            // Si el usuario elige 'sí', no se modifican los valores de los inputs
        });

        document.getElementById('licencia_no').addEventListener('change', function() {
            document.getElementById('licenciaCampos').style.display = 'none';
            // Si el usuario elige 'no', se ponen los valores de los inputs en 0
            document.getElementById('licencia_enfermedad').value = 0;
            document.getElementById('licencias').value = 0;
            document.getElementById('licencia_gremial').value = 0;
        });


// AGUINALDO
    document.getElementById('aguinaldo_si').addEventListener('change', function() {
            document.getElementById('aguinaldoCampos').style.display = 'block';
            // Si el usuario elige 'sí', no se modifican los valores de los inputs
        });

        document.getElementById('aguinaldo_no').addEventListener('change', function() {
            document.getElementById('aguinaldoCampos').style.display = 'none';
            // Si el usuario elige 'no', se ponen los valores de los inputs en 0
            document.getElementById('aguinaldo').value = 0;
            document.getElementById('aguinaldo_recibo').value = 0;
        });        

// RECARGAR PÁGINA 
        function recargarPagina() {
            location.reload(); // Recarga la página
        }


        
// CÁLCULOS

function calcularResultados() {

    actualizarPresentismo(); // Llamar a la función actualizar presentismo


    // Obtener valores del formulario
    const sueldoBasico = parseFloat(document.getElementById('sueldo_basico').value) || 0;
    const sueldoRecibo = parseFloat(document.getElementById('sueldo_recibo').value) || 0;
    const antiguedad = parseFloat(document.getElementById('antiguedad').value) || 0;
    
    const presentismoAjust = presentismoActual; // Usar el valor ajustado del presentismo
    const horasNocturnas = parseFloat(document.getElementById('horas_nocturnas').value) || 0;
    const horasFeriado = parseFloat(document.getElementById('horas_feriado').value) || 0;
    const horas50 = parseFloat(document.getElementById('horas_50').value) || 0;
    const horas100 = parseFloat(document.getElementById('horas_100').value) || 0;
    const horasNoturnas50 = parseFloat(document.getElementById('horas_noturnas_50').value) || 0;
    const horasNoturnas100 = parseFloat(document.getElementById('horas_noturnas_100').value) || 0;
    const licenciaEnfermedad = parseFloat(document.getElementById('licencia_enfermedad').value) || 0;
    const licencias = parseFloat(document.getElementById('licencias').value) || 0;
    const licenciaGremial = parseFloat(document.getElementById('licencia_gremial').value) || 0;
    const FeriadosNoTrabajados = parseFloat(document.getElementById('feriados_no_trabajados').value) || 0;


    const vacaciones = parseFloat(document.getElementById('vacaciones').value) || 0;
    const adicionalVacaciones = parseFloat(document.getElementById('adicional_vacaciones').value) || 0;

    const viaticoAcuerdo2021 = parseFloat(document.getElementById('viatico_acuerdo_2021').value) || 0;
    const viatico = parseFloat(document.getElementById('viatico').value) || 0;
    const adicionalArt25 = parseFloat(document.getElementById('adicional_art25').value) || 0;
    const adicionalArt25Remu = parseFloat(document.getElementById('adicional_art25_rem').value) || 0;


    const descAnticipos = parseFloat(document.getElementById('anticipo').value) || 0;
    const aguinaldo = parseFloat(document.getElementById('aguinaldo').value) || 0;
    const aguinaldoRecibo = parseFloat(document.getElementById('aguinaldo_recibo').value) || 0;

    

    // Calcular los valores
    const antiguedadCalculada = sueldoBasico * 0.01 * antiguedad;
    const valorHoraSimple = (sueldoBasico + antiguedadCalculada + presentismoAjust) / 200;
    const valorHoraNocturna = (sueldoBasico + antiguedadCalculada) * 0.001;
    const totalHorasNocturnas = valorHoraNocturna * horasNocturnas;
    const totalHorasFeriado = valorHoraSimple * horasFeriado * 2;
    const totalLicencias = ((sueldoBasico + antiguedadCalculada + presentismoAjust) / 25) * licencias; 
    const totalLicenciaGremial = ((sueldoBasico + antiguedadCalculada + presentismoAjust) / 25) * licenciaGremial;
    const totalLicenciaEnfermedad = ((sueldoBasico + antiguedadCalculada + presentismoAjust) / 30) * licenciaEnfermedad;
    const totalAusencias = ((sueldoBasico + antiguedadCalculada + presentismoAjust) / 30) * (licencias + licenciaGremial + licenciaEnfermedad);
    const totalFeriadosNoTrabajados = (sueldoBasico + antiguedadCalculada + presentismoAjust) / 25 * FeriadosNoTrabajados;


    //Calcular vacaciones
    const lic_vacaciones = (sueldoBasico + antiguedadCalculada + presentismoAjust) / 25 * vacaciones;
    const aus_vacaciones = (sueldoBasico + antiguedadCalculada + presentismoAjust) / 30 * vacaciones;
    


    // Calcular el valor de las horas extras
    const valorHoras50 = (sueldoBasico + antiguedadCalculada + presentismoAjust) / 200 * 1.5 * horas50;
    const valorHoras100 = valorHoraSimple * 2 * horas100;
    const valorHorasNoturnas50 = ((valorHoraNocturna / 2) + valorHoraNocturna) * horasNoturnas50;
    const valorHorasNoturnas100 = valorHoraNocturna * 2 * horasNoturnas100;

    // Calcular zona
    const valorZona = (sueldoBasico + totalHorasFeriado + antiguedadCalculada + totalHorasNocturnas + presentismoAjust + lic_vacaciones - aus_vacaciones + adicionalVacaciones + valorHoras50 + valorHoras100 + adicionalArt25Remu + totalLicencias + totalLicenciaEnfermedad + totalLicenciaGremial - totalAusencias + FeriadosNoTrabajados) * 0.2;

    // Calcular valores totales de Haberes y Adicionales
    const totalHaberes = sueldoBasico + totalHorasFeriado + antiguedadCalculada + totalHorasNocturnas + presentismoAjust + lic_vacaciones - aus_vacaciones + adicionalVacaciones + valorHoras50 + valorHoras100 + adicionalArt25Remu + totalLicencias + totalLicenciaEnfermedad + totalLicenciaGremial - totalAusencias + FeriadosNoTrabajados + valorZona; 
    const totalAdicionales = viaticoAcuerdo2021 + viatico + adicionalArt25;


    // Calcular retenciones
    const jubilacion = totalHaberes * 0.11;
    const ley_19032 = totalHaberes * 0.03;
    const obra_social = totalHaberes * 0.03;
    const sindicato = totalHaberes * (descuentoSindicato / 100);
    const retencion_judicial = totalHaberes * (retencionJudicial / 100);


    // Calcular valores totales de retenciones
    const totalRetenciones = jubilacion + ley_19032 + obra_social + descAnticipos + sindicato + retencion_judicial;

    // Calcular aguinaldo
    const valorAguinaldo = aguinaldo / 2;

    // Calcular retenciones de aguinaldo
    const jubilacion_sobreSAC = valorAguinaldo * 0.11;
    const ley_19032_sobreSAC = valorAguinaldo * 0.03;
    const obra_social_sobreSAC = valorAguinaldo * 0.03;
    const sindicato_sobreSAC = valorAguinaldo * (descuentoSindicato / 100);
    const retencion_judicial_sobreSAC = valorAguinaldo * (retencionJudicial / 100);
    
    const total_retenciones_sobreSAC = jubilacion_sobreSAC + ley_19032_sobreSAC + obra_social_sobreSAC + sindicato_sobreSAC + retencion_judicial_sobreSAC;

    // Calcular sueldo a cobrar
    const total = totalHaberes + totalAdicionales - totalRetenciones;

    // Calcular total de aguinaldo
    const total_SAC = valorAguinaldo - total_retenciones_sobreSAC;

    // Calcular la diferencia entre el sueldo y el aguinaldo según recibo y el calculado
    const diftotal = total - sueldoRecibo;
    const diftotalSAC = total_SAC - aguinaldoRecibo;
    

    // Mostrar los resultados en la sección valor de una hora
    document.getElementById('resultado_hora_simple').textContent = ` ${currencyFormatter.format(valorHoraSimple)}`;
    document.getElementById('resultado_hora_nocturna').textContent = ` ${currencyFormatter.format(valorHoraNocturna)}`;


    // Mostrar los resultados en la sección habres con aportes
    document.getElementById('resultado_sueldo').textContent = ` ${currencyFormatter.format(sueldoBasico)}`;
    document.getElementById('resultado_antiguedad').textContent = ` ${currencyFormatter.format(antiguedadCalculada)}`;
    document.getElementById('resultado_presentismo').textContent = ` ${currencyFormatter.format(presentismoAjust)}`;
    document.getElementById('resultado_total_horas_nocturnas').textContent = ` ${currencyFormatter.format(totalHorasNocturnas)}`;
    document.getElementById('resultado_total_horas_feriados').textContent = ` ${currencyFormatter.format(totalHorasFeriado)}`;
    document.getElementById('resultado_horas_50').textContent = ` ${currencyFormatter.format(valorHoras50)}`;
    document.getElementById('resultado_horas_100').textContent = ` ${currencyFormatter.format(valorHoras100)}`;
    document.getElementById('resultado_horas_noturnas_50').textContent = ` ${currencyFormatter.format(valorHorasNoturnas50)}`;
    document.getElementById('resultado_horas_noturnas_100').textContent = ` ${currencyFormatter.format(valorHorasNoturnas100)}`;
    document.getElementById('resultado_total_feriados_no_trabajados').textContent = ` ${currencyFormatter.format(totalFeriadosNoTrabajados)}`;
    
    document.getElementById('resultado_lic_vacaciones').textContent = ` ${currencyFormatter.format(lic_vacaciones)}`;
    document.getElementById('resultado_aus_vacaciones').textContent = ` - ${currencyFormatter.format(aus_vacaciones)}`;
    document.getElementById('resultado_adic_vacaciones').textContent = ` ${currencyFormatter.format(adicionalVacaciones)}`;
    document.getElementById('resultado_art_25_rem').textContent = ` ${currencyFormatter.format(adicionalArt25Remu)}`;
    document.getElementById('resultado_total_licencia_enfermedad').textContent = ` ${currencyFormatter.format(totalLicenciaEnfermedad)}`;
    document.getElementById('resultado_total_licencias').textContent = ` ${currencyFormatter.format(totalLicencias)}`;
    document.getElementById('resultado_total_licencia_gremial').textContent = ` ${currencyFormatter.format(totalLicenciaGremial)}`;
    document.getElementById('resultado_total_ausencias').textContent = ` - ${currencyFormatter.format(totalAusencias)}`;
    document.getElementById('resultado_Zona').textContent = ` ${currencyFormatter.format(valorZona)}`;

    // Mostrar el total de haberes
    document.getElementById('resultado_total_haberes').textContent = ` ${currencyFormatter.format(totalHaberes)}`;


    // Mostrar los resultados en la sección adicionales
    document.getElementById('resultado_acuerdo_2021').textContent = ` ${currencyFormatter.format(viaticoAcuerdo2021)}`;
    document.getElementById('resultado_viatico').textContent = ` ${currencyFormatter.format(viatico)}`;
    document.getElementById('resultado_art_25').textContent = ` ${currencyFormatter.format(adicionalArt25)}`;


    // Mostrar el total de adicionales
    document.getElementById('resultado_total_adicionales').textContent = ` ${currencyFormatter.format(totalAdicionales)}`;


    // Mostrar los resultados en la sección de retenciones
    document.getElementById('resultado_jubilacion').textContent = ` ${currencyFormatter.format(jubilacion)}`;
    document.getElementById('resultado_ley_19032').textContent = ` ${currencyFormatter.format(ley_19032)}`;
    document.getElementById('resultado_obra_social').textContent = ` ${currencyFormatter.format(obra_social)}`;
    document.getElementById('resultado_desc_anticipos').textContent = ` ${currencyFormatter.format(descAnticipos)}`;
    document.getElementById('resultado_sindicato').textContent = ` ${currencyFormatter.format(sindicato)}`;
    document.getElementById('resultado_retencion_judicial').textContent = ` ${currencyFormatter.format(retencion_judicial)}`;
   
    

    // Mostrar el total de las retenciones
    document.getElementById('resultado_total_retenciones').textContent = ` ${currencyFormatter.format(totalRetenciones)}`;

    // Mostrar los resultados en la sección aguinaldo
    document.getElementById('resultado_valorAguinaldo').textContent = ` ${currencyFormatter.format(valorAguinaldo)}`;
    document.getElementById('resultado_jubilacion_sobreSAC').textContent = ` - ${currencyFormatter.format(jubilacion_sobreSAC)}`;
    document.getElementById('resultado_ley_19032_sobreSAC').textContent = ` - ${currencyFormatter.format(ley_19032_sobreSAC)}`;
    document.getElementById('resultado_obra_social_sobreSAC').textContent = ` - ${currencyFormatter.format(obra_social_sobreSAC)}`;
    document.getElementById('resultado_sindicato_sobreSAC').textContent = ` - ${currencyFormatter.format(sindicato_sobreSAC)}`;
    document.getElementById('resultado_retencion_judicial_sobreSAC').textContent = ` - ${currencyFormatter.format(retencion_judicial_sobreSAC)}`;
    document.getElementById('resultado_total_retenciones_sobreSAC').textContent = ` - ${currencyFormatter.format(total_retenciones_sobreSAC)}`;

    // Mostrar los resultados en la sección total a cobrar
    document.getElementById('resultado_total').textContent = ` ${currencyFormatter.format(total)}`;
    document.getElementById('resultado_sueldoRecibo').textContent = ` ${currencyFormatter.format(sueldoRecibo)}`;
    document.getElementById('resultado_diftotal').textContent = ` ${currencyFormatter.format(diftotal)}`;
    document.getElementById('resultado_total_SAC').textContent = ` ${currencyFormatter.format(total_SAC)}`;
    document.getElementById('resultado_aguinaldoRecibo').textContent = ` ${currencyFormatter.format(aguinaldoRecibo)}`;
    document.getElementById('resultado_diftotalSAC').textContent = ` ${currencyFormatter.format(diftotalSAC)}`;

    return false; // Evita el envío del formulario
}

