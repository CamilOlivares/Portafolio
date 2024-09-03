<!DOCTYPE html> <!-- Define el tipo de documento como HTML5 -->
<html lang="es"> <!-- Indica que el idioma del contenido es español -->
<head>
    <meta charset="UTF-8"> <!-- Define la codificación de caracteres como UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configura el viewport para un diseño responsivo -->
    <title>Mi Portafolio</title> <!-- Título de la página que aparece en la pestaña del navegador -->
    <!-- Enlaces a hojas de estilo CSS -->
    <link rel="stylesheet" href="assets/css/styles.css"> <!-- Hoja de estilo principal -->
    <link rel="stylesheet" href="assets/css/loader.css"> <!-- Estilos para el "loader" de la página -->
    <link rel="stylesheet" href="assets/css/cursor.css"> <!-- Estilos personalizados para el cursor -->
    <link rel="stylesheet" href="assets/css/likedin.css"> <!-- Estilos específicos para el contenido de LinkedIn -->
    <link rel="stylesheet" href="assets/css/github.css"> <!-- Estilos específicos para el contenido de GitHub -->
    <link rel="stylesheet" href="assets/css/contact.css"> <!-- Estilos para la sección de contacto -->
    <link rel="stylesheet" href="assets/css/footer.css"> <!-- Estilos para el pie de página -->
</head>
<body>
    <!-- Sección del cargador de la página -->
    <div class="loader" id="loader"> <!-- Contenedor del cargador con un efecto de texto glitch -->
        <div data-glitch="Loading..." class="glitch">Loading...</div> <!-- Texto que muestra "Loading..." con efecto glitch -->
    </div>

    <header>
         <!-- Canvas para el efecto Neuro -->
         <canvas id="neuro"></canvas> <!-- Canvas para los efectos visuales generados con WebGL o JavaScript -->
        <div class="header-content"> <!-- Contenedor para el contenido del encabezado -->
            <img src="assets/images/foto_perfil.png" alt="Mi foto" class="profile-photo"> <!-- Foto de perfil -->
            <!-- Puedes agregar más contenido aquí si es necesario -->
        </div>
    </header>

    <main>
        <!-- Sección Sobre Mí -->
        <section class="about-container"> <!-- Contenedor para la sección de "Sobre Mí" -->
            <div class="about"> <!-- Contenedor para el contenido de "Sobre Mí" -->
                <?php include("views/likedin.html"); ?> <!-- Incluye el contenido de LinkedIn usando PHP -->
                <h2>Sobre Mí</h2> <!-- Encabezado para la sección de "Sobre Mí" -->
                <p>Soy Camilo Olivares, un desarrollador apasionado por crear experiencias digitales únicas. Tengo una alta experiencia empresarial y he trabajado en varios proyectos interesantes....</p> <!-- Descripción sobre el desarrollador -->
                <?php include("views/github.html"); ?> <!-- Incluye el contenido de GitHub usando PHP -->
            </div>
        </section>

        <!-- Sección de Proyectos -->
        <section id="projects"> <!-- Contenedor para la sección de proyectos -->
            <?php include("views/projects.html"); ?> <!-- Incluye el contenido de proyectos usando PHP -->
        </section>

    </main>

    <!-- Sección de Contacto -->
    <?php include('views/contact.php'); ?> <!-- Incluye el contenido de la sección de contacto usando PHP -->

    <!-- Pie de Página -->
    <?php include('views/footer.php'); ?> <!-- Incluye el contenido del pie de página usando PHP -->

    <!-- JavaScript de AOS para efectos de animación al hacer scroll -->
    <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script> 
    <!-- Scripts personalizados para el cursor -->
    <script src="js/cursor.js"></script>
    <!-- Scripts para el efecto "Neuro" en el encabezado -->
    <script src="js/neuro.js"></script>
    <!-- Scripts para el cargador de la página -->
    <script src="js/loader.js"></script>

</body>
</html>
