# 🕶️ Bloqueador ForoCoches Avanzado 🚗💨

¡Mejora tu experiencia en Forocoches.com con esta extensión personalizable para ocultar hilos, mensajes y citas de usuarios no deseados, y mucho más! Diseñada para ofrecer un control granular y una navegación más limpia.

---

<p align="center">
  <img src="https://raw.githubusercontent.com/l0rk2k/BlockFC/refs/heads/main/images/icon128.png" alt="Logo Bloqueador ForoCoches" width="128"/>
</p>

---

## 🌟 Funcionalidades Implementadas 🌟

<details>
<summary>🚫 **Gestión Avanzada de Usuarios Ignorados (Popup)**</summary>

-   **📝 Lista Personalizada:** Añade usuarios a tu lista de ignorados directamente desde el popup de la extensión.
    -   Flexible: Admite nombres con o sin `@` al inicio.
    -   Versátil: Permite añadir usuarios uno por línea o separados por comas.
    -   Inteligente: Maneja correctamente nombres de usuario que contienen espacios.
-   💾 **Persistencia:** Tu lista se guarda localmente usando `chrome.storage.sync` (lo que permite sincronización si la tienes activada en Chrome).
-   🔄 **Importar/Exportar:**
    -   📤 **Exporta** tu lista de ignorados a un archivo JSON para tener una copia de seguridad o compartirla.
    -   📥 **Importa** una lista existente desde un archivo JSON.
-   🌍 **Sincronización (Potencial):** Al usar `chrome.storage.sync`, tu lista y configuraciones podrían sincronizarse entre tus navegadores Chrome si tienes la sincronización activada.

</details>

<details>
<summary>📋 **Experiencia Mejorada en Listados de Hilos (`forumdisplay.php`)**</summary>

-   🙈 **Ocultamiento de Hilos:** Los hilos creados por usuarios en tu lista de ignorados se ocultan automáticamente del listado.
-   ➕ **Relleno Inteligente de Página (Funcionalidad Beta):**
    -   Si se ocultan hilos, la extensión intenta cargar hilos válidos de la página siguiente para mantener aproximadamente 40 temas visibles por página.
    -   Detecta automáticamente la URL de la página siguiente.
    -   Carga, analiza y filtra el contenido nuevo antes de añadirlo.
    -   Los hilos y sus separadores correspondientes se añaden de forma limpia al final de la página actual.

</details>

<details>
<summary>💬 **Control Detallado Dentro de los Hilos (`showthread.php`)**</summary>

-   🤫 **Ocultamiento de Mensajes:**
    -   Los mensajes de usuarios en tu lista de ignorados (que no estén ya ocultos por el sistema nativo de ForoCoches) son reemplazados por un placeholder personalizable.
    -   **Respeta el Sistema Nativo:** Si ForoCoches ya ha ocultado un mensaje de un usuario (porque lo tienes en la lista de ignorados nativa del foro), la extensión lo deja tal cual, mostrando el aviso de FC.
    -   **Placeholder Mejorado:** Nuestro placeholder indica claramente que el mensaje está oculto por la extensión, muestra el nombre del autor y la fecha/hora original del post.
-   🤐 **Ocultamiento/Modificación de Citas:**
    -   Las citas de usuarios ignorados (tanto el estilo nuevo `squote` como el clásico de tabla) se reemplazan por un placeholder ("Cita de X oculta...").
-   👀 **Funcionalidad "Ver Mensaje" / "Ver Cita":**
    -   Los placeholders generados por la extensión incluyen un enlace que permite mostrar temporalmente el contenido original del post o cita ocultado, sin necesidad de quitar al usuario de la lista de ignorados. El contenido permanece visible hasta la próxima recarga de página o re-aplicación de filtros.

</details>

<details>
<summary>🎨 **Interfaz y Experiencia de Usuario General**</summary>

-   🌗 **Tema Automático para Popup:** El popup de la extensión detecta automáticamente el tema (claro/oscuro) que estés usando en ForoCoches y adapta su propia apariencia para una integración visual perfecta.
-   🔘 **Botón Global Activar/Desactivar Bloqueo:**
    -   Un botón fácilmente accesible en el popup permite habilitar o deshabilitar toda la funcionalidad de bloqueo de la extensión con un solo clic.
    -   El estado del botón (Activado/Desactivado) se guarda y se refleja visualmente con diferentes estilos y texto.
-   🚀 **Recarga Automática:** Al guardar la lista de ignorados o cambiar el estado del bloqueo global desde el popup, la pestaña activa de ForoCoches se recarga automáticamente para aplicar los cambios al instante.

</details>

---

## 🛠️ Instalación

Para instalar la extensión "Bloqueador ForoCoches Avanzado" en tu navegador Google Chrome, sigue estos pasos:

