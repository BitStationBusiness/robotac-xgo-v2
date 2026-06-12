clamp_state = 0


# =========================
# CONFIGURACION GENERAL
# =========================

gancho_abierto = 0
gancho_cerrado = 196


# =========================
# FUNCIONES DE MOVIMIENTO
# =========================

def mover_temporal(direccion, velocidad, tiempo_ms):
    xgo.move_xgo(direccion, velocidad)
    basic.pause(tiempo_ms)
    xgo.move_xgo(direccion, 0)


def girar_temporal(direccion, velocidad, tiempo_ms):
    xgo.rotate(direccion, velocidad)
    basic.pause(tiempo_ms)
    xgo.rotate(direccion, 0)


def avanzar(velocidad, tiempo_ms):
    mover_temporal(xgo.direction_enum.FORWARD, velocidad, tiempo_ms)


def retroceder(velocidad, tiempo_ms):
    mover_temporal(xgo.direction_enum.BACKWARD, velocidad, tiempo_ms)


def girar_izquierda(velocidad, tiempo_ms):
    girar_temporal(xgo.rotate_enum.LEFT, velocidad, tiempo_ms)


def girar_derecha(velocidad, tiempo_ms):
    girar_temporal(xgo.rotate_enum.RIGHT, velocidad, tiempo_ms)


def detener_movimiento():
    xgo.move_xgo(xgo.direction_enum.FORWARD, 0)


def detener_giro():
    xgo.rotate(xgo.rotate_enum.LEFT, 0)


# =========================
# FUNCIONES DEL GANCHO
# =========================

def abrir_gancho():
    global clamp_state
    clamp_state = 0
    xgo.Manipulator_clamp(gancho_abierto)


def cerrar_gancho():
    global clamp_state
    clamp_state = 1
    xgo.Manipulator_clamp(gancho_cerrado)


def toggle_gancho():
    if clamp_state == 0:
        cerrar_gancho()
    else:
        abrir_gancho()


# =========================
# BOTONES
# =========================

def on_button_pressed_a():
    avanzar(100, 2000)
    girar_izquierda(45, 2000)

input.on_button_pressed(Button.A, on_button_pressed_a)


def on_button_pressed_b():
    toggle_gancho()

input.on_button_pressed(Button.B, on_button_pressed_b)


# =========================
# INICIO DEL ROBOT
# =========================

xgo.init_xgo_serial(SerialPin.P14, SerialPin.P13)
xgo.execution_action(xgo.action_enum.DEFAULT_POSTURE)

# Estado inicial del gancho
abrir_gancho()