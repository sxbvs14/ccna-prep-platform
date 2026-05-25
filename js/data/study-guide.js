// ═══════════════════════════════════════════
// CCNA 200-301 v2.0 Study Guide Content
// 5 Domains — Complete Exam Blueprint
// ═══════════════════════════════════════════

const STUDY_GUIDE = [
  // ─── DOMAIN 1: Network Infrastructure and Connectivity ───
  {
    id: 'network_infrastructure',
    title: '1. Infraestructura y Conectividad de Red (25%)',
    icon: '🌐',
    sections: [
      {
        title: 'Diagnóstico de Interfaces y Cables',
        content: `<h3>Diagnóstico de cables de cobre:</h3>
<ul>
<li><strong>Colisiones:</strong> Ocurren en half-duplex. Altas colisiones indican problemas de duplex o demasiados dispositivos en el mismo segmento. <code>show interface</code> muestra contadores de colisiones.</li>
<li><strong>Errores:</strong> CRC errors, runts, giants indican problemas físicos (cable dañado, interferencia, distancia excesiva).</li>
<li><strong>Duplex:</strong> Mismatch causa rendimiento muy bajo y errores. Configurar manualmente ambos lados igual (full o half). Auto-negociación recomendada.</li>
<li><strong>Speed:</strong> Mismatch causa pérdida de conectividad. Auto-negociación en ambos lados.</li>
<li><strong>Pinout:</strong> Straight-through (PC-switch, switch-router), Crossover (PC-PC, switch-switch), Rollover (consola).</li>
<li><strong>Tipos de cable:</strong> UTP (Cat5e, Cat6, Cat6a), STP, coaxial. Distancia máxima UTP: 100m.</li>
</ul>
<h3>Diagnóstico de cables de fibra:</h3>
<ul>
<li><strong>Monomodo (SMF):</strong> Núcleo pequeño (~9µm), larga distancia, fuente láser.</li>
<li><strong>Multimodo (MMF):</strong> Núcleo más grande (50/62.5µm), distancia menor, LED.</li>
<li><strong>Problemas comunes:</strong> Atenuación excesiva, dispersión, conectores sucios, radio de curvatura incorrecto.</li>
<li><strong>Herramientas:</strong> OTDR (reflectómetro óptico), power meter, VFL (visual fault locator).</li>
</ul>
<h3>Comandos de diagnóstico:</h3>
<p><code>show interfaces</code> — <code>show interfaces status</code> — <code>show interfaces counters errors</code></p>
<p><code>show mac-address-table</code> — <code>show port-security interface</code> — <code>show cable-diagnostics tdr</code></p>`
      },
      {
        title: 'Hipervisores, Máquinas Virtuales y Contenedores',
        content: `<h3>Virtualización:</h3>
<ul>
<li><strong>Hipervisor Tipo 1 (Bare-metal):</strong> Corre directamente sobre el hardware. Ej: VMware ESXi, Microsoft Hyper-V, KVM.</li>
<li><strong>Hipervisor Tipo 2 (Hosted):</strong> Corre sobre un SO anfitrión. Ej: VMware Workstation, Oracle VirtualBox.</li>
<li><strong>Máquina Virtual (VM):</strong> Emulación completa de hardware, incluye SO invitado. Mayor aislamiento, mayor overhead.</li>
</ul>
<h3>Contenedores:</h3>
<ul>
<li><strong>Contenedores:</strong> Comparten el kernel del SO anfitrión. Menos overhead que VMs, arranque casi instantáneo.</li>
<li><strong>Docker:</strong> Plataforma de contenedores líder. Imágenes portables, registros (Docker Hub), Dockerfile para construir imágenes.</li>
<li><strong>Orquestación:</strong> Kubernetes gestiona contenedores a escala (pods, servicios, deployments).</li>
</ul>
<h3>Virtualización de red:</h3>
<ul>
<li>Switches virtuales (vSwitch), NIC virtuales (vNIC), routers virtuales</li>
<li>NFV (Network Functions Virtualization): Reemplaza appliances físicos con VMs/contendores</li>
<li>Ejemplos: CSR 1000v (router virtual), ASAv (firewall virtual), vEdge (SD-WAN virtual)</li>
</ul>`
      },
      {
        title: 'Configuración y Asignación de IPv4',
        content: `<h3>Asignación de direcciones IPv4:</h3>
<ul>
<li><strong>Estática:</strong> <code>ip address 192.168.1.10 255.255.255.0</code></li>
<li><strong>DHCP:</strong> <code>ip address dhcp</code> (obtiene IP automáticamente)</li>
<li><strong>Verificación:</strong> <code>show ip interface brief</code>, <code>show ip interface</code>, <code>show dhcp lease</code></li>
</ul>
<h3>Subnetting:</h3>
<ul>
<li>Hosts utilizables = 2<sup>n</sup> - 2 (n = bits de host)</li>
<li>Subredes = 2<sup>s</sup> (s = bits prestados)</li>
<li>/30 = 4 IPs (2 hosts) — enlace punto a punto</li>
<li>/29 = 8 IPs (6 hosts) — segmentos pequeños</li>
<li>/24 = 256 IPs (254 hosts) — segmento típico de LAN</li>
<li>/16 = 65,536 IPs (65,534 hosts) — red grande</li>
</ul>
<h3>VLSM (Variable Length Subnet Mask):</h3>
<p>Usar máscaras de diferente longitud en distintas subredes para optimizar el uso de direcciones.</p>
<h3>Troubleshooting:</h3>
<ul>
<li><code>ipconfig</code> (Windows) / <code>ifconfig</code> (Linux/Mac) — ver config IP</li>
<li><code>ping</code> — probar conectividad básica</li>
<li><code>show ip interface brief</code> — estado de interfaces</li>
<li><code>debug ip dhcp server events</code> — depurar DHCP</li>
</ul>`
      },
      {
        title: 'Configuración y Asignación de IPv6',
        content: `<h3>Direcciones IPv6 Unicast:</h3>
<ul>
<li><strong>Global Unicast (GUA):</strong> 2000::/3 — direcciones públicas enrutables en Internet</li>
<li><strong>Link-Local (LLA):</strong> FE80::/10 — comunicación en el mismo enlace, no enrutable</li>
<li><strong>Unique Local (ULA):</strong> FC00::/7 — equivalente a IPv4 privado (RFC 1918)</li>
<li><strong>Loopback:</strong> ::1/128</li>
<li><strong>Unspecified:</strong> ::/128</li>
</ul>
<h3>EUI-64:</h3>
<ul>
<li>Genera automáticamente la parte de host (Interface ID) a partir de la MAC</li>
<li>Proceso: MAC de 48 bits → FF:FE insertado en medio → bit 7 invertido (U/L bit)</li>
<li>Ejemplo: MAC 0012:3456:789A → EUI-64: 0212:34FF:FE56:789A</li>
</ul>
<h3>Asignación de IPv6 en IOS:</h3>
<ul>
<li><code>ipv6 address 2001:db8::1/64</code> (estática)</li>
<li><code>ipv6 address autoconfig</code> (SLAAC — Stateless Address Autoconfiguration)</li>
<li><code>ipv6 address dhcp</code> (DHCPv6 stateful)</li>
<li><code>ipv6 enable</code> (solo link-local, sin GUA)</li>
</ul>
<h3>Prefix sizing:</h3>
<p>Subredes IPv6 generalmente /64 (para SLAAC). /48 para sitios, /56 o /64 para subredes.</p>`
      },
      {
        title: 'Principios de Redes Inalámbricas',
        content: `<h3>Bandas y Canales:</h3>
<ul>
<li><strong>2.4 GHz:</strong> Canales 1-14 (solo 1,6,11 no se solapan en EE.UU.). Mayor alcance, menor velocidad, más interferencia.</li>
<li><strong>5 GHz:</strong> Muchos canales no solapados. Mayor velocidad, menor alcance, menos interferencia.</li>
<li><strong>6 GHz (WiFi 6E):</strong> Nuevos canales, aún más ancho de banda, baja interferencia.</li>
</ul>
<h3>RF y Antenas:</h3>
<ul>
<li><strong>Potencia:</strong> dBm (medida absoluta), dB (relativa), mW.</li>
<li><strong>Antenas:</strong> Omnidireccionales (señal 360°), direccionales (Yagi, parabólica), panel (plano).</li>
<li><strong>EIRP:</strong> Potencia total radiada = potencia del transmisor + ganancia de antena - pérdidas.</li>
<li><strong>Interferencia:</strong> Co-canal (mismo canal), adyacente (canal vecino), no WiFi (microondas, Bluetooth, teléfonos).</li>
</ul>
<h3>Protocolos de seguridad WiFi:</h3>
<ul>
<li><strong>WEP:</strong> Obsoleto, inseguro (WEP-40, WEP-104).</li>
<li><strong>WPA:</strong> Mejor que WEP, usa TKIP, vulnerable.</li>
<li><strong>WPA2:</strong> Estándar actual (802.11i), AES-CCMP, modos: Personal (PSK) y Enterprise (802.1X/RADIUS).</li>
<li><strong>WPA3:</strong> Último estándar, SAE (Simultaneous Authentication of Equals), GCMP-256, Handshake más seguro.</li>
</ul>`
      },
      {
        title: 'Solución de Problemas de Conectividad Cliente',
        content: `<h3>Problemas comunes de conectividad:</h3>
<ul>
<li><strong>IP:</strong> Configuración IP incorrecta, DHCP fallando, conflicto de IP duplicada, subnet mask equivocada.</li>
<li><strong>Reachability:</strong> Gateway por defecto incorrecto, ruta faltante, firewall bloqueando, DNS no resuelve.</li>
<li><strong>WiFi:</strong> Señal débil, autenticación fallida, Wrong PSK, SSID incorrecto, canales congestionados.</li>
</ul>
<h3>Windows:</h3>
<p><code>ipconfig /all</code> — <code>ping</code> — <code>tracert</code> — <code>nslookup</code> — <code>netsh wlan show profiles</code></p>
<p><code>ipconfig /release && ipconfig /renew</code> — renovar DHCP</p>
<h3>Mac:</h3>
<p><code>ifconfig</code> — <code>networksetup -getinfo Wi-Fi</code> — <code>ping</code> — <code>traceroute</code> — <code>nslookup</code></p>
<p><code>sudo dscacheutil -flushcache</code> — limpiar caché DNS</p>
<h3>Linux:</h3>
<p><code>ip addr show</code> — <code>ip route show</code> — <code>ping</code> — <code>traceroute</code> — <code>dig</code></p>
<p><code>nmcli device wifi list</code> — <code>nmcli device wifi connect SSID password PASSWORD</code></p>
<p><code>sudo dhclient -v</code> — renovar DHCP</p>`
      },
      {
        title: 'DHCPv4 en Cisco IOS',
        content: `<h3>Configuración de servidor DHCP en IOS:</h3>
<p><code>ip dhcp excluded-address 192.168.1.1 192.168.1.10</code></p>
<p><code>ip dhcp pool LAN</code></p>
<p><code>  network 192.168.1.0 255.255.255.0</code></p>
<p><code>  default-router 192.168.1.1</code></p>
<p><code>  dns-server 8.8.8.8</code></p>
<p><code>  domain-name ejemplo.local</code></p>
<p><code>  lease 7</code></p>
<h3>Cliente DHCP en IOS:</h3>
<p><code>interface Gi0/1</code> → <code>ip address dhcp</code></p>
<h3>DHCP Relay (ip helper-address):</h3>
<p><code>interface Gi0/0</code> → <code>ip helper-address 10.0.0.10</code></p>
<p>Por defecto reenvía: DHCP, DNS, TFTP, NTP, NetBIOS, etc.</p>
<h3>Troubleshooting DHCP:</h3>
<ul>
<li><code>show ip dhcp binding</code> — ver asignaciones activas</li>
<li><code>show ip dhcp pool</code> — ver configuración del pool</li>
<li><code>show ip dhcp server statistics</code> — estadísticas del servidor</li>
<li><code>debug ip dhcp server events</code> — depurar eventos DHCP</li>
<li><code>debug ip dhcp server packet</code> — inspeccionar paquetes DHCP</li>
</ul>`
      }
    ]
  },
  // ─── DOMAIN 2: Switching and Network Access ───
  {
    id: 'switching_network_access',
    title: '2. Switching y Acceso a la Red (25%)',
    icon: '🔌',
    sections: [
      {
        title: 'Conectividad de Infraestructura de Red',
        content: `<h3>Interfaces físicas L2 y L3:</h3>
<ul>
<li><strong>L2 (switchport):</strong> <code>switchport mode access/trunk</code>. No tiene IP propia (a menos que SVI).</li>
<li><strong>L3 (routed port):</strong> <code>no switchport</code> + <code>ip address</code>. En switches Cisco, se usa <code>no switchport</code> para convertir puerto en L3.</li>
</ul>
<h3>Trunks 802.1Q:</h3>
<ul>
<li><strong>IEEE 802.1Q:</strong> Estándar para trunking. Etiqueta de 4 bytes (TPID + PCP + DEI + VLAN ID).</li>
<li><strong>Native VLAN:</strong> Tráfico sin etiquetar en el trunk (default VLAN 1). Debe coincidir en ambos extremos.</li>
<li><code>switchport mode trunk</code> — configurar trunk</li>
<li><code>switchport trunk allowed vlan 10,20,30</code> — VLANs permitidas</li>
<li><code>switchport trunk native vlan 99</code> — cambiar native VLAN</li>
</ul>
<h3>LACP EtherChannel:</h3>
<ul>
<li><strong>LACP (IEEE 802.3ad):</strong> Protocolo estándar. Modos: active (envía LACPUs) y passive (responde).</li>
<li><strong>PaGp:</strong> Cisco propietario. Modos: desirable y auto.</li>
<li><strong>L2 EtherChannel:</strong> <code>channel-group 1 mode active</code> + <code>interface port-channel 1</code> + <code>switchport mode trunk</code></li>
<li><strong>L3 EtherChannel:</strong> <code>channel-group 1 mode active</code> + <code>interface port-channel 1</code> + <code>no switchport</code> + <code>ip address</code></li>
<li>Condiciones: misma velocidad, duplex, VLAN nativa, VLANs permitidas, modo (access/trunk) en todos los miembros.</li>
</ul>
<h3>SVI (Switch Virtual Interface):</h3>
<p><code>interface Vlan10</code> → <code>ip address 192.168.10.1 255.255.255.0</code> → <code>no shutdown</code></p>
<p>Usado para routing entre VLANs (SVI + ip routing) y administración del switch.</p>`
      },
      {
        title: 'Configuración de Puertos para Dispositivos Edge',
        content: `<h3>Puertos de acceso para hosts:</h3>
<ul>
<li><strong>PC/Escritorio:</strong> <code>switchport mode access</code> + <code>switchport access vlan X</code> + <code>spanning-tree portfast</code></li>
<li><strong>Impresora:</strong> Igual que PC, puede necesitar VLAN específica de impresoras.</li>
<li><strong>IoT (cámaras, sensores):</strong> VLAN de IoT dedicada, posiblemente PoE (Power over Ethernet).</li>
<li><strong>WAP (Access Point):</strong> Trunk si soporta múltiples SSIDs (una VLAN por SSID). VLAN nativa para gestión.</li>
</ul>
<h3>VoIP:</h3>
<ul>
<li><strong>Teléfono + PC:</strong> Usa comando <code>switchport voice vlan X</code> para VLAN de voz y <code>switchport access vlan Y</code> para datos.</li>
<li>CDP/LLDP auto-negocia la VLAN de voz con el teléfono.</li>
<li><code>mls qos trust cos</code> — confiar en la marca CoS del teléfono.</li>
</ul>
<h3>Hosts virtualizados y appliances:</h3>
<ul>
<li>Servidores ESXi/Hyper-V con múltiples VLANs: Usar trunk al hypervisor, etiquetado en vSwitch.</li>
<li>Appliances de red (firewalls, load balancers): Trunk o access según necesidad.</li>
</ul>
<h3>Protección de puertos:</h3>
<p><code>switchport port-security</code> — <code>switchport port-security maximum 2</code> — <code>switchport port-security mac-address sticky</code></p>
<p><code>switchport port-security violation restrict</code></p>`
      },
      {
        title: 'Documentación de Red con CDP y LLDP',
        content: `<h3>CDP (Cisco Discovery Protocol):</h3>
<ul>
<li>Protocolo propietario de Cisco (<strong>C</strong>isco <strong>D</strong>iscovery <strong>P</strong>rotocol)</li>
<li>Capas 2, multicast, solo dispositivos Cisco</li>
<li>Intervalo: 60 segundos (default), Holdtime: 180 segundos</li>
<li>Puerto: Cisco multicast 01:00:0C:CC:CC:CC</li>
</ul>
<h3>Comandos CDP:</h3>
<ul>
<li><code>show cdp neighbors [detail]</code> — ver vecinos CDP</li>
<li><code>show cdp interface</code> — interfaz habilitada para CDP</li>
<li><code>show cdp entry *</code> — detalles de todos los vecinos</li>
<li><code>cdp run</code> / <code>no cdp run</code> (global)</li>
<li><code>cdp enable</code> / <code>no cdp enable</code> (por interfaz)</li>
</ul>
<h3>LLDP (Link Layer Discovery Protocol):</h3>
<ul>
<li>Estándar IEEE 802.1AB — funciona con dispositivos de cualquier fabricante</li>
<li>Requiere habilitación explícita en Cisco: <code>lldp run</code></li>
<li>Comandos: <code>show lldp neighbors [detail]</code>, <code>show lldp interface</code></li>
<li>Útil para documentar topología física: qué dispositivo está conectado a qué puerto</li>
</ul>`
      },
      {
        title: 'Troubleshooting de Conectividad L2/L3',
        content: `<h3>Comandos show esenciales:</h3>
<ul>
<li><strong>Interfaces:</strong> <code>show interfaces [status|counters]</code> — <code>show interfaces trunk</code> — <code>show etherchannel summary</code></li>
<li><strong>VLANs:</strong> <code>show vlan brief</code> — <code>show vlan id X</code> — <code>show mac address-table</code></li>
<li><strong>STP:</strong> <code>show spanning-tree</code> — <code>show spanning-tree vlan X</code> — <code>show spanning-tree interface Gi0/1 detail</code></li>
<li><strong>Routing:</strong> <code>show ip route</code> — <code>show ip route X.X.X.X</code> — <code>show ip protocols</code></li>
<li><strong>Logs:</strong> <code>show logging</code> — <code>show log</code> (diagnósticos de eventos, errdisable, cambios de estado)</li>
</ul>
<h3>Herramientas de conectividad:</h3>
<ul>
<li><code>ping</code> — prueba ICMP básica</li>
<li><code>ping 10.0.0.1 source 192.168.1.1</code> — ping con IP origen específica</li>
<li><code>extended ping</code> — ping con opciones avanzadas (tamaño, repeticiones, timeout, DF bit)</li>
<li><code>traceroute</code> — ruta completa hasta el destino</li>
<li><strong>Packet capture:</strong> <code>monitor capture CAP interface Gi0/0 both match ip host 10.0.0.1</code> (Embedded Packet Capture en IOS)</li>
</ul>
<h3>Secuencia de troubleshooting:</h3>
<p>1. Verificar capa física (show interfaces status) → 2. Verificar capa 2 (VLAN, trunk, STP) → 3. Verificar capa 3 (IP, ruta, ACL) → 4. Verificar logs (show logging)</p>`
      },
      {
        title: 'Rapid PVST+',
        content: `<h3>Rapid PVST+ (Per-VLAN Spanning Tree Plus):</h3>
<ul>
<li>Basado en IEEE 802.1w (RSTP) pero Cisco propietario: una instancia STP por VLAN</li>
<li>Convergencia mucho más rápida que PVST+ (802.1D) — ~1-2 segundos vs ~30-50 segundos</li>
<li>Estados de puerto: Discarding → Learning → Forwarding (solo 3, no hay Blocking/Listening separados)</li>
<li>Roles de puerto: Root, Designated, Alternate (backup de root), Backup (backup de designated)</li>
</ul>
<h3>Root Bridge:</h3>
<ul>
<li>Se elege por Bridge ID más bajo (Prioridad + MAC)</li>
<li><code>spanning-tree vlan 1 root primary</code> — prioridad 24576 (backup: 28672)</li>
<li><code>spanning-tree vlan 1 root secondary</code> — prioridad 28672</li>
<li>Prioridad configurable: <code>spanning-tree vlan 1 priority 4096</code> (múltiplos de 4096)</li>
</ul>
<h3>PortFast:</h3>
<ul>
<li>Salta los estados Learning/Forwarding en puertos de acceso (hosts, PCs, impresoras)</li>
<li><code>spanning-tree portfast</code> (por interfaz) o <code>spanning-tree portfast default</code> (global)</li>
</ul>
<h3>Root Guard:</h3>
<ul>
<li>Previene que un puerto se convierta en Root Port o que el switch conectado sea Root Bridge</li>
<li>Si recibe BPDU superior, el puerto pasa a estado Root-Inconsistent (similar a blocking)</li>
<li><code>spanning-tree guard root</code> (por interfaz)</li>
</ul>
<h3>Loop Guard:</h3>
<ul>
<li>Previene bucles de capa 2 causados por BPDUs perdidos (enlaces unidireccionales)</li>
<li>Si no recibe BPDUs, el puerto pasa a estado Loop-Inconsistent (similar a blocking)</li>
<li><code>spanning-tree guard loop</code> (por interfaz)</li>
</ul>
<h3>BPDU Guard:</h3>
<ul>
<li>Apaga (errdisable) el puerto si recibe una BPDU — previene switches rogue</li>
<li><code>spanning-tree bpduguard enable</code> (por interfaz) o <code>spanning-tree portfast bpduguard default</code> (global)</li>
<li><code>errdisable recovery cause bpduguard</code> — auto-recuperación</li>
</ul>`
      }
    ]
  },
  // ─── DOMAIN 3: IP Routing ───
  {
    id: 'ip_routing',
    title: '3. Enrutamiento IP (20%)',
    icon: '🔗',
    sections: [
      {
        title: 'Interpretación de la Tabla de Enrutamiento',
        content: `<h3>Estructura de la tabla de routing:</h3>
<ul>
<li><code>show ip route</code> — muestra la tabla de enrutamiento completa</li>
<li><strong>Codes:</strong> C (Connected), L (Local), S (Static), O (OSPF), D (EIGRP), R (RIP), B (BGP)</li>
<li>Cada entrada muestra: código/origen, prefijo/máscara, AD (distancia administrativa), métrica, next-hop, interfaz de salida</li>
</ul>
<h3>Distancia Administrativa (AD):</h3>
<p>Conexión directa: 0 | Local: 0 | Static: 1 | BGP eBGP: 20 | EIGRP (interno): 90 | OSPF: 110 | IS-IS: 115 | RIP: 120 | EIGRP (externo): 170 | BGP iBGP: 200 | Unknown: 255</p>
<h3>Métrica:</h3>
<ul>
<li><strong>OSPF:</strong> Costo = 10<sup>8</sup> / ancho de banda (en bps). Costo acumulado del camino.</li>
<li><strong>EIGRP:</strong> Compuesta (ancho de banda + retardo + carga + confiabilidad).</li>
<li><strong>RIP:</strong> Hop count (saltos). Máximo 15 hops.</li>
</ul>
<h3>Ruta por defecto:</h3>
<p>0.0.0.0/0 (IPv4) o ::/0 (IPv6). Coincide con cualquier destino. Último recurso.</p>
<h3>Elección de ruta:</h3>
<p>Si hay múltiples rutas al mismo destino: 1. Prefijo más específico (máscara más larga) → 2. AD más baja → 3. Métrica más baja</p>`
      },
      {
        title: 'Enrutamiento Estático IPv4/IPv6',
        content: `<h3>Tipos de rutas estáticas IPv4:</h3>
<ul>
<li><strong>Ruta de red:</strong> <code>ip route 192.168.2.0 255.255.255.0 10.0.0.2</code></li>
<li><strong>Ruta por defecto:</strong> <code>ip route 0.0.0.0 0.0.0.0 192.168.1.1</code></li>
<li><strong>Ruta host (/32):</strong> <code>ip route 10.0.0.5 255.255.255.255 Gi0/0</code></li>
<li><strong>Ruta flotante (backup):</strong> <code>ip route 0.0.0.0 0.0.0.0 10.0.0.1 100</code> (AD 100, más alta que la ruta principal con AD 1)</li>
</ul>
<h3>Rutas estáticas IPv6:</h3>
<ul>
<li><strong>Ruta de red:</strong> <code>ipv6 route 2001:db8:2::/64 2001:db8:1::2</code></li>
<li><strong>Ruta por defecto:</strong> <code>ipv6 route ::/0 2001:db8:1::1</code></li>
<li><strong>Ruta host (/128):</strong> <code>ipv6 route 2001:db8:1::100/128 Gi0/0</code></li>
<li><strong>Ruta flotante IPv6:</strong> <code>ipv6 route ::/0 2001:db8:1::254 100</code></li>
</ul>
<h3>Verificación:</h3>
<p><code>show ip route static</code> — <code>show ipv6 route static</code></p>
<p><code>show ip route X.X.X.X</code> — ver ruta específica</p>
<p><code>ping X.X.X.X source Y.Y.Y.Y</code> — probar conectividad</p>`
      },
      {
        title: 'OSPFv2 y OSPFv3 de Área Única',
        content: `<h3>OSPFv2 (IPv4):</h3>
<ul>
<li>Protocolo Link-State, AD = 110, métrica = costo (10<sup>8</sup> / BW interfaz)</li>
<li>Multicast: 224.0.0.5 (AllSPF), 224.0.0.6 (AllDR)</li>
</ul>
<h3>Configuración OSPFv2:</h3>
<p><code>router ospf 1</code></p>
<p><code>  router-id 1.1.1.1</code></p>
<p><code>  network 192.168.1.0 0.0.0.255 area 0</code></p>
<p><code>  network 10.0.0.0 0.0.0.3 area 0</code></p>
<h3>Tipos de redes OSPF:</h3>
<ul>
<li><strong>Broadcast (multi-access):</strong> Elegge DR/BDR para reducir adyacencias. Ej: Ethernet.</li>
<li><strong>P2P (Point-to-Point):</strong> No elige DR/BDR. Vecino inmediato. Ej: enlace serial, /30 o /31.</li>
<li><strong>DR/BDR:</strong> DR es el router con Router-ID más alto. Todos los vecinos forman adyacencia solo con DR/BDR.</li>
</ul>
<h3>OSPFv3 (IPv6):</h3>
<ul>
<li>Similar a OSPFv2 pero para IPv6</li>
<li>Usa <code>ipv6 router ospf 1</code> en lugar de <code>router ospf 1</code></li>
<li>Se configura directamente en la interfaz: <code>ipv6 ospf 1 area 0</code></li>
<li>Multicast: FF02::5 (AllSPF), FF02::6 (AllDR)</li>
</ul>
<h3>Requisitos de adyacencia:</h3>
<ul>
<li>Misma área, misma subred, mismo Hello/Dead timers</li>
<li>Router IDs únicos, mismo MTU, misma autenticación (si se usa)</li>
</ul>
<h3>Estados OSPF:</h3>
<p>Down → Init → 2-Way → ExStart → Exchange → Loading → Full</p>
<h3>Comandos de verificación:</h3>
<p><code>show ip ospf neighbor</code> — <code>show ip ospf interface</code> — <code>show ip ospf database</code></p>
<p><code>show ip route ospf</code> — <code>show ipv6 route ospf</code></p>`
      },
      {
        title: 'FHRP — HSRP y VRRP',
        content: `<h3>HSRP (Hot Standby Router Protocol):</h3>
<ul>
<li>Propietario Cisco, IP virtual compartida, un Active y un Standby</li>
<li>Versión 1: Multicast 224.0.0.2, grupo 0-255</li>
<li>Versión 2: Multicast 224.0.0.102, grupo 0-4095, soporte IPv6</li>
<li>Prioridad default: 100. Más alta = más probable de ser Active</li>
<li>Active virtual MAC: 0000.0c07.acXX (XX = grupo HSRP)</li>
</ul>
<h3>Comandos HSRP:</h3>
<p><code>standby 1 ip 192.168.1.254</code> — IP virtual</p>
<p><code>standby 1 priority 110</code> — prioridad más alta</p>
<p><code>standby 1 preempt</code> — permite recuperar rol Active</p>
<p><code>standby 1 track Gi0/1</code> — decrementa prioridad si interfaz cae</p>
<h3>Estado HSRP:</h3>
<p>Initial → Learn → Listen → Speak → Standby → Active</p>
<h3>VRRP (Virtual Router Redundancy Protocol):</h3>
<ul>
<li>Estándar IEEE (RFC 5798), similar a HSRP</li>
<li>Multicast 224.0.0.18, prioridad default 100</li>
<li>Router Master (equivalente a Active) y Backup (Standby)</li>
<li>Virtual MAC: 0000.5e00.01XX (XX = grupo VRRP)</li>
<li>Preempt habilitado por defecto</li>
</ul>
<h3>Verificación FHRP:</h3>
<p><code>show standby brief</code> — <code>show standby</code> — <code>show vrrp brief</code> — <code>show vrrp</code></p>`
      }
    ]
  },
  // ─── DOMAIN 4: Network Services and Security ───
  {
    id: 'network_services_security',
    title: '4. Servicios y Seguridad de Red (20%)',
    icon: '🔒',
    sections: [
      {
        title: 'Usuarios Locales y Cliente AAA',
        content: `<h3>Usuarios locales en IOS:</h3>
<p><code>username admin privilege 15 secret Cisco123</code></p>
<p><code>username operador privilege 1 secret Pass456</code></p>
<p>Nivel 15 = acceso completo (privilegiado), nivel 1 = acceso limitado (usuario).</p>
<h3>Configuración de AAA:</h3>
<p><code>aaa new-model</code> — habilita AAA en el dispositivo</p>
<p><code>aaa authentication login default local</code> — autenticación local</p>
<p><code>aaa authentication login TELNET group tacacs+ local</code> — TACACS+ primero, luego local</p>
<p><code>aaa authorization exec default local</code> — autorización de shell</p>
<p><code>aaa accounting exec default start-stop group tacacs+</code> — accounting de comandos</p>
<h3>TACACS+:</h3>
<ul>
<li>Propietario Cisco, TCP 49, cifra todo el payload</li>
<li>Separa autenticación, autorización y accounting (AAA separado)</li>
<li><code>tacacs-server host 10.0.0.100 key SECRETKEY</code></li>
</ul>
<h3>RADIUS:</h3>
<ul>
<li>Estándar (RFC 2865/2866), UDP 1812 (auth) y 1813 (accounting)</li>
<li>Solo cifra la contraseña en el paquete</li>
<li>Combina autenticación y autorización en una sola respuesta</li>
<li><code>radius-server host 10.0.0.100 key SECRETKEY</code></li>
</ul>`
      },
      {
        title: 'Gestión de Archivos con SFTP/SCP',
        content: `<h3>SFTP (SSH File Transfer Protocol):</h3>
<ul>
<li>Transferencia de archivos sobre SSH (puerto TCP 22)</li>
<li>Cifrado completo (autenticación + datos)</li>
<li>Más seguro que FTP/TFTP</li>
<li>Usado para copiar configuraciones, imágenes IOS, respaldos</li>
</ul>
<h3>SCP (Secure Copy Protocol):</h3>
<ul>
<li>También sobre SSH, pero más simple que SFTP (solo copia, sin listar directorios)</li>
<li>En IOS: <code>ip scp server enable</code> para habilitar servidor SCP</li>
</ul>
<h3>Comandos de gestión en IOS:</h3>
<p><code>copy running-config tftp://192.168.1.100/config.txt</code> — respaldo a TFTP (inseguro)</p>
<p><code>copy running-config sftp://user@192.168.1.100/config.txt</code> — respaldo SFTP</p>
<p><code>copy sftp://user@192.168.1.100/c2960x-universalk9-mz.152-7.E0.bin flash:</code> — actualizar IOS</p>
<p><code>copy flash:config.txt scp://user@192.168.1.100/config.txt</code> — copia SCP</p>
<p><code>archive</code> — <code>path sftp://user@192.168.1.100/backups/</code> — respaldo automático</p>
<h3>Verificación de archivos en flash:</h3>
<p><code>show flash:</code> — <code>dir flash:</code> — <code>verify /md5 flash:imagen.bin</code></p>`
      },
      {
        title: 'NAT/PAT en Routers IOS XE',
        content: `<h3>NAT estático:</h3>
<p><code>ip nat inside source static 192.168.1.10 203.0.113.10</code></p>
<p>1 a 1. Usado para servidores accesibles desde Internet.</p>
<h3>NAT dinámico:</h3>
<p><code>ip nat pool PUBLIC 203.0.113.20 203.0.113.30 netmask 255.255.255.0</code></p>
<p><code>access-list 1 permit 192.168.1.0 0.0.0.255</code></p>
<p><code>ip nat inside source list 1 pool PUBLIC</code></p>
<h3>PAT (NAT Overload):</h3>
<p><code>ip nat inside source list 1 interface Gi0/0 overload</code></p>
<p>Múltiples IPs privadas → 1 IP pública (puertos fuente diferentes). El método más común.</p>
<h3>Interfaces NAT:</h3>
<p><code>interface Gi0/0</code> → <code>ip nat outside</code> (hacia Internet)</p>
<p><code>interface Gi0/1</code> → <code>ip nat inside</code> (hacia LAN)</p>
<h3>Verificación:</h3>
<p><code>show ip nat translations</code> — <code>show ip nat statistics</code> — <code>clear ip nat translation *</code></p>
<p><code>debug ip nat</code> — depurar traducciones</p>`
      },
      {
        title: 'Diagnóstico de Registros DNS',
        content: `<h3>Registros DNS fundamentales:</h3>
<ul>
<li><strong>A (Address):</strong> Nombre → IPv4. Ej: www.ejemplo.com → 192.0.2.10</li>
<li><strong>AAAA (IPv6 Address):</strong> Nombre → IPv6. Ej: www.ejemplo.com → 2001:db8::10</li>
<li><strong>CNAME (Canonical Name):</strong> Alias de un nombre a otro. Ej: www → servidor1.ejemplo.com</li>
<li><strong>MX (Mail Exchange):</strong> Servidor de correo para el dominio. Prioridad: MX 10 mail.ejemplo.com</li>
<li><strong>NS (Name Server):</strong> Servidores DNS autoritativos para el dominio.</li>
<li><strong>PTR (Pointer):</strong> IP → Nombre (resolución inversa). Ej: 10.0.0.1 → router.ejemplo.com</li>
</ul>
<h3>Herramientas de diagnóstico:</h3>
<p><strong>nslookup:</strong> <code>nslookup www.ejemplo.com</code> — <code>nslookup -type=MX ejemplo.com</code></p>
<p><strong>dig:</strong> <code>dig www.ejemplo.com</code> — <code>dig -x 192.0.2.10</code> (PTR) — <code>dig ejemplo.com MX</code></p>
<p><strong>host:</strong> <code>host www.ejemplo.com</code> — <code>host 192.0.2.10</code></p>
<h3>Puertos DNS:</h3>
<p>UDP 53 (consultas), TCP 53 (transferencias de zona)</p>`
      },
      {
        title: 'VPNs IPsec: Acceso Remoto y Site-to-Site',
        content: `<h3>VPN Site-to-Site:</h3>
<ul>
<li>Conecta dos o más sitios a través de Internet</li>
<li>Tráfico entre sitios va cifrado en túneles IPsec</li>
<li>Ambos extremos son dispositivos de red (routers, firewalls)</li>
<li>Modo túnel: todo el paquete IP original se cifra y encapsula</li>
</ul>
<h3>VPN de Acceso Remoto:</h3>
<ul>
<li>Clientes remotos (laptops, móviles) se conectan a la red corporativa</li>
<li>Cliente VPN en el dispositivo del usuario</li>
<li>Protocolos: IPsec IKEv2, SSL/TLS (AnyConnect), WireGuard</li>
<li>Autenticación: certificados, usuario/contraseña, MFA</li>
</ul>
<h3>Protocolos IPsec:</h3>
<ul>
<li><strong>IKE (Internet Key Exchange):</strong> Negocia parámetros SA (Security Association). Puertos UDP 500, 4500 (NAT-T).</li>
<li><strong>ESP (Encapsulating Security Payload):</strong> Cifrado + autenticación del payload. Protocolo IP 50.</li>
<li><strong>AH (Authentication Header):</strong> Solo autenticación (sin cifrado). Protocolo IP 51. Raramente usado.</li>
</ul>
<h3>Modos de transporte IPsec:</h3>
<ul>
<li><strong>Modo Transporte:</strong> Solo cifra el payload (no las cabeceras IP). Usado entre hosts.</li>
<li><strong>Modo Túnel:</strong> Cifra todo el paquete original y añade nueva cabecera IP. Usado entre gateways VPN (site-to-site).</li>
</ul>`
      },
      {
        title: 'ACLs IPv4 (Estándar y Extendida)',
        content: `<h3>ACLs Estándar (1-99, 1300-1999):</h3>
<ul>
<li>Filtra solo por <strong>dirección IP origen</strong></li>
<li>Se aplica lo más cerca posible del <strong>destino</strong></li>
<li><code>access-list 10 permit 192.168.1.0 0.0.0.255</code></li>
<li><code>access-list 10 deny host 192.168.1.100</code></li>
</ul>
<h3>ACLs Extendidas (100-199, 2000-2699):</h3>
<ul>
<li>Filtra por: IP origen + destino, protocolo (tcp/udp/icmp/ip), puertos origen/destino</li>
<li>Se aplica lo más cerca posible del <strong>origen</strong></li>
<li><code>access-list 100 permit tcp 192.168.1.0 0.0.0.255 host 10.0.0.5 eq 80</code></li>
<li><code>access-list 100 deny ip any any log</code></li>
</ul>
<h3>ACLs Nombradas:</h3>
<p><code>ip access-list standard BLOQUEO</code> (o <code>extended</code>)</p>
<p><code>  deny host 10.0.0.1</code></p>
<p><code>  permit any</code></p>
<h3>Aplicación:</h3>
<p><code>interface Gi0/1</code> → <code>ip access-group 100 in</code> (o <code>out</code>)</p>
<h3>Reglas:</h3>
<ul>
<li>Procesamiento secuencial (top-down), primer match gana</li>
<li><strong>Implicit deny any any</strong> al final de toda ACL</li>
<li>Wildcard mask: 0 = debe coincidir, 1 = no importa</li>
<li><code>show access-lists</code> — <code>show ip interface</code> — <code>show running-config | include access-list</code></li>
</ul>`
      },
      {
        title: 'Seguridad de Capa 2',
        content: `<h3>DHCP Snooping:</h3>
<ul>
<li>Previene servidores DHCP rogue (no autorizados)</li>
<li>Puertos <strong>trusted</strong> (conectados a servidores DHCP legítimos o uplinks) vs <strong>untrusted</strong> (puertos de acceso)</li>
<li>Puertos untrusted filtran DHCP OFFER/ACK/DECLINE/RELEASE</li>
<li><code>ip dhcp snooping</code> — habilitar globalmente</li>
<li><code>ip dhcp snooping vlan 10,20</code> — VLANs a proteger</li>
<li><code>interface Gi0/1</code> → <code>ip dhcp snooping trust</code> — confiar en puerto</li>
</ul>
<h3>DAI (Dynamic ARP Inspection):</h3>
<ul>
<li>Previene ataques ARP spoofing/poisoning</li>
<li>Inspecciona paquetes ARP en puertos untrusted</li>
<li>Valida MAC-IP contra la base de datos DHCP Snooping</li>
<li><code>ip arp inspection vlan 10,20</code> — habilitar DAI</li>
<li><code>interface Gi0/1</code> → <code>ip arp inspection trust</code></li>
</ul>
<h3>Storm Control:</h3>
<ul>
<li>Limita el tráfico de broadcast, multicast y unicast desconocido</li>
<li><code>storm-control broadcast level 50</code> — límite 50% de ancho de banda</li>
<li><code>storm-control action shutdown</code> — apagar puerto si excede límite</li>
</ul>
<h3>RA Guard (Router Advertisement Guard):</h3>
<ul>
<li>Previene ataques de IPv6 Router Advertisement (Rogue RA)</li>
<li>Bloquea mensajes RA en puertos no confiables</li>
<li><code>ipv6 nd raguard attach-policy POLITICA</code></li>
<li><code>interface Gi0/1</code> → <code>ipv6 nd raguard</code></li>
</ul>
<h3>Port Security:</h3>
<ul>
<li>Limita MACs por puerto. Modos: Shutdown, Restrict, Protect</li>
<li>Sticky MAC: MACs se aprenden y guardan en config</li>
<li><code>switchport port-security mac-address sticky</code></li>
</ul>`
      }
    ]
  },
  // ─── DOMAIN 5: AI, and Network Operations and Management ───
  {
    id: 'ai_network_operations',
    title: '5. AI, Operaciones y Gestión de Red (10%)',
    icon: '🤖',
    sections: [
      {
        title: 'Rol de la IA Agentic en Operaciones de Red',
        content: `<h3>IA Agentic (Agentes de IA):</h3>
<ul>
<li><strong>Autonomía:</strong> Agentes de IA pueden tomar acciones independientes basadas en condiciones de red en tiempo real.</li>
<li><strong>Percepción:</strong> Monitorean constantemente telemetría, logs, métricas y eventos de red.</li>
<li><strong>Razonamiento:</strong> Analizan datos para diagnosticar problemas, predecir fallos y recomendar soluciones.</li>
<li><strong>Acción:</strong> Ejecutan configuraciones, ajustan parámetros, abren tickets, notifican operadores.</li>
</ul>
<h3>Aplicaciones en redes:</h3>
<ul>
<li><strong>Auto-diagnóstico:</strong> El agente identifica la causa raíz de una interrupción y sugiere o aplica la corrección.</li>
<li><strong>Optimización proactiva:</strong> Ajusta QoS, rutas o políticas antes de que ocurra degradación.</li>
<li><strong>Orquestación multi-dominio:</strong> Coordina cambios entre campus, WAN, centro de datos y nube.</li>
<li><strong>Respuesta a incidentes:</strong> Aísla puertos, aplica ACLs temporales, reinicia servicios automáticamente.</li>
<li><strong>ChatOps:</strong> Operadores interactúan con agentes de IA en lenguaje natural para consultar estado y ejecutar acciones.</li>
</ul>
<p>Ejemplo: Un agente detecta alta utilización en un enlace WAN, identifica la aplicación causante, y renegocia la ruta o ajusta políticas de QoS sin intervención humana.</p>`
      },
      {
        title: 'Selección de Prompts de GenAI para Operaciones',
        content: `<h3>Componentes de un prompt efectivo:</h3>
<ul>
<li><strong>Persona:</strong> Define el rol de la IA. Ej: "Eres un ingeniero de redes CCNA con 10 años de experiencia."</li>
<li><strong>Instrucciones:</strong> Acción específica que debe realizar. Clara, directa, sin ambigüedad.</li>
<li><strong>Formato de salida:</strong> Cómo debe presentar la respuesta. Ej: JSON, tabla, lista, párrafo, diagrama de red.</li>
<li><strong>Contexto:</strong> Información relevante para la tarea. Ej: configuración actual, topología, síntomas.</li>
</ul>
<h3>Ejemplos de prompts para operaciones de red:</h3>
<p><strong>Análisis:</strong> "Eres un ingeniero de redes. Analiza esta configuración de OSPF y detecta problemas potenciales. Salida: lista con prioridad de severidad."</p>
<p><strong>Diagnóstico:</strong> "Clasifica estos logs de syslog por severidad (0-7) y agrupa por facility. Dame un resumen en 3 líneas máximo."</p>
<p><strong>Configuración:</strong> "Genera la configuración completa para HSRP en dos routers Cisco IOS XE para la VLAN 10 con IP virtual 192.168.10.254. Prioridad: R1=110, R2=90."</p>
<p><strong>Explicación:</strong> "Explica en términos simples qué causa un bucle de capa 2 y cómo lo previene Rapid PVST+. Usa analogías."</p>
<p><strong>Traducción de comandos:</strong> "Traduce estos comandos show de Cisco a su equivalente en Arista EOS."</p>`
      },
      {
        title: 'Enfoques de Gestión de Red',
        content: `<h3>Gestión de dispositivos (Device Management):</h3>
<ul>
<li>Gestión individual mediante SSH, consola, SNMP, o interfaz web</li>
<li>CLI: Configuración manual, show commands, troubleshooting interactivo</li>
<li>Escalabilidad limitada — adecuado para pocos dispositivos</li>
</ul>
<h3>Gestión en la nube (Cloud Management):</h3>
<ul>
<li>Dispositivos gestionados desde una plataforma cloud (Cisco Meraki, Catalyst Cloud)</li>
<li>Sin controlador on-premise, actualizaciones automáticas, visibilidad centralizada</li>
<li>Ideal para entornos distribuidos (sucursales, retail, SMB)</li>
</ul>
<h3>Gestión por controladora (Controller-based):</h3>
<ul>
<li>Red definida por controlador central (Cisco DNA Center, Cisco SD-WAN vManage, Cisco ACI APIC)</li>
<li>Políticas centralizadas, automatización de cambios, garantía de red (assurance)</li>
<li>Modelo de intención: el administrador define "qué" y la controladora implementa "cómo"</li>
</ul>
<h3>Automatización (Automation):</h3>
<ul>
<li>Scripts, playbooks, CI/CD pipelines para gestionar configuración de red</li>
<li>Herramientas: Ansible, Terraform, Python (Netmiko, Nornir, pyATS)</li>
<li>Repetible, consistente, versionable (Git)</li>
</ul>
<h3>IaC (Infrastructure as Code):</h3>
<ul>
<li>Infraestructura de red descrita en archivos de configuración declarativos</li>
<li>Beneficios: Control de versiones (Git), revisión de cambios (pull requests), despliegue automatizado, consistencia</li>
<li>Ej: Terraform para aprovisionar recursos de red en nube, Ansible para configurar dispositivos on-prem</li>
</ul>`
      },
      {
        title: 'SNMP en Operaciones de Red',
        content: `<h3>Componentes SNMP:</h3>
<ul>
<li><strong>NMS (Network Management Station):</strong> Sistema que monitorea y gestiona dispositivos.</li>
<li><strong>Agente SNMP:</strong> Software en el dispositivo gestionado que recolecta información.</li>
<li><strong>MIB (Management Information Base):</strong> Base de datos jerárquica de objetos gestionados (OIDs).</li>
</ul>
<h3>Versiones SNMP:</h3>
<ul>
<li><strong>SNMPv1/v2c:</strong> Usan community strings (como contraseñas) en texto plano. Inseguro.</li>
<li><strong>SNMPv3:</strong> Autenticación (MD5/SHA) y cifrado (DES/AES). Modelo de seguridad basado en usuarios.</li>
</ul>
<h3>Operaciones SNMP:</h3>
<ul>
<li><strong>GET:</strong> NMS solicita un valor OID al agente</li>
<li><strong>GET-NEXT:</strong> Obtiene el siguiente OID en la MIB (para recorrer tablas)</li>
<li><strong>SET:</strong> NMS modifica un valor en el agente (configuración remota)</li>
<li><strong>TRAP:</strong> Agente envía notificación asíncrona al NMS (evento)</li>
<li><strong>INFORM:</strong> Similar a TRAP pero con confirmación de recepción</li>
</ul>
<h3>Configuración SNMPv2c en IOS:</h3>
<p><code>snmp-server community public RO</code> — comunidad de solo lectura</p>
<p><code>snmp-server community private RW</code> — comunidad de lectura/escritura</p>
<p><code>snmp-server location NY-Ofc</code> — ubicación del dispositivo</p>
<p><code>snmp-server host 192.168.1.100 version 2c public</code> — enviar traps</p>
<h3>Puertos SNMP:</h3>
<p>UDP 161 (consultas GET/SET), UDP 162 (traps/informs)</p>`
      },
      {
        title: 'Ansible para Gestión de Configuración',
        content: `<h3>Ansible:</h3>
<ul>
<li>Herramienta de automatización <strong>agentless</strong> (usa SSH, no requiere agente en el dispositivo)</li>
<li>Playbooks en formato <strong>YAML</strong>, fáciles de leer y versionar</li>
<li><strong>Idempotente:</strong> Aplicar el mismo playbook múltiples veces produce el mismo resultado</li>
<li><strong>Push model:</strong> Ansible se conecta a los dispositivos y aplica la configuración</li>
</ul>
<h3>Módulos para Cisco IOS:</h3>
<ul>
<li><code>cisco.ios.ios_config</code> — Configurar comandos en dispositivos IOS</li>
<li><code>cisco.ios.ios_command</code> — Ejecutar comandos show en dispositivos IOS</li>
<li><code>cisco.ios.ios_facts</code> — Recolectar facts del dispositivo</li>
<li><code>cisco.ios.ios_vlan</code> — Gestionar VLANs (crear, eliminar, modificar)</li>
</ul>
<h3>Ejemplo de Playbook:</h3>
<p><code>---</code></p>
<p><code>- name: Configurar VLANs en switches</code></p>
<p><code>  hosts: switches</code></p>
<p><code>  gather_facts: no</code></p>
<p><code>  tasks:</code></p>
<p><code>    - name: Crear VLAN 10</code></p>
<p><code>      cisco.ios.ios_config:</code></p>
<p><code>        lines:</code></p>
<p><code>          - vlan 10</code></p>
<p><code>          - name DATA</code></p>
<p><code>    - name: Verificar VLAN</code></p>
<p><code>      cisco.ios.ios_command:</code></p>
<p><code>        commands: show vlan brief</code></p>
<h3>Inventario Ansible (hosts.ini):</h3>
<p><code>[switches]</code></p>
<p><code>sw1 ansible_host=192.168.1.1 ansible_network_os=cisco.ios.ios</code></p>
<p><code>sw2 ansible_host=192.168.1.2 ansible_network_os=cisco.ios.ios</code></p>`
      },
      {
        title: 'Interpretación de Mensajes Syslog',
        content: `<h3>Formato de mensaje syslog:</h3>
<p><code>%FACILITY-SEVERITY-MNEMONIC: Message-text</code></p>
<p>Ejemplo: <code>%LINEPROTO-5-UPDOWN: Line protocol on Interface Gi0/1, changed state to up</code></p>
<h3>Facilities (instalaciones):</h3>
<ul>
<li><strong>SYS:</strong> Sistema operativo</li>
<li><strong>LINK:</strong> Estado de enlaces L1</li>
<li><strong>LINEPROTO:</strong> Protocolo de línea L2</li>
<li><strong>IF:</strong> Interfaces</li>
<li><strong>SEC:</strong> Seguridad</li>
<li><strong>OSPF:</strong> Protocolo OSPF</li>
<li><strong>DHCP:</strong> Servicio DHCP</li>
<li><strong>NAT:</strong> Traducción NAT</li>
<li><strong>STP:</strong> Spanning Tree</li>
</ul>
<h3>Niveles de severidad (0-7):</h3>
<ul>
<li><strong>0 — Emergency:</strong> Sistema inutilizable</li>
<li><strong>1 — Alert:</strong> Acción inmediata requerida</li>
<li><strong>2 — Critical:</strong> Condición crítica</li>
<li><strong>3 — Error:</strong> Condición de error</li>
<li><strong>4 — Warning:</strong> Condición de advertencia</li>
<li><strong>5 — Notice:</strong> Evento normal pero significativo</li>
<li><strong>6 — Informational:</strong> Información general</li>
<li><strong>7 — Debug:</strong> Mensajes de depuración</li>
</ul>
<h3>Comandos syslog en IOS:</h3>
<p><code>logging console warnings</code> — logs nivel 4+ a consola</p>
<p><code>logging monitor debugging</code> — logs nivel 7+ a sesiones VTY</p>
<p><code>logging buffered 4096</code> — buffer interno de logs</p>
<p><code>logging host 192.168.1.100</code> — servidor syslog remoto</p>
<p><code>logging trap notifications</code> — nivel 5+ a servidor remoto</p>
<p><code>show logging</code> — ver logs almacenados</p>`
      }
    ]
  }
];

