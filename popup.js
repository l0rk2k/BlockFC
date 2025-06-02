document.addEventListener('DOMContentLoaded', () => {
  const userListTextArea = document.getElementById('userList');
  const saveButton = document.getElementById('saveButton');
  const exportButton = document.getElementById('exportButton');
  const importFileInput = document.getElementById('importFile');
  const toggleBlockingButton = document.getElementById('toggleBlockingButton'); // Referencia al nuevo botón

  // 1. Aplicar el tema (claro/oscuro) al popup
  function applyTheme() {
    chrome.storage.sync.get('forocoches_theme', (data) => {
      if (data.forocoches_theme === 'dark') {
        document.body.classList.add('popup-dark-mode');
      } else {
        document.body.classList.remove('popup-dark-mode');
      }
    });
  }

  // 2. Cargar la lista de usuarios ignorados
  function loadIgnoredUsers() {
    chrome.storage.sync.get('ignoredUsers', (data) => {
      if (data.ignoredUsers && Array.isArray(data.ignoredUsers)) {
        userListTextArea.value = data.ignoredUsers.join('\n');
      } else {
        userListTextArea.value = '';
      }
    });
  }

  // --- NUEVAS FUNCIONES PARA EL BOTÓN DE ACTIVAR/DESACTIVAR ---
  /**
   * Actualiza el texto y la clase CSS del botón de activar/desactivar.
   * @param {boolean} isActive True si el bloqueo está activo, false si no.
   */
  function updateToggleButtonVisuals(isActive) {
    if (isActive) {
      toggleBlockingButton.textContent = 'Desactivar Bloqueo';
      toggleBlockingButton.classList.remove('blocking-inactive');
      toggleBlockingButton.classList.add('blocking-active');
    } else {
      toggleBlockingButton.textContent = 'Activar Bloqueo';
      toggleBlockingButton.classList.remove('blocking-active');
      toggleBlockingButton.classList.add('blocking-inactive');
    }
  }

  /**
   * Carga el estado de bloqueo (isBlockingActive) desde chrome.storage
   * y actualiza el botón. Si no hay estado guardado, lo establece como activo por defecto.
   */
  function initializeToggleBlockingButton() {
    chrome.storage.sync.get('isBlockingActive', (data) => {
      // Si 'isBlockingActive' no está definido (primera vez), se asume true (activo).
      let isActive = data.isBlockingActive === undefined ? true : data.isBlockingActive;
      
      if (data.isBlockingActive === undefined) {
        // Guardar el estado inicial si no existe
        chrome.storage.sync.set({ 'isBlockingActive': true });
      }
      updateToggleButtonVisuals(isActive);
    });
  }
  // --- FIN NUEVAS FUNCIONES ---

  // --- Event Listeners ---

  // NUEVO: Event listener para el botón de activar/desactivar bloqueo
  if (toggleBlockingButton) { // Comprobar que el botón existe antes de añadir el listener
    toggleBlockingButton.addEventListener('click', () => {
      chrome.storage.sync.get('isBlockingActive', (data) => {
        let currentIsActive = data.isBlockingActive === undefined ? true : data.isBlockingActive;
        const newIsActive = !currentIsActive;

        chrome.storage.sync.set({ 'isBlockingActive': newIsActive }, () => {
          updateToggleButtonVisuals(newIsActive);
          alert(`Bloqueo general ${newIsActive ? 'ACTIVADO' : 'DESACTIVADO'}.\nLa página de ForoCoches se recargará.`);
          
          // Recargar la pestaña activa de ForoCoches
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].id) {
              if (tabs[0].url && tabs[0].url.startsWith('https://forocoches.com/foro/')) {
                chrome.scripting.executeScript({
                  target: { tabId: tabs[0].id },
                  func: () => window.location.reload()
                });
              }
            }
          });
        });
      });
    });
  }

  // 3. Guardar la lista de usuarios (lógica de recarga similar al botón de toggle)
  if (saveButton) {
    saveButton.addEventListener('click', () => {
      const rawUserText = userListTextArea.value;
      const users = rawUserText
        .replace(/,/g, '\n') 
        .split('\n')
        .map(user => {
          let processedUser = user.trim();
          if (processedUser.startsWith('@')) {
            processedUser = processedUser.substring(1).trim(); 
          }
          return processedUser;
        })
        .filter(Boolean); 

      chrome.storage.sync.set({ 'ignoredUsers': users }, () => {
        alert('Lista de usuarios guardada correctamente.\nLa página de ForoCoches se recargará.');
        
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && tabs[0].id) {
            if (tabs[0].url && tabs[0].url.startsWith('https://forocoches.com/foro/')) {
              chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => window.location.reload()
              });
            }
          }
        });
      });
    });
  }

  // 4. Exportar la lista
  if (exportButton) {
    exportButton.addEventListener('click', () => {
      chrome.storage.sync.get('ignoredUsers', (data) => {
        const ignoredUsers = data.ignoredUsers || [];
        const blob = new Blob([JSON.stringify(ignoredUsers, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'forocoches_ignored_list.json';
        document.body.appendChild(a); 
        a.click();
        document.body.removeChild(a); 
        URL.revokeObjectURL(url);
      });
    });
  }

  // 5. Importar la lista
  if (importFileInput) {
    importFileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedUsers = JSON.parse(e.target.result);
            if (Array.isArray(importedUsers)) {
              const validUsers = importedUsers.every(item => typeof item === 'string');
              if (validUsers) {
                const cleanedImportedUsers = importedUsers.map(user => {
                  let processedUser = user.trim();
                  if (processedUser.startsWith('@')) {
                    processedUser = processedUser.substring(1).trim();
                  }
                  return processedUser;
                }).filter(Boolean);

                userListTextArea.value = cleanedImportedUsers.join('\n');
                if (saveButton) saveButton.click(); // Simula clic para guardar y recargar
              } else {
                alert('Error: El archivo JSON debe contener una lista de nombres de usuario (strings).');
              }
            } else {
              alert('Error: El archivo JSON no tiene el formato de lista esperado.');
            }
          } catch (error) {
            alert('Error al leer o procesar el archivo JSON: ' + error.message);
          } finally {
              importFileInput.value = '';
          }
        };
        reader.readAsText(file);
      }
    });
  }

  // --- Carga Inicial ---
  applyTheme();
  loadIgnoredUsers();
  initializeToggleBlockingButton(); // Inicializar el nuevo botón de activar/desactivar
});