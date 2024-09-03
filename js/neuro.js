const canvasEl = document.querySelector("canvas#neuro"); // Selecciona el elemento <canvas> con el ID 'neuro' del documento.
const devicePixelRatio = Math.min(window.devicePixelRatio, 2); // Obtiene el device pixel ratio (DPI) del dispositivo y limita su valor a un máximo de 2.

const pointer = { // Objeto para rastrear la posición del puntero.
    x: 0, // Posición actual en el eje X.
    y: 0, // Posición actual en el eje Y.
    tX: 0, // Objetivo de la posición X (se utilizará para interpolar suavemente).
    tY: 0, // Objetivo de la posición Y (se utilizará para interpolar suavemente).
};

let uniforms; // Variable para almacenar las ubicaciones de los uniformes del shader.
const gl = initShader(); // Inicializa los shaders y obtiene el contexto WebGL.

setupEvents(); // Configura los eventos del ratón y la ventana.
resizeCanvas(); // Ajusta el tamaño del canvas según el tamaño de la ventana.
window.addEventListener("resize", resizeCanvas); // Reajusta el tamaño del canvas cuando se cambia el tamaño de la ventana.
render(); // Inicia el bucle de renderizado.

function initShader() {
    // Definición del código fuente del vertex shader
    const vsSource = `
        precision mediump float; // Define la precisión para los cálculos de punto flotante.
        varying vec2 vUv; // Variable para pasar la coordenada UV al fragment shader.
        attribute vec2 a_position; // Atributo de posición de vértice.
        void main() {
            vUv = .5 * (a_position + 1.); // Transforma la posición del vértice a coordenadas UV.
            gl_Position = vec4(a_position, 0.0, 1.0); // Define la posición final del vértice.
        }
    `;

    // Definición del código fuente del fragment shader
    const fsSource = `
        precision mediump float; // Define la precisión para los cálculos de punto flotante.
        varying vec2 vUv; // Recibe la coordenada UV del vertex shader.
        uniform float u_time; // Uniforme para el tiempo actual.
        uniform float u_ratio; // Uniforme para la relación de aspecto de la pantalla.
        uniform vec2 u_pointer_position; // Uniforme para la posición del puntero.
        uniform float u_scroll_progress; // Uniforme para el progreso de desplazamiento de la página.

        vec2 rotate(vec2 uv, float th) {
            return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv; // Función de rotación para las coordenadas UV.
        }

        float neuro_shape(vec2 uv, float t, float p) { // Genera una forma neuronal en la pantalla.
            vec2 sine_acc = vec2(0.); // Acumulador de seno.
            vec2 res = vec2(0.); // Resultado acumulado de la forma.
            float scale = 8.; // Escala inicial.
            for (int j = 0; j < 15; j++) { // Bucle para crear múltiples capas de la forma.
                uv = rotate(uv, 1.); // Rota las coordenadas UV.
                sine_acc = rotate(sine_acc, 1.); // Rota el acumulador de seno.
                vec2 layer = uv * scale + float(j) + sine_acc - t; // Calcula la capa actual.
                sine_acc += sin(layer); // Añade el valor de seno de la capa al acumulador.
                res += (.5 + .5 * cos(layer)) / scale; // Acumula el resultado de la forma.
                scale *= (1.2 - .07 * p); // Ajusta la escala.
            }
            return res.x + res.y; // Devuelve el valor final de la forma.
        }

        void main() {
            vec2 uv = .5 * vUv; // Define las coordenadas UV para este fragmento.
            uv.x *= u_ratio; // Ajusta las coordenadas X por la relación de aspecto.

            vec2 pointer = vUv - u_pointer_position; // Calcula la distancia del puntero a las coordenadas UV.
            pointer.x *= u_ratio; // Ajusta la coordenada X por la relación de aspecto.
            float p = clamp(length(pointer), 0., 1.); // Calcula la distancia del puntero, limitada entre 0 y 1.
            p = .5 * pow(1. - p, 2.); // Ajusta el valor de distancia para efectos de suavizado.

            float t = .001 * u_time; // Convierte el tiempo de milisegundos a segundos.
            vec3 color = vec3(0.); // Inicializa el color en negro.

            float noise = neuro_shape(uv, t, p); // Calcula el "ruido" neuronal.

            noise = 1.2 * pow(noise, 3.); // Ajusta la intensidad del ruido.
            noise += pow(noise, 10.); // Aumenta el contraste del ruido.
            noise = max(.0, noise - .5); // Elimina el ruido bajo un umbral.
            noise *= (1. - length(vUv - .5)); // Aplica un desvanecimiento radial al ruido.

            color = normalize(vec3(.2, .5 + .4 * cos(3. * u_scroll_progress), .5 + .5 * sin(3. * u_scroll_progress)));
            // Ajusta el color basado en el progreso de desplazamiento.

            color = color * noise; // Multiplica el color por el valor de ruido.

            gl_FragColor = vec4(color, noise); // Define el color final del fragmento.
        }
    `;

    const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl"); // Obtiene el contexto WebGL.

    if (!gl) { // Verifica si WebGL está soportado.
        alert("WebGL is not supported by your browser."); // Muestra una alerta si WebGL no está soportado.
    }

    // Función para crear un shader
    function createShader(gl, sourceCode, type) {
        const shader = gl.createShader(type); // Crea el shader con el tipo especificado (VERTEX_SHADER o FRAGMENT_SHADER).
        gl.shaderSource(shader, sourceCode); // Asigna el código fuente al shader.
        gl.compileShader(shader); // Compila el shader.

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { // Verifica si hubo un error durante la compilación.
            console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)); // Muestra el error en consola.
            gl.deleteShader(shader); // Elimina el shader si hubo un error.
            return null;
        }

        return shader; // Devuelve el shader compilado.
    }

    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER); // Crea el vertex shader.
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER); // Crea el fragment shader.

    // Función para crear el programa de shaders
    function createShaderProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram(); // Crea el programa de shaders.
        gl.attachShader(program, vertexShader); // Adjunta el vertex shader al programa.
        gl.attachShader(program, fragmentShader); // Adjunta el fragment shader al programa.
        gl.linkProgram(program); // Enlaza el programa de shaders.

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { // Verifica si hubo un error durante el enlace.
            console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program)); // Muestra el error en consola.
            return null;
        }

        return program; // Devuelve el programa de shaders enlazado.
    }

    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader); // Crea y enlaza el programa de shaders.
    uniforms = getUniforms(shaderProgram); // Obtiene las ubicaciones de los uniformes del shader.

    // Función para obtener las ubicaciones de los uniformes
    function getUniforms(program) {
        let uniforms = []; // Array para almacenar las ubicaciones de los uniformes.
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); // Obtiene el número de uniformes activos en el programa.
        for (let i = 0; i < uniformCount; i++) { // Itera sobre todos los uniformes activos.
            let uniformName = gl.getActiveUniform(program, i).name; // Obtiene el nombre del uniforme.
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName); // Almacena la ubicación del uniforme.
        }
        return uniforms; // Devuelve el array con las ubicaciones de los uniformes.
    }

    const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]); // Define los vértices para un cuadrado cubriendo el viewport.

    const vertexBuffer = gl.createBuffer(); // Crea un buffer de vértices.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // Asigna el buffer de vértices como el buffer actual.
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // Asigna los datos de vértices al buffer.

    gl.useProgram(shaderProgram); // Usa el programa de shaders.

    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position"); // Obtiene la ubicación del atributo de posición.
    gl.enableVertexAttribArray(positionLocation); // Habilita el atributo de posición.

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // Asigna el buffer de vértices como el buffer actual.
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0); // Define cómo interpretar los datos del buffer de vértices.

    return gl; // Devuelve el contexto WebGL.
}

