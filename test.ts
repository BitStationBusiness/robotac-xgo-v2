robotac_xgos.iniciarXGOS()

input.onButtonPressed(Button.A, function () {
    robotac_xgos.avanzar(100, 1.5)
    robotac_xgos.girarIzquierda(100, 1.5)
    robotac_xgos.girarDerecha(100, 1.5)
    robotac_xgos.retroceder(100, 1.5)
})

input.onButtonPressed(Button.B, function () {
    robotac_xgos.alternarGancho()
})
