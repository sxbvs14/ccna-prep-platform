// ═══════════════════════════════════════════
// CCNA 200-301 Question Bank
// ═══════════════════════════════════════════

const CCNA_DOMAINS = {
  network_fundamentals: {
    id: 'network_fundamentals',
    name: 'Network Fundamentals',
    nameEs: 'Fundamentos de Red',
    pct: 20,
    icon: '🌐',
    color: '#7c3aed'
  },
  network_access: {
    id: 'network_access',
    name: 'Network Access',
    nameEs: 'Acceso a la Red',
    pct: 20,
    icon: '🔌',
    color: '#3b82f6'
  },
  ip_connectivity: {
    id: 'ip_connectivity',
    name: 'IP Connectivity',
    nameEs: 'Conectividad IP',
    pct: 25,
    icon: '🔗',
    color: '#10b981'
  },
  ip_services: {
    id: 'ip_services',
    name: 'IP Services',
    nameEs: 'Servicios IP',
    pct: 10,
    icon: '⚙️',
    color: '#f59e0b'
  },
  security_fundamentals: {
    id: 'security_fundamentals',
    name: 'Security Fundamentals',
    nameEs: 'Fundamentos de Seguridad',
    pct: 15,
    icon: '🔒',
    color: '#ef4444'
  },
  automation: {
    id: 'automation',
    name: 'Automation & Programmability',
    nameEs: 'Automatización y Programabilidad',
    pct: 10,
    icon: '🤖',
    color: '#8b5cf6'
  }
};

