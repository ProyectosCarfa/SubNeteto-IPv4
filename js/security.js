// ============================================================
// BLOQUEO DE HERRAMIENTAS DE DESARROLLADOR
// ============================================================

(function() {
    'use strict';
    
    // 1. Bloquear tecla F12
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (Windows/Linux)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (Windows/Linux)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (Windows/Linux)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (ver código fuente)
        if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+K (Firefox)
        if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.keyCode === 75)) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (guardar página)
        if (e.ctrlKey && (e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
            return false;
        }
    });
    
    // 2. Prevenir click derecho
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 3. Detectar apertura de DevTools por tamaño de ventana
    let devToolsOpen = false;
    const element = new Image();
    
    Object.defineProperty(element, 'id', {
        get: function() {
            devToolsOpen = true;
            alert('🔒 Herramientas de desarrollador detectadas. Por favor, ciérralas para continuar.');
            return '';
        }
    });
    
    setInterval(function() {
        devToolsOpen = false;
        console.log(element);
        console.clear();
        
        if (devToolsOpen) {
            document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:monospace;z-index:99999;"><div style="text-align:center;"><h1>🚫 ACCESO DENEGADO</h1><p>Por favor, cierra las herramientas de desarrollador para continuar.</p></div></div>';
        }
    }, 1000);
    
    // 4. Prevenir arrastrar imágenes
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
    });
    
    // 5. Prevenir selección de texto (opcional)
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });
    
    // 6. Detectar cuando se abre DevTools con shortcut de teclado adicional
    window.addEventListener('devtoolschange', function() {});
    
    // 7. Redirigir si se intenta ver el código fuente con view-source:
    if (window.location.protocol === 'view-source:') {
        window.location.href = window.location.href.replace('view-source:', '');
    }
    
    // 8. Prevenir que se guarde la página con Ctrl+W (cierre de pestaña también)
    window.addEventListener('beforeunload', function(e) {
        // No hacer nada, solo para control
    });
    
    console.log('🔒 Protección activada - Herramientas de desarrollador bloqueadas');
})();