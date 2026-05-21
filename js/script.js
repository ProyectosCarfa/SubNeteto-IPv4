   // ARRAY para almacenar redes { nombre, hosts }
    let redesRequeridas = [];

    // Obtener elementos DOM
    const btnAgregar = document.getElementById('btnAgregarRed');
    const btnCalcular = document.getElementById('btnCalcular');
    const tbodyRedes = document.getElementById('tbodyRedes');
    const contadorSpan = document.getElementById('contadorRedes');
    const resultadosCard = document.getElementById('resultadosCard');

    // Renderizar tabla de redes cargadas
    function renderListaRedes() {
        if (redesRequeridas.length === 0) {
            tbodyRedes.innerHTML = '<tr><td colspan="3" style="text-align:center;">No hay redes, agrega usando el formulario</td></tr>';
            contadorSpan.innerText = '0';
            return;
        }
        let html = '';
        redesRequeridas.forEach((red, idx) => {
            html += `<tr>
                        <td><strong>${escapeHtml(red.nombre)}</strong></td>
                        <td>${red.hosts}</td>
                        <td><button class="btn-danger" style="padding:5px 12px;" onclick="eliminarRed(${idx})"><i class="fa-solid fa-trash"></i> Eliminar</button></td>
                     </tr>`;
        });
        tbodyRedes.innerHTML = html;
        contadorSpan.innerText = redesRequeridas.length;
    }

    window.eliminarRed = function(idx) {
        redesRequeridas.splice(idx, 1);
        renderListaRedes();
        // ocultar resultados previos si se modifica
        resultadosCard.style.display = 'none';
    };

    btnAgregar.addEventListener('click', () => {
        const nombre = document.getElementById('redNombre').value.trim();
        const hostsRaw = document.getElementById('redHosts').value;
        if (!nombre) {
            alert("Ingrese un nombre para la red");
            return;
        }
        let hosts = parseInt(hostsRaw);
        if (isNaN(hosts) || hosts < 1) {
            alert("Ingrese una cantidad de hosts válida (mínimo 1)");
            return;
        }
        redesRequeridas.push({ nombre: nombre, hosts: hosts });
        renderListaRedes();
        // limpiar campos
        document.getElementById('redNombre').value = '';
        document.getElementById('redHosts').value = '';
        resultadosCard.style.display = 'none';
    });

    // ===================== UTILIDADES BINARIO / DECIMAL / MÁSCARAS =====================
    // Convertir un número de 0-255 a binario de 8 bits
    function to8BitBinary(num) {
        let bin = (num >>> 0).toString(2);
        while (bin.length < 8) bin = '0' + bin;
        return bin;
    }

    // Convertir IP de string "a.b.c.d" a array de 4 enteros
    function ipToArray(ip) {
        return ip.split('.').map(oct => parseInt(oct, 10));
    }

    // Convertir array a string IP
    function arrayToIp(arr) {
        return arr.join('.');
    }

    // Obtener máscara a partir de CIDR (ej: /23 -> 255.255.254.0)
    function cidrToMask(cidr) {
        let maskBin = '';
        for (let i = 0; i < 32; i++) {
            maskBin += (i < cidr) ? '1' : '0';
        }
        let octetos = [];
        for (let i = 0; i < 4; i++) {
            let byteBin = maskBin.substr(i * 8, 8);
            octetos.push(parseInt(byteBin, 2));
        }
        return octetos.join('.');
    }

    // Dada una dirección IP base (array) y un prefijo CIDR, calcular dirección de red (aplicando AND)
    function getNetworkAddress(ipArray, cidr) {
        let maskArray = cidrToMask(cidr).split('.').map(Number);
        let net = [];
        for (let i = 0; i < 4; i++) net.push(ipArray[i] & maskArray[i]);
        return net;
    }

    // Broadcast: red + (~máscara) en cada octeto
    function getBroadcastAddress(networkArray, cidr) {
        let maskArray = cidrToMask(cidr).split('.').map(Number);
        let broadcast = [];
        for (let i = 0; i < 4; i++) {
            broadcast.push(networkArray[i] | (~maskArray[i] & 0xFF));
        }
        return broadcast;
    }

    // Sumar 1 a una IP para obtener primera host
    function ipPlusOne(ipArray) {
        let newIp = [...ipArray];
        for (let i = 3; i >= 0; i--) {
            if (newIp[i] < 255) {
                newIp[i]++;
                break;
            } else {
                newIp[i] = 0;
                // carry al siguiente octeto (si i>0 sigue)
            }
        }
        return newIp;
    }

    // Restar 1 para último host antes de broadcast
    function ipMinusOne(ipArray) {
        let newIp = [...ipArray];
        for (let i = 3; i >= 0; i--) {
            if (newIp[i] > 0) {
                newIp[i]--;
                break;
            } else {
                newIp[i] = 255;
            }
        }
        return newIp;
    }

    // Calcular siguiente red a partir del broadcast + 1
    function nextNetworkFromBroadcast(broadcastArray) {
        let next = [...broadcastArray];
        for (let i = 3; i >= 0; i--) {
            if (next[i] < 255) {
                next[i]++;
                break;
            } else {
                next[i] = 0;
            }
        }
        return next;
    }

    // Función principal: dado ipBaseStr, y array de objetos { nombre, hosts }, devuelve resultados
    function calcularSubredes(ipBaseStr, redes) {
        if (!ipBaseStr.match(/^(\d{1,3}\.){3}\d{1,3}$/)) throw new Error("IP base inválida");
        let ipBaseArr = ipToArray(ipBaseStr);
        // Ordenar redes de mayor a menor hosts (VLSM)
        let sorted = [...redes].sort((a,b) => b.hosts - a.hosts);
        let resultados = [];
        let currentIp = [...ipBaseArr];   // puntero dinámico

        for (let red of sorted) {
            let hostsNeeded = red.hosts;
            // calcular n bits host: 2^n -2 >= hostsNeeded
            let n = 1;
            while ((Math.pow(2, n) - 2) < hostsNeeded) n++;
            let cidr = 32 - n;
            if (cidr < 0 || cidr > 32) throw new Error("Prefijo inválido");

            // Obtener direcciones ajustadas a partir de currentIp pero respetando prefijo: debo enmascarar currentIp al CIDR para obtener red correcta.
            let networkAddr = getNetworkAddress(currentIp, cidr);
            let broadcastAddr = getBroadcastAddress(networkAddr, cidr);
            let firstHost = ipPlusOne(networkAddr);
            let lastHost = ipMinusOne(broadcastAddr);
            
            // Validar que la red tenga suficiente espacio (hostsNeeded)
            let totalHosts = Math.pow(2, n) - 2;
            if (totalHosts < hostsNeeded) {
                throw new Error(`No hay espacio para ${red.nombre} con ${hostsNeeded} hosts`);
            }
            
            // guardar resultado
            resultados.push({
                nombre: red.nombre,
                hostsRequeridos: hostsNeeded,
                bitsHost: n,
                cidr: cidr,
                mascara: cidrToMask(cidr),
                direccionRed: arrayToIp(networkAddr),
                broadcast: arrayToIp(broadcastAddr),
                primeraIP: arrayToIp(firstHost),
                ultimaIP: arrayToIp(lastHost),
                // Guardamos para mostrar proceso binario
                networkArray: networkAddr,
                cidrOriginal: cidr,
                currentIpCalculo: [...currentIp]
            });

            // Calcular siguiente red a partir de broadcast + 1
            currentIp = nextNetworkFromBroadcast(broadcastAddr);
        }

        return { resultados, ipBaseOriginal: ipBaseArr };
    }

    // Mostrar proceso binario elegante (últimos 2 octetos o según ip base)
    function generarProcesoBinario(resultadosArr, ipBaseArr) {
        let html = '<div class="binario-proceso"><h4>📘 Proceso Binario Detallado</h4>';
        for (let res of resultadosArr) {
            // Tomamos la dirección de red obtenida
            let netArr = res.networkArray;
            // extraemos últimos 2 octetos (tercer y cuarto) para visualización similar al ejemplo
            let tercerOcteto = netArr[2];
            let cuartoOcteto = netArr[3];
            let binTercer = to8BitBinary(tercerOcteto);
            let binCuarto = to8BitBinary(cuartoOcteto);
            let bitsHost = res.bitsHost;
            let cidr = res.cidr;
            // bits de red totales = cidr; pero visualmente para dibujar línea en últimos 2 octetos
            // posición de bits de red en los últimos 2 octetos: (cidr - 16) para tercer+cuarto. si cidr<16 se ajusta
            let bitsEnUltimos16 = Math.max(0, cidr - 16);
            // Representación: binario completo de los dos octetos (16 bits)
            let bin16 = binTercer + binCuarto;  // 16 caracteres
            let lineaPos = bitsEnUltimos16;
            let parteRed = bin16.substring(0, lineaPos);
            let parteHost = bin16.substring(lineaPos);
            let binConLinea = '';
            if (lineaPos === 16) binConLinea = `<span style="background:#cfe6f5;">${parteRed}</span>`;
            else if (lineaPos === 0) binConLinea = `<span style="background:#ffdd99;">${parteHost}</span>`;
            else binConLinea = `<span style="background:#cfe6f5;">${parteRed}</span><span style="background:#ffdd99;">${parteHost}</span>`;
            
            // Máscara de bits host en decimal: el broadcast se hace con 1s host
            // Mostramos ejemplo: binario original base (tomando el último octeto de red base? o el network)
            let mascaraBits = '';
            for(let i=0;i<32-cidr;i++) mascaraBits += '1';
            for(let i=0;i<cidr;i++) mascaraBits = '0'+mascaraBits; // no es necesario pero elegante
            
            html += `<div style="margin-top:18px; border-top:1px dashed #aaa; padding-top:12px;">
                        <strong>🔹 Red: ${res.nombre}</strong> (Hosts: ${res.hostsRequeridos})<br>
                        <span>Dirección de red: <strong>${res.direccionRed}</strong> | CIDR: /${res.cidr} | Máscara: ${res.mascara}</span><br>
                        <span>Bits necesarios: <strong>${res.bitsHost}</strong> (2^${res.bitsHost} -2 = ${Math.pow(2,res.bitsHost)-2} ≥ ${res.hostsRequeridos})</span><br>
                        <span style="font-family:monospace;">Últimos 2 octetos en binario: ${binTercer}.${binCuarto}</span><br>
                        <span>Subneteo línea imaginaria: ${binConLinea}</span><br>
                        <span>🔁 Broadcast obtenido: ${res.broadcast} → siguiente red comienza en: ${siguienteRedDesdeBroadcast(res.broadcast)}</span>
                    </div>`;
        }
        html += '</div>';
        return html;
    }

    function siguienteRedDesdeBroadcast(broadcastStr) {
        let arr = ipToArray(broadcastStr);
        let next = nextNetworkFromBroadcast(arr);
        return arrayToIp(next);
    }

    // Generar tabla completa
    function renderTablaResultados(resultados) {
        let tableHtml = `<table>
            <thead>
                <tr><th>Red</th><th>Hosts req</th><th>Bits Host</th><th>CIDR</th><th>Máscara</th><th class="network-bg">Network ID</th><th class="host-bg">Primera IP</th><th class="host-bg">Última IP</th><th class="broadcast-bg">Broadcast</th></tr>
            </thead>
            <tbody>`;
        for (let r of resultados) {
            tableHtml += `<tr>
                <td><strong>${escapeHtml(r.nombre)}</strong></td>
                <td>${r.hostsRequeridos}</td>
                <td>${r.bitsHost}</td>
                <td>/${r.cidr}</td>
                <td>${r.mascara}</td>
                <td class="network-bg">${r.direccionRed}</td>
                <td class="host-bg">${r.primeraIP}</td>
                <td class="host-bg">${r.ultimaIP}</td>
                <td class="broadcast-bg">${r.broadcast}</td>
            </tr>`;
        }
        tableHtml += `</tbody></table>`;
        return tableHtml;
    }

    function escapeHtml(str) { return str.replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

    // Evento principal CALCULAR
    btnCalcular.addEventListener('click', () => {
        if (redesRequeridas.length === 0) {
            alert("Debe agregar al menos una red/subred");
            return;
        }
        let baseIp = document.getElementById('baseIp').value.trim();
        if (!baseIp) {
            alert("Ingrese IP base");
            return;
        }
        try {
            // Validar ip base
            let partes = baseIp.split('.');
            if(partes.length !== 4) throw new Error();
            partes.forEach(p => { if(isNaN(p) || p<0 || p>255) throw new Error();});
            
            const { resultados, ipBaseOriginal } = calcularSubredes(baseIp, redesRequeridas);
            // Mostrar tabla de resultados
            const tablaHtml = renderTablaResultados(resultados);
            const procesoHtml = generarProcesoBinario(resultados, ipBaseOriginal);
            document.getElementById('resultadosTabla').innerHTML = tablaHtml;
            document.getElementById('procesoBinarioDetalle').innerHTML = procesoHtml;
            resultadosCard.style.display = 'block';
            // Scroll suave
            resultadosCard.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            alert("Error en el cálculo: " + error.message);
            console.error(error);
        }
    });

    // Inicializar con ejemplo didáctico: Sullana 500, Piura 200 para demostración
    function cargarEjemplo() {
        redesRequeridas.push({ nombre: "Sullana", hosts: 500 });
        redesRequeridas.push({ nombre: "Piura", hosts: 200 });
        renderListaRedes();
    }
    cargarEjemplo();

    // Registro del service worker para PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('Service Worker registrado con éxito:', registration.scope);
                })
                .catch(error => {
                    console.warn('Error al registrar Service Worker:', error);
                });
        });
    }

    



    // ACTUALIZACION ABOUT SECCIONES

