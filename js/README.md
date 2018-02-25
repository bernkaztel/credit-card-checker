A la hora de hacer la validacion, tu funcion debería de añadir la clase .error al <input> que no pasen la validación, o la clase .success en caso de que sí pase.

Usar el algoritmo de Luhn, el cual únicamente usa los numeros de la tarjeta de crédito. No usa el código de verificacion, fecha de vencimiento , el nombre, ni la dirección.

Cosas a considerar:
Necesitas usar métodos de arreglo (.forEach, .map,etc.) sin embargo, estos metodos son para arreglos. Si yo hago:
const form = document.querySelector("form");
¿Tengo un arreglo? ¿Algo diferente? ¿Cómo le hago para implementar metodos de arreglo en otras cosas que no son arreglos?

La solucion se tiene que hacer con ES6 con los temas vistos en clase.
Validaciones por realizar
Fecha vencimiento (solo 3 validaciones son necesarias)
No string vacio
solo numeros
que sean 2 digitos de año y 2 de mes
los numeros no pueden ser negativos
el mes no puede ser mayor a 12
Que el numero sea futuro (no hoy ni antes)
Revisar el formato
CVV (todas son necesarias)
No string vacio
Sean SOLO 3 digitos (no string ni boolean ni nada)
los numeros sean positivos (que numeros son positivos de 3 digitos¿)
Nombre (3 de las 6 son necesarias)
No string vacio
SOLO Sea string
Cada palabra maximo tiene 30 caracteres
mayusculas y minusculas
MINIMO 2 palabras
No empieza con espacios