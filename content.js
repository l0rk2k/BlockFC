function detectAndStoreTheme() {
  const isDarkMode = document.body.classList.contains('dark_theme');
  const currentTheme = isDarkMode ? 'dark' : 'light';
  chrome.storage.sync.set({ 'forocoches_theme': currentTheme });
}

function hideThreads() {
  // 1. Obtenemos tanto la lista de usuarios ignorados COMO el estado de activación del bloqueo.
  chrome.storage.sync.get(['ignoredUsers', 'isBlockingActive'], (data) => {
    const ignoredUsers = data.ignoredUsers || [];
    // Por defecto, el bloqueo está activo si 'isBlockingActive' no está definido (ej. primera vez)
    const blockingActuallyActive = data.isBlockingActive === undefined ? true : data.isBlockingActive;

    const threadContainers = document.querySelectorAll('section[style="padding: 0;"] > div[style*="flex-direction: column"]');

    threadContainers.forEach(thread => {
      let shouldBeHidden = false; // Por defecto, un hilo no se oculta.

      // 2. Solo intentamos ocultar si el bloqueo general está ACTIVO y HAY usuarios en la lista.
      if (blockingActuallyActive && ignoredUsers.length > 0) {
        const authorElement = thread.querySelector('a[href*="showthread.php?p="] > span[style*="color: var(--gray-text)"]');
        if (authorElement) {
          let fullText = authorElement.textContent;
          if (fullText.includes('@') && fullText.includes(' - ')) {
            const username = fullText.split('@')[1].split(' - ')[0].trim();
            if (ignoredUsers.includes(username)) {
              shouldBeHidden = true; // Marcar para ocultar si el autor está en la lista.
            }
          }
        }
      }

      // 3. Aplicamos la visibilidad.
      // Si shouldBeHidden es true, se oculta. Si es false (porque el bloqueo está desactivado
      // o el usuario no está en la lista), se asegura de que sea visible (display = '').
      thread.style.display = shouldBeHidden ? 'none' : '';
      const nextSeparator = thread.nextElementSibling;
      if (nextSeparator && nextSeparator.tagName === 'SEPARATOR-LARGE') {
        nextSeparator.style.display = shouldBeHidden ? 'none' : '';
      }
    });
  });
}

// --- Ejecución Inicial ---
detectAndStoreTheme();
hideThreads();

// --- Observador de Mutaciones ---
const observerCallback = (mutationsList, observer) => {
  let themeMightHaveChanged = false;
  let contentMightHaveChanged = false;

  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target === document.body) {
      themeMightHaveChanged = true;
    }
    if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
      contentMightHaveChanged = true;
    }
  }

  if (themeMightHaveChanged) {
    detectAndStoreTheme();
  }
  if (contentMightHaveChanged || themeMightHaveChanged) {
    // Siempre que haya un cambio relevante, se re-evalúa la visibilidad de los hilos
    // hideThreads ya tiene la lógica para mostrar/ocultar según isBlockingActive
    hideThreads();
  }
};

const observer = new MutationObserver(observerCallback);
observer.observe(document.body, {
  attributes: true,
  attributeFilter: ['class'],
  childList: true,
  subtree: true
});