// ═══════════════════════════════════════════
// English Version
// ═══════════════════════════════════════════

const STUDY_GUIDE_EN = [
  // ─── DOMAIN 1: Network Infrastructure and Connectivity ───
  {
    id: 'network_infrastructure',
    title: '1. Network Infrastructure and Connectivity (25%)',
    icon: '🌐',
    sections: [
      {
        title: 'Interface and Cable Issues',
        content: `<h3>Copper cable diagnostics:</h3>
<ul>
<li><strong>Collisions:</strong> Occur in half-duplex. High collisions indicate duplex issues or too many devices on the same segment. <code>show interface</code> shows collision counters.</li>
<li><strong>Errors:</strong> CRC errors, runts, giants indicate physical problems (damaged cable, interference, excessive distance).</li>
<li><strong>Duplex:</strong> Mismatch causes very poor performance and errors. Configure both sides manually to match (full or half). Auto-negotiation recommended.</li>
<li><strong>Speed:</strong> Mismatch causes connectivity loss. Auto-negotiate on both sides.</li>
<li><strong>Pinout:</strong> Straight-through (PC-switch, switch-router), Crossover (PC-PC, switch-switch), Rollover (console).</li>
<li><strong>Cable types:</strong> UTP (Cat5e, Cat6, Cat6a), STP, coaxial. Maximum UTP distance: 100m.</li>
</ul>
<h3>Fiber cable diagnostics:</h3>
<ul>
<li><strong>Single-Mode (SMF):</strong> Small core (~9µm), long distance, laser source.</li>
<li><strong>Multi-Mode (MMF):</strong> Larger core (50/62.5µm), shorter distance, LED.</li>
<li><strong>Common issues:</strong> Excessive attenuation, dispersion, dirty connectors, incorrect bend radius.</li>
<li><strong>Tools:</strong> OTDR, power meter, VFL (visual fault locator).</li>
</ul>
<h3>Diagnostic commands:</h3>
<p><code>show interfaces</code> — <code>show interfaces status</code> — <code>show interfaces counters errors</code></p>
<p><code>show mac-address-table</code> — <code>show port-security interface</code> — <code>show cable-diagnostics tdr</code></p>`
      },
      {
        title: 'Hypervisors, VMs, and Containers',
        content: `<h3>Virtualization:</h3>
<ul>
<li><strong>Type 1 Hypervisor (Bare-metal):</strong> Runs directly on hardware. Examples: VMware ESXi, Microsoft Hyper-V, KVM.</li>
<li><strong>Type 2 Hypervisor (Hosted):</strong> Runs on top of a host OS. Examples: VMware Workstation, Oracle VirtualBox.</li>
<li><strong>Virtual Machine (VM):</strong> Full hardware emulation, includes guest OS. Better isolation, higher overhead.</li>
</ul>
<h3>Containers:</h3>
<ul>
<li><strong>Containers:</strong> Share the host OS kernel. Lower overhead than VMs, near-instant startup.</li>
<li><strong>Docker:</strong> Leading container platform. Portable images, registries (Docker Hub), Dockerfile to build images.</li>
<li><strong>Orchestration:</strong> Kubernetes manages containers at scale (pods, services, deployments).</li>
</ul>
<h3>Network virtualization:</h3>
<ul>
<li>Virtual switches (vSwitch), virtual NICs (vNIC), virtual routers</li>
<li>NFV (Network Functions Virtualization): Replaces physical appliances with VMs/containers</li>
<li>Examples: CSR 1000v (virtual router), ASAv (virtual firewall), vEdge (SD-WAN virtual router)</li>
</ul>`
      },
      {
        title: 'IPv4 Address Configuration and Subnetting',
        content: `<h3>IPv4 address assignment:</h3>
<ul>
<li><strong>Static:</strong> <code>ip address 192.168.1.10 255.255.255.0</code></li>
<li><strong>DHCP:</strong> <code>ip address dhcp</code> (obtains IP automatically)</li>
<li><strong>Verification:</strong> <code>show ip interface brief</code>, <code>show ip interface</code>, <code>show dhcp lease</code></li>
</ul>
<h3>Subnetting:</h3>
<ul>
<li>Usable hosts = 2<sup>n</sup> - 2 (n = host bits)</li>
<li>Subnets = 2<sup>s</sup> (s = borrowed bits)</li>
<li>/30 = 4 IPs (2 hosts) — point-to-point link</li>
<li>/29 = 8 IPs (6 hosts) — small segments</li>
<li>/24 = 256 IPs (254 hosts) — typical LAN segment</li>
<li>/16 = 65,536 IPs (65,534 hosts) — large network</li>
</ul>
<h3>VLSM (Variable Length Subnet Mask):</h3>
<p>Use different mask lengths on different subnets to optimize address usage.</p>
<h3>Troubleshooting:</h3>
<ul>
<li><code>ipconfig</code> (Windows) / <code>ifconfig</code> (Linux/Mac) — view IP config</li>
<li><code>ping</code> — test basic connectivity</li>
<li><code>show ip interface brief</code> — interface status</li>
<li><code>debug ip dhcp server events</code> — debug DHCP</li>
</ul>`
      },
      {
        title: 'IPv6 Address Configuration and Prefix Sizing',
        content: `<h3>IPv6 Unicast Addresses:</h3>
<ul>
<li><strong>Global Unicast (GUA):</strong> 2000::/3 — public addresses routable on the Internet</li>
<li><strong>Link-Local (LLA):</strong> FE80::/10 — communication on the same link, not routable</li>
<li><strong>Unique Local (ULA):</strong> FC00::/7 — equivalent to private IPv4 (RFC 1918)</li>
<li><strong>Loopback:</strong> ::1/128</li>
<li><strong>Unspecified:</strong> ::/128</li>
</ul>
<h3>EUI-64:</h3>
<ul>
<li>Automatically generates the host portion (Interface ID) from the MAC address</li>
<li>Process: 48-bit MAC → FF:FE inserted in the middle → bit 7 inverted (U/L bit)</li>
<li>Example: MAC 0012:3456:789A → EUI-64: 0212:34FF:FE56:789A</li>
</ul>
<h3>IPv6 address configuration on IOS:</h3>
<ul>
<li><code>ipv6 address 2001:db8::1/64</code> (static)</li>
<li><code>ipv6 address autoconfig</code> (SLAAC — Stateless Address Autoconfiguration)</li>
<li><code>ipv6 address dhcp</code> (DHCPv6 stateful)</li>
<li><code>ipv6 enable</code> (link-local only, no GUA)</li>
</ul>
<h3>Prefix sizing:</h3>
<p>IPv6 subnets are typically /64 (for SLAAC). /48 for sites, /56 or /64 for subnets.</p>`
      },
      {
        title: 'Wireless Principles',
        content: `<h3>Bands and Channels:</h3>
<ul>
<li><strong>2.4 GHz:</strong> Channels 1-14 (only 1,6,11 are non-overlapping in the US). Longer range, lower speed, more interference.</li>
<li><strong>5 GHz:</strong> Many non-overlapping channels. Higher speed, shorter range, less interference.</li>
<li><strong>6 GHz (WiFi 6E):</strong> New channels, even more bandwidth, low interference.</li>
</ul>
<h3>RF and Antennas:</h3>
<ul>
<li><strong>Power:</strong> dBm (absolute measurement), dB (relative), mW.</li>
<li><strong>Antennas:</strong> Omnidirectional (360° signal), Directional (Yagi, parabolic), Panel (flat).</li>
<li><strong>EIRP:</strong> Total radiated power = transmitter power + antenna gain - cable losses.</li>
<li><strong>Interference:</strong> Co-channel (same channel), Adjacent (neighboring channel), Non-WiFi (microwaves, Bluetooth, phones).</li>
</ul>
<h3>WiFi Security Protocols:</h3>
<ul>
<li><strong>WEP:</strong> Obsolete, insecure (WEP-40, WEP-104).</li>
<li><strong>WPA:</strong> Better than WEP, uses TKIP, still vulnerable.</li>
<li><strong>WPA2:</strong> Current standard (802.11i), AES-CCMP, modes: Personal (PSK) and Enterprise (802.1X/RADIUS).</li>
<li><strong>WPA3:</strong> Latest standard, SAE (Simultaneous Authentication of Equals), GCMP-256, more secure handshake.</li>
</ul>`
      },
      {
        title: 'Troubleshooting Wired/Wireless Client Connectivity',
        content: `<h3>Common connectivity issues:</h3>
<ul>
<li><strong>IP:</strong> Incorrect IP configuration, DHCP failure, duplicate IP conflict, wrong subnet mask.</li>
<li><strong>Reachability:</strong> Wrong default gateway, missing route, firewall blocking, DNS not resolving.</li>
<li><strong>WiFi:</strong> Weak signal, authentication failure, wrong PSK, wrong SSID, congested channels.</li>
</ul>
<h3>Windows:</h3>
<p><code>ipconfig /all</code> — <code>ping</code> — <code>tracert</code> — <code>nslookup</code> — <code>netsh wlan show profiles</code></p>
<p><code>ipconfig /release && ipconfig /renew</code> — renew DHCP</p>
<h3>Mac:</h3>
<p><code>ifconfig</code> — <code>networksetup -getinfo Wi-Fi</code> — <code>ping</code> — <code>traceroute</code> — <code>nslookup</code></p>
<p><code>sudo dscacheutil -flushcache</code> — flush DNS cache</p>
<h3>Linux:</h3>
<p><code>ip addr show</code> — <code>ip route show</code> — <code>ping</code> — <code>traceroute</code> — <code>dig</code></p>
<p><code>nmcli device wifi list</code> — <code>nmcli device wifi connect SSID password PASSWORD</code></p>
<p><code>sudo dhclient -v</code> — renew DHCP</p>`
      },
      {
        title: 'DHCPv4 Client/Server/Relay on IOS',
        content: `<h3>DHCP server configuration on IOS:</h3>
<p><code>ip dhcp excluded-address 192.168.1.1 192.168.1.10</code></p>
<p><code>ip dhcp pool LAN</code></p>
<p><code>  network 192.168.1.0 255.255.255.0</code></p>
<p><code>  default-router 192.168.1.1</code></p>
<p><code>  dns-server 8.8.8.8</code></p>
<p><code>  domain-name example.local</code></p>
<p><code>  lease 7</code></p>
<h3>DHCP client on IOS:</h3>
<p><code>interface Gi0/1</code> → <code>ip address dhcp</code></p>
<h3>DHCP Relay (ip helper-address):</h3>
<p><code>interface Gi0/0</code> → <code>ip helper-address 10.0.0.10</code></p>
<p>By default forwards: DHCP, DNS, TFTP, NTP, NetBIOS, etc.</p>
<h3>DHCP troubleshooting:</h3>
<ul>
<li><code>show ip dhcp binding</code> — view active assignments</li>
<li><code>show ip dhcp pool</code> — view pool configuration</li>
<li><code>show ip dhcp server statistics</code> — server statistics</li>
<li><code>debug ip dhcp server events</code> — debug DHCP events</li>
<li><code>debug ip dhcp server packet</code> — inspect DHCP packets</li>
</ul>`
      }
    ]
  },
  // ─── DOMAIN 2: Switching and Network Access ───
  {
    id: 'switching_network_access',
    title: '2. Switching and Network Access (25%)',
    icon: '🔌',
    sections: [
      {
        title: 'Network Infrastructure Connectivity',
        content: `<h3>L2 and L3 physical interfaces:</h3>
<ul>
<li><strong>L2 (switchport):</strong> <code>switchport mode access/trunk</code>. Does not have its own IP (unless an SVI is configured).</li>
<li><strong>L3 (routed port):</strong> <code>no switchport</code> + <code>ip address</code>. On Cisco switches, use <code>no switchport</code> to convert a port to L3.</li>
</ul>
<h3>802.1Q Trunks:</h3>
<ul>
<li><strong>IEEE 802.1Q:</strong> Standard trunking protocol. 4-byte tag (TPID + PCP + DEI + VLAN ID).</li>
<li><strong>Native VLAN:</strong> Untagged traffic on the trunk (default VLAN 1). Must match on both ends.</li>
<li><code>switchport mode trunk</code> — configure trunk</li>
<li><code>switchport trunk allowed vlan 10,20,30</code> — allowed VLANs</li>
<li><code>switchport trunk native vlan 99</code> — change native VLAN</li>
</ul>
<h3>LACP EtherChannel:</h3>
<ul>
<li><strong>LACP (IEEE 802.3ad):</strong> Standard protocol. Modes: active (sends LACPUs) and passive (responds).</li>
<li><strong>PAgP:</strong> Cisco proprietary. Modes: desirable and auto.</li>
<li><strong>L2 EtherChannel:</strong> <code>channel-group 1 mode active</code> + <code>interface port-channel 1</code> + <code>switchport mode trunk</code></li>
<li><strong>L3 EtherChannel:</strong> <code>channel-group 1 mode active</code> + <code>interface port-channel 1</code> + <code>no switchport</code> + <code>ip address</code></li>
<li>Requirements: same speed, duplex, native VLAN, allowed VLANs, mode (access/trunk) on all members.</li>
</ul>
<h3>SVI (Switch Virtual Interface):</h3>
<p><code>interface Vlan10</code> → <code>ip address 192.168.10.1 255.255.255.0</code> → <code>no shutdown</code></p>
<p>Used for inter-VLAN routing (SVI + ip routing) and switch management.</p>`
      },
      {
        title: 'L2 Switch Port Attributes for Edge-Host',
        content: `<h3>Access ports for hosts:</h3>
<ul>
<li><strong>PC/Desktop:</strong> <code>switchport mode access</code> + <code>switchport access vlan X</code> + <code>spanning-tree portfast</code></li>
<li><strong>Printer:</strong> Same as PC, may need a dedicated printer VLAN.</li>
<li><strong>IoT (cameras, sensors):</strong> Dedicated IoT VLAN, possibly PoE (Power over Ethernet).</li>
<li><strong>WAP (Access Point):</strong> Trunk if it supports multiple SSIDs (one VLAN per SSID). Native VLAN for management.</li>
</ul>
<h3>VoIP:</h3>
<ul>
<li><strong>Phone + PC:</strong> Use <code>switchport voice vlan X</code> for voice VLAN and <code>switchport access vlan Y</code> for data.</li>
<li>CDP/LLDP auto-negotiates the voice VLAN with the phone.</li>
<li><code>mls qos trust cos</code> — trust the CoS marking from the phone.</li>
</ul>
<h3>Virtualized hosts and network appliances:</h3>
<ul>
<li>ESXi/Hyper-V servers with multiple VLANs: Use trunk to the hypervisor, tagging in the vSwitch.</li>
<li>Network appliances (firewalls, load balancers): Trunk or access as needed.</li>
</ul>
<h3>Port protection:</h3>
<p><code>switchport port-security</code> — <code>switchport port-security maximum 2</code> — <code>switchport port-security mac-address sticky</code></p>
<p><code>switchport port-security violation restrict</code></p>`
      },
      {
        title: 'Validating Network Documentation with CDP and LLDP',
        content: `<h3>CDP (Cisco Discovery Protocol):</h3>
<ul>
<li>Cisco proprietary Layer 2 protocol</li>
<li>Interval: 60 seconds (default), Holdtime: 180 seconds</li>
<li>Multicast MAC: 01:00:0C:CC:CC:CC</li>
</ul>
<h3>CDP Commands:</h3>
<ul>
<li><code>show cdp neighbors [detail]</code> — view CDP neighbors</li>
<li><code>show cdp interface</code> — CDP-enabled interfaces</li>
<li><code>show cdp entry *</code> — details of all neighbors</li>
<li><code>cdp run</code> / <code>no cdp run</code> (global)</li>
<li><code>cdp enable</code> / <code>no cdp enable</code> (per interface)</li>
</ul>
<h3>LLDP (Link Layer Discovery Protocol):</h3>
<ul>
<li>Standard IEEE 802.1AB — works with devices from any vendor</li>
<li>Must be explicitly enabled on Cisco: <code>lldp run</code></li>
<li>Commands: <code>show lldp neighbors [detail]</code>, <code>show lldp interface</code></li>
<li>Useful for documenting physical topology: which device is connected to which port</li>
</ul>`
      },
      {
        title: 'Troubleshooting L2/L3 Connectivity',
        content: `<h3>Essential show commands:</h3>
<ul>
<li><strong>Interfaces:</strong> <code>show interfaces [status|counters]</code> — <code>show interfaces trunk</code> — <code>show etherchannel summary</code></li>
<li><strong>VLANs:</strong> <code>show vlan brief</code> — <code>show vlan id X</code> — <code>show mac address-table</code></li>
<li><strong>STP:</strong> <code>show spanning-tree</code> — <code>show spanning-tree vlan X</code> — <code>show spanning-tree interface Gi0/1 detail</code></li>
<li><strong>Routing:</strong> <code>show ip route</code> — <code>show ip route X.X.X.X</code> — <code>show ip protocols</code></li>
<li><strong>Logs:</strong> <code>show logging</code> — <code>show log</code> (event diagnostics, errdisable, state changes)</li>
</ul>
<h3>Connectivity tools:</h3>
<ul>
<li><code>ping</code> — basic ICMP test</li>
<li><code>ping 10.0.0.1 source 192.168.1.1</code> — ping with specific source IP</li>
<li><code>extended ping</code> — advanced ping options (size, repeats, timeout, DF bit)</li>
<li><code>traceroute</code> — full path to destination</li>
<li><strong>Packet capture:</strong> <code>monitor capture CAP interface Gi0/0 both match ip host 10.0.0.1</code> (Embedded Packet Capture on IOS)</li>
</ul>
<h3>Troubleshooting sequence:</h3>
<p>1. Verify physical layer (show interfaces status) → 2. Verify L2 (VLAN, trunk, STP) → 3. Verify L3 (IP, route, ACL) → 4. Check logs (show logging)</p>`
      },
      {
        title: 'Rapid PVST+',
        content: `<h3>Rapid PVST+ (Per-VLAN Spanning Tree Plus):</h3>
<ul>
<li>Based on IEEE 802.1w (RSTP) but Cisco proprietary: one STP instance per VLAN</li>
<li>Much faster convergence than PVST+ (802.1D) — ~1-2 seconds vs ~30-50 seconds</li>
<li>Port states: Discarding → Learning → Forwarding (only 3, no separate Blocking/Listening)</li>
<li>Port roles: Root, Designated, Alternate (root backup), Backup (designated backup)</li>
</ul>
<h3>Root Bridge:</h3>
<ul>
<li>Elected by lowest Bridge ID (Priority + MAC)</li>
<li><code>spanning-tree vlan 1 root primary</code> — priority 24576 (backup: 28672)</li>
<li><code>spanning-tree vlan 1 root secondary</code> — priority 28672</li>
<li>Manual priority: <code>spanning-tree vlan 1 priority 4096</code> (increments of 4096)</li>
</ul>
<h3>PortFast:</h3>
<ul>
<li>Skips Learning/Forwarding states on access ports (hosts, PCs, printers)</li>
<li><code>spanning-tree portfast</code> (per interface) or <code>spanning-tree portfast default</code> (global)</li>
</ul>
<h3>Root Guard:</h3>
<ul>
<li>Prevents a port from becoming the Root Port or the connected switch from becoming Root Bridge</li>
<li>If a superior BPDU is received, the port enters Root-Inconsistent state (similar to blocking)</li>
<li><code>spanning-tree guard root</code> (per interface)</li>
</ul>
<h3>Loop Guard:</h3>
<ul>
<li>Prevents L2 loops caused by lost BPDUs (unidirectional links)</li>
<li>If no BPDUs are received, the port enters Loop-Inconsistent state (similar to blocking)</li>
<li><code>spanning-tree guard loop</code> (per interface)</li>
</ul>
<h3>BPDU Guard:</h3>
<ul>
<li>Shuts down (errdisable) the port if a BPDU is received — prevents rogue switches</li>
<li><code>spanning-tree bpduguard enable</code> (per interface) or <code>spanning-tree portfast bpduguard default</code> (global)</li>
<li><code>errdisable recovery cause bpduguard</code> — auto-recovery</li>
</ul>`
      }
    ]
  },
  // ─── DOMAIN 3: IP Routing ───
  {
    id: 'ip_routing',
    title: '3. IP Routing (20%)',
    icon: '🔗',
    sections: [
      {
        title: 'Interpreting the Routing Table',
        content: `<h3>Routing table structure:</h3>
<ul>
<li><code>show ip route</code> — displays the full routing table</li>
<li><strong>Codes:</strong> C (Connected), L (Local), S (Static), O (OSPF), D (EIGRP), R (RIP), B (BGP)</li>
<li>Each entry shows: code/source, prefix/mask, AD (administrative distance), metric, next-hop, outgoing interface</li>
</ul>
<h3>Administrative Distance (AD):</h3>
<p>Connected: 0 | Local: 0 | Static: 1 | BGP eBGP: 20 | EIGRP (internal): 90 | OSPF: 110 | IS-IS: 115 | RIP: 120 | EIGRP (external): 170 | BGP iBGP: 200 | Unknown: 255</p>
<h3>Metric:</h3>
<ul>
<li><strong>OSPF:</strong> Cost = 10<sup>8</sup> / bandwidth (in bps). Cumulative path cost.</li>
<li><strong>EIGRP:</strong> Composite metric (bandwidth + delay + load + reliability).</li>
<li><strong>RIP:</strong> Hop count. Maximum 15 hops.</li>
</ul>
<h3>Default route:</h3>
<p>0.0.0.0/0 (IPv4) or ::/0 (IPv6). Matches any destination. Last resort.</p>
<h3>Route selection:</h3>
<p>When multiple routes exist to the same destination: 1. Most specific prefix (longest mask) → 2. Lowest AD → 3. Lowest metric</p>`
      },
      {
        title: 'Static Routing IPv4/IPv6',
        content: `<h3>IPv4 static route types:</h3>
<ul>
<li><strong>Network route:</strong> <code>ip route 192.168.2.0 255.255.255.0 10.0.0.2</code></li>
<li><strong>Default route:</strong> <code>ip route 0.0.0.0 0.0.0.0 192.168.1.1</code></li>
<li><strong>Host route (/32):</strong> <code>ip route 10.0.0.5 255.255.255.255 Gi0/0</code></li>
<li><strong>Floating (backup) route:</strong> <code>ip route 0.0.0.0 0.0.0.0 10.0.0.1 100</code> (AD 100, higher than primary route AD 1)</li>
</ul>
<h3>IPv6 static routes:</h3>
<ul>
<li><strong>Network route:</strong> <code>ipv6 route 2001:db8:2::/64 2001:db8:1::2</code></li>
<li><strong>Default route:</strong> <code>ipv6 route ::/0 2001:db8:1::1</code></li>
<li><strong>Host route (/128):</strong> <code>ipv6 route 2001:db8:1::100/128 Gi0/0</code></li>
<li><strong>Floating route (IPv6):</strong> <code>ipv6 route ::/0 2001:db8:1::254 100</code></li>
</ul>
<h3>Verification:</h3>
<p><code>show ip route static</code> — <code>show ipv6 route static</code></p>
<p><code>show ip route X.X.X.X</code> — view specific route</p>
<p><code>ping X.X.X.X source Y.Y.Y.Y</code> — test connectivity</p>`
      },
      {
        title: 'Single-Area OSPFv2 and OSPFv3',
        content: `<h3>OSPFv2 (IPv4):</h3>
<ul>
<li>Link-State protocol, AD = 110, metric = cost (10<sup>8</sup> / interface BW)</li>
<li>Multicast: 224.0.0.5 (AllSPF), 224.0.0.6 (AllDR)</li>
</ul>
<h3>OSPFv2 configuration:</h3>
<p><code>router ospf 1</code></p>
<p><code>  router-id 1.1.1.1</code></p>
<p><code>  network 192.168.1.0 0.0.0.255 area 0</code></p>
<p><code>  network 10.0.0.0 0.0.0.3 area 0</code></p>
<h3>OSPF network types:</h3>
<ul>
<li><strong>Broadcast (multi-access):</strong> Elects DR/BDR to reduce adjacencies. Example: Ethernet.</li>
<li><strong>P2P (Point-to-Point):</strong> No DR/BDR election. Immediate neighbor. Example: serial link, /30 or /31.</li>
<li><strong>DR/BDR:</strong> DR is the router with the highest Router-ID. All neighbors form full adjacencies only with DR/BDR.</li>
</ul>
<h3>OSPFv3 (IPv6):</h3>
<ul>
<li>Similar to OSPFv2 but for IPv6</li>
<li>Uses <code>ipv6 router ospf 1</code> instead of <code>router ospf 1</code></li>
<li>Configured directly on the interface: <code>ipv6 ospf 1 area 0</code></li>
<li>Multicast: FF02::5 (AllSPF), FF02::6 (AllDR)</li>
</ul>
<h3>Adjacency requirements:</h3>
<ul>
<li>Same area, same subnet, same Hello/Dead timers</li>
<li>Unique Router IDs, same MTU, same authentication (if used)</li>
</ul>
<h3>OSPF states:</h3>
<p>Down → Init → 2-Way → ExStart → Exchange → Loading → Full</p>
<h3>Verification commands:</h3>
<p><code>show ip ospf neighbor</code> — <code>show ip ospf interface</code> — <code>show ip ospf database</code></p>
<p><code>show ip route ospf</code> — <code>show ipv6 route ospf</code></p>`
      },
      {
        title: 'FHRP — HSRP and VRRP',
        content: `<h3>HSRP (Hot Standby Router Protocol):</h3>
<ul>
<li>Cisco proprietary, shared virtual IP, one Active and one Standby</li>
<li>Version 1: Multicast 224.0.0.2, group 0-255</li>
<li>Version 2: Multicast 224.0.0.102, group 0-4095, IPv6 support</li>
<li>Default priority: 100. Higher = more likely to be Active</li>
<li>Active virtual MAC: 0000.0c07.acXX (XX = HSRP group)</li>
</ul>
<h3>HSRP commands:</h3>
<p><code>standby 1 ip 192.168.1.254</code> — virtual IP</p>
<p><code>standby 1 priority 110</code> — higher priority</p>
<p><code>standby 1 preempt</code> — allows reclaiming Active role</p>
<p><code>standby 1 track Gi0/1</code> — decrements priority if interface goes down</p>
<h3>HSRP states:</h3>
<p>Initial → Learn → Listen → Speak → Standby → Active</p>
<h3>VRRP (Virtual Router Redundancy Protocol):</h3>
<ul>
<li>IEEE standard (RFC 5798), similar to HSRP</li>
<li>Multicast 224.0.0.18, default priority 100</li>
<li>Master router (equivalent to Active) and Backup (Standby)</li>
<li>Virtual MAC: 0000.5e00.01XX (XX = VRRP group)</li>
<li>Preempt enabled by default</li>
</ul>
<h3>FHRP verification:</h3>
<p><code>show standby brief</code> — <code>show standby</code> — <code>show vrrp brief</code> — <code>show vrrp</code></p>`
      }
    ]
  },
  // ─── DOMAIN 4: Network Services and Security ───
  {
    id: 'network_services_security',
    title: '4. Network Services and Security (20%)',
    icon: '🔒',
    sections: [
      {
        title: 'Local Usernames and AAA Client',
        content: `<h3>Local users on IOS:</h3>
<p><code>username admin privilege 15 secret Cisco123</code></p>
<p><code>username oper privilege 1 secret Pass456</code></p>
<p>Level 15 = full access (privileged), level 1 = limited access (user).</p>
<h3>AAA configuration:</h3>
<p><code>aaa new-model</code> — enables AAA on the device</p>
<p><code>aaa authentication login default local</code> — local authentication</p>
<p><code>aaa authentication login TELNET group tacacs+ local</code> — TACACS+ first, then local</p>
<p><code>aaa authorization exec default local</code> — shell authorization</p>
<p><code>aaa accounting exec default start-stop group tacacs+</code> — command accounting</p>
<h3>TACACS+:</h3>
<ul>
<li>Cisco proprietary, TCP 49, encrypts the entire payload</li>
<li>Separates authentication, authorization, and accounting</li>
<li><code>tacacs-server host 10.0.0.100 key SECRETKEY</code></li>
</ul>
<h3>RADIUS:</h3>
<ul>
<li>Standard (RFC 2865/2866), UDP 1812 (auth) and 1813 (accounting)</li>
<li>Only encrypts the password in the packet</li>
<li>Combines authentication and authorization in a single response</li>
<li><code>radius-server host 10.0.0.100 key SECRETKEY</code></li>
</ul>`
      },
      {
        title: 'Configuration/Software File Management with SFTP/SCP',
        content: `<h3>SFTP (SSH File Transfer Protocol):</h3>
<ul>
<li>File transfer over SSH (TCP port 22)</li>
<li>Full encryption (authentication + data)</li>
<li>More secure than FTP/TFTP</li>
<li>Used for copying configurations, IOS images, backups</li>
</ul>
<h3>SCP (Secure Copy Protocol):</h3>
<ul>
<li>Also over SSH, but simpler than SFTP (copy only, no directory listing)</li>
<li>On IOS: <code>ip scp server enable</code> to enable SCP server</li>
</ul>
<h3>IOS file management commands:</h3>
<p><code>copy running-config tftp://192.168.1.100/config.txt</code> — backup to TFTP (insecure)</p>
<p><code>copy running-config sftp://user@192.168.1.100/config.txt</code> — SFTP backup</p>
<p><code>copy sftp://user@192.168.1.100/c2960x-universalk9-mz.152-7.E0.bin flash:</code> — IOS upgrade</p>
<p><code>copy flash:config.txt scp://user@192.168.1.100/config.txt</code> — SCP copy</p>
<p><code>archive</code> — <code>path sftp://user@192.168.1.100/backups/</code> — automatic backup</p>
<h3>Flash file verification:</h3>
<p><code>show flash:</code> — <code>dir flash:</code> — <code>verify /md5 flash:image.bin</code></p>`
      },
      {
        title: 'NAT/PAT on IOS XE Routers',
        content: `<h3>Static NAT:</h3>
<p><code>ip nat inside source static 192.168.1.10 203.0.113.10</code></p>
<p>1-to-1 mapping. Used for servers accessible from the Internet.</p>
<h3>Dynamic NAT:</h3>
<p><code>ip nat pool PUBLIC 203.0.113.20 203.0.113.30 netmask 255.255.255.0</code></p>
<p><code>access-list 1 permit 192.168.1.0 0.0.0.255</code></p>
<p><code>ip nat inside source list 1 pool PUBLIC</code></p>
<h3>PAT (NAT Overload):</h3>
<p><code>ip nat inside source list 1 interface Gi0/0 overload</code></p>
<p>Multiple private IPs → 1 public IP (different source ports). The most common method.</p>
<h3>NAT interfaces:</h3>
<p><code>interface Gi0/0</code> → <code>ip nat outside</code> (toward Internet)</p>
<p><code>interface Gi0/1</code> → <code>ip nat inside</code> (toward LAN)</p>
<h3>Verification:</h3>
<p><code>show ip nat translations</code> — <code>show ip nat statistics</code> — <code>clear ip nat translation *</code></p>
<p><code>debug ip nat</code> — debug translations</p>`
      },
      {
        title: 'Diagnosing DNS Records',
        content: `<h3>Fundamental DNS records:</h3>
<ul>
<li><strong>A (Address):</strong> Name → IPv4. Example: www.example.com → 192.0.2.10</li>
<li><strong>AAAA (IPv6 Address):</strong> Name → IPv6. Example: www.example.com → 2001:db8::10</li>
<li><strong>CNAME (Canonical Name):</strong> Alias from one name to another. Example: www → server1.example.com</li>
<li><strong>MX (Mail Exchange):</strong> Mail server for the domain. Priority: MX 10 mail.example.com</li>
<li><strong>NS (Name Server):</strong> Authoritative DNS servers for the domain.</li>
<li><strong>PTR (Pointer):</strong> IP → Name (reverse resolution). Example: 10.0.0.1 → router.example.com</li>
</ul>
<h3>Diagnostic tools:</h3>
<p><strong>nslookup:</strong> <code>nslookup www.example.com</code> — <code>nslookup -type=MX example.com</code></p>
<p><strong>dig:</strong> <code>dig www.example.com</code> — <code>dig -x 192.0.2.10</code> (PTR) — <code>dig example.com MX</code></p>
<p><strong>host:</strong> <code>host www.example.com</code> — <code>host 192.0.2.10</code></p>
<h3>DNS ports:</h3>
<p>UDP 53 (queries), TCP 53 (zone transfers)</p>`
      },
      {
        title: 'IPsec Remote Access and Site-to-Site VPNs',
        content: `<h3>Site-to-Site VPN:</h3>
<ul>
<li>Connects two or more sites over the Internet</li>
<li>Traffic between sites is encrypted in IPsec tunnels</li>
<li>Both endpoints are network devices (routers, firewalls)</li>
<li>Tunnel mode: the entire original IP packet is encrypted and encapsulated</li>
</ul>
<h3>Remote Access VPN:</h3>
<ul>
<li>Remote clients (laptops, mobiles) connect to the corporate network</li>
<li>VPN client software on the user's device</li>
<li>Protocols: IPsec IKEv2, SSL/TLS (AnyConnect), WireGuard</li>
<li>Authentication: certificates, username/password, MFA</li>
</ul>
<h3>IPsec Protocols:</h3>
<ul>
<li><strong>IKE (Internet Key Exchange):</strong> Negotiates SA (Security Association) parameters. UDP ports 500, 4500 (NAT-T).</li>
<li><strong>ESP (Encapsulating Security Payload):</strong> Encryption + authentication of payload. IP protocol 50.</li>
<li><strong>AH (Authentication Header):</strong> Authentication only (no encryption). IP protocol 51. Rarely used.</li>
</ul>
<h3>IPsec Transport modes:</h3>
<ul>
<li><strong>Transport Mode:</strong> Only encrypts the payload (not the IP header). Used between hosts.</li>
<li><strong>Tunnel Mode:</strong> Encrypts the entire original packet and adds a new IP header. Used between VPN gateways (site-to-site).</li>
</ul>`
      },
      {
        title: 'IPv4 ACLs (Standard and Extended)',
        content: `<h3>Standard ACLs (1-99, 1300-1999):</h3>
<ul>
<li>Filters only by <strong>source IP address</strong></li>
<li>Apply as close to the <strong>destination</strong> as possible</li>
<li><code>access-list 10 permit 192.168.1.0 0.0.0.255</code></li>
<li><code>access-list 10 deny host 192.168.1.100</code></li>
</ul>
<h3>Extended ACLs (100-199, 2000-2699):</h3>
<ul>
<li>Filters by: source + destination IP, protocol (tcp/udp/icmp/ip), source/destination ports</li>
<li>Apply as close to the <strong>source</strong> as possible</li>
<li><code>access-list 100 permit tcp 192.168.1.0 0.0.0.255 host 10.0.0.5 eq 80</code></li>
<li><code>access-list 100 deny ip any any log</code></li>
</ul>
<h3>Named ACLs:</h3>
<p><code>ip access-list standard BLOCK</code> (or <code>extended</code>)</p>
<p><code>  deny host 10.0.0.1</code></p>
<p><code>  permit any</code></p>
<h3>Application:</h3>
<p><code>interface Gi0/1</code> → <code>ip access-group 100 in</code> (or <code>out</code>)</p>
<h3>Rules:</h3>
<ul>
<li>Sequential processing (top-down), first match wins</li>
<li><strong>Implicit deny any any</strong> at the end of every ACL</li>
<li>Wildcard mask: 0 = must match, 1 = don't care</li>
<li><code>show access-lists</code> — <code>show ip interface</code> — <code>show running-config | include access-list</code></li>
</ul>`
      },
      {
        title: 'L2 Security: DHCP Snooping, DAI, Storm Control, RA Guard, Port Security',
        content: `<h3>DHCP Snooping:</h3>
<ul>
<li>Prevents rogue DHCP servers</li>
<li><strong>Trusted</strong> ports (connected to legitimate DHCP servers or uplinks) vs <strong>untrusted</strong> (access ports)</li>
<li>Untrusted ports filter DHCP OFFER/ACK/DECLINE/RELEASE</li>
<li><code>ip dhcp snooping</code> — enable globally</li>
<li><code>ip dhcp snooping vlan 10,20</code> — VLANs to protect</li>
<li><code>interface Gi0/1</code> → <code>ip dhcp snooping trust</code> — trust port</li>
</ul>
<h3>DAI (Dynamic ARP Inspection):</h3>
<ul>
<li>Prevents ARP spoofing/poisoning attacks</li>
<li>Inspects ARP packets on untrusted ports</li>
<li>Validates MAC-IP against the DHCP Snooping database</li>
<li><code>ip arp inspection vlan 10,20</code> — enable DAI</li>
<li><code>interface Gi0/1</code> → <code>ip arp inspection trust</code></li>
</ul>
<h3>Storm Control:</h3>
<ul>
<li>Limits broadcast, multicast, and unknown unicast traffic</li>
<li><code>storm-control broadcast level 50</code> — 50% bandwidth limit</li>
<li><code>storm-control action shutdown</code> — shut down port if exceeded</li>
</ul>
<h3>RA Guard (Router Advertisement Guard):</h3>
<ul>
<li>Prevents rogue IPv6 Router Advertisement attacks</li>
<li>Blocks RA messages on untrusted ports</li>
<li><code>ipv6 nd raguard attach-policy POLICY</code></li>
<li><code>interface Gi0/1</code> → <code>ipv6 nd raguard</code></li>
</ul>
<h3>Port Security:</h3>
<ul>
<li>Limits MAC addresses per port. Modes: Shutdown, Restrict, Protect</li>
<li>Sticky MAC: MACs are learned and saved to the config</li>
<li><code>switchport port-security mac-address sticky</code></li>
</ul>`
      }
    ]
  },
  // ─── DOMAIN 5: AI, and Network Operations and Management ───
  {
    id: 'ai_network_operations',
    title: '5. AI, and Network Operations and Management (10%)',
    icon: '🤖',
    sections: [
      {
        title: 'Role of Agentic AI in Network Operations',
        content: `<h3>Agentic AI (AI Agents):</h3>
<ul>
<li><strong>Autonomy:</strong> AI agents can take independent actions based on real-time network conditions.</li>
<li><strong>Perception:</strong> They constantly monitor telemetry, logs, metrics, and network events.</li>
<li><strong>Reasoning:</strong> They analyze data to diagnose issues, predict failures, and recommend solutions.</li>
<li><strong>Action:</strong> They execute configurations, adjust parameters, open tickets, notify operators.</li>
</ul>
<h3>Applications in networking:</h3>
<ul>
<li><strong>Self-diagnosis:</strong> The agent identifies the root cause of an outage and suggests or applies the fix.</li>
<li><strong>Proactive optimization:</strong> Adjusts QoS, routes, or policies before degradation occurs.</li>
<li><strong>Multi-domain orchestration:</strong> Coordinates changes across campus, WAN, data center, and cloud.</li>
<li><strong>Incident response:</strong> Isolates ports, applies temporary ACLs, restarts services automatically.</li>
<li><strong>ChatOps:</strong> Operators interact with AI agents in natural language to query status and execute actions.</li>
</ul>
<p>Example: An agent detects high utilization on a WAN link, identifies the causing application, and renegotiates the path or adjusts QoS policies without human intervention.</p>`
      },
      {
        title: 'Selecting GenAI Prompts for Network Ops',
        content: `<h3>Components of an effective prompt:</h3>
<ul>
<li><strong>Persona:</strong> Define the AI's role. Example: "You are a CCNA network engineer with 10 years of experience."</li>
<li><strong>Instructions:</strong> Specific action to perform. Clear, direct, unambiguous.</li>
<li><strong>Output format:</strong> How to present the response. Example: JSON, table, list, paragraph, network diagram.</li>
<li><strong>Context:</strong> Relevant information for the task. Example: current config, topology, symptoms.</li>
</ul>
<h3>Example prompts for network operations:</h3>
<p><strong>Analysis:</strong> "You are a network engineer. Analyze this OSPF configuration and detect potential issues. Output: prioritized severity list."</p>
<p><strong>Diagnosis:</strong> "Classify these syslog messages by severity (0-7) and group by facility. Give me a 3-line summary maximum."</p>
<p><strong>Configuration:</strong> "Generate the complete HSRP configuration for two Cisco IOS XE routers for VLAN 10 with virtual IP 192.168.10.254. Priority: R1=110, R2=90."</p>
<p><strong>Explanation:</strong> "Explain in simple terms what causes an L2 loop and how Rapid PVST+ prevents it. Use analogies."</p>
<p><strong>Command translation:</strong> "Translate these Cisco show commands to their Arista EOS equivalents."</p>`
      },
      {
        title: 'Network Management Approaches',
        content: `<h3>Device Management:</h3>
<ul>
<li>Individual management via SSH, console, SNMP, or web interface</li>
<li>CLI: Manual configuration, show commands, interactive troubleshooting</li>
<li>Limited scalability — suitable for a few devices</li>
</ul>
<h3>Cloud Management:</h3>
<ul>
<li>Devices managed from a cloud platform (Cisco Meraki, Catalyst Cloud)</li>
<li>No on-premises controller, automatic updates, centralized visibility</li>
<li>Ideal for distributed environments (branches, retail, SMB)</li>
</ul>
<h3>Controller-based Management:</h3>
<ul>
<li>Network defined by a central controller (Cisco DNA Center, Cisco SD-WAN vManage, Cisco ACI APIC)</li>
<li>Centralized policies, automation of changes, network assurance</li>
<li>Intent-based model: the admin defines "what" and the controller implements "how"</li>
</ul>
<h3>Automation:</h3>
<ul>
<li>Scripts, playbooks, CI/CD pipelines for network configuration management</li>
<li>Tools: Ansible, Terraform, Python (Netmiko, Nornir, pyATS)</li>
<li>Repeatable, consistent, versionable (Git)</li>
</ul>
<h3>IaC (Infrastructure as Code):</h3>
<ul>
<li>Network infrastructure described in declarative configuration files</li>
<li>Benefits: Version control (Git), change review (pull requests), automated deployment, consistency</li>
<li>Example: Terraform for cloud network resources, Ansible for on-prem device configuration</li>
</ul>`
      },
      {
        title: 'SNMP in Network Operations',
        content: `<h3>SNMP Components:</h3>
<ul>
<li><strong>NMS (Network Management Station):</strong> System that monitors and manages devices.</li>
<li><strong>SNMP Agent:</strong> Software on the managed device that collects information.</li>
<li><strong>MIB (Management Information Base):</strong> Hierarchical database of managed objects (OIDs).</li>
</ul>
<h3>SNMP Versions:</h3>
<ul>
<li><strong>SNMPv1/v2c:</strong> Use community strings (like passwords) in plain text. Insecure.</li>
<li><strong>SNMPv3:</strong> Authentication (MD5/SHA) and encryption (DES/AES). User-based security model.</li>
</ul>
<h3>SNMP Operations:</h3>
<ul>
<li><strong>GET:</strong> NMS requests an OID value from the agent</li>
<li><strong>GET-NEXT:</strong> Gets the next OID in the MIB (for walking tables)</li>
<li><strong>SET:</strong> NMS modifies a value on the agent (remote configuration)</li>
<li><strong>TRAP:</strong> Agent sends asynchronous notification to NMS (event)</li>
<li><strong>INFORM:</strong> Similar to TRAP but with acknowledgment</li>
</ul>
<h3>SNMPv2c configuration on IOS:</h3>
<p><code>snmp-server community public RO</code> — read-only community</p>
<p><code>snmp-server community private RW</code> — read-write community</p>
<p><code>snmp-server location NY-Office</code> — device location</p>
<p><code>snmp-server host 192.168.1.100 version 2c public</code> — send traps</p>
<h3>SNMP Ports:</h3>
<p>UDP 161 (GET/SET queries), UDP 162 (traps/informs)</p>`
      },
      {
        title: 'Using Ansible for Configuration Management',
        content: `<h3>Ansible:</h3>
<ul>
<li><strong>Agentless</strong> automation tool (uses SSH, no agent required on the device)</li>
<li>Playbooks in <strong>YAML</strong> format, easy to read and version control</li>
<li><strong>Idempotent:</strong> Applying the same playbook multiple times produces the same result</li>
<li><strong>Push model:</strong> Ansible connects to devices and applies configuration</li>
</ul>
<h3>Cisco IOS modules:</h3>
<ul>
<li><code>cisco.ios.ios_config</code> — Configure commands on IOS devices</li>
<li><code>cisco.ios.ios_command</code> — Execute show commands on IOS devices</li>
<li><code>cisco.ios.ios_facts</code> — Collect device facts</li>
<li><code>cisco.ios.ios_vlan</code> — Manage VLANs (create, delete, modify)</li>
</ul>
<h3>Example Playbook:</h3>
<p><code>---</code></p>
<p><code>- name: Configure VLANs on switches</code></p>
<p><code>  hosts: switches</code></p>
<p><code>  gather_facts: no</code></p>
<p><code>  tasks:</code></p>
<p><code>    - name: Create VLAN 10</code></p>
<p><code>      cisco.ios.ios_config:</code></p>
<p><code>        lines:</code></p>
<p><code>          - vlan 10</code></p>
<p><code>          - name DATA</code></p>
<p><code>    - name: Verify VLAN</code></p>
<p><code>      cisco.ios.ios_command:</code></p>
<p><code>        commands: show vlan brief</code></p>
<h3>Ansible Inventory (hosts.ini):</h3>
<p><code>[switches]</code></p>
<p><code>sw1 ansible_host=192.168.1.1 ansible_network_os=cisco.ios.ios</code></p>
<p><code>sw2 ansible_host=192.168.1.2 ansible_network_os=cisco.ios.ios</code></p>`
      },
      {
        title: 'Interpreting Syslog Messages',
        content: `<h3>Syslog message format:</h3>
<p><code>%FACILITY-SEVERITY-MNEMONIC: Message-text</code></p>
<p>Example: <code>%LINEPROTO-5-UPDOWN: Line protocol on Interface Gi0/1, changed state to up</code></p>
<h3>Facilities:</h3>
<ul>
<li><strong>SYS:</strong> Operating system</li>
<li><strong>LINK:</strong> L1 link state</li>
<li><strong>LINEPROTO:</strong> L2 line protocol</li>
<li><strong>IF:</strong> Interfaces</li>
<li><strong>SEC:</strong> Security</li>
<li><strong>OSPF:</strong> OSPF protocol</li>
<li><strong>DHCP:</strong> DHCP service</li>
<li><strong>NAT:</strong> NAT translation</li>
<li><strong>STP:</strong> Spanning Tree</li>
</ul>
<h3>Severity levels (0-7):</h3>
<ul>
<li><strong>0 — Emergency:</strong> System is unusable</li>
<li><strong>1 — Alert:</strong> Immediate action required</li>
<li><strong>2 — Critical:</strong> Critical condition</li>
<li><strong>3 — Error:</strong> Error condition</li>
<li><strong>4 — Warning:</strong> Warning condition</li>
<li><strong>5 — Notice:</strong> Normal but significant event</li>
<li><strong>6 — Informational:</strong> General information</li>
<li><strong>7 — Debug:</strong> Debug messages</li>
</ul>
<h3>Syslog commands on IOS:</h3>
<p><code>logging console warnings</code> — level 4+ logs to console</p>
<p><code>logging monitor debugging</code> — level 7+ logs to VTY sessions</p>
<p><code>logging buffered 4096</code> — internal log buffer</p>
<p><code>logging host 192.168.1.100</code> — remote syslog server</p>
<p><code>logging trap notifications</code> — level 5+ to remote server</p>
<p><code>show logging</code> — view stored logs</p>`
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.STUDY_GUIDE = STUDY_GUIDE;
  window.STUDY_GUIDE_EN = STUDY_GUIDE_EN;
}
