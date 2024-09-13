<!DOCTYPE html> <!-- Define el tipo de documento como HTML5 -->
<html lang="es"> <!-- Indica que el idioma del contenido es español -->
<head>
    <meta charset="UTF-8"> <!-- Define la codificación de caracteres como UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configura el viewport para un diseño responsivo -->
    <title>Mi Portafolio</title> <!-- Título de la página que aparece en la pestaña del navegador -->
    <!-- Enlaces a hojas de estilo CSS -->
    <link rel="stylesheet" href="assets/css/styles.css"> <!-- Hoja de estilo principal -->
    <link rel="stylesheet" href="assets/css/header.css"> <!-- Hoja de estilo principal -->
    <link rel="stylesheet" href="assets/css/profile.css"> <!-- Hoja de estilo principal -->
    <link rel="stylesheet" href="assets/css/about.css"> <!-- Hoja de estilo principal -->
    <link rel="stylesheet" href="assets/css/loader.css"> <!-- Estilos para el "loader" de la página -->
    <link rel="stylesheet" href="assets/css/cursor.css"> <!-- Estilos personalizados para el cursor -->
    <link rel="stylesheet" href="assets/css/likedin.css"> <!-- Estilos específicos para el contenido de LinkedIn -->
    <link rel="stylesheet" href="assets/css/github.css"> <!-- Estilos específicos para el contenido de GitHub -->
    <link rel="stylesheet" href="assets/css/proyect.css"> <!-- Estilos específicos para el contenido de Proyect -->
    <link rel="stylesheet" href="assets/css/buttonglitch.css"> <!-- Estilos específicos para el contenido de ButtonGlitch -->
    <link rel="stylesheet" href="assets/css/contact.css"> <!-- Estilos para la sección de contacto -->
    <link rel="stylesheet" href="assets/css/footer.css"> <!-- Estilos para el pie de página -->
</head>
<body>
    
    <?php include('views/loader.php'); ?><!-- Sección del cargador de la página -->

    <header>

         <?php include('views/neuro.php'); ?><!-- Canvas para el efecto Neuro -->
        

    </header>

    <main>
        
        <?php include("views/about.php"); ?><!-- Sección Sobre Mí -->

        <!-- Sección de Proyectos -->
        <section id="projects"> <!-- Contenedor para la sección de proyectos -->
            <?php include("views/projects.html"); ?> <!-- Incluye el contenido de proyectos usando PHP -->
        </section>
       
        <?php include("views/buttonglitch.php"); ?><!-- Incluye el Boton Glitch de "Ver Mas" -->

    <!-- Sección de Contacto -->
    <?php include("views/contact.php"); ?> <!-- Incluye el contenido de la sección de contacto usando PHP -->

    <!-- Pie de Página -->
    <?php include("views/footer.php"); ?> <!-- Incluye el contenido del pie de página usando PHP -->

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
