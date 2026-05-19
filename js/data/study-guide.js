// ═══════════════════════════════════════════
// CCNA 200-301 Study Guide Content
// ═══════════════════════════════════════════

const STUDY_GUIDE = [
  {
    id: 'network_fundamentals',
    title: '1. Network Fundamentals (20%)',
    icon: '🌐',
    sections: [
      {
        title: 'Modelo OSI vs TCP/IP',
        content: `<p>El <strong>modelo OSI</strong> tiene 7 capas; el <strong>modelo TCP/IP</strong> tiene 4 capas.</p>
<h3>Capas OSI (de abajo hacia arriba):</h3>
<ul>
<li><strong>Capa 1 — Física:</strong> Bits, cables, conectores, hubs, repetidores. Estándares: RJ-45, fibra, WiFi (802.11).</li>
<li><strong>Capa 2 — Enlace de Datos:</strong> Tramas (frames), direcciones MAC, switches, bridges. Protocolos: Ethernet (802.3), PPP, HDLC.</li>
<li><strong>Capa 3 — Red:</strong> Paquetes, direccionamiento lógico (IP), enrutamiento, routers. Protocolos: IPv4, IPv6, ICMP, OSPF.</li>
<li><strong>Capa 4 — Transporte:</strong> Segmentos, entrega extremo a extremo. Protocolos: TCP (confiable, orientado a conexión), UDP (no confiable, no orientado a conexión).</li>
<li><strong>Capa 5 — Sesión:</strong> Establece, mantiene y termina sesiones entre aplicaciones.</li>
<li><strong>Capa 6 — Presentación:</strong> Formato de datos, cifrado, compresión (SSL/TLS, JPEG, ASCII).</li>
<li><strong>Capa 7 — Aplicación:</strong> Interfaz con el usuario. HTTP, FTP, DNS, SMTP, SSH.</li>
</ul>
<h3>Encapsulación (de arriba hacia abajo):</h3>
<p>Datos → Segmento (L4) → Paquete (L3) → Trama (L2) → Bits (L1)</p>
<h3>PDU por capa:</h3>
<p>Capa 4: Segmento | Capa 3: Paquete | Capa 2: Trama | Capa 1: Bits</p>`
      },
      {
        title: 'Direccionamiento IPv4',
        content: `<h3>Clases de IPv4:</h3>
<ul>
<li><strong>Clase A:</strong> 1.0.0.0 — 126.255.255.255 (/8, máscara 255.0.0.0)</li>
<li><strong>Clase B:</strong> 128.0.0.0 — 191.255.255.255 (/16, máscara 255.255.0.0)</li>
<li><strong>Clase C:</strong> 192.0.0.0 — 223.255.255.255 (/24, máscara 255.255.255.0)</li>
<li><strong>Clase D:</strong> 224.0.0.0 — 239.255.255.255 (Multicast)</li>
<li><strong>Clase E:</strong> 240.0.0.0 — 255.255.255.255 (Experimental)</li>
</ul>
<h3>Direcciones Privadas (RFC 1918):</h3>
<ul>
<li>10.0.0.0/8 (16,777,216 hosts)</li>
<li>172.16.0.0/12 — 172.31.255.255 (1,048,576 hosts)</li>
<li>192.168.0.0/16 (65,536 hosts)</li>
</ul>
<h3>Direcciones Especiales:</h3>
<ul>
<li>127.0.0.0/8 — Loopback</li>
<li>169.254.0.0/16 — APIPA (Auto IP)</li>
<li>0.0.0.0 — Ruta por defecto / no especificada</li>
<li>255.255.255.255 — Broadcast limitado</li>
</ul>`
      },
      {
        title: 'Subnetting Rápido',
        content: `<h3>Fórmulas clave:</h3>
<ul>
<li>Hosts utilizables = 2<sup>n</sup> - 2 (donde n = bits de host)</li>
<li>Número de subredes = 2<sup>s</sup> (donde s = bits prestados)</li>
<li>Máscara = 32 - n (CIDR)</li>
</ul>
<h3>Tabla rápida de subnetting:</h3>
<p>/24 = 256 IPs (254 hosts) | /25 = 128 IPs (126 hosts) | /26 = 64 IPs (62 hosts)</p>
<p>/27 = 32 IPs (30 hosts) | /28 = 16 IPs (14 hosts) | /29 = 8 IPs (6 hosts) | /30 = 4 IPs (2 hosts)</p>
<h3>Wildcard Mask (para ACLs y OSPF):</h3>
<p>Wildcard = 255.255.255.255 - máscara de subred</p>
<p>Ejemplo: /24 (255.255.255.0) → Wildcard: 0.0.0.255</p>`
      }
    ]
  },
  {
    id: 'network_access',
    title: '2. Network Access (20%)',
    icon: '🔌',
    sections: [
      {
        title: 'VLANs y Trunking',
        content: `<h3>VLAN (Virtual LAN):</h3>
<ul>
<li>Segmentación lógica de Capa 2</li>
<li>Cada VLAN = un dominio de broadcast separado</li>
<li>Rangos: Normal (1-1005), Extendido (1006-4094)</li>
<li>VLAN 1: Default, no se puede eliminar</li>
<li>VLANs 1002-1005: Reservadas (Token Ring, FDDI)</li>
</ul>
<h3>Trunking:</h3>
<ul>
<li>Transporta múltiples VLANs sobre un solo enlace</li>
<li>IEEE 802.1Q: Estándar (etiqueta de 4 bytes insertada en la trama)</li>
<li>ISL: Propietario de Cisco (encapsula toda la trama, 26 bytes overhead)</li>
<li>VLAN Nativa: Tráfico sin etiquetar en el trunk (default VLAN 1)</li>
</ul>
<h3>Comandos esenciales:</h3>
<p><code>vlan 10</code> → <code>name DATA</code> (crear VLAN)</p>
<p><code>switchport mode access</code> + <code>switchport access vlan 10</code> (puerto de acceso)</p>
<p><code>switchport mode trunk</code> (configurar trunk)</p>
<p><code>switchport trunk allowed vlan 10,20,30</code> (restringir VLANs en trunk)</p>`
      },
      {
        title: 'Spanning Tree Protocol (STP)',
        content: `<h3>Propósito:</h3>
<p>Prevenir bucles de Capa 2 en redes con enlaces redundantes.</p>
<h3>Versiones:</h3>
<ul>
<li><strong>STP (802.1D):</strong> Original, convergencia ~30-50 segundos</li>
<li><strong>RSTP (802.1w):</strong> Convergencia rápida (~1-2 segundos)</li>
<li><strong>PVST+:</strong> Cisco propietario, una instancia STP por VLAN</li>
<li><strong>MSTP (802.1s):</strong> Agrupa VLANs en instancias STP</li>
</ul>
<h3>Elección del Root Bridge:</h3>
<ol>
<li>Bridge ID más bajo = Prioridad (default 32768 + nº VLAN) + MAC</li>
<li>Prioridad configurable en incrementos de 4096</li>
<li><code>spanning-tree vlan 1 root primary</code> (prioridad 24576)</li>
</ol>
<h3>Estados de puerto STP:</h3>
<p>Blocking → Listening (15s) → Learning (15s) → Forwarding</p>
<h3>PortFast + BPDU Guard:</h3>
<ul>
<li><strong>PortFast:</strong> Salta Listening/Learning en puertos de acceso (PCs)</li>
<li><strong>BPDU Guard:</strong> Apaga el puerto si recibe BPDU (previene switches rogue)</li>
</ul>`
      },
      {
        title: 'EtherChannel',
        content: `<h3>Agregación de enlaces:</h3>
<ul>
<li>Agrupa hasta 8 enlaces físicos en 1 lógico (Port-Channel)</li>
<li>Aumenta ancho de banda + redundancia</li>
<li>Tráfico balanceado por hash (src-dst-mac, src-dst-ip, etc.)</li>
</ul>
<h3>Protocolos:</h3>
<ul>
<li><strong>LACP (IEEE 802.3ad):</strong> Estándar, modos: active/passive</li>
<li><strong>PAgP:</strong> Cisco propietario, modos: desirable/auto</li>
<li><strong>ON:</strong> Sin protocolo de negociación</li>
</ul>
<h3>Comandos:</h3>
<p><code>channel-group 1 mode active</code> (LACP activo)</p>
<p><code>channel-group 1 mode desirable</code> (PAgP)</p>
<p>Ambos lados deben coincidir en: speed, duplex, VLANs permitidas, modo (access/trunk)</p>`
      }
    ]
  },
  {
    id: 'ip_connectivity',
    title: '3. IP Connectivity (25%)',
    icon: '🔗',
    sections: [
      {
        title: 'Enrutamiento Estático',
        content: `<h3>Tipos de rutas estáticas:</h3>
<ul>
<li><strong>Ruta estándar:</strong> <code>ip route 192.168.2.0 255.255.255.0 10.0.0.2</code></li>
<li><strong>Ruta por defecto:</strong> <code>ip route 0.0.0.0 0.0.0.0 203.0.113.1</code></li>
<li><strong>Ruta flotante:</strong> AD más alta que la ruta principal (backup)</li>
</ul>
<h3>Distancias Administrativas (AD):</h3>
<p>Connected: 0 | Static: 1 | EIGRP (interno): 90 | OSPF: 110 | IS-IS: 115 | RIP: 120 | EIGRP (externo): 170</p>`
      },
      {
        title: 'OSPF (Open Shortest Path First)',
        content: `<h3>Características:</h3>
<ul>
<li>Protocolo Link-State, estándar abierto</li>
<li>Algoritmo Dijkstra SPF (Shortest Path First)</li>
<li>AD = 110</li>
<li>Multicast: 224.0.0.5 (AllSPF) y 224.0.0.6 (AllDR)</li>
<li>Métrica = Costo = BW referencia / BW interfaz (100 Mbps ref default)</li>
</ul>
<h3>Áreas OSPF:</h3>
<ul>
<li><strong>Área 0 (Backbone):</strong> Obligatoria, todas las áreas deben conectar a ella</li>
<li><strong>ABR (Area Border Router):</strong> Conecta múltiples áreas</li>
<li><strong>ASBR:</strong> Conecta OSPF con otros dominios de enrutamiento (redistribución)</li>
</ul>
<h3>Estados de vecino:</h3>
<p>Down → Init → 2-Way → ExStart → Exchange → Loading → Full</p>
<h3>Requisitos para adyacencia:</h3>
<ul>
<li>Misma área, misma subred, mismos timers (Hello/Dead)</li>
<li>Mismo tipo de autenticación, mismo MTU</li>
<li>Router IDs únicos</li>
</ul>
<h3>Comandos clave:</h3>
<p><code>router ospf 1</code> → <code>network 10.0.0.0 0.0.0.3 area 0</code></p>
<p><code>show ip ospf neighbor</code> | <code>show ip ospf interface</code> | <code>show ip route ospf</code></p>`
      },
      {
        title: 'FHRP (First Hop Redundancy)',
        content: `<h3>Protocolos de redundancia de primer salto:</h3>
<ul>
<li><strong>HSRP (Cisco):</strong> IP virtual compartida, un router Active, uno Standby. Multicast 224.0.0.2 (v1) / 224.0.0.102 (v2). Prioridad default 100.</li>
<li><strong>VRRP (Estándar):</strong> Similar a HSRP. Multicast 224.0.0.18. Prioridad default 100.</li>
<li><strong>GLBP (Cisco):</strong> Balanceo de carga + redundancia. Un AVG (Active Virtual Gateway) asigna AVFs (forwarders) con diferentes MACs virtuales.</li>
</ul>
<h3>HSRP Básico:</h3>
<p><code>standby 1 ip 192.168.1.254</code></p>
<p><code>standby 1 priority 110</code></p>
<p><code>standby 1 preempt</code> (permite tomar el rol Active si tiene mejor prioridad)</p>`
      },
      {
        title: 'NAT (Network Address Translation)',
        content: `<h3>Tipos:</h3>
<ul>
<li><strong>Static NAT:</strong> 1 IP privada ↔ 1 IP pública (servidores)</li>
<li><strong>Dynamic NAT:</strong> Pool de IPs públicas para IPs privadas</li>
<li><strong>PAT (NAT Overload):</strong> Múltiples IPs privadas → 1 IP pública (puertos diferentes)</li>
</ul>
<h3>Comandos:</h3>
<p><code>ip nat inside source static 192.168.1.10 203.0.113.10</code></p>
<p><code>ip nat inside source list 1 interface Gi0/0 overload</code> (PAT)</p>
<p>Interfaces: <code>ip nat inside</code> y <code>ip nat outside</code></p>`
      }
    ]
  },
  {
    id: 'ip_services',
    title: '4. IP Services (10%)',
    icon: '⚙️',
    sections: [
      {
        title: 'DHCP',
        content: `<h3>Dynamic Host Configuration Protocol:</h3>
<ul>
<li>Asigna IP, máscara, gateway, DNS automáticamente</li>
<li>Puertos: UDP 67 (servidor), UDP 68 (cliente)</li>
<li>Proceso DORA: Discover → Offer → Request → Acknowledgment</li>
</ul>
<h3>Configuración en Cisco IOS:</h3>
<p><code>ip dhcp excluded-address 192.168.1.1 192.168.1.10</code></p>
<p><code>ip dhcp pool LAN</code> → <code>network 192.168.1.0 /24</code></p>
<p><code>default-router 192.168.1.1</code> | <code>dns-server 8.8.8.8</code></p>
<p><strong>DHCP Relay:</strong> <code>ip helper-address 10.0.0.5</code> (reenvía broadcasts DHCP a otro segmento)</p>
<p><strong>DHCP Snooping:</strong> Previene servidores DHCP rogue. Puertos trusted vs untrusted.</p>`
      },
      {
        title: 'DNS y NTP',
        content: `<h3>DNS (Domain Name System):</h3>
<ul>
<li>Resuelve nombres ↔ IPs</li>
<li>Puerto: UDP 53 (consultas) / TCP 53 (transferencias de zona)</li>
<li>Registros: A (IPv4), AAAA (IPv6), MX (mail), CNAME (alias), NS (nameserver)</li>
</ul>
<h3>NTP (Network Time Protocol):</h3>
<ul>
<li>Sincroniza relojes entre dispositivos</li>
<li>Puerto: UDP 123</li>
<li>Estratos: 0 (reloj atómico) hasta 15 (máximo)</li>
<li>Cisco: <code>ntp server 203.0.113.5</code></li>
</ul>`
      },
      {
        title: 'SNMP y Syslog',
        content: `<h3>SNMP:</h3>
<ul>
<li>Monitoreo y gestión de dispositivos de red</li>
<li>Puertos: UDP 161 (consultas), UDP 162 (traps)</li>
<li>Versiones: v1/v2c (community strings, inseguro), v3 (autenticación + cifrado)</li>
</ul>
<h3>Syslog:</h3>
<ul>
<li>Registro de eventos del sistema</li>
<li>Niveles: 0 (Emergency) → 7 (Debugging)</li>
<li><code>logging 192.168.1.100</code></li>
<li><code>logging trap warnings</code> (nivel 4)</li>
</ul>`
      }
    ]
  },
  {
    id: 'security_fundamentals',
    title: '5. Security Fundamentals (15%)',
    icon: '🔒',
    sections: [
      {
        title: 'ACLs (Access Control Lists)',
        content: `<h3>Tipos de ACL:</h3>
<ul>
<li><strong>Estándar (1-99, 1300-1999):</strong> Filtra solo por IP origen</li>
<li><strong>Extendida (100-199, 2000-2699):</strong> IP origen + destino, protocolo, puertos</li>
<li><strong>Nombradas:</strong> <code>ip access-list standard/extended NAME</code></li>
</ul>
<h3>Reglas:</h3>
<ul>
<li>Se procesan en orden (top-down)</li>
<li>Implicit deny any any al final</li>
<li>Al menos un permit para que pase tráfico</li>
<li>Se aplican con <code>ip access-group</code> en interfaz (in/out)</li>
</ul>
<h3>Ejemplo ACL extendida:</h3>
<p><code>access-list 100 permit tcp 192.168.1.0 0.0.0.255 host 10.0.0.5 eq 80</code></p>
<p><code>access-list 100 deny ip any any</code></p>`
      },
      {
        title: 'Port Security',
        content: `<h3>Características:</h3>
<ul>
<li>Limita qué MACs pueden conectarse a un puerto</li>
<li>Modos: Shutdown (default), Restrict (descarta + trap), Protect (solo descarta)</li>
<li>Sticky MAC: Aprende la MAC automáticamente y la guarda en running-config</li>
<li>Máximo de MACs configurable (default: 1)</li>
</ul>
<h3>Comandos:</h3>
<p><code>switchport port-security</code></p>
<p><code>switchport port-security maximum 2</code></p>
<p><code>switchport port-security mac-address sticky</code></p>
<p><code>switchport port-security violation restrict</code></p>
<p><code>errdisable recovery cause psecure-violation</code> (auto-recuperación)</p>`
      },
      {
        title: 'AAA y Acceso Seguro',
        content: `<h3>AAA (Authentication, Authorization, Accounting):</h3>
<ul>
<li><strong>TACACS+:</strong> Cisco propietario, TCP 49, cifra todo el paquete, separa AAA</li>
<li><strong>RADIUS:</strong> Estándar, UDP 1812/1813, solo cifra contraseña, combina auth+author</li>
</ul>
<h3>SSH vs Telnet:</h3>
<ul>
<li><strong>SSH:</strong> Cifrado, puerto TCP 22. Requiere: hostname, domain-name, crypto key generate rsa</li>
<li><strong>Telnet:</strong> Texto plano, puerto TCP 23. No usar en producción.</li>
</ul>
<h3>Mejores prácticas:</h3>
<ul>
<li><code>enable secret</code> (hash SHA-256) en vez de <code>enable password</code> (tipo 7)</li>
<li><code>service password-encryption</code> (cifrado débil tipo 7)</li>
<li>Configurar SSH v2, deshabilitar Telnet</li>
<li>Usar ACLs en líneas VTY para restringir acceso administrativo</li>
</ul>`
      }
    ]
  },
  {
    id: 'automation',
    title: '6. Automation & Programmability (10%)',
    icon: '🤖',
    sections: [
      {
        title: 'APIs REST y Formatos de Datos',
        content: `<h3>REST API:</h3>
<ul>
<li>Métodos HTTP: GET (leer), POST (crear), PUT (actualizar), DELETE (eliminar)</li>
<li>Códigos de estado: 2xx (éxito), 3xx (redirect), 4xx (error cliente), 5xx (error servidor)</li>
<li>Común: 200 OK, 201 Created, 401 Unauthorized, 404 Not Found, 500 Internal Server Error</li>
</ul>
<h3>Formatos de datos:</h3>
<ul>
<li><strong>JSON:</strong> Más común en APIs modernas, ligero, fácil de parsear</li>
<li><strong>XML:</strong> Más verboso, usado en SOAP y NETCONF</li>
<li><strong>YAML:</strong> Legible por humanos, usado en Ansible y configuraciones</li>
</ul>`
      },
      {
        title: 'Herramientas de Automatización',
        content: `<h3>Ansible:</h3>
<ul>
<li>Agentless (usa SSH), playbooks en YAML, idempotente</li>
<li>Módulos para Cisco: ios_command, ios_config, ios_facts</li>
</ul>
<h3>Puppet:</h3>
<ul>
<li>Agente en nodos gestionados, DSL propio (Puppet language)</li>
<li>Modelo cliente-servidor con Puppet Master</li>
</ul>
<h3>Chef:</h3>
<ul>
<li>Usa Ruby, modelo pull desde Chef Server</li>
<li>Recetas (recipes) y cookbooks</li>
</ul>`
      },
      {
        title: 'SDN y Cisco DNA Center',
        content: `<h3>Controladoras SDN:</h3>
<ul>
<li><strong>Cisco DNA Center:</strong> Redes empresariales/campus. Automatización, garantía, políticas</li>
<li><strong>Cisco ACI (APIC):</strong> Data centers. Políticas basadas en contratos</li>
<li><strong>Cisco SD-WAN (vManage):</strong> WAN definida por software</li>
</ul>
<h3>Modelos de datos YANG + NETCONF/RESTCONF:</h3>
<ul>
<li>YANG: Modela datos de configuración y estado</li>
<li>NETCONF: Protocolo XML para gestionar dispositivos (SSH, puerto 830)</li>
<li>RESTCONF: API RESTful sobre HTTP para configuración</li>
</ul>
<h3>IaC (Infrastructure as Code):</h3>
<p>Gestionar infraestructura con archivos de configuración versionables. Beneficios: consistencia, automatización, control de versiones, despliegue rápido.</p>`
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.STUDY_GUIDE = STUDY_GUIDE;
}
