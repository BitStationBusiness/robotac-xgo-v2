def girar_izquierda(velocidad: number, tiempo_ms: number):
    basic.show_leds("""
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        """)
    girar_temporal(xgo.rotate_enum.LEFT, velocidad, tiempo_ms)
# =========================
# FUNCIONES DE MOVIMIENTO
# =========================
def mover_temporal(direccion: number, velocidad2: number, tiempo_ms2: number):
    xgo.move_xgo(direccion, velocidad2)
    basic.pause(tiempo_ms2)
    xgo.move_xgo(direccion, 0)
def detener_movimiento():
    xgo.move_xgo(xgo.direction_enum.FORWARD, 0)
def detener_giro():
    xgo.rotate(xgo.rotate_enum.LEFT, 0)
# =========================
# BOTONES
# =========================

def on_button_pressed_a():
    avanzar(100, 1500)
    girar_izquierda(100, 1500)
    girar_derecha(100, 1500)
    retroceder(100, 1500)
input.on_button_pressed(Button.A, on_button_pressed_a)

def cerrar_gancho():
    global clamp_state
    clamp_state = 1
    xgo.Manipulator_clamp(gancho_cerrado)
# =========================
# FUNCIONES DEL GANCHO
# =========================
def abrir_gancho():
    global clamp_state
    gancho_abierto = 0
    clamp_state = 0
    xgo.Manipulator_clamp(gancho_abierto)
def toggle_gancho():
    if clamp_state == 0:
        basic.show_leds("""
            . # . # .
            . # . # .
            # # . # #
            . # . # .
            . # . # .
            """)
        cerrar_gancho()
    else:
        basic.show_leds("""
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            """)
        abrir_gancho()
def avanzar(velocidad3: number, tiempo_ms3: number):
    basic.show_leds("""
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        """)
    mover_temporal(xgo.direction_enum.FORWARD, velocidad3, tiempo_ms3)
def retroceder(velocidad4: number, tiempo_ms4: number):
    basic.show_leds("""
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        """)
    mover_temporal(xgo.direction_enum.BACKWARD, velocidad4, tiempo_ms4)

def on_button_pressed_b():
    toggle_gancho()
input.on_button_pressed(Button.B, on_button_pressed_b)

def girar_temporal(direccion2: number, velocidad5: number, tiempo_ms5: number):
    xgo.rotate(direccion2, velocidad5)
    basic.pause(tiempo_ms5)
    xgo.rotate(direccion2, 0)
def girar_derecha(velocidad6: number, tiempo_ms6: number):
    basic.show_leds("""
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        """)
    girar_temporal(xgo.rotate_enum.RIGHT, velocidad6, tiempo_ms6)
clamp_state = 0
gancho_cerrado = 0
basic.show_leds("""
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    """)
gancho_cerrado = 200
# =========================
# INICIO DEL ROBOT
# =========================
xgo.init_xgo_serial(SerialPin.P14, SerialPin.P13)
xgo.execution_action(xgo.action_enum.DEFAULT_POSTURE)
# Estado inicial del gancho
abrir_gancho()