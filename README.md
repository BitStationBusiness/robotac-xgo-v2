# ROBOTAC XGOS V2

Extensión educativa para controlar XGOS V2 desde MakeCode usando bloques simples.

## Bloques disponibles

- iniciar XGOS
- avanzar velocidad durante segundos
- retroceder velocidad durante segundos
- girar izquierda velocidad durante segundos
- girar derecha velocidad durante segundos
- abrir gancho
- cerrar gancho
- alternar gancho

## Uso recomendado

En `on start` usar:

```blocks
iniciar XGOS
```

En el botón A usar bloques de movimiento.

En el botón B usar:

```blocks
alternar gancho
```

## Pines usados

* TX: P14
* RX: P13
* Baudrate: 115200
