// ═══════════════════════════════════════════
// Tutor Module — Adaptive Learning Engine + Chat
// ═══════════════════════════════════════════

const Tutor = {
  getAdaptiveDifficulty(data, domainId) {
    if (!domainId || domainId === 'all') {
      const total = data.questionsAnswered;
      if (total < 5) return 'easy';
      const pct = total > 0 ? data.questionsCorrect / total : 0;
      if (pct >= 0.85) return 'hard';
      if (pct >= 0.60) return 'medium';
      return 'easy';
    }
    const d = data.questionsByDomain[domainId];
    if (!d || d.total < 3) return 'easy';
    const pct = d.correct / d.total;
    if (pct >= 0.85) return 'hard';
    if (pct >= 0.60) return 'medium';
    return 'easy';
  },

  selectQuestions(data, domainId, difficulty, count) {
    count = count || 10;
    let pool = QUESTIONS.slice();
    if (domainId && domainId !== 'all') pool = pool.filter(function(q) { return q.domain === domainId; });
    if (difficulty && difficulty !== 'adaptive') pool = pool.filter(function(q) { return q.difficulty === difficulty; });
    if (difficulty === 'adaptive') {
      var adaptiveDiff = this.getAdaptiveDifficulty(data, domainId);
      pool = pool.filter(function(q) { return q.difficulty === adaptiveDiff; });
      if (pool.length < 5) pool = QUESTIONS.slice().filter(function(q) { return !domainId || domainId === 'all' || q.domain === domainId; });
    }
    pool.sort(function() { return Math.random() - 0.5; });
    return pool.slice(0, Math.min(count, pool.length));
  },

  respond: function(userMessage, data) {
    var msg = userMessage.toLowerCase().trim();
    var totalAnswered = data.questionsAnswered || 0;
    var overallPct = totalAnswered > 0 ? Math.round((data.questionsCorrect / totalAnswered) * 100) : 0;
    var weakest = Analytics ? Analytics.getWeakest(data) : null;
    var weakName = weakest ? weakest.nameEs : 'practicar más';

    // OSPF troubleshooting
    if ((msg.indexOf('ospf') >= 0 || msg.indexOf('adyacen') >= 0) && (msg.indexOf('no funciona') >= 0 || msg.indexOf('problema') >= 0 || msg.indexOf('falla') >= 0 || msg.indexOf('error') >= 0 || msg.indexOf('por qué') >= 0)) {
      return '**🔧 Troubleshooting de Adyacencia OSPF**\n\nPara diagnosticar por qué dos routers OSPF no forman vecindad, verificá esto en orden:\n\n**1. ¿Están en la misma subred?**\n`show ip interface brief` — Las IPs de las interfaces conectadas deben estar en la misma subred.\n\n**2. ¿Están en la misma área OSPF?**\n`show ip ospf interface` — El campo "Area" debe coincidir en ambos extremos.\n\n**3. ¿Los timers de Hello/Dead coinciden?**\nDefault en broadcast/P2P: Hello 10s, Dead 40s\nDefault en NBMA: Hello 30s, Dead 120s\nSi no coinciden → `ip ospf hello-interval 10`\n\n**4. ¿Tienen Router IDs únicos?**\n`show ip ospf` — Si dos routers tienen el mismo RID, la adyacencia no se forma.\n\n**5. ¿MTU coincide?**\n`show interface` — MTU debe ser idéntico. Si no → `ip mtu 1500` o `ip ospf mtu-ignore`\n\n**6. ¿Autenticación?**\nSi uno tiene `ip ospf authentication message-digest`, el otro también debe tenerla.\n\n**7. ¿Tipo de red?**\nBroadcast, point-to-point, NBMA — deben ser compatibles.\n`ip ospf network point-to-point`\n\n**Comandos de diagnóstico:**\n`show ip ospf neighbor` — ¿Aparece el vecino? ¿En qué estado está?\n`debug ip ospf adj` — Muestra el proceso de adyacencia en tiempo real';
    }

    // OSPF general
    if (msg.indexOf('ospf') >= 0) {
      return '**📡 OSPF (Open Shortest Path First)**\n\nProtocolo de enrutamiento Link-State, estándar abierto. AD = 110.\n\n**Conceptos clave:**\n• Usa el algoritmo Dijkstra SPF para calcular la mejor ruta\n• Direcciones multicast: 224.0.0.5 (AllSPFRouters), 224.0.0.6 (AllDRouters)\n• Métrica = Costo = BW referencia / BW interfaz (default: 100 Mbps / BW)\n• Área 0 (Backbone) es obligatoria\n\n**Configuración básica:**\n```\nrouter ospf 1\n router-id 1.1.1.1\n network 10.0.0.0 0.0.0.3 area 0\n```\n\n**Estados de vecino:**\nDown → Init → 2-Way → ExStart → Exchange → Loading → Full\n\n**LSAs importantes:**\n• Tipo 1: Router LSA (cada router)\n• Tipo 2: Network LSA (generada por el DR)\n• Tipo 3: Summary LSA (ABR entre áreas)\n• Tipo 5: External LSA (ASBR, rutas externas)\n\n**O IA** en `show ip route` = ruta inter-área (aprendida de otra área)';
    }

    // Subnetting
    if (msg.indexOf('subnet') >= 0 || msg.indexOf('subred') >= 0 || msg.indexOf('cidr') >= 0 || msg.indexOf('vlsm') >= 0 || msg.indexOf('máscara') >= 0) {
      return '**🧮 Subnetting — Guía Rápida**\n\n**Fórmulas esenciales:**\n• Hosts por subred = 2ⁿ - 2 (n = bits de host)\n• Subredes creadas = 2ˢ (s = bits prestados)\n• Máscara CIDR = 32 - n\n\n**Tabla de referencia:**\n```\n/24 = 256 IPs (254 hosts)  |  255.255.255.0\n/25 = 128 IPs (126 hosts)  |  255.255.255.128\n/26 = 64 IPs  (62 hosts)   |  255.255.255.192\n/27 = 32 IPs  (30 hosts)   |  255.255.255.224\n/28 = 16 IPs  (14 hosts)   |  255.255.255.240\n/29 = 8 IPs   (6 hosts)    |  255.255.255.248\n/30 = 4 IPs   (2 hosts)    |  255.255.255.252\n```\n\n**Ejemplo rápido:** Necesitás 50 hosts → 2ⁿ-2 ≥ 50 → n=6 → /26 (62 hosts)\n\n**Wildcard Mask (para ACLs y OSPF):**\nWildcard = 255.255.255.255 - máscara\n/24 → wildcard 0.0.0.255\n/26 → wildcard 0.0.0.63\n\n**Direcciones privadas RFC 1918:**\n• 10.0.0.0/8\n• 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)\n• 192.168.0.0/16\n\n¿Querés que te tire un ejercicio de subnetting para practicar? 🎯';
    }

    // STP
    if (msg.indexOf('stp') >= 0 || msg.indexOf('spanning tree') >= 0 || msg.indexOf('root bridge') >= 0 || msg.indexOf('bpdu') >= 0) {
      return '**🌲 Spanning Tree Protocol (STP)**\n\nPreviene bucles de Capa 2 bloqueando puertos redundantes.\n\n**Cómo funciona:**\n1. Se elige un **Root Bridge** (Bridge ID más bajo = Prioridad + MAC)\n2. Cada switch no-root elige su **Root Port** (menor costo al Root)\n3. En cada segmento se elige un **Designated Port**\n4. Los puertos que no son Root ni Designated → **Blocking**\n\n**Estados de puerto (STP clásico):**\nBlocking (20s) → Listening (15s) → Learning (15s) → Forwarding\n\n**Versiones:**\n• **STP (802.1D):** Original, 30-50s convergencia\n• **RSTP (802.1w):** Convergencia rápida ~2s\n• **PVST+:** Cisco, 1 instancia por VLAN\n• **MSTP (802.1s):** Agrupa VLANs en instancias\n\n**Comandos clave:**\n`spanning-tree vlan 1 root primary` → Fuerza Root Bridge\n`spanning-tree portfast` → Salta listening/learning en puertos de acceso\n`spanning-tree bpduguard enable` → Apaga puerto si recibe BPDU\n\n**PortFast + BPDU Guard:** Usar SIEMPRE juntos en puertos de acceso para endpoints.';
    }

    // VLANs
    if (msg.indexOf('vlan') >= 0 && msg.indexOf('acl') < 0) {
      return '**🔖 VLANs y Trunking**\n\n**VLAN (Virtual LAN):** Segmentación lógica de Capa 2. Cada VLAN = dominio de broadcast independiente.\n\n**Rangos:**\n• Normal: 1-1005 (VLAN 1 = default, no eliminable)\n• Extendido: 1006-4094 (requiere VTP transparente)\n\n**Configuración:**\n```\n! Crear VLAN\nvlan 10\n name DATA\n\n! Puerto de acceso\ninterface Gi0/1\n switchport mode access\n switchport access vlan 10\n\n! Trunk 802.1Q\ninterface Gi0/24\n switchport mode trunk\n switchport trunk allowed vlan 10,20,30  (opcional)\n```\n\n**VLAN Nativa:** Tráfico sin etiquetar en el trunk. Default VLAN 1. ⚠️ Debe coincidir en ambos extremos.\n\n**Verificación:**\n`show vlan brief` — Lista VLANs y puertos asignados\n`show interfaces trunk` — Muestra trunks, VLANs permitidas, VLAN nativa\n`show interfaces Gi0/1 switchport` — Detalle de un puerto\n\n**DTP (Dynamic Trunking Protocol):** Negocia trunks automáticamente. Modos: dynamic auto, dynamic desirable. ⚠️ Mejor práctica: deshabilitar DTP (`switchport nonegotiate`).';
    }

    // ACLs
    if (msg.indexOf('acl') >= 0 || msg.indexOf('access list') >= 0 || msg.indexOf('access-list') >= 0) {
      return '**🛡️ Access Control Lists (ACLs)**\n\n**Tipos:**\n• **Estándar (1-99, 1300-1999):** Filtra SOLO por IP origen\n• **Extendida (100-199, 2000-2699):** IP origen + destino + protocolo + puertos\n\n**⚠️ Regla de oro:** Las ACLs se procesan en orden (top-down) y tienen un **deny any any implícito** al final. Si no hay al menos un "permit", todo el tráfico se bloquea.\n\n**Usan WILDCARD MASK (máscara invertida):**\n/24 → wildcard 0.0.0.255\n/26 → wildcard 0.0.0.63\n\n**Ejemplos:**\n```\n! Permitir solo HTTP desde red local\naccess-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 80\naccess-list 100 deny ip any any\n\n! Bloquear un host específico\naccess-list 1 deny host 192.168.1.100\naccess-list 1 permit any\n```\n\n**Aplicar a interfaz:**\n`ip access-group 100 in` (entrada) o `out` (salida)\n\n**"established":** Permite solo tráfico TCP con flags ACK/RST (respuestas). Firewall stateful básico.\n\n**ACLs nombradas (recomendado):**\n`ip access-list extended WEB-FILTER`\nPermite editar entradas individuales sin reescribir toda la lista.';
    }

    // DHCP
    if (msg.indexOf('dhcp') >= 0) {
      return '**📡 DHCP (Dynamic Host Configuration Protocol)**\n\nPuertos: UDP 67 (servidor), UDP 68 (cliente)\nProceso: **DORA** — Discover → Offer → Request → Acknowledgment\n\n**Configurar servidor DHCP en router Cisco:**\n```\nip dhcp excluded-address 192.168.1.1 192.168.1.10\nip dhcp pool LAN\n network 192.168.1.0 255.255.255.0\n default-router 192.168.1.1\n dns-server 8.8.8.8 1.1.1.1\n lease 7\n```\n\n**DHCP Relay (IP Helper):**\nCuando el servidor DHCP está en otra subred:\n`ip helper-address 10.0.0.5` (en la interfaz del cliente)\n\n**DHCP Snooping (seguridad):**\nPreviene servidores DHCP rogue:\n```\nip dhcp snooping\nip dhcp snooping vlan 10,20\ninterface Gi0/1\n ip dhcp snooping trust   (puerto hacia el DHCP legítimo)\n```\n\n**Verificación:**\n`show ip dhcp binding` — Leases activos\n`show ip dhcp pool` — Utilización del pool\n`show ip dhcp conflict` — Conflictos detectados';
    }

    // NAT
    if (msg.indexOf('nat') >= 0 || msg.indexOf('pat') >= 0) {
      return '**🔄 NAT (Network Address Translation)**\n\n**Tipos:**\n• **Static NAT:** 1 IP privada ↔ 1 IP pública (servidores)\n• **Dynamic NAT:** Pool de IPs públicas para IPs privadas\n• **PAT (NAT Overload):** Muchas IPs privadas → 1 IP pública (diferentes puertos)\n\n**Configuración Static NAT:**\n```\ninterface Gi0/0\n ip nat inside\ninterface Gi0/1\n ip nat outside\nip nat inside source static 192.168.1.10 203.0.113.10\n```\n\n**Configuración PAT (más común):**\n```\naccess-list 1 permit 192.168.1.0 0.0.0.255\nip nat inside source list 1 interface Gi0/1 overload\n```\n\n**Verificación:**\n`show ip nat translations` — Traducciones activas\n`show ip nat statistics` — Estadísticas\n\n**⚠️ Para el CCNA:** Saber configurar PAT con `overload` es fundamental.';
    }

    // EtherChannel
    if (msg.indexOf('etherchannel') >= 0 || msg.indexOf('lacp') >= 0 || msg.indexOf('pagp') >= 0 || msg.indexOf('port-channel') >= 0) {
      return '**🔗 EtherChannel**\n\nAgrupa hasta 8 enlaces físicos en 1 lógico (Port-Channel).\n\n**Beneficios:**\n• Aumenta ancho de banda (hasta 8x)\n• Redundancia (si un enlace falla, el tráfico se redistribuye)\n• STP ve el Port-Channel como un solo enlace\n\n**Protocolos de negociación:**\n• **LACP (IEEE 802.3ad):** Estándar. Modos: active/passive\n• **PAgP:** Cisco propietario. Modos: desirable/auto\n• **ON:** Sin negociación (ambos lados forzados)\n\n**Configuración LACP:**\n```\ninterface range Gi0/1-4\n channel-group 1 mode active\n```\n\n**⚠️ Requisitos:** Todos los puertos del bundle deben coincidir en:\nSpeed, duplex, VLAN mode (access/trunk), VLANs permitidas, STP config.\n\n**Verificación:**\n`show etherchannel summary`\n`show etherchannel port-channel`';
    }

    // Port Security
    if (msg.indexOf('port security') >= 0 || msg.indexOf('port-security') >= 0 || msg.indexOf('errdisable') >= 0) {
      return '**🔒 Port Security**\n\nLimita qué MACs pueden conectarse a un puerto de switch.\n\n**Configuración típica:**\n```\ninterface Gi0/1\n switchport mode access\n switchport port-security\n switchport port-security maximum 2\n switchport port-security mac-address sticky\n switchport port-security violation restrict\n```\n\n**Modos de violación:**\n• **Shutdown (default):** Apaga el puerto (err-disable). Requiere `shutdown` + `no shutdown`\n• **Restrict:** Descarta paquetes de MACs no autorizadas + envía SNMP trap\n• **Protect:** Solo descarta paquetes (silencioso)\n\n**Sticky MAC:** Aprende la MAC automáticamente y la guarda en running-config.\n\n**Recuperar de err-disable:**\n`errdisable recovery cause psecure-violation`\n`errdisable recovery interval 300`\n\n**Verificación:**\n`show port-security`\n`show port-security interface Gi0/1`\n`show port-security address`';
    }

    // Exam readiness
    if (msg.indexOf('examen') >= 0 || msg.indexOf('preparar') >= 0 || msg.indexOf('aprobar') >= 0 || msg.indexOf('listo') >= 0 || msg.indexOf('ready') >= 0 || msg.indexOf('estudiar') >= 0 || msg.indexOf('puntaje') >= 0) {
      var examCount = data.examsTaken ? data.examsTaken.length : 0;
      var statusMsg = '';
      if (overallPct >= 83) statusMsg = '🔥 **Estás en zona de aprobación.** Mantené la práctica con simulacros.';
      else if (overallPct >= 60) statusMsg = '📈 **Vas bien** pero necesitás reforzar. Tu área más débil es **' + weakName + '** — enfocate ahí.';
      else statusMsg = '📚 **Todavía hay trabajo por hacer.** Empezá por **' + weakName + '** y hacé al menos 3-5 simulacros completos.';

      return '**📋 Preparación para el CCNA 200-301**\n\n**Estructura del examen:**\n• ~100-120 preguntas en 120 minutos\n• Puntaje de corte: ~825/1000 (aproximadamente 82-83%)\n• Sin penalización por respuestas incorrectas\n\n**Distribución de temas:**\n1. 🌐 Fundamentos de Red (20%) — OSI, TCP/IP, subnetting, IPv6\n2. 🔌 Acceso a la Red (20%) — VLANs, STP, EtherChannel\n3. 🔗 Conectividad IP (25%) — OSPF, rutas estáticas, FHRP, NAT\n4. ⚙️ Servicios IP (10%) — DHCP, DNS, NTP, SNMP\n5. 🔒 Seguridad (15%) — ACLs, Port Security, AAA\n6. 🤖 Automatización (10%) — REST APIs, Ansible, SDN\n\n**Tu progreso actual:**\n• ' + totalAnswered + ' preguntas respondidas\n• Precisión general: ' + overallPct + '%\n• ' + examCount + ' simulacros completados\n\n' + statusMsg + '\n\n**Tip:** Hacé simulacros en condiciones similares al examen real: 90-120 minutos sin interrupciones ni distracciones.';
    }

    // General CCNA concepts
    if (msg.indexOf('capa') >= 0 || msg.indexOf('modelo osi') >= 0 || msg.indexOf('tcp/ip') >= 0) {
      return '**🏗️ Modelo OSI (7 capas)**\n\nDe abajo hacia arriba:\n1. **Física:** Bits, cables, hubs. Estándares: RJ-45, 802.11 WiFi\n2. **Enlace de Datos:** Tramas, MAC, switches. Protocolos: Ethernet, PPP\n3. **Red:** Paquetes, IP, routers. Protocolos: IPv4, IPv6, ICMP\n4. **Transporte:** Segmentos, TCP/UDP. Puertos, control de flujo\n5. **Sesión:** Establece/mantiene/termina sesiones\n6. **Presentación:** Formato, cifrado (SSL/TLS), compresión\n7. **Aplicación:** HTTP, FTP, DNS, SMTP, SSH\n\n**PDU por capa:**\nBits (L1) → Tramas (L2) → Paquetes (L3) → Segmentos (L4) → Datos (L5-7)\n\n**Modelo TCP/IP (4 capas):**\nAcceso a Red → Internet → Transporte → Aplicación';
    }

    // EIGRP
    if (msg.indexOf('eigrp') >= 0) {
      return '**🚀 EIGRP (Enhanced Interior Gateway Routing Protocol)**\n\nProtocolo híbrido (vector-distancia avanzado) propietario de Cisco.\nAD: 90 (interno), 170 (externo)\nMulticast: 224.0.0.10\n\n**Tablas:**\n• Neighbor Table: Vecinos EIGRP\n• Topology Table: Todas las rutas aprendidas\n• Routing Table: Mejores rutas (Sucesores)\n\n**Métrica compuesta:** Ancho de banda + Delay (default K values)\nFórmula: 256 * (BW + Delay)\n\n**Configuración básica:**\n```\nrouter eigrp 100\n network 10.0.0.0 0.0.0.3\n no auto-summary\n```\n\n**Verificación:**\n`show ip eigrp neighbors`\n`show ip eigrp topology`\n`show ip route eigrp`';
    }

    // HSRP / FHRP
    if (msg.indexOf('hsrp') >= 0 || msg.indexOf('vrrp') >= 0 || msg.indexOf('glbp') >= 0 || msg.indexOf('fhrp') >= 0) {
      return '**🔄 FHRP — First Hop Redundancy Protocols**\n\nProporcionan redundancia de gateway (default gateway virtual).\n\n**HSRP (Cisco propietario):**\n• 1 router Active, 1+ Standby\n• IP virtual + MAC virtual (0000.0c07.acXX)\n• Multicast: 224.0.0.2 (v1) / 224.0.0.102 (v2)\n• Prioridad default: 100. Mayor = mejor\n• `standby 1 preempt` → Permite tomar el rol Active\n\n**VRRP (Estándar RFC 5798):**\n• Similar a HSRP\n• Multicast: 224.0.0.18\n• Prioridad default: 100. Mayor = mejor\n• Preempt habilitado por defecto\n\n**GLBP (Cisco propietario):**\n• Balanceo de carga + redundancia\n• 1 AVG (Active Virtual Gateway) + hasta 4 AVFs\n• Diferentes MACs virtuales para balancear tráfico\n\n**Configuración HSRP:**\n```\ninterface Gi0/0\n standby 1 ip 192.168.1.254\n standby 1 priority 110\n standby 1 preempt\n```\n\n**Verificación:**\n`show standby` — Estado HSRP\n`show standby brief`';
    }

    // Automation / SDN
    if (msg.indexOf('api') >= 0 || msg.indexOf('rest') >= 0 || msg.indexOf('json') >= 0 || msg.indexOf('ansible') >= 0 || msg.indexOf('sdn') >= 0 || msg.indexOf('dna') >= 0 || msg.indexOf('automat') >= 0) {
      return '**🤖 Automatización y Programabilidad**\n\n**APIs REST:**\n• GET: Leer datos\n• POST: Crear recursos\n• PUT: Actualizar recursos\n• DELETE: Eliminar recursos\n• Códigos: 200 OK, 201 Created, 401 Unauthorized, 404 Not Found\n\n**Formatos de datos:**\n• **JSON:** El más común en APIs modernas. `{"key": "value"}`\n• **XML:** Usado en NETCONF. Más verboso\n• **YAML:** Ansible, configuraciones. Legible por humanos\n\n**Herramientas:**\n• **Ansible:** Agentless, SSH, playbooks YAML, módulos Cisco IOS\n• **Puppet:** Agente, DSL propio, modelo pull\n• **Chef:** Ruby, cookbooks y recipes\n\n**SDN / Cisco:**\n• **DNA Center:** Controladora para campus/enterprise\n• **ACI (APIC):** Data center, políticas basadas en contratos\n• **vManage:** SD-WAN (ahora Catalyst SD-WAN)\n\n**NETCONF / YANG:**\n• YANG: Modelo de datos\n• NETCONF: Protocolo XML sobre SSH (puerto 830)\n• RESTCONF: API RESTful sobre HTTP';
    }

    // IPv6
    if (msg.indexOf('ipv6') >= 0) {
      return '**🌐 IPv6**\n\n**Direcciones de 128 bits** (8 grupos de 4 hex dígitos).\nEjemplo: `2001:0db8:0000:0000:0000:ff00:0042:8329`\nAbreviado: `2001:db8::ff00:42:8329`\n\n**Tipos:**\n• **Unicast:** Global (2000::/3), Link-Local (FE80::/10), Unique Local (FC00::/7)\n• **Multicast:** FF00::/8\n• **Anycast:** Uno a uno (el más cercano)\n\n**No hay broadcast en IPv6.** Se reemplaza por multicast.\n\n**Loopback:** ::1/128\n**No especificada:** ::/128\n\n**Configuración en Cisco:**\n```\ninterface Gi0/0\n ipv6 address 2001:db8:1::1/64\n ipv6 enable   (solo link-local)\n```\n\n**OSPFv3 para IPv6:**\n`ipv6 router ospf 1`\n`ipv6 ospf 1 area 0` (en la interfaz)\n\n**Verificación:**\n`show ipv6 interface brief`\n`show ipv6 route`';
    }

    // SSH / Security
    if (msg.indexOf('ssh') >= 0 || msg.indexOf('telnet') >= 0 || msg.indexOf('seguridad') >= 0 || msg.indexOf('aaa') >= 0) {
      return '**🔐 Acceso Seguro al Dispositivo**\n\n**SSH vs Telnet:**\n• **SSH:** Cifrado, puerto TCP 22. Requiere claves RSA\n• **Telnet:** Texto plano, puerto TCP 23. ⚠️ No usar en producción\n\n**Configurar SSH en router:**\n```\nhostname R1\nip domain-name ejemplo.com\ncrypto key generate rsa modulus 2048\nip ssh version 2\nline vty 0 4\n transport input ssh\n login local\nusername admin secret MiPassword123\n```\n\n**enable secret vs enable password:**\n• `enable secret`: Hash SHA-256 (tipo 5/8). Seguro. ✅\n• `enable password`: Cifrado tipo 7 (Vigenère). Reversible. ❌\n• `service password-encryption`: Solo aplica tipo 7 débil\n\n**AAA (Authentication, Authorization, Accounting):**\n• **TACACS+:** Cisco, TCP 49, cifra todo, separa AAA\n• **RADIUS:** Estándar, UDP 1812/1813, solo cifra password\n\n**Configuración AAA básica:**\n```\naaa new-model\naaa authentication login default local\naaa authorization exec default local\n```';
    }

    // Default contextual response
    if (totalAnswered < 5) {
      return '👋 **Todavía estamos en etapa temprana.** Te recomiendo empezar respondiendo preguntas en modo **Práctica** — así puedo identificar tus fortalezas y debilidades.\n\n**Para arrancar ya mismo:**\n• Andá a la pestaña **📝 Practicar**\n• Seleccioná "Fundamentos de Red" (es la base de todo)\n• Elegí dificultad "Fácil" para empezar\n\n¿Querés que te explique algún tema en particular mientras tanto? Podés preguntarme sobre OSPF, subnetting, VLANs, STP, ACLs... ¡lo que necesites! 🚀';
    }

    var recommendation = '';
    if (weakest && weakest.status === 'needs-work') {
      recommendation = '🔴 **Enfocate en ' + weakName + '** — es tu área más débil (' + (weakest.pct || '?') + '%). Este tema representa el ' + (weakest.pct || '?') + '% del examen.';
    } else {
      recommendation = '📈 **Vas bien.** Considerá hacer un simulacro completo para medirte bajo presión de tiempo.';
    }

    return 'Basado en tu desempeño (' + overallPct + '% en ' + totalAnswered + ' preguntas), te recomendaría:\n\n' + recommendation + '\n\n**Temas sobre los que podés preguntarme:**\n• "¿Cómo funciona OSPF?" — "Explícame subnetting" — "VLANs y trunking"\n• "¿Cómo configuro una ACL?" — "Port Security" — "DHCP Snooping"\n• "Diferencias entre TCP y UDP" — "¿Qué es STP?" — "EtherChannel"\n\n¿En qué querés profundizar? 🤓';
  }
};

if (typeof window !== 'undefined') {
  window.Tutor = Tutor;
}
