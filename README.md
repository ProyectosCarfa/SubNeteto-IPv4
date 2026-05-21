# 🌐 Calculadora de Subredes IPv4 con VLSM

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)

</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/74ca454c-f75e-4a47-9b2c-f927a2e7fd4b" alt="Header" width="100%">
  <br>
  <h3>📡 Herramienta profesional para el cálculo de subredes IPv4 utilizando VLSM</h3>
  <p><strong>ネットワークとデータ通信 — サブネット計算プロフェッショナルツール</strong></p>
</div>

## 📋 Tabla de Contenidos

<details>
<summary>📖 Navegación rápida</summary>

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Interfaz de Usuario](#-interfaz-de-usuario)
- [Metodología VLSM](#-metodología-vlsm)
- [Proceso de Cálculo](#-proceso-de-cálculo)
- [Tabla Binaria](#-tabla-binaria)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Uso](#-instalación-y-uso)
- [Documentación](#-documentación)
- [Soporte](#-soporte)
- [Créditos](#-créditos)
- [Licencia](#-licencia)

</details>

## 🚀 Descripción General

**Calculadora de Subredes IPv4 con VLSM** es una herramienta profesional y educativa diseñada para estudiantes, administradores de redes y profesionales de TI. Permite calcular subredes IPv4 utilizando la técnica **VLSM (Variable Length Subnet Masking)** de manera automática, mostrando resultados detallados incluyendo representación binaria, máscaras, direcciones de red, broadcast y rangos de hosts.

### ✨ Ventajas

- ⚡ **Rápida y precisa** - Resultados en tiempo real
- 📱 **Responsive** - Funciona en cualquier dispositivo
- 🆓 **100% Gratuita** - Código abierto bajo licencia MIT
- 🎓 **Educativa** - Explicación paso a paso del proceso

<div align="center">
  <img src="https://github.com/user-attachments/assets/9ea83205-5af9-4d60-88d4-688cb9f0d27e" alt="Dashboard" width="100%">
</div>

## ⚡ Características Principales

| Característica | Descripción | Estado |
|----------------|-------------|--------|
| **🎯 Cálculo VLSM Automático** | Ordena redes de mayor a menor hosts y calcula subredes óptimas | ✅ |
| **📊 Proceso Binario Detallado** | Visualización paso a paso de la conversión binaria | ✅ |
| **🎨 Interfaz Moderna** | Diseño profesional con temática tecnológica | ✅ |
| **📱 Responsive Design** | Funciona perfectamente en dispositivos móviles y tablets | ✅ |
| **🔄 Cálculo de Saltos** | Determina automáticamente la siguiente red a partir del broadcast | ✅ |
| **📋 Tabla de Resultados** | Network ID, Broadcast, Primer/Último host, Máscara, CIDR | ✅ |
| **💾 PWA Ready** | Instalable como aplicación en dispositivos móviles | ✅ |

<div align="center">
  <img src="https://github.com/user-attachments/assets/8a41672c-b527-41a0-ae7e-e9aee37d5631" alt="Features" width="100%">
</div>

## 💻 Tecnologías Utilizadas

<div align="center">

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **HTML5** | Semántico | Estructura del sitio |
| **CSS3** | Flexbox/Grid | Estilos y diseño responsive |
| **JavaScript** | ES6+ | Lógica de cálculo VLSM |
| **PWA** | Moderna | Instalación offline |

</div>

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="60" style="margin: 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="60" style="margin: 10px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="60" style="margin: 10px;">
</div>

## 🖥️ Interfaz de Usuario

### Pantalla Principal - Calculadora

<div align="center">
  <img src="https://github.com/user-attachments/assets/6866c2cf-bee8-40c7-986f-7919fcbcb904" alt="Interfaz Principal" width="100%">
</div>

La interfaz principal consta de:

| Elemento | Función |
|----------|---------|
| **1. Campo de IP Base** | Ingresa la dirección IPv4 inicial (ej: 192.168.1.0) |
| **2. Panel de Redes** | Agrega redes con nombre y cantidad de hosts requeridos |
| **3. Botón de Cálculo** | Ejecuta el algoritmo VLSM automáticamente |
| **4. Tabla de Resultados** | Muestra todas las subredes calculadas con sus parámetros |

### Procesamiento y Resultados en Tiempo Real

<div align="center">
  <img src="https://github.com/user-attachments/assets/11e0e528-f876-4763-a355-40dd80663b00" alt="Resultados" width="100%">
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/28391319-f33b-4ee2-a989-93a35c9985ad" alt="Proceso Binario" width="100%">
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/fd0b6227-56a4-4f5f-8225-de79cf30f3b2" alt="Proceso Final" width="100%">
</div>

## 📐 Metodología VLSM

El sistema implementa el algoritmo VLSM siguiendo estos pasos:

### 1️⃣ Ordenamiento
Las redes se ordenan automáticamente de **mayor a menor** cantidad de hosts requeridos.

### 2️⃣ Cálculo de Bits Necesarios

`2ⁿ - 2 ≥ Hosts`

> Donde `n` es el número mínimo de bits para hosts.

### 3️⃣ Determinación de CIDR

`CIDR = 32 - n`

### 4️⃣ Cálculo de Direcciones

| Elemento | Operación |
|----------|-----------|
| **Network ID** | AND lógico entre IP y máscara |
| **Broadcast** | OR lógico entre IP y ~máscara |
| **Primer Host** | Network ID + 1 |
| **Último Host** | Broadcast - 1 |

### 5️⃣ Siguiente Red

`Siguiente Red = Broadcast + 1`

## 📊 Tabla Binaria

La herramienta incluye una visualización detallada del proceso binario para cada subred calculada, mostrando:

- ✅ Conversión de octetos a binario de 8 bits
- ✅ Línea imaginaria que separa bits de red y hosts
- ✅ Cálculo del broadcast en binario
- ✅ Determinación del siguiente salto de red

<div align="center">
  <img src="https://github.com/user-attachments/assets/3939903b-39f3-4a15-ae47-f7ce4f4ff158" width="48%">
  <img src="https://github.com/user-attachments/assets/797fdb11-9b7d-4e3a-bcb3-10b58312ecdb" width="48%">
  <br>
  <img src="https://github.com/user-attachments/assets/a4f90c04-1f8a-41d2-96c0-dbb0f855265a" width="48%">
  <img src="https://github.com/user-attachments/assets/a6b1a639-0046-4b74-84df-4d9e7bc7e6df" width="48%">
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/3104546a-ef20-4e6b-a647-f2779a42e9b7" alt="Tabla Binaria Detallada" width="80%">
</div>

## 📁 Estructura del Proyecto

```bash
subneteo-calculator/
│
├── 📄 index.html                 # Página principal
├── 📄 manifest.webmanifest       # PWA manifest
├── 📄 sw.js                      # Service Worker
│
├── 📁 assets/
│   ├── 📁 img/
│   │   ├── 🖼️ fondo.png         # Fondo principal
│   │   ├── 🖼️ fondo2.png        # Fondo secundario
│   │   ├── 🖼️ logo.png          # Logo del sitio
│   │   ├── 🖼️ subredes.png      # Icono de subredes
│   │   └── 📁 footer/
│   │       ├── 🖼️ personaje1.png
│   │       ├── 🖼️ personaje2.png
│   │       ├── 🖼️ personaje3.png
│   │       └── 🖼️ personaje4.png
│   │
│   └── 📁 resources/
│       ├── 📄 tablaBinaria.html
│       └── 📄 documentacion.pdf
│
├── 📁 css/
│   └── 🎨 style.css             # Estilos principales
│
├── 📁 js/
│   └── ⚙️ script.js             # Lógica de cálculo VLSM
│
└── 📄 README.md                 # Este archivo


```


🔧 Instalación y Uso
📋 Requisitos Previos
🌐 Navegador web moderno (Chrome, Firefox, Edge, Safari)
📶 Conexión a internet (para fuentes de Google y FontAwesome)

💻 Instalación Local
1. Clonar el repositorio <br>
```git clone https://github.com/subneteo/subneteo-calculator.git ``` <br>
2. Navegar al directorio <br>
```cd subneteo-calculator``` <br>
3. Abrir el archivo index.html<br>
```# En Windows
start index.html

# En macOS
open index.html

# En Linux
xdg-open index.html
```

🎯 Uso de la Herramienta
<div align="center"> <img src="https://github.com/user-attachments/assets/5eab6299-39dc-4e2b-a54f-dd35885711c0" alt="Acerca de" width="80%"> </div>


📚 Documentación
<div align="center"> <img src="https://github.com/user-attachments/assets/4b218f48-f7a5-4476-b943-e1eaec24d09f" width="48%"> <img src="https://github.com/user-attachments/assets/af40f0a8-b810-4d0b-b4da-050e07d14841" width="48%"> </div><div align="center"> <img src="https://github.com/user-attachments/assets/5ad585c1-885b-489f-b748-1e08f8c8156f" alt="Documentación" width="80%"> </div>

🆘 Soporte
<div align="center"> <img src="https://github.com/user-attachments/assets/68542229-a558-4783-a576-6a25db8388e4" alt="Soporte" width="80%"> </div>

❓ Preguntas Frecuentes
<details> <summary><strong>¿La herramienta es gratuita?</strong></summary>
Sí, es completamente gratuita y de código abierto bajo licencia MIT.

</details><details> <summary><strong>¿Qué es VLSM?</strong></summary>
VLSM (Variable Length Subnet Masking) permite usar máscaras de subred de longitud variable, optimizando el uso de direcciones IPv4.

</details><details> <summary><strong>¿Puedo guardar mis cálculos?</strong></summary>
Los resultados se mantienen mientras no recargues la página. Próximamente añadiremos exportación a PDF.

</details><details> <summary><strong>¿Hay límite de redes que puedo calcular?</strong></summary>
No, puedes agregar todas las redes que necesites mientras el espacio de direcciones lo permita.

</details><details> <summary><strong>¿Qué formatos de IP soporta?</strong></summary>
Soporta direcciones IPv4 en formato decimal con puntos (ej: 192.168.1.0).

</details>

👨‍💻 Créditos
<div align="center">
Desarrollado por CARFA
Redes y Comunicación de Datos I

ネットワークとデータ通信 — サブネット計算プロフェッショナルツール

📧 alvinescarlos887@gmail.com

</div>


📄 Licencia
<div align="center">
Este proyecto está bajo la Licencia MIT

</div>


🌟 ¡Gracias por usar nuestra herramienta! 🌟
Subneteo VLSM - Demostración didáctica | Conversión binaria y cálculo automático de saltos

© 2024 Subneteo VLSM | MIT License


