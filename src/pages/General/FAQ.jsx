//* ========================================
//* PÁGINA: FAQ
//* ========================================
//* Propósito: Página de preguntas frecuentes
//* Ruta: /faq
//* Layout: GeneralLayout
//* Características:
//*   - Información sobre el sistema
//*   - Ayuda para usuarios
//*   - Accesible sin autenticación
//*   - TODO: Agregar más preguntas y respuestas relevantes

const FAQ = () => {
  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      {/* //? Lista de preguntas frecuentes */}
      <ul>
        <li>
          <strong>Question 1:</strong> What is the purpose of this application?
          {/* //TODO: Agregar respuesta detallada */}
        </li>
        <li>
          <strong>Question 2:</strong> How do I create an account?
          {/* //TODO: Agregar pasos para crear cuenta */}
        </li>
        <li>
          <strong>Question 3:</strong> How can I reset my password?
          {/* //TODO: Agregar instrucciones de recuperación */}
        </li>
      </ul>
    </div>
  );
};

export default FAQ;

//* ========================================
//* CONSTANTES EN ESPAÑOL
//* ========================================
/*
 * FAQ = preguntas frecuentes
 */