const QUESTIONS = [
  // ═══════════════════════════════════════
  // NETWORK FUNDAMENTALS (Questions 1-25)
  // ═══════════════════════════════════════

  {
    id: 1,
    domain: 'network_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué capa del modelo OSI es responsable del enrutamiento y direccionamiento lógico?',
    options: [
      'A. Capa 2 — Enlace de Datos',
      'B. Capa 3 — Red',
      'C. Capa 4 — Transporte',
      'D. Capa 1 — Física'
    ],
    answer: 1,
    explanation: 'La Capa 3 (Red) del modelo OSI maneja el direccionamiento lógico (IP) y el enrutamiento entre redes distintas. La Capa 2 maneja direcciones MAC (físicas), la Capa 4 proporciona transporte extremo a extremo (TCP/UDP), y la Capa 1 transmite bits por el medio físico.'
  },
  {
    id: 2,
    domain: 'network_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Cuál de los siguientes es un protocolo de Capa 4 que proporciona entrega confiable y orientada a conexión?',
    options: [
      'A. UDP',
      'B. IP',
      'C. TCP',
      'D. ICMP'
    ],
    answer: 2,
    explanation: 'TCP (Transmission Control Protocol) es un protocolo de Capa 4 orientado a conexión que garantiza entrega confiable mediante acuses de recibo (ACK), retransmisión y control de flujo. UDP es no orientado a conexión y no confiable. IP es Capa 3 e ICMP es un protocolo de control.'
  },
  {
    id: 3,
    domain: 'network_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: 'Un administrador necesita conectar dos switches a través de un enlace de fibra de 10 Gbps. ¿Qué tipo de transceptor SFP debe usar?',
    options: [
      'A. SFP (1 Gbps)',
      'B. SFP+',
      'C. QSFP',
      'D. SFP28'
    ],
    answer: 1,
    explanation: 'SFP+ (Enhanced Small Form-Factor Pluggable) soporta velocidades de hasta 10 Gbps. El SFP estándar solo soporta 1 Gbps, QSFP soporta 40/100 Gbps típicamente, y SFP28 soporta 25 Gbps. Para 10 Gbps, SFP+ es la elección correcta.'
  },
  {
    id: 4,
    domain: 'network_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué comando muestra la tabla ARP en un router Cisco?',
    options: [
      'A. show ip arp',
      'B. show arp table',
      'C. show mac address-table',
      'D. show ip route'
    ],
    answer: 0,
    explanation: '`show ip arp` muestra la tabla ARP del router, que mapea direcciones IP a direcciones MAC. `show mac address-table` muestra la tabla MAC de un switch, y `show ip route` muestra la tabla de enrutamiento.'
  },
  {
    id: 5,
    domain: 'network_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué tipo de cable se usa para conectar un router a un switch directamente?',
    options: [
      'A. Cable cruzado (crossover)',
      'B. Cable directo (straight-through)',
      'C. Cable rollover (consola)',
      'D. Cable serial DCE/DTE'
    ],
    answer: 1,
    explanation: 'Un cable directo (straight-through) se usa para conectar dispositivos de diferentes capas: router a switch, PC a switch. El cable cruzado conecta dispositivos similares (switch a switch, PC a PC, router a router). El rollover es para puerto de consola.'
  },
  {
    id: 6,
    domain: 'network_fundamentals',
    difficulty: 'hard',
    type: 'single',
    text: '¿Cuántos bits tiene una dirección IPv6?',
    options: [
      'A. 32 bits',
      'B. 64 bits',
      'C. 128 bits',
      'D. 256 bits'
    ],
    answer: 2,
    explanation: 'IPv6 utiliza direcciones de 128 bits, representadas como 8 grupos de 4 dígitos hexadecimales separados por dos puntos. Esto proporciona aproximadamente 3.4×10³⁸ direcciones. IPv4 usa 32 bits.'
  },
  {
    id: 7,
    domain: 'network_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Cuál es la dirección de loopback en IPv4?',
    options: [
      'A. 0.0.0.0',
      'B. 127.0.0.1',
      'C. 255.255.255.255',
      'D. 192.168.0.1'
    ],
    answer: 1,
    explanation: '127.0.0.1 (y todo el rango 127.0.0.0/8) es la dirección de loopback reservada en IPv4. Se usa para probar la pila TCP/IP local. 0.0.0.0 es una dirección no especificada, 255.255.255.255 es broadcast limitado.'
  },
  {
    id: 8,
    domain: 'network_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué tipo de fibra óptica usa un solo haz de luz láser y es adecuada para largas distancias?',
    options: [
      'A. Fibra multimodo (MMF)',
      'B. Fibra monomodo (SMF)',
      'C. Fibra plástica (POF)',
      'D. Cable coaxial'
    ],
    answer: 1,
    explanation: 'La fibra monomodo (SMF) tiene un núcleo muy pequeño (~9µm) y usa láser para transmitir un solo modo de luz, permitiendo distancias de hasta 40+ km sin repetidores. La multimodo (MMF) tiene un núcleo más grande y usa LED/láser para distancias más cortas.'
  },
  {
    id: 9,
    domain: 'network_fundamentals',
    difficulty: 'hard',
    type: 'single',
    text: 'En una trama Ethernet, ¿dónde se encapsula el paquete IP?',
    options: [
      'A. En el preámbulo',
      'B. En el campo de datos (payload)',
      'C. En el FCS (Frame Check Sequence)',
      'D. En la dirección MAC de destino'
    ],
    answer: 1,
    explanation: 'El paquete IP (Capa 3) se encapsula en el campo de datos/payload de la trama Ethernet (Capa 2). El preámbulo es para sincronización, el FCS es para detección de errores, y las direcciones MAC identifican origen y destino en Capa 2.'
  },
  {
    id: 10,
    domain: 'network_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué dispositivo opera en la Capa 2 del modelo OSI y toma decisiones de reenvío basadas en direcciones MAC?',
    options: [
      'A. Router',
      'B. Hub',
      'C. Switch',
      'D. Firewall'
    ],
    answer: 2,
    explanation: 'Un switch opera en Capa 2 (Enlace de Datos) y reenvía tramas basándose en direcciones MAC usando su tabla de direcciones MAC (CAM table). El router opera en Capa 3, el hub en Capa 1 (repite bits sin inteligencia), y un firewall puede operar en múltiples capas.'
  },
  {
    id: 11,
    domain: 'network_fundamentals',
    difficulty: 'medium',
    type: 'multi',
    text: '¿Cuáles de los siguientes son protocolos de Capa 3? (Selecciona 2)',
    options: [
      'A. IP',
      'B. TCP',
      'C. ICMP',
      'D. HTTP'
    ],
    answer: [0, 2],
    explanation: 'IP (Internet Protocol) e ICMP (Internet Control Message Protocol) son protocolos de Capa 3. TCP es Capa 4 (Transporte) y HTTP es Capa 7 (Aplicación).'
  },
  {
    id: 12,
    domain: 'network_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué es una VLAN y en qué capa del modelo OSI opera?',
    options: [
      'A. Capa 1 — Segmentación física',
      'B. Capa 2 — Segmentación lógica de broadcast',
      'C. Capa 3 — Enrutamiento entre subredes',
      'D. Capa 4 — Segmentación de sesiones'
    ],
    answer: 1,
    explanation: 'Una VLAN (Virtual LAN) es una segmentación lógica de dominios de broadcast que opera en Capa 2. Las VLANs permiten dividir un switch físico en múltiples switches lógicos, cada uno con su propio dominio de broadcast.'
  },
  {
    id: 13,
    domain: 'network_fundamentals',
    difficulty: 'hard',
    type: 'single',
    text: '¿Cuál es la longitud de una dirección MAC?',
    options: [
      'A. 32 bits (4 bytes)',
      'B. 48 bits (6 bytes)',
      'C. 64 bits (8 bytes)',
      'D. 128 bits (16 bytes)'
    ],
    answer: 1,
    explanation: 'Una dirección MAC (Media Access Control) tiene 48 bits (6 bytes), típicamente representada como 12 dígitos hexadecimales en formato xx:xx:xx:xx:xx:xx. Los primeros 3 bytes son el OUI (Organizationally Unique Identifier).'
  },
  {
    id: 14,
    domain: 'network_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué comando se usa para verificar conectividad básica entre dos hosts en una red IP?',
    options: [
      'A. traceroute',
      'B. ping',
      'C. nslookup',
      'D. netstat'
    ],
    answer: 1,
    explanation: '`ping` envía mensajes ICMP Echo Request y recibe Echo Reply para verificar conectividad de Capa 3 entre dos hosts. `traceroute` mapea la ruta, `nslookup` consulta DNS, y `netstat` muestra conexiones activas.'
  },
  {
    id: 15,
    domain: 'network_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué significa CSMA/CD?',
    options: [
      'A. Carrier Sense Multiple Access with Collision Detection',
      'B. Carrier Signal Modulation Access / Collision Domain',
      'C. Continuous Signal Monitoring and Collision Detection',
      'D. Carrier Sense Media Access with Collision Deferral'
    ],
    answer: 0,
    explanation: 'CSMA/CD (Carrier Sense Multiple Access with Collision Detection) es el mecanismo usado en Ethernet half-duplex. Los dispositivos escuchan el medio antes de transmitir (carrier sense) y detectan colisiones cuando dos transmiten simultáneamente.'
  },

  // ═══════════════════════════════════════
  // NETWORK ACCESS (Questions 16-30)
  // ═══════════════════════════════════════

  {
    id: 16,
    domain: 'network_access',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué protocolo previene bucles en una red con switches redundantes?',
    options: [
      'A. OSPF',
      'B. STP (Spanning Tree Protocol)',
      'C. VTP',
      'D. CDP'
    ],
    answer: 1,
    explanation: 'STP (Spanning Tree Protocol, IEEE 802.1D) previene bucles de Capa 2 bloqueando puertos redundantes y manteniendo una topología libre de bucles. OSPF es enrutamiento Capa 3, VTP es para propagación de VLANs, y CDP es protocolo de descubrimiento Cisco.'
  },
  {
    id: 17,
    domain: 'network_access',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué comando configura un puerto de switch como access en la VLAN 10?',
    options: [
      'A. switchport access vlan 10',
      'B. vlan 10 access port',
      'C. switchport mode access vlan 10',
      'D. switchport mode access\n   switchport access vlan 10'
    ],
    answer: 3,
    explanation: 'Se requieren dos comandos: `switchport mode access` configura el puerto como acceso (no trunk) y `switchport access vlan 10` asigna el puerto a la VLAN 10. El orden no importa mientras ambos estén configurados.'
  },
  {
    id: 18,
    domain: 'network_access',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué estándar IEEE define el Spanning Tree Protocol original?',
    options: [
      'A. IEEE 802.1Q',
      'B. IEEE 802.1D',
      'C. IEEE 802.1w',
      'D. IEEE 802.1s'
    ],
    answer: 1,
    explanation: 'IEEE 802.1D define el STP original. 802.1Q es trunking VLAN, 802.1w es RSTP (Rapid STP), y 802.1s es MSTP (Multiple STP).'
  },
  {
    id: 19,
    domain: 'network_access',
    difficulty: 'hard',
    type: 'single',
    text: 'Un administrador configura un trunk entre dos switches Cisco. ¿Cuál de estos protocolos de trunking es propietario de Cisco?',
    options: [
      'A. IEEE 802.1Q',
      'B. ISL (Inter-Switch Link)',
      'C. LACP',
      'D. PAgP'
    ],
    answer: 1,
    explanation: 'ISL (Inter-Switch Link) es un protocolo de trunking propietario de Cisco que encapsula la trama completa con una cabecera de 26 bytes. Hoy en día 802.1Q es el estándar preferido. LACP y PAgP son protocolos de agregación de enlaces (EtherChannel).'
  },
  {
    id: 20,
    domain: 'network_access',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué rango de VLANs se considera el rango "normal" en switches Cisco?',
    options: [
      'A. 1-1001',
      'B. 1-1005',
      'C. 1002-1005',
      'D. 1006-4094'
    ],
    answer: 1,
    explanation: 'El rango normal de VLANs es 1-1005. Las VLANs 1 y 1002-1005 son reservadas (por defecto/no removibles). El rango extendido es 1006-4094 y requiere configuración VTP transparente.'
  },
  {
    id: 21,
    domain: 'network_access',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué criterio usa STP para seleccionar el Root Bridge?',
    options: [
      'A. La dirección MAC más alta',
      'B. El Bridge ID más bajo (prioridad + MAC)',
      'C. La cantidad de puertos del switch',
      'D. El ancho de banda agregado'
    ],
    answer: 1,
    explanation: 'STP selecciona el Root Bridge basado en el Bridge ID más bajo. El Bridge ID consiste en la prioridad del bridge (por defecto 32768, configurable en incrementos de 4096) + la dirección MAC del switch. El switch con el valor más bajo gana.'
  },
  {
    id: 22,
    domain: 'network_access',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué tecnología agrupa múltiples enlaces físicos en un solo enlace lógico para aumentar ancho de banda y redundancia?',
    options: [
      'A. STP',
      'B. EtherChannel',
      'C. PortFast',
      'D. BPDU Guard'
    ],
    answer: 1,
    explanation: 'EtherChannel agrupa múltiples enlaces físicos (hasta 8) en un solo enlace lógico (Port-Channel), proporcionando balanceo de carga y redundancia. Usa protocolos como LACP (estándar) o PAgP (Cisco propietario).'
  },
  {
    id: 23,
    domain: 'network_access',
    difficulty: 'medium',
    type: 'multi',
    text: '¿Cuáles son estados de puerto en STP? (Selecciona 3)',
    options: [
      'A. Blocking',
      'B. Learning',
      'C. Forwarding',
      'D. Active'
    ],
    answer: [0, 1, 2],
    explanation: 'Los estados de puerto STP son: Blocking (bloquea tráfico, escucha BPDUs), Listening (escucha BPDUs, prepara para forwarding), Learning (aprende MACs pero no reenvía), Forwarding (reenvía tráfico normalmente), y Disabled. "Active" no es un estado STP.'
  },
  {
    id: 24,
    domain: 'network_access',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué función tiene PortFast en STP?',
    options: [
      'A. Acelera la convergencia de STP en toda la red',
      'B. Transiciona un puerto directamente a Forwarding, saltando Listening/Learning',
      'C. Bloquea BPDUs entrantes en el puerto',
      'D. Aumenta la prioridad del puerto'
    ],
    answer: 1,
    explanation: 'PortFast permite que un puerto de acceso transicione inmediatamente al estado Forwarding, saltando los estados Listening y Learning (que toman ~30 segundos en STP normal). Se usa en puertos que conectan a dispositivos finales (PCs, servidores) para evitar demoras de inicio. Debe usarse con BPDU Guard para seguridad.'
  },
  {
    id: 25,
    domain: 'network_access',
    difficulty: 'medium',
    type: 'single',
    text: '¿En qué modo VTP puede un switch crear, modificar y eliminar VLANs?',
    options: [
      'A. Cliente (Client)',
      'B. Servidor (Server)',
      'C. Transparente (Transparent)',
      'D. Off'
    ],
    answer: 1,
    explanation: 'En modo Servidor (Server), un switch puede crear, modificar y eliminar VLANs y propaga estos cambios a otros switches VTP. En modo Cliente solo recibe actualizaciones. En modo Transparente no participa en VTP pero puede tener VLANs locales.'
  },

  // ═══════════════════════════════════════
  // IP CONNECTIVITY (Questions 26-45)
  // ═══════════════════════════════════════

  {
    id: 26,
    domain: 'ip_connectivity',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué comando configura una ruta estática por defecto en un router Cisco?',
    options: [
      'A. ip route 0.0.0.0 0.0.0.0 192.168.1.1',
      'B. ip default-gateway 192.168.1.1',
      'C. ip route default 192.168.1.1',
      'D. route add default gw 192.168.1.1'
    ],
    answer: 0,
    explanation: '`ip route 0.0.0.0 0.0.0.0 <next-hop>` configura una ruta por defecto (default route). La máscara 0.0.0.0 coincide con cualquier destino. `ip default-gateway` se usa en switches en Capa 2, `route add` es comando de Linux/Windows.'
  },
  {
    id: 27,
    domain: 'ip_connectivity',
    difficulty: 'medium',
    type: 'single',
    text: '¿Cuál es la distancia administrativa (AD) de OSPF?',
    options: [
      'A. 90',
      'B. 100',
      'C. 110',
      'D. 120'
    ],
    answer: 2,
    explanation: 'La distancia administrativa de OSPF es 110. Para referencia: Connected = 0, Static = 1, EIGRP (interno) = 90, OSPF = 110, IS-IS = 115, RIP = 120, EIGRP (externo) = 170.'
  },
  {
    id: 28,
    domain: 'ip_connectivity',
    difficulty: 'hard',
    type: 'single',
    text: 'En OSPF, ¿qué tipo de LSA (Link State Advertisement) genera el Designated Router (DR)?',
    options: [
      'A. LSA Tipo 1 (Router LSA)',
      'B. LSA Tipo 2 (Network LSA)',
      'C. LSA Tipo 3 (Summary LSA)',
      'D. LSA Tipo 5 (External LSA)'
    ],
    answer: 1,
    explanation: 'El DR genera LSA Tipo 2 (Network LSA) que lista todos los routers conectados al segmento de red multiacceso (como Ethernet). La LSA Tipo 1 es generada por cada router, Tipo 3 por el ABR, y Tipo 5 por el ASBR para rutas externas.'
  },
  {
    id: 29,
    domain: 'ip_connectivity',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué máscara de subred equivale a /24 en notación CIDR?',
    options: [
      'A. 255.255.0.0',
      'B. 255.255.255.0',
      'C. 255.255.255.128',
      'D. 255.0.0.0'
    ],
    answer: 1,
    explanation: '/24 en notación CIDR equivale a 255.255.255.0. Esto proporciona 256 direcciones (254 utilizables para hosts). /16 es 255.255.0.0, /8 es 255.0.0.0, /25 es 255.255.255.128.'
  },
  {
    id: 30,
    domain: 'ip_connectivity',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué protocolo proporciona redundancia de primer salto (FHRP) y es propietario de Cisco?',
    options: [
      'A. VRRP',
      'B. HSRP',
      'C. GLBP',
      'D. CARP'
    ],
    answer: 1,
    explanation: 'HSRP (Hot Standby Router Protocol) es propietario de Cisco. VRRP es estándar (RFC 5798). GLBP también es propietario de Cisco pero proporciona balanceo de carga además de redundancia. CARP es de código abierto (OpenBSD).'
  },
  {
    id: 31,
    domain: 'ip_connectivity',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué tipo de NAT traduce una dirección IP privada a una dirección IP pública de forma uno a uno?',
    options: [
      'A. NAT Dinámico (Dynamic NAT)',
      'B. NAT Estático (Static NAT)',
      'C. PAT (NAT Overload)',
      'D. NAT64'
    ],
    answer: 1,
    explanation: 'NAT Estático mapea una IP privada a una IP pública de forma fija uno a uno. NAT Dinámico usa un pool de IPs públicas, PAT (Port Address Translation) mapea múltiples IPs privadas a una sola IP pública usando puertos diferentes. NAT64 traduce IPv6 a IPv4.'
  },
  {
    id: 32,
    domain: 'ip_connectivity',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué comando muestra la tabla de enrutamiento en un router Cisco?',
    options: [
      'A. show ip route',
      'B. show routing table',
      'C. show ip interface brief',
      'D. show ip protocols'
    ],
    answer: 0,
    explanation: '`show ip route` muestra la tabla de enrutamiento IPv4 completa con todas las rutas conocidas, su origen (código de letra: C, O, S, etc.), distancia administrativa y métrica. `show ip interface brief` muestra interfaces y sus estados.'
  },
  {
    id: 33,
    domain: 'ip_connectivity',
    difficulty: 'medium',
    type: 'single',
    text: '¿Cuántas subredes se pueden crear tomando prestados 3 bits de la porción de host en una red /24?',
    options: [
      'A. 3 subredes',
      'B. 6 subredes',
      'C. 8 subredes',
      'D. 14 subredes'
    ],
    answer: 2,
    explanation: 'Tomando prestados 3 bits: 2³ = 8 subredes. Cada subred tendría una máscara /27 (32 - 8 + 3 = 27) con 2⁵ - 2 = 30 hosts por subred. La fórmula general es 2^n donde n es el número de bits prestados.'
  },
  {
    id: 34,
    domain: 'ip_connectivity',
    difficulty: 'hard',
    type: 'single',
    text: 'En OSPF, ¿qué dirección multicast se usa para enviar actualizaciones a todos los routers OSPF (AllSPFRouters)?',
    options: [
      'A. 224.0.0.5',
      'B. 224.0.0.6',
      'C. 224.0.0.9',
      'D. 224.0.0.10'
    ],
    answer: 0,
    explanation: '224.0.0.5 (AllSPFRouters) es usada por todos los routers OSPF para enviar Hello packets y actualizaciones. 224.0.0.6 (AllDRouters) es usada para comunicación con el DR/BDR. 224.0.0.9 es RIP, 224.0.0.10 es EIGRP.'
  },
  {
    id: 35,
    domain: 'ip_connectivity',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué significa FIB en el contexto de enrutamiento?',
    options: [
      'A. Forwarding Information Base',
      'B. Fast Internet Bridge',
      'C. First In Buffer',
      'D. Fiber Interface Block'
    ],
    answer: 0,
    explanation: 'FIB (Forwarding Information Base) es la tabla de reenvío usada por Cisco Express Forwarding (CEF). Contiene la información de la tabla de enrutamiento optimizada para reenvío rápido en hardware, con prefijos, next-hops e interfaces de salida.'
  },
  {
    id: 36,
    domain: 'ip_connectivity',
    difficulty: 'medium',
    type: 'single',
    text: '¿Cuál de estas es una dirección IPv4 privada según RFC 1918?',
    options: [
      'A. 172.32.0.1',
      'B. 10.0.0.1',
      'C. 192.169.0.1',
      'D. 11.0.0.1'
    ],
    answer: 1,
    explanation: 'RFC 1918 define tres rangos privados: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 - 172.31.255.255), y 192.168.0.0/16. 172.32.0.1 está fuera del rango /12 (el rango es 172.16-172.31).'
  },
  {
    id: 37,
    domain: 'ip_connectivity',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué tipo de ruta OSPF se identifica con el código "O IA" en la tabla de enrutamiento?',
    options: [
      'A. Ruta externa tipo 1',
      'B. Ruta inter-área (Inter-Area)',
      'C. Ruta intra-área',
      'D. Ruta por defecto'
    ],
    answer: 1,
    explanation: '"O IA" (OSPF Inter-Area) indica una ruta aprendida de otra área OSPF a través de un ABR (Area Border Router). "O" solo indica ruta intra-área (misma área), "O E1" y "O E2" son rutas externas redistribuidas.'
  },
  {
    id: 38,
    domain: 'ip_connectivity',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué protocolo de enrutamiento es un protocolo vector-distancia?',
    options: [
      'A. OSPF',
      'B. EIGRP',
      'C. RIP',
      'D. IS-IS'
    ],
    answer: 2,
    explanation: 'RIP (Routing Information Protocol) es un protocolo vector-distancia puro que usa conteo de saltos como métrica (máximo 15). OSPF e IS-IS son link-state, EIGRP es un protocolo híbrido (vector-distancia avanzado).'
  },

  // ═══════════════════════════════════════
  // IP SERVICES (Questions 39-50)
  // ═══════════════════════════════════════

  {
    id: 39,
    domain: 'ip_services',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué protocolo asigna dinámicamente direcciones IP a dispositivos en una red?',
    options: [
      'A. DNS',
      'B. DHCP',
      'C. NAT',
      'D. ARP'
    ],
    answer: 1,
    explanation: 'DHCP (Dynamic Host Configuration Protocol) asigna automáticamente direcciones IP, máscara de subred, gateway y DNS a los dispositivos. DNS resuelve nombres, NAT traduce direcciones, y ARP mapea IP a MAC.'
  },
  {
    id: 40,
    domain: 'ip_services',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué puerto TCP usa DNS para transferencias de zona?',
    options: [
      'A. TCP 53',
      'B. UDP 53',
      'C. TCP 25',
      'D. TCP 443'
    ],
    answer: 0,
    explanation: 'DNS usa UDP 53 para consultas normales y TCP 53 para transferencias de zona (AXFR/IXFR) y respuestas grandes (>512 bytes). El puerto 25 es SMTP y 443 es HTTPS.'
  },
  {
    id: 41,
    domain: 'ip_services',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué comando configura un router Cisco como servidor DHCP para la red 192.168.1.0/24 con puerta de enlace .1?',
    options: [
      'A. ip dhcp pool LAN\n   network 192.168.1.0 255.255.255.0\n   default-router 192.168.1.1',
      'B. dhcp server 192.168.1.0/24 gateway 192.168.1.1',
      'C. service dhcp\n   dhcp pool 192.168.1.0',
      'D. ip dhcp server enable\n   pool LAN network 192.168.1.0'
    ],
    answer: 0,
    explanation: 'La configuración correcta es: `ip dhcp pool LAN` (crea el pool), `network 192.168.1.0 255.255.255.0` (define la red), `default-router 192.168.1.1` (define el gateway). Opcionalmente se puede agregar DNS con `dns-server`.'
  },
  {
    id: 42,
    domain: 'ip_services',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué protocolo se usa para sincronizar la hora en dispositivos de red?',
    options: [
      'A. SNMP',
      'B. NTP',
      'C. Syslog',
      'D. SSH'
    ],
    answer: 1,
    explanation: 'NTP (Network Time Protocol) usa UDP 123 para sincronizar relojes entre dispositivos con alta precisión. SNMP es para monitoreo, Syslog para logs, y SSH para acceso remoto seguro.'
  },
  {
    id: 43,
    domain: 'ip_services',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué servicio resuelve nombres de dominio a direcciones IP?',
    options: [
      'A. DHCP',
      'B. NAT',
      'C. DNS',
      'D. ARP'
    ],
    answer: 2,
    explanation: 'DNS (Domain Name System) traduce nombres de dominio (ej. google.com) a direcciones IP. DHCP asigna IPs, NAT traduce direcciones, y ARP mapea IP a MAC en la red local.'
  },
  {
    id: 44,
    domain: 'ip_services',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué tipo de registro DNS mapea un nombre de host a una dirección IPv6?',
    options: [
      'A. Registro A',
      'B. Registro AAAA',
      'C. Registro MX',
      'D. Registro CNAME'
    ],
    answer: 1,
    explanation: 'El registro AAAA (quad-A) mapea nombres de host a direcciones IPv6. El registro A mapea a IPv4, MX identifica servidores de correo, y CNAME crea un alias a otro nombre de dominio.'
  },
  {
    id: 45,
    domain: 'ip_services',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué versión de SNMP introduce autenticación y cifrado robustos?',
    options: [
      'A. SNMPv1',
      'B. SNMPv2c',
      'C. SNMPv3',
      'D. SNMPv2'
    ],
    answer: 2,
    explanation: 'SNMPv3 introduce seguridad robusta con autenticación (MD5/SHA), cifrado (DES/3DES/AES) y control de acceso basado en usuarios (USM - User-based Security Model). SNMPv1 y v2c solo usan community strings en texto plano para autenticación.'
  },
  {
    id: 46,
    domain: 'ip_services',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué protocolo proporciona transferencia segura de archivos y administración remota cifrada?',
    options: [
      'A. FTP',
      'B. TFTP',
      'C. SSH',
      'D. Telnet'
    ],
    answer: 2,
    explanation: 'SSH (Secure Shell) proporciona comunicación cifrada para administración remota y transferencia de archivos (SCP/SFTP). Telnet transmite en texto plano (inseguro), FTP tampoco cifra, y TFTP no tiene autenticación.'
  },

  // ═══════════════════════════════════════
  // SECURITY FUNDAMENTALS (Questions 47-60)
  // ═══════════════════════════════════════

  {
    id: 47,
    domain: 'security_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué tipo de lista de control de acceso (ACL) filtra tráfico basado en direcciones IP de origen y destino?',
    options: [
      'A. ACL Estándar',
      'B. ACL Extendida',
      'C. ACL Dinámica',
      'D. ACL Reflexiva'
    ],
    answer: 1,
    explanation: 'Una ACL Extendida puede filtrar basándose en IP origen Y destino, protocolo, puertos TCP/UDP, y otros parámetros. Una ACL Estándar solo filtra por IP de origen (rango 1-99, 1300-1999). Las ACLs extendidas usan rangos 100-199, 2000-2699.'
  },
  {
    id: 48,
    domain: 'security_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué comando aplica una ACL de entrada (inbound) a una interfaz?',
    options: [
      'A. ip access-class 100 in',
      'B. ip access-group 100 in',
      'C. access-list 100 apply in',
      'D. ip filter 100 in'
    ],
    answer: 1,
    explanation: '`ip access-group 100 in` aplica la ACL 100 a una interfaz en dirección inbound (tráfico que entra a la interfaz). `ip access-class` se usa para filtrar en líneas VTY. La ACL debe existir antes de aplicarse.'
  },
  {
    id: 49,
    domain: 'security_fundamentals',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué significa la palabra clave "established" en una ACL extendida?',
    options: [
      'A. Permite solo tráfico TCP con el flag SYN',
      'B. Permite solo tráfico TCP con flags ACK o RST (respuestas a conexiones iniciadas internamente)',
      'C. Bloquea todo el tráfico entrante',
      'D. Permite solo conexiones UDP'
    ],
    answer: 1,
    explanation: 'El parámetro `established` en una ACL permite solo paquetes TCP que tengan los flags ACK o RST activados, lo que efectivamente solo permite respuestas a conexiones iniciadas desde dentro de la red. Es una forma básica de firewall stateful en ACLs.'
  },
  {
    id: 50,
    domain: 'security_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Cuál es la mejor práctica para la contraseña de enable en un router Cisco?',
    options: [
      'A. enable password cisco123',
      'B. enable secret $5$encrypted',
      'C. service password-encryption + enable password',
      'D. enable password level 15'
    ],
    answer: 1,
    explanation: '`enable secret` usa hash MD5 (tipo 5) o SHA-256 (tipo 8) que son difíciles de revertir. `enable password` usa cifrado tipo 7 (Vigenère) que es fácilmente reversible. `service password-encryption` solo aplica cifrado débil tipo 7.'
  },
  {
    id: 51,
    domain: 'security_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué característica de seguridad de puerto limita qué direcciones MAC pueden conectarse a un puerto de switch?',
    options: [
      'A. Port Security',
      'B. ACL en puerto',
      'C. BPDU Guard',
      'D. Root Guard'
    ],
    answer: 0,
    explanation: 'Port Security permite limitar cuáles y cuántas direcciones MAC pueden conectarse a un puerto de switch. Puede configurarse en modo shutdown, restrict o protect cuando ocurre una violación. BPDU Guard protege contra switches no autorizados.'
  },
  {
    id: 52,
    domain: 'security_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué protocolo AAA proporciona autenticación, autorización y contabilidad centralizada?',
    options: [
      'A. TACACS+',
      'B. RADIUS',
      'C. Kerberos',
      'D. LDAP'
    ],
    answer: 0,
    explanation: 'TACACS+ (Terminal Access Controller Access-Control System Plus) es propietario de Cisco y proporciona AAA completo (autenticación, autorización, contabilidad) con cifrado de todo el paquete. RADIUS solo cifra la contraseña y combina autenticación/autorización.'
  },
  {
    id: 53,
    domain: 'security_fundamentals',
    difficulty: 'hard',
    type: 'multi',
    text: '¿Cuáles son los tres modos de violación en Port Security? (Selecciona 3)',
    options: [
      'A. Shutdown',
      'B. Restrict',
      'C. Protect',
      'D. Forward'
    ],
    answer: [0, 1, 2],
    explanation: 'Los tres modos de violación de Port Security son: Shutdown (apaga el puerto y envía SNMP trap — default), Restrict (descarta paquetes de MACs no autorizadas y envía trap), Protect (descarta paquetes silenciosamente sin trap). "Forward" no es un modo de violación.'
  },
  {
    id: 54,
    domain: 'security_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué comando configura SSH en un router Cisco?',
    options: [
      'A. ip ssh version 2',
      'B. ssh enable v2',
      'C. crypto key generate rsa\n   ip ssh version 2',
      'D. line vty 0 4\n   transport input ssh'
    ],
    answer: 2,
    explanation: 'Para habilitar SSH se debe: generar claves RSA con `crypto key generate rsa` (mínimo 768 bits, recomendado 2048), configurar `ip ssh version 2`, y en las líneas VTY usar `transport input ssh`. Se necesita un hostname y domain-name configurados.'
  },

  // ═══════════════════════════════════════
  // AUTOMATION & PROGRAMMABILITY (Questions 55-65)
  // ═══════════════════════════════════════

  {
    id: 55,
    domain: 'automation',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué formato de datos estructurados es más común en APIs REST modernas?',
    options: [
      'A. XML',
      'B. CSV',
      'C. JSON',
      'D. YAML'
    ],
    answer: 2,
    explanation: 'JSON (JavaScript Object Notation) es el formato más común en APIs REST modernas por su simplicidad, ligereza y fácil parseo. XML se usaba más en SOAP, CSV es para datos tabulares simples, YAML es común en configuración (Ansible, Docker).'
  },
  {
    id: 56,
    domain: 'automation',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué herramienta de automatización es agentless y usa SSH para gestionar dispositivos de red?',
    options: [
      'A. Puppet',
      'B. Chef',
      'C. Ansible',
      'D. SaltStack'
    ],
    answer: 2,
    explanation: 'Ansible es agentless (no requiere instalar agentes en los nodos gestionados), usa SSH para Linux/dispositivos de red y WinRM para Windows. Puppet, Chef y SaltStack típicamente requieren agentes instalados en los nodos gestionados.'
  },
  {
    id: 57,
    domain: 'automation',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué controladora SDN de Cisco proporciona automatización y garantía de red basada en políticas?',
    options: [
      'A. Cisco DNA Center',
      'B. Cisco ACI (APIC)',
      'C. Cisco Meraki Dashboard',
      'D. Cisco SD-WAN (vManage)'
    ],
    answer: 0,
    explanation: 'Cisco DNA Center es la controladora SDN para redes empresariales (campus, sucursales). Cisco ACI/APIC es para data centers, Meraki Dashboard es para gestión cloud de dispositivos Meraki, y vManage es para SD-WAN (ahora integrado en Catalyst SD-WAN).'
  },
  {
    id: 58,
    domain: 'automation',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué método HTTP se usa para recuperar datos de una API REST?',
    options: [
      'A. POST',
      'B. PUT',
      'C. GET',
      'D. DELETE'
    ],
    answer: 2,
    explanation: 'GET recupera/lee datos de un recurso. POST crea nuevos recursos, PUT actualiza recursos existentes (o los crea), DELETE elimina recursos. GET debe ser idempotente (no modifica estado del servidor).'
  },
  {
    id: 59,
    domain: 'automation',
    difficulty: 'hard',
    type: 'single',
    text: 'En YANG y NETCONF, ¿qué operación recupera la configuración running de un dispositivo?',
    options: [
      'A. <get>',
      'B. <get-config>',
      'C. <edit-config>',
      'D. <lock>'
    ],
    answer: 1,
    explanation: '<get-config> recupera la configuración del dispositivo (running, startup, candidate). <get> recupera datos operacionales (estado) y configuración. <edit-config> modifica la configuración, <lock> bloquea el datastore para cambios exclusivos.'
  },
  {
    id: 60,
    domain: 'automation',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué significa IaC (Infrastructure as Code)?',
    options: [
      'A. Gestionar infraestructura mediante archivos de configuración versionables en lugar de procesos manuales',
      'B. Código que se ejecuta exclusivamente en switches',
      'C. Un lenguaje de programación para routers',
      'D. Internet as Code — protocolo de enrutamiento'
    ],
    answer: 0,
    explanation: 'IaC (Infrastructure as Code) es la práctica de gestionar y aprovisionar infraestructura a través de archivos de configuración legibles por máquina (código) en lugar de configuración manual. Usa herramientas como Ansible, Terraform, Puppet. Permite control de versiones, automatización y consistencia.'
  },
  {
    id: 61,
    domain: 'automation',
    difficulty: 'medium',
    type: 'single',
    text: '¿Cuál es un código de estado HTTP que indica una solicitud exitosa?',
    options: [
      'A. 200 OK',
      'B. 301 Moved Permanently',
      'C. 404 Not Found',
      'D. 500 Internal Server Error'
    ],
    answer: 0,
    explanation: '200 OK indica éxito en la solicitud. Códigos 2xx = éxito, 3xx = redirección, 4xx = error del cliente, 5xx = error del servidor. 201 Created es otro código común de éxito para creación de recursos.'
  },
  {
    id: 62,
    domain: 'automation',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué orquestador de código abierto usa playbooks YAML para automatizar configuraciones de red?',
    options: [
      'A. Puppet',
      'B. Chef',
      'C. Ansible',
      'D. Terraform'
    ],
    answer: 2,
    explanation: 'Ansible usa playbooks en formato YAML para definir tareas de automatización, configuración y orquestación. Puppet usa su propio DSL, Chef usa Ruby, y Terraform usa HCL (HashiCorp Configuration Language) principalmente para provisioning de infraestructura cloud.'
  },

  // ═══════════════════════════════════════
  // MIXED / SCENARIO (Questions 63-75)
  // ═══════════════════════════════════════

  {
    id: 63,
    domain: 'network_fundamentals',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué es una colisión en una red Ethernet half-duplex?',
    options: [
      'A. Cuando dos tramas llegan al switch al mismo tiempo',
      'B. Cuando dos dispositivos transmiten simultáneamente en el mismo medio compartido',
      'C. Cuando un paquete excede el MTU',
      'D. Cuando hay un loop en la red'
    ],
    answer: 1,
    explanation: 'Una colisión ocurre en half-duplex cuando dos dispositivos transmiten al mismo tiempo en el mismo medio compartido. Las señales se corrompen y ambos dispositivos deben retransmitir después de un tiempo aleatorio (algoritmo de backoff). Con switches full-duplex modernos, las colisiones son prácticamente eliminadas.'
  },
  {
    id: 64,
    domain: 'ip_connectivity',
    difficulty: 'hard',
    type: 'single',
    text: 'Tienes una red 192.168.1.0/24 y necesitas crear subredes que soporten al menos 50 hosts cada una. ¿Qué máscara de subred debes usar?',
    options: [
      'A. /26 (255.255.255.192)',
      'B. /27 (255.255.255.224)',
      'C. /25 (255.255.255.128)',
      'D. /28 (255.255.255.240)'
    ],
    answer: 0,
    explanation: 'Para 50 hosts: 2^n - 2 ≥ 50. n=6 da 62 hosts utilizables. Máscara = 32 - 6 = /26 (255.255.255.192). /27 = 30 hosts, /25 = 126 hosts (funciona pero desperdicia), /28 = 14 hosts (insuficiente).'
  },
  {
    id: 65,
    domain: 'security_fundamentals',
    difficulty: 'hard',
    type: 'single',
    text: '¿Qué rango numérico identifica una ACL extendida en Cisco IOS?',
    options: [
      'A. 1-99',
      'B. 100-199',
      'C. 1300-1999',
      'D. 200-299'
    ],
    answer: 1,
    explanation: 'ACLs extendidas usan números 100-199 y 2000-2699. ACLs estándar: 1-99 y 1300-1999. Las ACLs nombradas no tienen restricción de rango.'
  },
  {
    id: 66,
    domain: 'network_access',
    difficulty: 'medium',
    type: 'single',
    text: '¿Qué comando verifica qué VLANs están permitidas en un trunk?',
    options: [
      'A. show interfaces trunk',
      'B. show vlan trunk',
      'C. show trunk allowed',
      'D. show switchport trunk'
    ],
    answer: 0,
    explanation: '`show interfaces trunk` muestra todos los trunks, qué VLANs están permitidas (allowed), cuáles están activas (active), y cuáles están en spanning-tree forwarding. También muestra el protocolo de trunking (802.1Q/ISL) y la VLAN nativa.'
  },
  {
    id: 67,
    domain: 'ip_services',
    difficulty: 'hard',
    type: 'single',
    text: '¿Cuál es el propósito de DHCP Snooping?',
    options: [
      'A. Acelerar las respuestas DHCP',
      'B. Prevenir servidores DHCP no autorizados (rogue) en la red',
      'C. Encriptar el tráfico DHCP',
      'D. Balancear carga entre servidores DHCP'
    ],
    answer: 1,
    explanation: 'DHCP Snooping es una característica de seguridad que clasifica puertos como trusted (confiables, donde residen servidores DHCP legítimos) o untrusted (no confiables). Filtra mensajes DHCP Offer/ACK de puertos untrusted para prevenir ataques de rogue DHCP server. También construye una tabla de binding para IP Source Guard y Dynamic ARP Inspection.'
  },
  {
    id: 68,
    domain: 'network_fundamentals',
    difficulty: 'medium',
    type: 'single',
    text: '¿Cuál es la diferencia principal entre TCP y UDP?',
    options: [
      'A. TCP es más rápido que UDP',
      'B. TCP es orientado a conexión y confiable; UDP es no orientado a conexión y no confiable',
      'C. UDP usa puertos más altos que TCP',
      'D. TCP solo funciona en IPv4'
    ],
    answer: 1,
    explanation: 'TCP es orientado a conexión (three-way handshake), confiable (ACKs, retransmisiones, control de flujo), ordenado y con control de congestión. UDP es no orientado a conexión, sin garantía de entrega, más rápido y eficiente para aplicaciones como streaming, VoIP, DNS.'
  },
  {
    id: 69,
    domain: 'ip_connectivity',
    difficulty: 'medium',
    type: 'multi',
    text: '¿Cuáles de los siguientes son protocolos de enrutamiento dinámico? (Selecciona 3)',
    options: [
      'A. OSPF',
      'B. EIGRP',
      'C. RIP',
      'D. ARP'
    ],
    answer: [0, 1, 2],
    explanation: 'OSPF, EIGRP y RIP son protocolos de enrutamiento dinámico que automáticamente descubren rutas y se adaptan a cambios de topología. ARP no es un protocolo de enrutamiento sino de resolución de direcciones (IP a MAC) en la red local.'
  },
  {
    id: 70,
    domain: 'security_fundamentals',
    difficulty: 'easy',
    type: 'single',
    text: '¿Qué tipo de ataque de red implica inundar un switch con tramas con direcciones MAC falsas para llenar la tabla CAM?',
    options: [
      'A. ARP Spoofing',
      'B. MAC Flooding',
      'C. VLAN Hopping',
      'D. DHCP Starvation'
    ],
    answer: 1,
    explanation: 'MAC Flooding inunda un switch con tramas de direcciones MAC de origen falsas, llenando la tabla CAM. Cuando la tabla se llena, el switch entra en modo "fail-open" y reenvía tramas a todos los puertos como un hub, permitiendo al atacante capturar tráfico. Port Security mitiga este ataque.'
  }
];

