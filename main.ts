function girar_izquierda (velocidad: number, tiempo_ms: number) {
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    girar_temporal(xgo.rotate_enum.Left, velocidad, tiempo_ms)
}
// =========================
// FUNCIONES DE MOVIMIENTO
// =========================
function mover_temporal (direccion: number, velocidad: number, tiempo_ms: number) {
    xgo.move_xgo(direccion, velocidad)
basic.pause(tiempo_ms)
    xgo.move_xgo(direccion, 0)
}
function detener_movimiento () {
    xgo.move_xgo(xgo.direction_enum.Forward, 0)
}
function detener_giro () {
    xgo.rotate(xgo.rotate_enum.Left, 0)
}
// =========================
// BOTONES
// =========================
input.onButtonPressed(Button.A, function () {
    avanzar(100, 1500)
    girar_izquierda(100, 1500)
    girar_derecha(100, 1500)
    retroceder(100, 1500)
})
function cerrar_gancho () {
    clamp_state = 1
    xgo.Manipulator_clamp(gancho_cerrado)
}
// =========================
// FUNCIONES DEL GANCHO
// =========================
function abrir_gancho () {
    let gancho_abierto = 0
    clamp_state = 0
    xgo.Manipulator_clamp(gancho_abierto)
}
function toggle_gancho () {
    if (clamp_state == 0) {
        basic.showLeds(`
            . # . # .
            . # . # .
            # # . # #
            . # . # .
            . # . # .
            `)
        cerrar_gancho()
    } else {
        basic.showLeds(`
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            `)
        abrir_gancho()
    }
}
function avanzar (velocidad: number, tiempo_ms: number) {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    mover_temporal(xgo.direction_enum.Forward, velocidad, tiempo_ms)
}
function retroceder (velocidad: number, tiempo_ms: number) {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    mover_temporal(xgo.direction_enum.Backward, velocidad, tiempo_ms)
}
input.onButtonPressed(Button.B, function () {
    toggle_gancho()
})
function girar_temporal (direccion: number, velocidad: number, tiempo_ms: number) {
    xgo.rotate(direccion, velocidad)
basic.pause(tiempo_ms)
    xgo.rotate(direccion, 0)
}
function girar_derecha (velocidad: number, tiempo_ms: number) {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    girar_temporal(xgo.rotate_enum.Right, velocidad, tiempo_ms)
}
let clamp_state = 0
let gancho_cerrado = 0
basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
gancho_cerrado = 200
// =========================
// INICIO DEL ROBOT
// =========================
xgo.init_xgo_serial(SerialPin.P14, SerialPin.P13)
xgo.execution_action(xgo.action_enum.Default_posture)
// Estado inicial del gancho
abrir_gancho()