1.  **Prerrequisitos:**
    * Asegúrate de tener [Git](https://git-scm.com/downloads) instalado en tu sistema.
    * Necesitas Google Chrome.
2.  **Clonar el Repositorio:**
    * Abre una terminal o línea de comandos.
    * Navega hasta la carpeta donde quieras descargar la extensión.
    * Ejecuta el siguiente comando (reemplaza `[URL_DEL_REPOSITORIO_EN_GITHUB]` con la URL real de tu repositorio cuando lo tengas):
        ```bash
        git clone https://[URL_DEL_REPOSITORIO_EN_GITHUB]/bloqueador-forocoches.git
        ```
    * Esto creará una carpeta llamada `bloqueador-forocoches` (o el nombre de tu repo) con todos los archivos de la extensión.
3.  **Cargar la Extensión en Chrome:**
    * Abre Google Chrome.
    * Escribe `chrome://extensions/` en la barra de direcciones y presiona `Enter`.
    * En la página de Extensiones, activa el **"Modo de desarrollador"** (Developer mode). Normalmente es un interruptor en la esquina superior derecha.
        * ![Modo Desarrollador](https://i.stack.imgur.com/L2C4S.png)
    * Una vez activado, aparecerán nuevos botones. Haz clic en "**Cargar descomprimida**" (Load unpacked).
        * ![Cargar Descomprimida](https://developer.chrome.com/static/docs/extensions/get-started/images/load-unpacked.png)
    * Se abrirá un cuadro de diálogo para seleccionar una carpeta. Navega hasta la carpeta `bloqueador-forocoches` que clonaste en el paso anterior (la que contiene el archivo `manifest.json`) y selecciónala.
4.  **¡Listo!** 🎉
    * La extensión "Bloqueador ForoCoches Avanzado" debería aparecer ahora en tu lista de extensiones y su icono 🕶️ en la barra de herramientas de Chrome.

---

## 🚀 Uso Básico

1.  **Haz clic en el icono 🕶️** de la extensión en la barra de herramientas de Chrome para abrir el popup.
2.  **Activar/Desactivar Bloqueo:** Usa el botón grande en la parte superior del popup para activar o desactivar globalmente toda la funcionalidad de bloqueo. La página de ForoCoches se recargará para aplicar el cambio.
3.  **Añadir Usuarios a Ignorar:**
    * En el área de texto, escribe los nombres de los usuarios que quieres ignorar.
    * Puedes poner un nombre por línea o varios nombres separados por comas.
    * No importa si pones `@` delante del nombre o no (ej. `usuario1`, `@usuario2`, `Nombre Con Espacios`).
    * Haz clic en "Guardar Lista". La página de ForoCoches se recargará.
4.  **Importar/Exportar Lista:** Usa los botones correspondientes en el popup para guardar una copia de tu lista o cargar una previamente guardada.
5.  **Ver Contenido Oculto:** Dentro de un hilo, si la extensión ha reemplazado un mensaje o cita con un placeholder, haz clic en el enlace "Ver Mensaje" o "Ver Cita" en dicho placeholder para mostrar temporalmente el contenido original.

---

## 🗺️ Roadmap y Futuras Mejoras (Lo que Falta) 🗺️

Aún hay muchas ideas para seguir mejorando la extensión. ¡Tu feedback es crucial!

<details>
<summary>👁️ **Mejoras Visuales y de Usabilidad Pendientes**</summary>

-   **Resolver el "Hueco" Visual en Listados:** Investigar y pulir la visualización cuando se rellenan hilos en `forumdisplay.php` para que el espacio se maneje de forma más estética si los hilos añadidos son de diferente altura a los ocultos.
-   **Restauración Dinámica en Hilos:** Que al desactivar el bloqueo global o usar "Ver Mensaje/Cita", el contenido se restaure sin necesidad de una recarga completa de la página de ForoCoches.
-   **Ocultamiento Completo de Posts:** Opción para ocultar no solo el contenido del mensaje, sino toda la "caja" del post del usuario ignorado (avatar, firma, etc.), dejando solo el placeholder.
-   **Feedback en Popup:** Reemplazar los `alert()` por notificaciones más integradas en el popup.
-   **Gestión de Lista Avanzada:** Opciones para ordenar la lista de ignorados, botón para limpiar toda la lista con confirmación.
-   **Placeholder para Hilos:** Considerar si en `forumdisplay.php` también queremos un placeholder para los hilos ocultos en lugar de que simplemente desaparezcan.

</details>

<details>
<summary>💡 **Nuevas Funcionalidades Potenciales**</summary>

-   **Ignorar desde Menú Contextual:** Poder hacer clic derecho sobre un nombre de usuario en ForoCoches y añadirlo directamente a la lista de ignorados.
-   **Ignorar por Palabras Clave:** Opción para ocultar hilos o incluso posts que contengan ciertas palabras clave.
-   **Lista de "Usuarios Favoritos":** Funcionalidad inversa para destacar o encontrar fácilmente posts/hilos de usuarios específicos.
-   **Refinar Relleno de Página:** Si se necesitan más de 40 hilos, o si los de la página siguiente también están muy filtrados, considerar cargar de páginas subsiguientes (pág. 3, 4, etc.) de forma controlada.

</details>

<details>
<summary>⚙️ **Mejoras Técnicas y de Rendimiento**</summary>

-   **Optimización del `MutationObserver`:** Ajustar la sensibilidad para reducir la posible ejecución múltiple de funciones de procesamiento si no es estrictamente necesario (para limpiar logs duplicados).
-   **Pruebas Exhaustivas:** Continuar probando en diferentes escenarios y con distintas configuraciones de ForoCoches.

</details>

---

## 💬 ¡Queremos tu Feedback!

Esta extensión está en desarrollo y tu opinión es muy importante.
Si encuentras algún **fallo**, tienes alguna **sugerencia** para nuevas funcionalidades, o ideas para **mejorar las existentes**, ¡no dudes en comunicarlo!

* Puedes abrir un "Issue" en este repositorio de GitHub (si está disponible).
* O contactar por el medio que hayamos acordado.

**Específicamente, nos interesa saber:**
* ¿Funciona todo como esperas?
* ¿Hay algún comportamiento extraño?
* ¿Qué otra cosa te gustaría que hiciera la extensión?
* ¿Cómo podemos hacerla aún mejor?

---

¡Gracias por usar y ayudar a mejorar Bloqueador ForoCoches Avanzado!