// Add 10 more rapid-fire questions for a total of 80
const MORE_QUESTIONS = [
  {
    id: 71, domain: 'network_fundamentals', difficulty: 'easy', type: 'single',
    text: '¿Cuántas capas tiene el modelo OSI?',
    options: ['A. 4', 'B. 5', 'C. 7', 'D. 9'],
    answer: 2,
    explanation: 'El modelo OSI tiene 7 capas: Física, Enlace de Datos, Red, Transporte, Sesión, Presentación, Aplicación. El modelo TCP/IP tiene 4 capas.'
  },
  {
    id: 72, domain: 'network_access', difficulty: 'hard', type: 'single',
    text: '¿Cuál es la VLAN nativa por defecto en switches Cisco?',
    options: ['A. VLAN 0', 'B. VLAN 1', 'C. VLAN 10', 'D. VLAN 100'],
    answer: 1,
    explanation: 'VLAN 1 es la VLAN nativa (native) por defecto en switches Cisco. Se recomienda cambiarla por seguridad. Las tramas en la VLAN nativa no se etiquetan en el trunk 802.1Q.'
  },
  {
    id: 73, domain: 'ip_connectivity', difficulty: 'medium', type: 'single',
    text: 'En una subred /28, ¿cuántas direcciones IP utilizables para hosts hay?',
    options: ['A. 6', 'B. 14', 'C. 30', 'D. 62'],
    answer: 1,
    explanation: '/28 = 32 - 28 = 4 bits de host. 2⁴ - 2 = 14 hosts utilizables (restando dirección de red y broadcast).'
  },
  {
    id: 74, domain: 'ip_services', difficulty: 'easy', type: 'single',
    text: '¿Qué significa QoS?',
    options: ['A. Quality of Service', 'B. Quick Operating System', 'C. Queue of Signals', 'D. Quality Operating Standard'],
    answer: 0,
    explanation: 'QoS (Quality of Service) prioriza tráfico de red para garantizar ancho de banda, baja latencia y mínima pérdida para aplicaciones críticas como voz y video.'
  },
  {
    id: 75, domain: 'security_fundamentals', difficulty: 'medium', type: 'single',
    text: '¿Qué comando configura una ACL estándar que deniega tráfico de la red 192.168.10.0/24?',
    options: [
      'A. access-list 1 deny 192.168.10.0 0.0.0.255',
      'B. access-list 100 deny 192.168.10.0 0.0.0.255',
      'C. ip access-list standard BLOCK deny 192.168.10.0/24',
      'D. access-list 1 deny 192.168.10.0 255.255.255.0'
    ],
    answer: 0,
    explanation: 'Las ACLs Cisco usan wildcard mask (máscara invertida): 0.0.0.255 = /24. `access-list 1` es ACL estándar (1-99). La opción B usa número de extendida. La opción D usa máscara de subred incorrecta (debe ser wildcard).'
  },
  {
    id: 76, domain: 'automation', difficulty: 'easy', type: 'single',
    text: '¿Qué significa API?',
    options: [
      'A. Application Programming Interface',
      'B. Automated Protocol Integration',
      'C. Advanced Packet Inspection',
      'D. Access Point Identifier'
    ],
    answer: 0,
    explanation: 'API (Application Programming Interface) es un conjunto de definiciones y protocolos que permiten que diferentes aplicaciones se comuniquen entre sí. Las APIs REST son el estándar moderno para interactuar con controladoras SDN y dispositivos de red programables.'
  },
  {
    id: 77, domain: 'network_fundamentals', difficulty: 'medium', type: 'single',
    text: '¿Qué dirección IPv4 es el broadcast dirigido para la red 10.0.0.0/16?',
    options: ['A. 10.0.0.255', 'B. 10.0.255.255', 'C. 10.255.255.255', 'D. 255.255.255.255'],
    answer: 1,
    explanation: 'Para /16, los últimos 16 bits son de host. El broadcast dirigido pone todos los bits de host en 1: 10.0.255.255. 255.255.255.255 es broadcast limitado (no cruza routers).'
  },
  {
    id: 78, domain: 'network_access', difficulty: 'easy', type: 'single',
    text: '¿Cuál es el propósito de BPDU Guard?',
    options: [
      'A. Proteger el Root Bridge',
      'B. Deshabilitar un puerto PortFast si recibe BPDUs (previene switches no autorizados)',
      'C. Acelerar la convergencia STP',
      'D. Cifrar BPDUs entre switches'
    ],
    answer: 1,
    explanation: 'BPDU Guard deshabilita inmediatamente un puerto con PortFast habilitado si recibe una BPDU, previniendo que un switch no autorizado se conecte al puerto. Se usa típicamente en puertos de acceso para endpoints.'
  },
  {
    id: 79, domain: 'ip_connectivity', difficulty: 'hard', type: 'single',
    text: 'En OSPF, ¿cuál es la métrica (cost) para un enlace FastEthernet (100 Mbps)?',
    options: ['A. 1', 'B. 10', 'C. 100', 'D. 1000'],
    answer: 0,
    explanation: 'Costo OSPF = Ancho de banda de referencia / Ancho de banda del enlace. Con ancho de banda de referencia por defecto (100 Mbps): FastEthernet (100 Mbps) = 100/100 = 1. Ethernet (10 Mbps) = 10, GigabitEthernet = 1 (porque el mínimo es 1). Para redes modernas se debe ajustar la referencia con `auto-cost reference-bandwidth`.'
  },
  {
    id: 80, domain: 'security_fundamentals', difficulty: 'hard', type: 'single',
    text: '¿Qué protocolo de cifrado es más seguro para WPA3 en redes WiFi empresariales?',
    options: ['A. TKIP', 'B. AES-CCMP', 'C. GCMP-256', 'D. WEP'],
    answer: 2,
    explanation: 'WPA3-Enterprise usa GCMP-256 (Galois/Counter Mode Protocol con AES-256). WPA2 usa AES-CCMP (128 bits). TKIP es para WPA (obsoleto), WEP es extremadamente inseguro y obsoleto. WPA3 también introduce protección contra ataques de diccionario offline con SAE (Simultaneous Authentication of Equals).'
  },
  { id: 81, domain: 'network_fundamentals', difficulty: 'medium', type: 'multi',
    text: '¿Cuáles de las siguientes son ventajas de IPv6 sobre IPv4? (Selecciona 3)',
    options: ['A. Espacio de direcciones más grande', 'B. Cabecera más simple', 'C. No necesita NAT', 'D. Es más rápido que IPv4 en todos los casos'],
    answer: [0,1,2],
    explanation: 'IPv6 ofrece: espacio de direcciones masivo (128 bits), cabecera más simple (40 bytes fijos), autoconfiguración sin estado (SLAAC), y elimina la necesidad de NAT. Sin embargo, IPv6 no es inherentemente "más rápido" — el rendimiento depende de la implementación.'
  },
  { id: 82, domain: 'ip_connectivity', difficulty: 'hard', type: 'single',
    text: 'Un router Cisco tiene dos rutas al mismo destino: una OSPF con métrica 100 y una EIGRP con métrica 25600. ¿Cuál se instala en la tabla de enrutamiento?',
    options: ['A. OSPF (métrica más baja)', 'B. EIGRP (métrica más baja)', 'C. EIGRP (AD más baja)', 'D. Ambas (load balancing)'],
    answer: 2,
    explanation: 'La distancia administrativa (AD) es el primer criterio de desempate. EIGRP tiene AD 90, OSPF tiene AD 110. Aunque OSPF tenga "mejor" métrica, EIGRP gana por tener AD más baja. Las métricas solo se comparan entre rutas del mismo protocolo.'
  },
  { id: 83, domain: 'network_access', difficulty: 'hard', type: 'single',
    text: '¿Qué comando configura RSTP (Rapid Spanning Tree) en un switch Cisco?',
    options: ['A. spanning-tree mode rstp', 'B. spanning-tree mode rapid-pvst', 'C. spanning-tree mode 802.1w', 'D. spanning-tree rapid enable'],
    answer: 1,
    explanation: '`spanning-tree mode rapid-pvst` habilita RSTP (IEEE 802.1w) en modo PVST+ de Cisco — una instancia RSTP por VLAN. `spanning-tree mode pvst` usa STP clásico, `spanning-tree mode mst` usa MSTP.'
  },
  { id: 84, domain: 'ip_services', difficulty: 'medium', type: 'single',
    text: '¿Qué tipo de registro DNS se usa para crear un alias de un dominio a otro?',
    options: ['A. A', 'B. MX', 'C. CNAME', 'D. NS'],
    answer: 2,
    explanation: 'CNAME (Canonical Name) crea un alias — por ejemplo, `www.ejemplo.com` puede ser un CNAME a `ejemplo.com`. El registro A mapea a IPv4, MX identifica servidores de correo, y NS identifica los nameservers del dominio.'
  },
  { id: 85, domain: 'security_fundamentals', difficulty: 'medium', type: 'single',
    text: '¿Cuál es el propósito de configurar `login block-for 120 attempts 3 within 60` en un router Cisco?',
    options: ['A. Limitar intentos de login fallidos (3 intentos en 60s → bloqueo de 120s)', 'B. Bloquear todo el tráfico durante 120 segundos cada 60 segundos', 'C. Permitir solo 120 sesiones SSH simultáneas', 'D. Forzar reconexión cada 120 minutos'],
    answer: 0,
    explanation: 'Este comando configura protección contra ataques de fuerza bruta: después de 3 intentos fallidos en 60 segundos, el router bloquea nuevos intentos de login por 120 segundos. Esencial para seguridad en las líneas VTY.'
  },
  { id: 86, domain: 'network_fundamentals', difficulty: 'medium', type: 'single',
    text: '¿Qué es un collision domain?',
    options: ['A. Un dominio donde múltiples dispositivos compiten por el medio compartido', 'B. El área lógica donde se reenvían broadcasts', 'C. El rango de direcciones IP en una subred', 'D. El conjunto de puertos bloqueados por STP'],
    answer: 0,
    explanation: 'Un collision domain es un segmento de red donde las tramas pueden colisionar si dos dispositivos transmiten simultáneamente. Con hubs, todos los puertos comparten un collision domain. Con switches full-duplex, cada puerto es su propio collision domain (cero colisiones).'
  },
  { id: 87, domain: 'ip_connectivity', difficulty: 'hard', type: 'single',
    text: '¿Qué dirección multicast usa EIGRP para enviar actualizaciones?',
    options: ['A. 224.0.0.5', 'B. 224.0.0.6', 'C. 224.0.0.9', 'D. 224.0.0.10'],
    answer: 3,
    explanation: 'EIGRP usa 224.0.0.10. OSPF usa 224.0.0.5 (AllSPFRouters) y 224.0.0.6 (AllDRouters). RIP usa 224.0.0.9. HSRP v1 usa 224.0.0.2, HSRP v2 usa 224.0.0.102.'
  },
  { id: 88, domain: 'network_access', difficulty: 'easy', type: 'single',
    text: '¿Qué comando muestra información detallada de un puerto de switch, incluyendo modo administrativo y operacional?',
    options: ['A. show interfaces status', 'B. show interfaces Gi0/1 switchport', 'C. show vlan brief', 'D. show running-config interface Gi0/1'],
    answer: 1,
    explanation: '`show interfaces Gi0/1 switchport` muestra información completa: modo administrativo (access/trunk), modo operacional, VLAN de acceso, VLAN nativa, VLANs permitidas en trunk, y estado de negociación DTP.'
  },
  { id: 89, domain: 'ip_services', difficulty: 'hard', type: 'single',
    text: 'En QoS, ¿qué valor de DSCP corresponde a EF (Expedited Forwarding) para tráfico de voz?',
    options: ['A. DSCP 0', 'B. DSCP 46', 'C. DSCP 26', 'D. DSCP 34'],
    answer: 1,
    explanation: 'DSCP 46 (EF — Expedited Forwarding, binario 101110) se usa para tráfico de voz que requiere baja latencia, bajo jitter y baja pérdida. DSCP 26 (AF31) para tráfico crítico, DSCP 34 (AF41) para video, DSCP 0 (Best Effort).'
  },
  { id: 90, domain: 'automation', difficulty: 'medium', type: 'single',
    text: '¿Qué lenguaje de descripción de infraestructura permite definir recursos cloud de forma declarativa?',
    options: ['A. Python', 'B. Terraform (HCL)', 'C. JavaScript', 'D. SQL'],
    answer: 1,
    explanation: 'Terraform usa HCL (HashiCorp Configuration Language) para definir infraestructura como código de forma declarativa. Describís el estado deseado y Terraform calcula cómo llegar a él. Python es imperativo, JavaScript es para web, SQL para bases de datos.'
  },
  { id: 91, domain: 'network_fundamentals', difficulty: 'easy', type: 'single',
    text: '¿A qué capa del modelo OSI pertenece HTTP?',
    options: ['A. Capa 4 — Transporte', 'B. Capa 5 — Sesión', 'C. Capa 6 — Presentación', 'D. Capa 7 — Aplicación'],
    answer: 3,
    explanation: 'HTTP es un protocolo de Capa 7 (Aplicación). Usa TCP (Capa 4) como transporte, típicamente en el puerto 80 (HTTP) o 443 (HTTPS). Otros protocolos de Capa 7: FTP, SMTP, DNS, SSH.'
  },
  { id: 92, domain: 'ip_connectivity', difficulty: 'medium', type: 'multi',
    text: '¿Cuáles de los siguientes permiten que dos routers Cisco compartan una IP virtual como default gateway? (Selecciona 2)',
    options: ['A. HSRP', 'B. STP', 'C. VRRP', 'D. OSPF'],
    answer: [0,2],
    explanation: 'HSRP (Cisco propietario) y VRRP (estándar) son protocolos FHRP que permiten redundancia de default gateway con una IP virtual compartida. STP previene bucles de Capa 2, OSPF es enrutamiento dinámico de Capa 3.'
  },
  { id: 93, domain: 'security_fundamentals', difficulty: 'medium', type: 'single',
    text: '¿Qué comando configura autenticación local para las líneas VTY en un router Cisco?',
    options: ['A. line vty 0 4 → login local', 'B. line vty 0 4 → authentication local', 'C. aaa authentication login VTY local', 'D. username admin → line vty 0 4 → login'],
    answer: 2,
    explanation: 'Con AAA habilitado (`aaa new-model`), se usa `aaa authentication login VTY local` y luego `line vty 0 4 → login authentication VTY`. Sin AAA, se usa `line vty 0 4 → login local` + `username admin secret pass`.'
  },
  { id: 94, domain: 'network_access', difficulty: 'medium', type: 'single',
    text: '¿Qué sucede si dos switches conectados por trunk tienen diferente VLAN nativa?',
    options: ['A. El trunk no se forma', 'B. STP bloquea el enlace', 'C. Las tramas pueden "saltar" entre VLANs nativas (VLAN hopping)', 'D. CDP corrige automáticamente la diferencia'],
    answer: 2,
    explanation: 'VLAN nativa mismatch causa que las tramas sin etiquetar de una VLAN en un switch aparezcan en otra VLAN en el otro switch — un riesgo de seguridad. CDP muestra un warning de native VLAN mismatch. La solución: configurar la misma VLAN nativa en ambos extremos.'
  },
  { id: 95, domain: 'automation', difficulty: 'hard', type: 'single',
    text: 'Un playbook de Ansible que configura 20 switches Cisco con VLANs idénticas es un ejemplo de:',
    options: ['A. Orquestación', 'B. Gestión de configuración', 'C. CI/CD', 'D. Monitoreo'],
    answer: 1,
    explanation: 'La gestión de configuración asegura que los dispositivos mantengan un estado deseado consistente. Ansible aplica la configuración declarada en el playbook a todos los switches, garantizando que todos tengan las mismas VLANs. La orquestación coordina múltiples sistemas.'
  },
  { id: 96, domain: 'ip_connectivity', difficulty: 'easy', type: 'single',
    text: '¿Cuál es la dirección de broadcast de la red 192.168.5.0/27?',
    options: ['A. 192.168.5.31', 'B. 192.168.5.32', 'C. 192.168.5.63', 'D. 192.168.5.255'],
    answer: 0,
    explanation: '/27 = 32 IPs por subred. 192.168.5.0/27 cubre 192.168.5.0 - 192.168.5.31, donde .0 es la dirección de red y .31 es el broadcast. La siguiente subred empieza en 192.168.5.32/27.'
  },
  { id: 97, domain: 'ip_services', difficulty: 'medium', type: 'single',
    text: '¿Para qué se usa el comando `ip helper-address` en una interfaz de router Cisco?',
    options: ['A. Reenviar broadcasts DHCP a un servidor en otra subred', 'B. Ayudar a resolver nombres DNS', 'C. Configurar una dirección IP secundaria', 'D. Habilitar NAT en la interfaz'],
    answer: 0,
    explanation: '`ip helper-address <IP>` reenvía broadcasts de DHCP (y otros protocolos por defecto) como unicast hacia el servidor DHCP especificado. Esto permite que clientes en una subred obtengan IPs de un servidor DHCP ubicado en otra subred.'
  },
  { id: 98, domain: 'network_fundamentals', difficulty: 'hard', type: 'single',
    text: 'En una red con MTU de 1500, ¿cuál es el tamaño máximo del payload TCP (MSS típico) después de restar cabeceras IP (20B) y TCP (20B)?',
    options: ['A. 1500 bytes', 'B. 1460 bytes', 'C. 1480 bytes', 'D. 1440 bytes'],
    answer: 1,
    explanation: 'MTU 1500 - cabecera IP (20 bytes típicos) - cabecera TCP (20 bytes típicos) = 1460 bytes de MSS (Maximum Segment Size). Si se usan opciones IP/TCP adicionales, el MSS se reduce. Para tráfico IPsec/VPN, el overhead es mayor.'
  },
  { id: 99, domain: 'security_fundamentals', difficulty: 'easy', type: 'single',
    text: '¿Qué comando habilita el firewall stateful básico en un router Cisco?',
    options: ['A. ip inspect name FIREWALL tcp', 'B. ip firewall enable', 'C. access-list firewall permit ip any any', 'D. zone-based security enable'],
    answer: 0,
    explanation: 'CBAC (Context-Based Access Control) se habilita con `ip inspect name`. Inspecciona tráfico saliente y permite dinámicamente el tráfico de retorno. `zone-based security` es más moderno. Una ACL simple no es stateful.'
  },
  { id: 100, domain: 'automation', difficulty: 'easy', type: 'single',
    text: '¿Qué protocolo de transporte usa NETCONF por defecto?',
    options: ['A. HTTP', 'B. SSH', 'C. Telnet', 'D. HTTPS'],
    answer: 1,
    explanation: 'NETCONF (Network Configuration Protocol, RFC 6241) usa SSH como transporte seguro por defecto (puerto 830). Usa XML para datos y RPC para operaciones. RESTCONF usa HTTP/HTTPS y JSON/XML.'
  }
];

QUESTIONS.push(...MORE_QUESTIONS);

// Make available globally
if (typeof window !== 'undefined') {
  window.CCNA_DOMAINS = CCNA_DOMAINS;
  window.QUESTIONS = QUESTIONS;
}
