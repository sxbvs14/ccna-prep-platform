// ═══════════════════════════════════════════
// CCNA Interactive Lab Scenarios
// ═══════════════════════════════════════════

const LAB_SCENARIOS = [
  {
    id: 'lab-vlan-misconfig',
    title: 'Lab 1: VLAN Mal Configurada',
    difficulty: 'medium',
    domain: 'network_access',
    scenario: `<h3>🔧 Escenario: VLAN Mal Configurada</h3>
<p><strong>Topología:</strong> PC-A (VLAN 10) ↔ SW1 ↔ SW2 (Trunk) ↔ PC-B (VLAN 10)</p>
<p><strong>Problema:</strong> PC-A no puede hacer ping a PC-B. Ambas PCs están en la misma subred 192.168.10.0/24.</p>
<p><strong>Tu tarea:</strong> Usa la CLI simulada en SW1 y SW2 para diagnosticar por qué PC-A y PC-B no se comunican.</p>
<p><em>Tip: Revisa la configuración de VLANs en los puertos de acceso, el trunk, y las VLANs permitidas.</em></p>`,
    hosts: ['SW1', 'SW2'],
    initialHost: 'SW1',
    prompt: 'SW1#',
    commands: {
      'show vlan brief': {
        SW1: `VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gi0/1, Gi0/2, Gi0/3
10   DATA                             active    Gi0/5
20   VOICE                            active
1002 fddi-default                     act/unsup
1003 token-ring-default               act/unsup
1004 fddinet-default                  act/unsup
1005 trnet-default                    act/unsup`,
        SW2: `VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gi0/1, Gi0/2
10   DATA                             active
20   VOICE                            active    Gi0/5
1002 fddi-default                     act/unsup
1003 token-ring-default               act/unsup
1004 fddinet-default                  act/unsup
1005 trnet-default                    act/unsup`
      },
      'show interfaces trunk': {
        SW1: `Port        Mode             Encapsulation  Status        Native vlan
Gi0/3       on               802.1q         trunking      1

Port        Vlans allowed on trunk
Gi0/3       1-9,11-4094

Port        Vlans allowed and active in management domain
Gi0/3       1

Port        Vlans in spanning tree forwarding state and not pruned
Gi0/3       1`,
        SW2: `Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         trunking      1

Port        Vlans allowed on trunk
Gi0/1       1-4094

Port        Vlans allowed and active in management domain
Gi0/1       1,20

Port        Vlans in spanning tree forwarding state and not pruned
Gi0/1       1,20`
      },
      'show running-config interface gigabitEthernet 0/5': {
        SW1: `interface GigabitEthernet0/5
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast`,
        SW2: `interface GigabitEthernet0/5
 switchport mode access
 switchport access vlan 20
 spanning-tree portfast`
      },
      'show running-config interface gigabitEthernet 0/3': {
        SW1: `interface GigabitEthernet0/3
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 1-9,11-4094`,
        SW2: `interface GigabitEthernet0/1
 switchport trunk encapsulation dot1q
 switchport mode trunk`
      },
      'show interfaces status': {
        SW1: `Port      Name               Status       Vlan       Duplex  Speed Type
Gi0/1     Link to SW2-Gi0/1  connected    1          a-full  a-1000 10/100/1000BaseTX
Gi0/3     Trunk to SW2       connected    trunk      a-full  a-1000 10/100/1000BaseTX
Gi0/5     PC-A               connected    10         a-full   a-100 10/100/1000BaseTX`,
        SW2: `Port      Name               Status       Vlan       Duplex  Speed Type
Gi0/1     Trunk to SW1       connected    trunk      a-full  a-1000 10/100/1000BaseTX
Gi0/5     PC-B               connected    20         a-full   a-100 10/100/1000BaseTX`
      },
      'ping 192.168.10.2': {
        SW1: `Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.2, timeout is 2 seconds:
.....
Success rate is 0 percent (0/5)`,
        SW2: `Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.1, timeout is 2 seconds:
.....
Success rate is 0 percent (0/5)`
      }
    },
    question: '¿Cuál es la causa raíz del problema de conectividad entre PC-A y PC-B?',
    options: [
      'A. El trunk entre SW1 y SW2 está caído',
      'B. PC-B está en VLAN 20 en lugar de VLAN 10',
      'C. La VLAN 10 no está permitida en el trunk de SW1',
      'D. La VLAN 10 no existe en SW2'
    ],
    answer: 1,
    explanation: 'PC-B está configurada en el puerto Gi0/5 de SW2 como access VLAN 20, no VLAN 10. Aunque ambas PCs están en la misma subred IP, pertenecen a diferentes VLANs (PC-A en VLAN 10, PC-B en VLAN 20), por lo que no pueden comunicarse sin un router (inter-VLAN routing). Solución: cambiar SW2 Gi0/5 a `switchport access vlan 10`.',
    solvedCommand: 'switchport access vlan 10',
    solvedHost: 'SW2',
    solvedInterface: 'GigabitEthernet0/5'
  },
  {
    id: 'lab-acl-blocking',
    title: 'Lab 2: ACL Bloqueando Tráfico',
    difficulty: 'hard',
    domain: 'security_fundamentals',
    scenario: `<h3>🔒 Escenario: ACL Bloqueando Tráfico Web</h3>
<p><strong>Topología:</strong> PC (192.168.1.10) ↔ R1 ↔ Internet (Servidor Web: 203.0.113.80:80)</p>
<p><strong>Problema:</strong> La PC no puede acceder al servidor web en 203.0.113.80. Otros servicios (DNS, SSH) funcionan correctamente desde la PC.</p>
<p><strong>Tu tarea:</strong> Diagnostica por qué el tráfico HTTP/HTTPS está bloqueado usando comandos show en R1.</p>
<p><em>Tip: Revisa las ACLs aplicadas, presta atención a la dirección y máscara wildcard.</em></p>`,
    hosts: ['R1'],
    initialHost: 'R1',
    prompt: 'R1#',
    commands: {
      'show access-lists': {
        R1: `Extended IP access list BLOCK_WEB
    10 deny tcp 192.168.1.0 0.0.0.127 host 203.0.113.80 eq www (45 matches)
    20 deny tcp 192.168.1.0 0.0.0.127 host 203.0.113.80 eq 443 (12 matches)
    30 permit ip any any (892 matches)
Extended IP access list PROTECT_IN
    10 permit tcp any host 192.168.1.50 eq 22
    20 permit udp any host 192.168.1.50 eq 53
    30 deny ip any any log (34 matches)`
      },
      'show ip interface gigabitEthernet 0/1': {
        R1: `GigabitEthernet0/1 is up, line protocol is up
  Internet address is 192.168.1.1/24
  Broadcast address is 255.255.255.255
  Inbound access list is BLOCK_WEB
  Outgoing access list is not set
  ...`
      },
      'show running-config | include access-list|access-group': {
        R1: `access-list 150 deny tcp 192.168.1.0 0.0.0.127 host 203.0.113.80 eq www
access-list 150 deny tcp 192.168.1.0 0.0.0.127 host 203.0.113.80 eq 443
access-list 150 permit ip any any
 ip access-group BLOCK_WEB in`
      },
      'show ip route 203.0.113.80': {
        R1: `Routing entry for 203.0.113.0/24
  Known via "static", distance 1, metric 0
  Routing Descriptor Blocks:
  * 10.0.0.2
      Route metric is 0, traffic share count is 1`
      },
      'show ip interface brief': {
        R1: `Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0      10.0.0.1        YES manual up                    up
GigabitEthernet0/1      192.168.1.1     YES manual up                    up`
      }
    },
    question: '¿Por qué la PC (192.168.1.10) no puede acceder al servidor web en 203.0.113.80?',
    options: [
      'A. No hay ruta hacia 203.0.113.80',
      'B. La ACL BLOCK_WEB deniega tráfico TCP puerto 80 de la subred 192.168.1.0/25',
      'C. La interfaz GigabitEthernet0/1 está caída',
      'D. La ACL PROTECT_IN está bloqueando el tráfico'
    ],
    answer: 1,
    explanation: 'La ACL BLOCK_WEB está aplicada inbound en Gi0/1. La primera entrada deniega tráfico TCP de 192.168.1.0/25 (wildcard 0.0.0.127 = /25, que cubre 192.168.1.0 - 192.168.1.127) hacia 203.0.113.80:80. La PC (192.168.1.10) cae dentro de este rango. La ACL fue probablemente mal configurada — si la intención era bloquear solo un rango pequeño, la wildcard debería ser más restrictiva. Solución: remover o ajustar la ACL.',
    solvedCommand: 'no access-list 150',
    solvedHost: 'R1'
  },
  {
    id: 'lab-dhcp-issue',
    title: 'Lab 3: Falla en DHCP',
    difficulty: 'medium',
    domain: 'ip_services',
    scenario: `<h3>⚙️ Escenario: Cliente Sin Dirección IP</h3>
<p><strong>Topología:</strong> PC (Cliente DHCP) ↔ SW1 ↔ R1 (Servidor DHCP)</p>
<p><strong>Problema:</strong> La PC no recibe dirección IP por DHCP. La configuración manual funciona correctamente.</p>
<p><strong>Tu tarea:</strong> Investiga por qué el servidor DHCP en R1 no está respondiendo a las solicitudes.</p>
<p><em>Tip: Verifica la configuración del pool DHCP, el estado del servicio, y posibles exclusiones.</em></p>`,
    hosts: ['R1'],
    initialHost: 'R1',
    prompt: 'R1#',
    commands: {
      'show ip dhcp pool': {
        R1: `Pool LAN :
 Utilization mark (high/low)    : 100 / 0
 Subnet size (first/next)       : 0 / 0
 Total addresses                : 254
 Leased addresses               : 254
 Pending event                  : None

 1 subnet is currently in the pool :
 Current index        IP address range                    Leased addresses
 192.168.1.12         192.168.1.1      - 192.168.1.254    254`
      },
      'show ip dhcp binding': {
        R1: `Bindings from all pools not associated with VRF:
IP address      Client-ID/              Lease expiration        Type
                Hardware address/
                User name
192.168.1.1     0100.5079.6668.01       May 20 2026 09:00 AM    Automatic
192.168.1.2     0100.5079.6668.02       May 20 2026 08:45 AM    Automatic
192.168.1.3     0100.5079.6668.03       May 20 2026 08:30 AM    Automatic
... (254 bindings shown, pool exhausted)`
      },
      'show running-config | section dhcp': {
        R1: `ip dhcp excluded-address 192.168.1.1 192.168.1.10
ip dhcp pool LAN
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8
 lease 0 8`
      },
      'show ip dhcp conflict': {
        R1: `IP address        Detection method      Detection time          VRF
192.168.1.5       Gratuitous ARP         May 19 2026 03:00 PM
192.168.1.8       Ping                  May 19 2026 03:02 PM
192.168.1.15      Gratuitous ARP         May 19 2026 03:05 PM`
      },
      'show ip interface gigabitEthernet 0/1': {
        R1: `GigabitEthernet0/1 is up, line protocol is up
  Internet address is 192.168.1.1/24
  Broadcast address is 255.255.255.255
  ...`
      }
    },
    question: '¿Por qué la PC nueva no recibe dirección IP del servidor DHCP?',
    options: [
      'A. El servicio DHCP no está corriendo en R1',
      'B. El pool DHCP está agotado — todas las direcciones están asignadas',
      'C. La PC está en la VLAN incorrecta',
      'D. El default-router está mal configurado'
    ],
    answer: 1,
    explanation: 'El pool DHCP "LAN" está completamente agotado (254 de 254 direcciones arrendadas, utilization 100%). Solo hay 254 direcciones en el pool (192.168.1.1 a 192.168.1.254) y las primeras 10 están excluidas. El lease time es de solo 8 horas, pero todos los leases están activos. Soluciones: (1) Reducir el lease time, (2) Expandir el rango excluyendo menos direcciones, (3) Crear un nuevo pool con una subred más grande (ej. /23).',
    solvedCommand: 'ip dhcp pool LAN\n network 192.168.1.0 255.255.254.0',
    solvedHost: 'R1'
  },
  {
    id: 'lab-ospf-neighbor',
    title: 'Lab 4: Vecino OSPF No Se Establece',
    difficulty: 'hard',
    domain: 'ip_connectivity',
    scenario: `<h3>🔗 Escenario: Adyacencia OSPF Caída</h3>
<p><strong>Topología:</strong> R1 (Área 0) ---enlace serial--- R2 (Área 0)</p>
<p><strong>Problema:</strong> R1 y R2 no forman adyacencia OSPF. El enlace serial está físicamente up.</p>
<p><strong>Tu tarea:</strong> Diagnostica por qué los vecinos OSPF no se establecen. Revisa timers, áreas, autenticación, y tipos de red.</p>
<p><em>Tip: Compara las configuraciones OSPF de ambos lados del enlace punto a punto.</em></p>`,
    hosts: ['R1', 'R2'],
    initialHost: 'R1',
    prompt: 'R1#',
    commands: {
      'show ip ospf neighbor': {
        R1: `Neighbor ID     Pri   State           Dead Time   Address         Interface
(no neighbors found)`,
        R2: `Neighbor ID     Pri   State           Dead Time   Address         Interface
(no neighbors found)`
      },
      'show ip ospf interface serial 0/0/0': {
        R1: `Serial0/0/0 is up, line protocol is up
  Internet Address 10.0.0.1/30, Area 0
  Process ID 1, Router ID 1.1.1.1, Network Type POINT_TO_POINT, Cost: 64
  Transmit Delay is 1 sec, State POINT_TO_POINT
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:03
  ...`,
        R2: `Serial0/0/0 is up, line protocol is up
  Internet Address 10.0.0.2/30, Area 1
  Process ID 1, Router ID 2.2.2.2, Network Type NON_BROADCAST, Cost: 64
  Transmit Delay is 1 sec, State DR, Priority 1
  Designated Router (ID) 2.2.2.2, Interface address 10.0.0.2
  No backup designated router on this network
  Timer intervals configured, Hello 30, Dead 120, Wait 120, Retransmit 5
    Hello due in 00:00:18
  ...`
      },
      'show running-config | section ospf': {
        R1: `router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.0.0.3 area 0`,
        R2: `router ospf 1
 router-id 2.2.2.2
 network 10.0.0.0 0.0.0.3 area 1`
      },
      'show ip interface brief': {
        R1: `Interface              IP-Address      OK? Method Status                Protocol
Serial0/0/0             10.0.0.1        YES manual up                    up
GigabitEthernet0/0      192.168.1.1     YES manual up                    up`,
        R2: `Interface              IP-Address      OK? Method Status                Protocol
Serial0/0/0             10.0.0.2        YES manual up                    up
GigabitEthernet0/0      172.16.1.1      YES manual up                    up`
      },
      'show ip ospf': {
        R1: `Routing Process "ospf 1" with ID 1.1.1.1
 Supports only single TOS(TOS0) routes
 Area 0: Number of interfaces in this area is 1`,
        R2: `Routing Process "ospf 1" with ID 2.2.2.2
 Supports only single TOS(TOS0) routes
 Area 1: Number of interfaces in this area is 1`
      }
    },
    question: '¿Cuáles son los DOS problemas que previenen la adyacencia OSPF entre R1 y R2?',
    options: [
      'A. Los router IDs están duplicados y el costo no coincide',
      'B. Las áreas no coinciden (R1 Área 0, R2 Área 1) y los tipos de red/timers son diferentes',
      'C. La autenticación OSPF no está configurada y el MTU no coincide',
      'D. La subred IP no es /30 y los process IDs no coinciden'
    ],
    answer: 1,
    explanation: 'Dos problemas: (1) R1 está en Área 0 pero R2 está en Área 1 — para formar adyacencia, ambos extremos del enlace deben estar en la misma área OSPF. (2) R1 tiene el tipo de red POINT_TO_POINT (Hello 10s) mientras R2 tiene NON_BROADCAST (Hello 30s) — los timers de Hello y Dead deben coincidir. Solución: configurar ambos en la misma área y el mismo tipo de red.',
    solvedCommand: 'router ospf 1\n network 10.0.0.0 0.0.0.3 area 0\n!\ninterface s0/0/0\n ip ospf network point-to-point',
    solvedHost: 'R2'
  },
  {
    id: 'lab-port-security',
    title: 'Lab 5: Puerto en Err-Disable',
    difficulty: 'medium',
    domain: 'security_fundamentals',
    scenario: `<h3>🔒 Escenario: Puerto Deshabilitado por Port Security</h3>
<p><strong>Topología:</strong> PC → SW1 (Gi0/10)</p>
<p><strong>Problema:</strong> Un usuario reporta que su PC perdió conectividad después de que un compañero conectó su laptop al mismo puerto.</p>
<p><strong>Tu tarea:</strong> Diagnostica qué pasó con el puerto Gi0/10 y cómo restaurar la conectividad.</p>
<p><em>Tip: Revisa el estado del puerto, las violaciones de port security, y las MACs aprendidas.</em></p>`,
    hosts: ['SW1'],
    initialHost: 'SW1',
    prompt: 'SW1#',
    commands: {
      'show interfaces gigabitEthernet 0/10': {
        SW1: `GigabitEthernet0/10 is down, line protocol is down (err-disabled)
  Hardware is Gigabit Ethernet, address is 0050.7966.680a
  MTU 1500 bytes, BW 100000 Kbit/sec, DLY 100 usec,
     reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  ...`
      },
      'show port-security interface gigabitEthernet 0/10': {
        SW1: `Port Security              : Enabled
Port Status                : Secure-shutdown
Violation Mode             : Shutdown
Aging Time                 : 0 mins
Aging Type                 : Absolute
SecureStatic Address Aging : Disabled
Maximum MAC Addresses      : 1
Total MAC Addresses        : 1
Configured MAC Addresses   : 0
Sticky MAC Addresses       : 1
Last Source Address:Vlan   : 00:1A:2B:3C:4D:5F:10
Security Violation Count   : 1`
      },
      'show port-security address': {
        SW1: `          Secure Mac Address Table
-----------------------------------------------------------------
Vlan    Mac Address       Type                          Ports
----    -----------       ----                          -----
  10    00:50:79:66:68:01  SecureSticky                  Gi0/10
-----------------------------------------------------------------
Total Addresses in System: 1`
      },
      'show interfaces status | include Gi0/10': {
        SW1: `Gi0/10   User PC            err-disabled 10         auto   auto 10/100/1000BaseTX`
      },
      'show running-config interface gigabitEthernet 0/10': {
        SW1: `interface GigabitEthernet0/10
 switchport mode access
 switchport access vlan 10
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation shutdown
 spanning-tree portfast`
      }
    },
    question: '¿Qué causó que el puerto Gi0/10 entrara en estado err-disable y cómo se restaura?',
    options: [
      'A. El puerto fue administrativamente apagado; usar "no shutdown"',
      'B. Se detectó una violación de port security (MAC diferente a la sticky); requiere shutdown + no shutdown',
      'C. El cable está defectuoso; reemplazar el cable',
      'D. STP bloqueó el puerto; configurar PortFast'
    ],
    answer: 1,
    explanation: 'Port Security con violación modo "shutdown" detectó una MAC diferente (00:1A:2B:3C:4D:5F) a la MAC sticky original (00:50:79:66:68:01) cuando otro usuario conectó su laptop. Esto disparó la violación y puso el puerto en err-disable. Solución: `shutdown` + `no shutdown` en la interfaz para restaurar, o `errdisable recovery cause psecure-violation` para autorecuperación.',
    solvedCommand: 'interface Gi0/10\n shutdown\n no shutdown',
    solvedHost: 'SW1'
  },
  {
    id: 'lab-nat-misconfig',
    title: 'Lab 6: NAT Sin Traducción',
    difficulty: 'hard',
    domain: 'ip_connectivity',
    scenario: `<h3>🔄 Escenario: Hosts Sin Acceso a Internet por NAT</h3>
<p><strong>Topología:</strong> PCs (192.168.1.0/24) ↔ SW1 ↔ R1 (NAT) ↔ ISP (203.0.113.0/30)</p>
<p><strong>Problema:</strong> Los hosts de la LAN no pueden acceder a Internet. El enlace al ISP está up.</p>
<p><strong>Tu tarea:</strong> Diagnosticá por qué NAT no está funcionando. Revisá interfaces inside/outside, ACLs de NAT, y el estado de las traducciones.</p>
<p><em>Tip: Verificá qué interfaz está configurada como inside y cuál como outside, y si la ACL de NAT es correcta.</em></p>`,
    hosts: ['R1'],
    initialHost: 'R1',
    prompt: 'R1#',
    commands: {
      'show ip nat translations': {
        R1: `(no translations found)`
      },
      'show ip nat statistics': {
        R1: `Total translations: 0 (0 static, 0 dynamic, 0 extended)
Outside interfaces: GigabitEthernet0/0
Inside interfaces: GigabitEthernet0/0
Hits: 0  Misses: 342
Expired translations: 0
Dynamic mappings:
-- Inside Source
access-list 10 pool NAT-POOL refcount 0
 pool NAT-POOL: netmask 255.255.255.0
    start 203.0.113.10 end 203.0.113.20
    type generic, total addresses 11, allocated 0 (0%), misses 0`
      },
      'show ip interface gigabitEthernet 0/0': {
        R1: `GigabitEthernet0/0 is up, line protocol is up
  Internet address is 203.0.113.2/30
  Broadcast address is 255.255.255.255
  ...`
      },
      'show ip interface gigabitEthernet 0/1': {
        R1: `GigabitEthernet0/1 is up, line protocol is up
  Internet address is 192.168.1.1/24
  Broadcast address is 255.255.255.255
  ...`
      },
      'show access-list 10': {
        R1: `Standard IP access list 10
    10 permit 192.168.2.0, wildcard bits 0.0.0.255 (0 matches)
    20 permit 192.168.3.0, wildcard bits 0.0.0.255 (0 matches)`
      },
      'show running-config | include nat|interface|ip nat': {
        R1: `interface GigabitEthernet0/0
 ip address 203.0.113.2 255.255.255.252
 ip nat outside
interface GigabitEthernet0/1
 ip address 192.168.1.1 255.255.255.0
ip nat pool NAT-POOL 203.0.113.10 203.0.113.20 netmask 255.255.255.0
ip nat inside source list 10 pool NAT-POOL`
      },
      'ping 8.8.8.8 source 192.168.1.1': {
        R1: `Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 8.8.8.8, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5)`
      }
    },
    question: '¿Por qué los hosts de la LAN 192.168.1.0/24 no pueden acceder a Internet a través de NAT?',
    options: [
      'A. La interfaz Gi0/0 tiene ip nat outside pero debería tener ip nat inside',
      'B. No hay ruta hacia Internet',
      'C. La ACL 10 solo permite 192.168.2.0/24 y 192.168.3.0/24 — no incluye 192.168.1.0/24',
      'D. El pool NAT-POOL está agotado'
    ],
    answer: 2,
    explanation: 'La ACL 10 usada para NAT solo tiene entradas para 192.168.2.0/24 y 192.168.3.0/24, pero la LAN real usa 192.168.1.0/24. Por eso no hay traducciones (0 translations). Solución: agregar `access-list 10 permit 192.168.1.0 0.0.0.255` o cambiar a PAT con `ip nat inside source list 10 interface Gi0/0 overload`.',
    solvedCommand: 'access-list 10 permit 192.168.1.0 0.0.0.255',
    solvedHost: 'R1'
  },
  {
    id: 'lab-stp-root',
    title: 'Lab 7: STP — Root Bridge Subóptimo',
    difficulty: 'hard',
    domain: 'network_access',
    scenario: `<h3>🌲 Escenario: Tráfico Toma Ruta Subóptima por STP</h3>
<p><strong>Topología:</strong> SW-Core ↔ SW-Dist1 ↔ SW-Dist2 ↔ SW-Access (triángulo con enlaces redundantes)</p>
<p><strong>Problema:</strong> El tráfico entre SW-Access y SW-Core está tomando una ruta de 3 saltos en vez de 1 salto directo. La latencia es alta.</p>
<p><strong>Tu tarea:</strong> Diagnosticá por qué STP está bloqueando el enlace directo y cómo forzar la topología correcta.</p>
<p><em>Tip: Revisá quién es el Root Bridge, el costo de los enlaces, y los roles de puerto.</em></p>`,
    hosts: ['SW-Core', 'SW-Dist1', 'SW-Access'],
    initialHost: 'SW-Core',
    prompt: 'SW-Core#',
    commands: {
      'show spanning-tree root': {
        'SW-Core': `                                        Root Hello Max Fwd
Vlan                   Root ID          Cost    Time  Age Dly  Root Port
---------------- -------------------- --------- ----- --- ---  ------------
VLAN0001         32769 00d0.baa3.8e00        0    2    20  15
VLAN0010         32778 00d0.baa3.8e00        0    2    20  15`,
        'SW-Dist1': `                                        Root Hello Max Fwd
Vlan                   Root ID          Cost    Time  Age Dly  Root Port
---------------- -------------------- --------- ----- --- ---  ------------
VLAN0001         32769 00d0.baa3.8e00        4    2    20  15  Gi0/1
VLAN0010         32778 00d0.baa3.8e00        4    2    20  15  Gi0/1`,
        'SW-Access': `                                        Root Hello Max Fwd
Vlan                   Root ID          Cost    Time  Age Dly  Root Port
---------------- -------------------- --------- ----- --- ---  ------------
VLAN0001         32769 00d0.baa3.8e00       12    2    20  15  Gi0/2
VLAN0010         32778 00d0.baa3.8e00       12    2    20  15  Gi0/2`
      },
      'show spanning-tree vlan 10': {
        'SW-Core': `VLAN0010
  Spanning tree enabled protocol ieee
  Root ID    Priority    32778
             Address     00d0.baa3.8e00
             This bridge is the root
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)
             Address     00d0.baa3.8e00
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec

Interface           Role Sts   Cost      Prio Type
------------------- ---- --- --------- ---- ------------------------
Gi0/1               Desg FWD   4         128  P2p
Gi0/2               Desg FWD   100       128  P2p`,
        'SW-Access': `VLAN0010
  Root ID    Priority    32778
             Address     00d0.baa3.8e00
             Cost        12
             Port        3 (GigabitEthernet0/2)

  Bridge ID  Priority    32778
             Address     00e0.b048.1c00

Interface           Role Sts   Cost      Prio Type
------------------- ---- --- --------- ---- ------------------------
Gi0/1               Altn BLK   4         128  P2p
Gi0/2               Root FWD   4         128  P2p`
      },
      'show interfaces status': {
        'SW-Core': `Port      Name               Status       Vlan       Duplex  Speed Type
Gi0/1     Link to SW-Access   connected    trunk      a-full  a-1000
Gi0/2     Link to SW-Dist1    connected    trunk      a-full   a-100`,
        'SW-Access': `Port      Name               Status       Vlan       Duplex  Speed Type
Gi0/1     Link to SW-Core     connected    trunk      a-full  a-1000
Gi0/2     Link to SW-Dist2    connected    trunk      a-full  a-1000`
      }
    },
    question: '¿Por qué el enlace directo Gi0/1 entre SW-Access y SW-Core está bloqueado (Role: Altn, Status: BLK) y cómo se soluciona?',
    options: [
      'A. El enlace Gi0/1 tiene un costo STP de 100 mientras Gi0/2 tiene costo 4, haciendo que STP prefiera Gi0/2. Solución: cambiar el costo del enlace directo.',
      'B. El Root Bridge está mal configurado; no se puede solucionar',
      'C. BPDU Guard bloqueó el puerto; deshabilitar BPDU Guard',
      'D. La VLAN 10 no está permitida en el trunk Gi0/1'
    ],
    answer: 0,
    explanation: 'STP elige la ruta de menor costo al Root Bridge. SW-Access ve dos caminos a SW-Core (el Root): directo por Gi0/1 con costo 100, o vía SW-Dist1→SW-Dist2 por Gi0/2 con costo 4+4+4=12. STP prefiere la ruta de costo 12 (!) y bloquea Gi0/1. Esto es porque Gi0/1 en SW-Access está conectado a Gi0/2 en SW-Core que opera a 100 Mbps (costo 100 en STP clásico con ref 100 Mbps), mientras que los enlaces entre switches de distribución operan a 1 Gbps (costo 4). Solución: `spanning-tree vlan 10 cost 3` en Gi0/1 o `spanning-tree vlan 10 port-priority 64` para forzar el camino directo.',
    solvedCommand: 'interface Gi0/1\n spanning-tree vlan 10 cost 3',
    solvedHost: 'SW-Access'
  }
];

if (typeof window !== 'undefined') {
  window.LAB_SCENARIOS = LAB_SCENARIOS;
}
