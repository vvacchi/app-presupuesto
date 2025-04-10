const ingresos = [];

const egresos = [];
//llamada a las funciones para darle funcionalidad a la app
let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        console.log(typeof ingreso.valor);
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}


let cargarCabecero = ()=>{//se cargan los id del html
    let ingresos = totalIngresos();
    let egresos = totalEgresos();

    if(isNaN(ingresos) || isNaN(egresos)){
        console.log('Error: totalIngresos o totalEgresos no es un número');
        ingresos = 0;
        egresos = 0;
    }
    //se verifica que los ingresos sean mayor que cero para poder realizar la division,
    //en caso contrario se devuelve cero paara evitar NaN
    let presupuesto = ingresos - egresos;
    let porcentajeEgreso = ingresos > 0 ? (egresos / ingresos) : 0;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(ingresos);
    document.getElementById('egresos').innerHTML = formatoMoneda(egresos);
}
//creo el formato en moneda Argentina
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-AR', {style:'currency', currency:'ARS', minimumFractionDigits:2});
}

const formatoPorcentaje = (valorP)=>{
    return valorP.toLocaleString('es-AR', {style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}
const crearIngresoHTML = (ingreso) =>{
    let ingresosHTML = `
    <div class="elemento limpiarEstilos">
                        <div class="elemento_descripcion">${ingreso.descripcion}</div>
                        <div class="derecha limpiarEstilos">
                            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                            <div class="elemento_eliminar">
                                <button class="elemento_eliminar--btn">
                                    <ion-icon name="close-circle-outline"
                                    onclick="eliminarIngreso(${ingreso.idIngreso})"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>`
    ;
    return ingresosHTML;
}

const eliminarIngreso = (idIngreso) =>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.idIngreso === idIngreso);//encontra el índice que estoy buscando
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}


const cargarEgresos = () =>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let porcentajeEgreso = totalIngresos() > 0 ? (egreso.valor / totalIngresos()) : 0;
    let egresosHTML = `
    <div class="elemento limpiarEstilos">
                        <div class="elemento_descripcion">${egreso.descripcion}</div>
                        <div class="derecha limpiarEstilos">
                            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div> 
                            <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
                            <div class="elemento_eliminar">
                                <button class="elemento_eliminar--btn">
                                    <ion-icon name="close-circle-outline"
                                    onclick="eliminarEgreso(${egreso.idEgreso})"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>`
    ;
    return egresosHTML;
};

const eliminarEgreso = (idEgreso) =>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.idEgreso === idEgreso);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () =>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if(descripcion.value === '' || valor.value === ''){
        alert('Por favor, complete todos los campos.');
        return;
    }

    if(isNaN(+valor.value) || +valor.value <= 0){
        alert('Por favor, ingrese un valor numérico válido.');
        return;
    }

    if(tipo.value === 'ingreso'){
        ingresos.push(new Ingreso(descripcion.value, +valor.value));
        cargarCabecero();
        cargarIngresos();
    }
    else if(tipo.value === 'egreso'){
        egresos.push(new Egreso(descripcion.value, +valor.value));
        cargarCabecero();
        cargarEgresos();
    }
    descripcion.value = '';
    valor.value = '';
    
}