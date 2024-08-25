console.log('scripts.js cargado');

// Inicializar AOS
AOS.init({
    duration: 1000, // Duración de la animación en milisegundos
    easing: 'ease-in-out', // Tipo de easing para la animación
    once: true, // Animar solo una vez cuando el elemento entra en el viewport
});

document.addEventListener('DOMContentLoaded', () => {
    // Crear el elemento del cursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // Mover el cursor con el puntero del mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });

    // Aplicar el estilo de sección resaltada al pasar por encima de una sección específica
    const sections = document.querySelectorAll('#about, #projects, #contact');
    const interactiveElements = document.querySelectorAll('a, button');

    sections.forEach(section => {
        section.addEventListener('mouseover', () => {
            cursor.classList.add('section-highlight');
        });

        section.addEventListener('mouseout', () => {
            cursor.classList.remove('section-highlight');
        });
    });

    // Aplicar el estilo de agrandamiento al pasar sobre botones y enlaces
    interactiveElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            cursor.classList.add('cursor-button');
        });

        element.addEventListener('mouseout', () => {
            cursor.classList.remove('cursor-button');
        });
    });
});
