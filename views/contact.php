<section id="contact" data-aos="fade-up">
    <div class="container">
        <h2>Contacto</h2>
        <form id="contact-form" action="backend/envio-formulario.php" method="post">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Mensaje:</label>
            <textarea id="message" name="message" required></textarea>

            <!-- Botón con reCAPTCHA v3 -->
            <button class="g-recaptcha"
                    data-sitekey="TU_CLAVE_SITE_KEY"
                    data-callback="onSubmit"
                    data-action="submit">Enviar</button>
        </form>
    </div>
</section>

<script src="https://www.google.com/recaptcha/api.js"></script>
<script>
    function onSubmit(token) {
        document.getElementById("contact-form").submit();
    }
</script>
