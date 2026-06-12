function girar_izquierda(velocidad: number, tiempo_ms: number) {
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    girar_temporal(xgo.rotate_enum.Left, velocidad, tiempo_ms)
}

//  =========================
//  FUNCIONES DE MOVIMIENTO
//  =========================
function mover_temporal(direccion: number, velocidad2: number, tiempo_ms2: number) {
    xgo.move_xgo(direccion, velocidad2)
    basic.pause(tiempo_ms2)
    xgo.move_xgo(direccion, 0)
}

function detener_movimiento() {
    xgo.move_xgo(xgo.direction_enum.Forward, 0)
}

function detener_giro() {
    xgo.rotate(xgo.rotate_enum.Left, 0)
}

//  =========================
//  BOTONES
//  =========================
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    avanzar(100, 1500)
    girar_izquierda(100, 1500)
    girar_derecha(100, 1500)
    retroceder(100, 1500)
})
function cerrar_gancho() {
    
    clamp_state = 1
    xgo.Manipulator_clamp(gancho_cerrado)
}

//  =========================
//  FUNCIONES DEL GANCHO
//  =========================
function abrir_gancho() {
    
    let gancho_abierto = 0
    clamp_state = 0
    xgo.Manipulator_clamp(gancho_abierto)
}

function toggle_gancho() {
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

function avanzar(velocidad3: number, tiempo_ms3: number) {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    mover_temporal(xgo.direction_enum.Forward, velocidad3, tiempo_ms3)
}

function retroceder(velocidad4: number, tiempo_ms4: number) {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    mover_temporal(xgo.direction_enum.Backward, velocidad4, tiempo_ms4)
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    toggle_gancho()
})
function girar_temporal(direccion2: number, velocidad5: number, tiempo_ms5: number) {
    xgo.rotate(direccion2, velocidad5)
    basic.pause(tiempo_ms5)
    xgo.rotate(direccion2, 0)
}

function girar_derecha(velocidad6: number, tiempo_ms6: number) {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    girar_temporal(xgo.rotate_enum.Right, velocidad6, tiempo_ms6)
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
//  =========================
//  INICIO DEL ROBOT
//  =========================
xgo.init_xgo_serial(SerialPin.P14, SerialPin.P13)
xgo.execution_action(xgo.action_enum.Default_posture)
//  Estado inicial del gancho
abrir_gancho()
