export async function waitUntil(fechaParaReservar){
    while(true){
        const tiempoRestante = new Date(fechaParaReservar).getTime() - Date.now();
        if(tiempoRestante <= 0) {
            return
        }
        const espera = tiempoRestante > 60_000 ? 30_000 : Math.min(tiempoRestante, 1_000);
        await new Promise(resolve => {setTimeout(resolve, espera)})
    }
}