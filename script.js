// Transicion de titulo

const title = document.querySelector('.title');
title.innerHTML = title.textContent.split('').map(letter => `<span>${letter}</span>`).join('');

const letters = document.querySelectorAll('.title span');
letters.forEach((letter, index) => {
    setTimeout(() => {
        letter.style.opacity = '1';
    }, 100 * index);
});




// Obtener el área de texto y el div de las líneas
var code = document.getElementById("code");
var lines = document.querySelector(".lines");
var subContainer = document.querySelector(".sub-container");

// Añadir un evento de entrada al área de texto
code.addEventListener("input", function () {
  // Contar el número de líneas en el área de texto
  var numLines = code.value.split("\n").length;
  // Limpiar el div de las líneas
  lines.innerHTML = "";
  // Añadir un div para cada línea en el área de texto
  for (var i = 0; i < numLines; i++) {
    lines.innerHTML += "<div></div>";
  }
  // Ajustar la altura del área de texto para adaptarse al contenido
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";

  // Si el área de texto está vacía, hacer que el subcontenedor desaparezca suavemente
  if (this.value.trim() === "") {
    subContainer.style.opacity = "0";
    setTimeout(function () {
      subContainer.style.display = "none";
    }, 500);
  }
});


// Añadir un evento de clic al botón de validar
document.getElementById("validate").addEventListener("click", function () {
  // Obtener el código del área de texto
  var code = document.getElementById("code").value;

  // Dividir el código en líneas
  var lines = code.split("\n");

  // Limpiar los resultados anteriores
  var results = document.getElementById("results");
  results.innerHTML = "";

  // Limpiar las variables anteriores
  var variables = document.getElementById("variables");
  variables.innerHTML = "";

  // Definir la expresión regular para validar las líneas
  var regex =
    /^declare\s+([a-zA-Z_][a-zA-Z0-9_]{0,14}(,\s*[a-zA-Z_][a-zA-Z0-9_]{0,14})*\s+)(entero|real|cadena|logico|fecha);$/;

  // Crear un objeto para almacenar las variables declaradas
  var declaredVars = {};

  // Para cada línea del código
  lines.forEach(function (line, i) {
    // Si la línea está vacía, ignorarla
    if (line.trim() === "") return;

    // Crear un elemento de lista para mostrar el resultado
    var li = document.createElement("li");
    li.classList.add("list-group-item", "p-2", "mb-2", "rounded");
    li.style.opacity = "0";
    li.style.transition = "opacity .5s ease-in-out";

    // Crear una lista de errores
    var errors = [];

    // Si la línea no comienza con "declare", agregar un error
    if (!line.startsWith("declare")) {
      errors.push('La línea no comienza con "declare".');
    }

    // Si la línea no termina con ";", agregar un error
    if (!line.endsWith(";")) {
      errors.push('La línea no termina con ";".');
    }

    // Si el tipo de dato es inválido, agregar un error
    if (!/(entero|real|cadena|logico|fecha)/.test(line)) {
      errors.push("Tipo de dato inválido.");
    }

    // Si la línea es válida según la expresión regular y no hay errores hasta ahora
    if (regex.test(line) && errors.length === 0) {
      // Extraer las variables y el tipo de dato de la línea
      var match = line.match(regex);
      var vars = match[1].split(",");
      var type = match[3];

      // Verificar si alguna variable ya ha sido declarada
      vars.forEach(function (v) {
        v = v.trim();
        if (declaredVars[v]) {
          errors.push('Variable "' + v + '" duplicada.');
        } else {
          declaredVars[v] = type;
        }
      });

      if (errors.length === 0) {
        // Si no hay errores, marcar como válida y agregar a los resultados
        li.classList.add("bg-green-200");
        li.textContent = "Línea " + (i + 1) + ": Válido";

        // Agregar las variables a la lista de variables
        vars.forEach(function (v) {
          var liVar = document.createElement("li");
          liVar.classList.add(
            "list-group-item",
            "p-2",
            "mb-2",
            "rounded",
            "bg-blue-200"
          );
          liVar.textContent = v.trim() + ": " + type;
          liVar.dataset.type = type; 
          liVar.style.opacity = "0";
          liVar.style.transition = "opacity .5s ease-in-out";
          variables.appendChild(liVar);
          setTimeout(function () {
            liVar.style.opacity = "1";
          }, 100); 
        });
      }
    } else {
      // Si el identificador de variable es inválido, agregar un error
      errors.push("Identificador de variable inválido.");
    }

    // Si hay errores, marcar como inválida y agregar los errores
    if (errors.length > 0) {
      li.classList.add("bg-red-200");
      li.textContent = "Línea " + (i + 1) + ": Inválido - " + errors.join(" ");
    }

    // Agregar el resultado a la lista de resultados
    results.appendChild(li);
    setTimeout(function () {
      li.style.opacity = "1";
    }, 300); 

    // Mostrar los botones del filtro después de que se inserte el input
    document.getElementById("filter").style.opacity = "1";
  });

  // Mostrar el subcontenedor con una transición suave
  subContainer.style.opacity = "0";
  subContainer.style.display = "block";
  setTimeout(function () {
    subContainer.style.opacity = "1";
  }, 100);
});

// Añadir un evento de clic a los botones del filtro
document.querySelectorAll("#filter button").forEach(function (button) {
  button.addEventListener("click", function () {
    var filter = this.dataset.filter;

    // Cambiar el color del botón seleccionado y restablecer los demás botones a su color original
    document.querySelectorAll("#filter button").forEach(function (btn) {
      btn.classList.remove("bg-blue-500", "text-white");
      btn.classList.add("bg-white", "text-blue-500", "border", "border-blue-500");
    });
    
    this.classList.remove("bg-white", "text-blue-500", "border", "border-blue-500");
    this.classList.add("bg-blue-500", "text-white");

    // Obtener todas las variables declaradas
    var vars = document.querySelectorAll("#variables .list-group-item");

    // Para cada variable declarada
    vars.forEach(function (v) {
      v.style.opacity = "0"; 
      
      setTimeout(function () { 
        // Si el filtro está vacío o coincide con el tipo de dato, mostrar la variable
        if (!filter || v.dataset.type === filter) {
          v.style.display = "";
        } else {
          // De lo contrario, ocultar la variable
          v.style.display = "none";
        }
      }, 300); 

      setTimeout(function () {
        v.style.opacity = "1";
      }, 600); 
    });
  });
});