document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener las secciones
    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');
    let documentationSection = document.getElementById('documentation');
    let supportSection = document.getElementById('support');
   
    // Función para ocultar todas las secciones
    function hideAllSections() {
        if (homeSection) homeSection.style.display = 'none';
        if (aboutSection) aboutSection.style.display = 'none';
        if (documentationSection) documentationSection.style.display = 'none';
        if (supportSection) supportSection.style.display = 'none';
    }
    
    // Función para mostrar sección específica
    function showSection(section) {
        hideAllSections();
        if (section) {
            section.style.display = 'block';
        }
        const resultadosCard = document.getElementById('resultadosCard');
        if (resultadosCard) {
            resultadosCard.style.display = 'none';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Event listeners para los enlaces del nav
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si es enlace externo o archivo HTML, dejar funcionar normalmente
            if (href && (href.includes('.html') || href.startsWith('http'))) {
                return;
            }
            
            // Prevenir solo para anclas internas
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                
                switch(sectionId) {
                    case 'home':
                        showSection(homeSection);
                        break;
                    case 'about':
                        showSection(aboutSection);
                        break;
                    case 'documentation':
                        showSection(documentationSection);
                        break;
                    case 'support':
                        showSection(supportSection);
                        break;
                    default:
                        showSection(homeSection);
                }
            }
        });
    });
    
});