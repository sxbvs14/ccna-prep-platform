# CCNA 200-301 Prep Platform 🚀

Plataforma completa de preparación para el examen CCNA 200-301 de Cisco. Totalmente autocontenida — funciona 100% en el navegador sin backend.

**→ [Usar la plataforma](https://TU-USUARIO.github.io/ccna-prep-platform/)**

## ✨ Features

- **📝 80+ preguntas realistas** cubriendo los 6 dominios del CCNA 200-301
- **🎯 Simulacro completo** — 60 preguntas en 90 minutos, replica el formato Cisco
- **🔧 Labs interactivos** — CLI Cisco IOS simulada con troubleshooting real
- **🧠 Tutor adaptativo** — detecta debilidades y ajusta dificultad automáticamente
- **📊 Análisis de desempeño** — desglose por dominio con recomendaciones personalizadas
- **📖 Guía de estudio** — resúmenes de todos los temas del examen
- **💾 Persistencia local** — progreso guardado en localStorage
- **🌙 Dark theme premium** — diseñado para sesiones largas de estudio

## 🚀 Deploy en GitHub Pages

1. Hacé fork de este repo o subilo a tu cuenta
2. Andá a **Settings → Pages**
3. En **Source**, seleccioná `main` (o la rama que uses)
4. Clic en **Save**
5. Tu plataforma estará disponible en `https://TU-USUARIO.github.io/ccna-prep-platform/`

**Sin build, sin dependencias, sin configuraciones extra.** Solo HTML, CSS y JS vanilla.

## 📂 Estructura

```
ccna-prep-platform/
├── index.html              # App shell
├── css/
│   └── app.css             # Estilos premium dark theme
├── js/
│   ├── data/
│   │   ├── questions.js    # Banco de 80+ preguntas CCNA
│   │   ├── labs.js         # Escenarios de troubleshooting
│   │   └── study-guide.js  # Guía de estudio completa
│   ├── modules/
│   │   ├── storage.js      # localStorage wrapper
│   │   ├── analytics.js    # Análisis de debilidades
│   │   ├── tutor.js        # Motor adaptativo
│   │   ├── exam.js         # Simulacro de examen
│   │   └── lab-sim.js      # CLI Cisco IOS simulada
│   └── app.js              # Controlador principal
└── README.md
```

## 🎮 Uso

### Modo Práctica
Seleccioná un dominio y dificultad, respondé preguntas con feedback inmediato. Ideal para estudiar temas específicos.

### Modo Simulacro
60 preguntas aleatorias en 90 minutos. Misma distribución de dominios que el examen real. Al finalizar, análisis completo con revisión de cada pregunta.

### Labs CLI
Simulá una terminal Cisco IOS real. Diagnosticá problemas de VLANs, ACLs, OSPF, DHCP y Port Security. Escribí comandos como `show vlan brief`, `show interfaces trunk`, `show access-lists`.

### Guía de Estudio
Resúmenes por dominio con tablas, comandos y conceptos clave. Todo lo que necesitás repasar antes del examen.

### Análisis
Visualizá tu desempeño por dominio. Identificá áreas débiles y recibí recomendaciones personalizadas.

## 🔧 Personalización

El banco de preguntas está en `js/data/questions.js`. Podés agregar, modificar o eliminar preguntas editando el array `QUESTIONS`.

Los escenarios de labs están en `js/data/labs.js`. Cada lab tiene comandos simulados, outputs y preguntas de troubleshooting.

La guía de estudio está en `js/data/study-guide.js`.

## 📋 Dominios Cubiertos

| Dominio | % del Examen | Preguntas |
|---------|-------------|-----------|
| 🌐 Network Fundamentals | 20% | OSI, TCP/IP, subnetting, IPv6, cableado |
| 🔌 Network Access | 20% | VLANs, STP, EtherChannel, trunking |
| 🔗 IP Connectivity | 25% | OSPF, enrutamiento estático, FHRP, NAT |
| ⚙️ IP Services | 10% | DHCP, DNS, NTP, SNMP, SSH |
| 🔒 Security Fundamentals | 15% | ACLs, Port Security, AAA, VPN |
| 🤖 Automation & Programmability | 10% | REST APIs, JSON, Ansible, SDN, DNA Center |

## 📝 Licencia

MIT — Usalo, modificalo, compartilo. Solo no te olvides de estudiar.

---

*Built with ❤️ for CCNA candidates in 2026.*
