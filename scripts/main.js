var scorm = pipwerks.SCORM;

function submitForm() {
  var expectedAnswers = ['i', 'j']; // Valores predefinidos esperados
  var answers = [];
  var errorFields = []; // Campos que han fallado

  for (var i = 1; i <= 11; i++) {
    var input = document.getElementById('var' + i);
    answers.push(input.value);
  }

  // Comparar las respuestas con los valores predefinidos
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] !== expectedAnswers[i]) {
      var fieldName = 'var' + (i + 1);
      errorFields.push(fieldName);
    }
  }

  if (errorFields.length > 0) {
    // Mostrar los campos que han fallado en pantalla
    var errorText = 'Los siguientes campos han fallado: ' + errorFields.join(', ');
    alert(errorText);
  } else {
    // Todos los campos son correctos
    alert('¡Todas las respuestas son correctas!');
  }

  // Aquí puedes realizar alguna otra acción con las respuestas ingresadas por el estudiante

  // Inicializar la conexión con la API de SCORM
  scorm.init();

  // Establecer los valores de las variables SCORM con las respuestas del estudiante
  scorm.set('cmi.interactions.0.student_response', answers.join(','));
  scorm.set('cmi.interactions.0.result', 'correct');

  // Registrar la finalización del módulo
  scorm.set('cmi.core.lesson_status', 'completed');

  // Enviar los datos a la API de SCORM
  scorm.save();

  // Cerrar la conexión con la API de SCORM al finalizar
  scorm.quit();
}
