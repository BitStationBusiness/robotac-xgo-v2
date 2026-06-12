//% color="#3A4A3F" icon="\uf1b9" block="ROBOTAC XGOS"
namespace robotac_xgos {

    let clampState = 0

    const GANCHO_ABIERTO = 0
    const GANCHO_CERRADO = 196

    enum DireccionMovimiento {
        Avanzar,
        Retroceder
    }

    enum DireccionGiro {
        Izquierda,
        Derecha
    }

    function limitar(valor: number, minimo: number, maximo: number): number {
        if (valor < minimo) {
            return minimo
        }

        if (valor > maximo) {
            return maximo
        }

        return valor
    }

    function segundosAMilisegundos(segundos: number): number {
        segundos = limitar(segundos, 0, 60)
        return segundos * 1000
    }

    function enviarComando(registro: number, valor: number): void {
        let buffer = pins.createBuffer(9)

        buffer[0] = 0x55
        buffer[1] = 0x00
        buffer[2] = 0x09
        buffer[3] = 0x00
        buffer[4] = registro
        buffer[5] = valor
        buffer[6] = ~(0x09 + 0x00 + registro + valor)
        buffer[7] = 0x00
        buffer[8] = 0xAA

        serial.writeBuffer(buffer)
    }

    function posturaInicial(): void {
        enviarComando(0x3E, 0xFF)
        basic.pause(1000)
    }

    function moverInterno(direccion: DireccionMovimiento, velocidad: number): void {
        velocidad = limitar(velocidad, 0, 100)

        let valor = 128

        if (direccion == DireccionMovimiento.Avanzar) {
            valor = Math.map(velocidad, 0, 100, 128, 255)
        } else {
            valor = Math.map(velocidad, 0, 100, 128, 0)
        }

        enviarComando(0x30, valor)
    }

    function girarInterno(direccion: DireccionGiro, velocidad: number): void {
        velocidad = limitar(velocidad, 0, 100)

        let valor = 128

        if (direccion == DireccionGiro.Izquierda) {
            valor = Math.map(velocidad, 0, 100, 128, 255)
        } else {
            valor = Math.map(velocidad, 0, 100, 128, 0)
        }

        enviarComando(0x32, valor)
    }

    function detenerMovimiento(): void {
        enviarComando(0x30, 128)
    }

    function detenerGiro(): void {
        enviarComando(0x32, 128)
    }

    function moverTemporal(direccion: DireccionMovimiento, velocidad: number, segundos: number): void {
        moverInterno(direccion, velocidad)
        basic.pause(segundosAMilisegundos(segundos))
        detenerMovimiento()
    }

    function girarTemporal(direccion: DireccionGiro, velocidad: number, segundos: number): void {
        girarInterno(direccion, velocidad)
        basic.pause(segundosAMilisegundos(segundos))
        detenerGiro()
    }

    function moverGancho(valor: number): void {
        valor = limitar(valor, 0, 255)
        enviarComando(0x71, valor)
        basic.pause(3000)
    }

    /**
     * Inicializa el robot XGOS V2 y deja el gancho abierto.
     */
    //% block="iniciar XGOS"
    //% group="Inicio"
    //% weight=100
    export function iniciarXGOS(): void {
        clampState = 0

        serial.redirect(
            SerialPin.P14,
            SerialPin.P13,
            BaudRate.BaudRate115200
        )

        posturaInicial()
        abrirGancho()

        // Mostrar carita feliz al iniciar
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    }

    /**
     * Avanza durante una cantidad de segundos.
     * @param velocidad velocidad de 0 a 100
     * @param segundos tiempo en segundos
     */
    //% block="avanzar velocidad $velocidad durante $segundos segundos"
    //% group="Movimiento"
    //% velocidad.min=0 velocidad.max=100 velocidad.defl=100
    //% segundos.min=0 segundos.max=10 segundos.defl=1
    //% weight=90
    export function avanzar(velocidad: number, segundos: number): void {
        // Mostrar flecha hacia adelante (abajo)
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        moverTemporal(DireccionMovimiento.Avanzar, velocidad, segundos)
    }

    /**
     * Retrocede durante una cantidad de segundos.
     * @param velocidad velocidad de 0 a 100
     * @param segundos tiempo en segundos
     */
    //% block="retroceder velocidad $velocidad durante $segundos segundos"
    //% group="Movimiento"
    //% velocidad.min=0 velocidad.max=100 velocidad.defl=100
    //% segundos.min=0 segundos.max=10 segundos.defl=1
    //% weight=80
    export function retroceder(velocidad: number, segundos: number): void {
        // Mostrar flecha hacia atrás (arriba)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        moverTemporal(DireccionMovimiento.Retroceder, velocidad, segundos)
    }

    /**
     * Gira a la izquierda durante una cantidad de segundos.
     * @param velocidad velocidad de 0 a 100
     * @param segundos tiempo en segundos
     */
    //% block="girar izquierda velocidad $velocidad durante $segundos segundos"
    //% group="Movimiento"
    //% velocidad.min=0 velocidad.max=100 velocidad.defl=100
    //% segundos.min=0 segundos.max=10 segundos.defl=1
    //% weight=70
    export function girarIzquierda(velocidad: number, segundos: number): void {
        // Mostrar flecha a la izquierda (según configuración de la placa)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        girarTemporal(DireccionGiro.Izquierda, velocidad, segundos)
    }

    /**
     * Gira a la derecha durante una cantidad de segundos.
     * @param velocidad velocidad de 0 a 100
     * @param segundos tiempo en segundos
     */
    //% block="girar derecha velocidad $velocidad durante $segundos segundos"
    //% group="Movimiento"
    //% velocidad.min=0 velocidad.max=100 velocidad.defl=100
    //% segundos.min=0 segundos.max=10 segundos.defl=1
    //% weight=60
    export function girarDerecha(velocidad: number, segundos: number): void {
        // Mostrar flecha a la derecha (según configuración de la placa)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        girarTemporal(DireccionGiro.Derecha, velocidad, segundos)
    }

    /**
     * Abre el gancho.
     */
    //% block="abrir gancho"
    //% group="Gancho"
    //% weight=50
    export function abrirGancho(): void {
        clampState = 0
        // Mostrar gancho abierto
        basic.showLeds(`
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            `)
        moverGancho(GANCHO_ABIERTO)
    }

    /**
     * Cierra el gancho.
     */
    //% block="cerrar gancho"
    //% group="Gancho"
    //% weight=40
    export function cerrarGancho(): void {
        clampState = 1
        // Mostrar gancho cerrado
        basic.showLeds(`
            . # . # .
            . # . # .
            # # . # #
            . # . # .
            . # . # .
            `)
        moverGancho(GANCHO_CERRADO)
    }

    /**
     * Cambia el estado del gancho. Si está abierto, lo cierra. Si está cerrado, lo abre.
     */
    //% block="alternar gancho"
    //% group="Gancho"
    //% weight=30
    export function alternarGancho(): void {
        if (clampState == 0) {
            cerrarGancho()
        } else {
            abrirGancho()
        }
    }
}
