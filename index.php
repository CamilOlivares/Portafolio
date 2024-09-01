<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Portafolio</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <!-- CSS de AOS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
</head>
<body>
    <header>
         <!-- Canvas para el efecto de lava -->
         <canvas id="neuro"></canvas>
        <div class="header-content">
            <img src="assets/images/foto_perfil.png" alt="Mi foto" class="profile-photo">
            <!-- Puedes agregar más contenido aquí si es necesario -->
        </div>
    </header>

    <main>
    <section class="about-container">
    <div class="about">
            <?php include("views/likedin.html"); ?> <!-- Incluye el contenido de LinkedIn -->
            <h2>Sobre Mí</h2>
            <p>soy Camilo Olivares, un desarrollador apasionado por crear experiencias digitales únicas. Tengo una alta experiencia y he trabajado en varios proyectos interesantes....</p>
        </section>

        <section id="projects">
            <?php include("views/projects.html"); ?>
        </section>

        <!-- Agrega más secciones aquí si es necesario -->
    </main>

    <?php include('views/contact.php'); ?>
    <?php include('views/footer.php'); ?>

    <!-- JavaScript de AOS -->
    <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
    <!-- Tu archivo de scripts -->
    <script src="js/scripts.js"></script>
    <script src="js/neuro.js"></script>
    
    <!-- Inicializar AOS -->
    <script>
        AOS.init({
            duration: 1000, // Duración de la animación en milisegundos
            easing: 'ease-in-out', // Tipo de easing para la animación
            once: true, // Animar solo una vez cuando el elemento entra en el viewport
        });
    </script>
 
</body>
</html>