function render() {
    const currentTime = performance.now(); // Obtiene el tiempo actual.

    // Interpolación suave de la posición del puntero.
    pointer.x += (pointer.tX - pointer.x) * .5;
    pointer.y += (pointer.tY - pointer.y) * .5;

    gl.uniform1f(uniforms.u_time, currentTime); // Actualiza el uniforme de tiempo.
    gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight); // Actualiza la posición del puntero.
    gl.uniform1f(uniforms.u_scroll_progress, window["pageYOffset"] / (2 * window.innerHeight)); // Actualiza el progreso de desplazamiento.

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Dibuja el cuadrado utilizando triángulos en tiras.
    requestAnimationFrame(render); // Solicita el próximo frame para renderizar.
}

function resizeCanvas() {
    canvasEl.width = window.innerWidth * devicePixelRatio; // Ajusta el ancho del canvas según el tamaño de la ventana y la densidad de píxeles.
    canvasEl.height = window.innerHeight * devicePixelRatio; // Ajusta la altura del canvas.
    gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height); // Actualiza la relación de aspecto del canvas.
    gl.viewport(0, 0, canvasEl.width, canvasEl.height); // Establece el área de renderizado del canvas.
}

function setupEvents() {
    // Configura eventos para actualizar la posición del puntero.
    window.addEventListener("pointermove", e => {
        updateMousePosition(e.clientX, e.clientY);
    });
    window.addEventListener("touchmove", e => {
        updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    });
    window.addEventListener("click", e => {
        updateMousePosition(e.clientX, e.clientY);
    });

    function updateMousePosition(eX, eY) { // Función para actualizar la posición del puntero.
        pointer.tX = eX; // Actualiza la posición objetivo X.
        pointer.tY = eY; // Actualiza la posición objetivo Y.
    }
}
