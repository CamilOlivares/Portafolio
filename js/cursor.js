console.log('scripts.js cargado'); // Imprime un mensaje en la consola para confirmar que el archivo scripts.js se ha cargado correctamente

// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // Duración de las animaciones en milisegundos (1 segundo)
    easing: 'ease-in-out', // Tipo de suavizado de la animación
    once: true, // Solo ejecutar la animación una vez cuando el elemento entra en el viewport
});

document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté completamente cargado antes de ejecutar el código
    // Crear el elemento del cursor personalizado
    const cursor = document.createElement('div'); // Crea un nuevo elemento 'div' que representará el cursor personalizado
    cursor.classList.add('cursor'); // Añade la clase 'cursor' al nuevo elemento para aplicar estilos CSS específicos
    document.body.appendChild(cursor); // Añade el cursor personalizado al final del body del documento

    // Mover el cursor con el puntero del mouse
    document.addEventListener('mousemove', (e) => { // Escucha el evento de movimiento del mouse
        cursor.style.left = `${e.pageX}px`; // Ajusta la posición horizontal del cursor personalizado según la posición del mouse
        cursor.style.top = `${e.pageY}px`; // Ajusta la posición vertical del cursor personalizado según la posición del mouse
    });

    // Aplicar el estilo de sección resaltada al pasar el mouse sobre una sección específica
    const sections = document.querySelectorAll('#about, #projects, #contact'); // Selecciona todas las secciones con los IDs especificados
    const interactiveElements = document.querySelectorAll('a, button'); // Selecciona todos los enlaces y botones para efectos interactivos

    sections.forEach(section => { // Itera sobre cada sección seleccionada
        section.addEventListener('mouseover', () => { // Escucha el evento de mouseover (cuando el mouse entra en la sección)
            cursor.classList.add('section-highlight'); // Añade la clase para resaltar el cursor al estar sobre la sección
        });

        section.addEventListener('mouseout', () => { // Escucha el evento de mouseout (cuando el mouse sale de la sección)
            cursor.classList.remove('section-highlight'); // Elimina la clase de resaltado del cursor al salir de la sección
        });
    });

    // Aplicar el estilo de agrandamiento al pasar el mouse sobre botones y enlaces
    interactiveElements.forEach(element => { // Itera sobre cada enlace y botón
        element.addEventListener('mouseover', () => { // Escucha el evento de mouseover
            cursor.classList.add('cursor-button'); // Añade la clase que agranda el cursor al estar sobre el botón o enlace
        });

        element.addEventListener('mouseout', () => { // Escucha el evento de mouseout
            cursor.classList.remove('cursor-button'); // Elimina la clase de agrandamiento del cursor al salir del botón o enlace
        });
    });
});
