# Validador de Declaraciones de Variables

Este es un validador de declaraciones de variables en JavaScript. El código proporcionado en este repositorio es un validador de declaraciones de variables que verifica si las declaraciones de variables en su código cumplen con ciertas reglas.

## Cómo usarlo

1. Abra el archivo HTML en su navegador.
2. Ingrese su código en el área de texto.
3. Haga clic en el botón "Validar".
4. Los resultados de la validación y las variables declaradas se mostrarán debajo del botón "Validar".

## Ejemplos de entradas correctas

1. `declare x entero;`
2. `declare y real;`
3. `declare z cadena;`
4. `declare a logico;`
5. `declare b fecha;`
6. `declare c, d entero;`
7. `declare e, f, g real;`
8. `declare h, i cadena;`
9. `declare j, k, l logico;`
10. `declare m, n fecha;`

## Ejemplos de entradas incorrectas

1. `x entero;` (Falta la palabra clave "declare")
2. `declare x;` (Falta el tipo de dato)
3. `declare x cadena` (Falta el punto y coma al final)
4. `declare x cadena ;` (Hay un espacio antes del punto y coma)
5. `declare x, entero;` (Hay una coma después del identificador de variable)
6. `declare ,x entero;` (Hay una coma antes del identificador de variable)
7. `declare x,y entero;` (Falta un espacio después de la coma)
8. `declare x entero, y real;` (Los tipos de datos no coinciden)
9. `declare 1x entero;` (El identificador de variable comienza con un número)
10. `declare x@ entero;` (El identificador de variable contiene un carácter no válido)

Por favor, tenga en cuenta que este validador sólo verifica las declaraciones de variables que siguen el formato: "declare" seguido por uno o más identificadores de variables separados por comas, seguido por un tipo de dato ("entero", "real", "cadena", "logico", "fecha"), y terminando con un punto y coma.
