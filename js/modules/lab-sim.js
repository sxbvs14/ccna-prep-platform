// ═══════════════════════════════════════════
// Lab Simulator — FPGA-level Cisco IOS CLI Simulator
// ═══════════════════════════════════════════
// - Full mode system: User EXEC, Priv EXEC, Global Config, Interface, VLAN, Line
// - Realistic prompts that change dynamically
// - Context-sensitive command availability
// - Tab-completion via ? command
// - Robust input handling (no cloneNode hell)
// ═══════════════════════════════════════════

const IOS_MODE = {
  USER_EXEC: 'user',     // Router>
  PRIV_EXEC: 'priv',     // Router#
  GLOBAL_CONFIG: 'gconf', // Router(config)#
  INTERFACE: 'if',       // Router(config-if)#
  VLAN: 'vlan',          // Router(config-vlan)#
  LINE: 'line',          // Router(config-line)#
  ROUTER: 'router',      // Router(config-router)#
};

const LabSim = {
  currentLab: null,
  currentHost: null,
  mode: IOS_MODE.USER_EXEC,
  modeStack: [],         // multi-level config mode stack
  outputLines: [],
  selectedAnswer: null,
  solved: false,
  inputReady: false,

  loadLab(labId) {
    this.currentLab = LAB_SCENARIOS.find(l => l.id === labId);
    if (!this.currentLab) return;

    this.currentHost = this.currentLab.initialHost;
    this.mode = IOS_MODE.PRIV_EXEC; // start in privileged EXEC
    this.modeStack = [];
    this.outputLines = [];
    this.selectedAnswer = null;
    this.solved = false;

    this.render();
    this.ensureInputListener();
  },

  getHostname() {
    return this.currentHost || 'Router';
  },

  getPrompt() {
    const host = this.getHostname();
    switch (this.mode) {
      case IOS_MODE.USER_EXEC:
        return `${host}>`;
      case IOS_MODE.PRIV_EXEC:
        return `${host}#`;
      case IOS_MODE.GLOBAL_CONFIG:
        return `${host}(config)#`;
      case IOS_MODE.INTERFACE:
        return `${host}(config-if)#`;
      case IOS_MODE.VLAN:
        return `${host}(config-vlan)#`;
      case IOS_MODE.LINE:
        return `${host}(config-line)#`;
      case IOS_MODE.ROUTER:
        return `${host}(config-router)#`;
      default:
        return `${host}#`;
    }
  },

  setMode(newMode) {
    this.mode = newMode;
    this.updatePromptUI();
  },

  pushMode(newMode) {
    this.modeStack.push(this.mode);
    this.setMode(newMode);
  },

  popMode() {
    if (this.modeStack.length > 0) {
      this.setMode(this.modeStack.pop());
    } else {
      this.setMode(IOS_MODE.PRIV_EXEC);
    }
  },

  updatePromptUI() {
    const promptEl = document.getElementById('labPrompt');
    const titleEl = document.getElementById('labTermTitle');
    if (promptEl) promptEl.textContent = this.getPrompt();
    if (titleEl) titleEl.textContent = `${this.getHostname()}> enable`;
  },

  render() {
    const lab = this.currentLab;
    if (!lab) return;

    // Scenario + question area
    document.getElementById('labScenario').innerHTML = `
      ${Lang.labScenario(lab)}
      <div class="lab-question" id="labQuestionArea">
        <h4 style="color:var(--accent-light);margin-bottom:10px">🔍 ${Lang.t('labsQuestionLabel')}</h4>
        <p style="margin-bottom:12px">${Lang.labQuestion(lab)}</p>
        <ul class="option-list" id="labOptions">
          ${Lang.labOptions(lab).map((opt, i) => `
            <li class="option-item" data-oi="${i}">
              <div class="option-marker">${String.fromCharCode(65 + i)}</div>
              <span>${opt}</span>
            </li>
          `).join('')}
        </ul>
        <div id="labAnswerFeedback" class="hidden mt-2"></div>
      </div>
    `;

    // Lab selector
    const selector = document.getElementById('labSelector');
    if (selector) {
      const currentVal = lab.id;
      // Only rebuild if empty or different count
      if (selector.options.length !== LAB_SCENARIOS.length) {
        selector.innerHTML = LAB_SCENARIOS.map(l =>
          `<option value="${l.id}">${Lang.isEn() ? (l.titleEn || l.title) : l.title}</option>`
        ).join('');
      }
      selector.value = currentVal;
      selector.onchange = null; // remove old
      selector.addEventListener('change', (e) => {
        this.loadLab(e.target.value);
      });
    }

    // Terminal header
    this.updatePromptUI();

    // Boot banner
    this.outputLines = [
      ``,
      `<span class="highlight">╔══════════════════════════════════════╗</span>`,
      `<span class="highlight">║   Cisco IOS Simulator — CCNA Lab    ║</span>`,
      `<span class="highlight">║   Type <strong>?</strong> for available commands    ║</span>`,
      `<span class="highlight">║   Type <strong>host</strong> &lt;name&gt; to switch device ║</span>`,
      `<span class="highlight">╚══════════════════════════════════════╝</span>`,
      ``
    ];
    this.updateOutput();

    // Option click handlers
    document.querySelectorAll('#labOptions .option-item').forEach(item => {
      item.addEventListener('click', () => {
        if (this.solved) return;
        this.selectedAnswer = parseInt(item.dataset.oi);
        this.checkAnswer();
      });
    });

    // Ensure input listener is alive
    this.ensureInputListener();
  },

  // ── Core command execution ──

  executeCommand(rawCmd) {
    if (!this.currentLab) return;

    const cmd = rawCmd.trim();
    if (!cmd) return;

    const lab = this.currentLab;
    const host = this.getHostname();
    const prompt = this.getPrompt();

    // Echo the command to output
    this.outputLines.push(`<span class="prompt">${prompt}</span> <span class="cmd">${cmd}</span>`);

    const lower = cmd.toLowerCase();

    // ── Built-in commands (available in all modes) ──

    // Help
    if (lower === '?' || lower === 'help') {
      this.showHelp();
      this.updateOutput();
      return;
    }

    // Clear
    if (lower === 'clear' || lower === 'cls') {
      this.outputLines = [`<span class="highlight">${Lang.t('labsTermCleared')}</span>`];
      this.updateOutput();
      return;
    }

    // Host switch
    if (lower.startsWith('host ')) {
      const target = cmd.split(' ')[1].toUpperCase();
      if (lab.hosts.includes(target)) {
        this.currentHost = target;
        this.mode = IOS_MODE.PRIV_EXEC;
        this.modeStack = [];
        this.outputLines.push(`<span class="highlight">${Lang.t('labsConnected')} ${target}]</span>`);
        this.updatePromptUI();
      } else {
        this.outputLines.push(`<span class="error">% ${Lang.t('labsUnknownHost')} ${target}. ${Lang.t('labsAvailableHosts')}: ${lab.hosts.join(', ')}</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── Mode-specific built-in commands ──

    // enable (user → priv)
    if (lower === 'enable' || lower === 'en') {
      if (this.mode === IOS_MODE.USER_EXEC) {
        this.setMode(IOS_MODE.PRIV_EXEC);
        this.outputLines.push(``);
      } else {
        this.outputLines.push(`<span class="error">% Already in privileged mode</span>`);
      }
      this.updateOutput();
      return;
    }

    // disable (priv → user)
    if (lower === 'disable') {
      if (this.mode === IOS_MODE.PRIV_EXEC) {
        this.setMode(IOS_MODE.USER_EXEC);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // configure terminal (priv → global config)
    if (lower === 'configure terminal' || lower === 'conf t' || lower === 'config t') {
      if (this.mode === IOS_MODE.PRIV_EXEC) {
        this.pushMode(IOS_MODE.GLOBAL_CONFIG);
        this.outputLines.push(`<span class="highlight">Enter configuration commands, one per line.  End with CNTL/Z.</span>`);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // interface (global config → interface)
    if (lower.startsWith('interface ') || lower.startsWith('int ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG || this.mode === IOS_MODE.INTERFACE) {
        // Extract interface name for response
        const ifName = cmd.substring(cmd.indexOf(' ') + 1).trim();
        this.pushMode(IOS_MODE.INTERFACE);
        this.outputLines.push(``);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // vlan (global config → vlan)
    if (lower.startsWith('vlan ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
        const vlanNum = cmd.split(' ')[1];
        this.pushMode(IOS_MODE.VLAN);
        this.outputLines.push(`<span class="highlight">% Creating VLAN ${vlanNum}...</span>`);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // line (global config → line)
    if (lower.startsWith('line ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
        this.pushMode(IOS_MODE.LINE);
        this.outputLines.push(``);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // router ospf / router eigrp (global config → router)
    if (lower.startsWith('router ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
        this.pushMode(IOS_MODE.ROUTER);
        const proto = cmd.substring(7).trim();
        this.outputLines.push(`<span class="highlight">% Entering ${proto.toUpperCase()} configuration mode.</span>`);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // exit (go back one mode level)
    if (lower === 'exit') {
      if (this.mode === IOS_MODE.USER_EXEC) {
        this.outputLines.push(`<span class="error">% Connection closed by foreign host.</span>`);
      } else if (this.mode === IOS_MODE.GLOBAL_CONFIG && this.modeStack.length <= 1) {
        this.popMode();
        this.outputLines.push(`<span class="highlight">% Exiting configuration mode.</span>`);
      } else if (this.modeStack.length > 0) {
        this.popMode();
      } else {
        this.setMode(IOS_MODE.USER_EXEC);
      }
      this.updateOutput();
      return;
    }

    // end / Ctrl-Z (back to priv exec from any config mode)
    if (lower === 'end' || lower === 'ctrl+z' || lower === '^z') {
      if (this.mode !== IOS_MODE.USER_EXEC && this.mode !== IOS_MODE.PRIV_EXEC) {
        this.modeStack = [];
        this.setMode(IOS_MODE.PRIV_EXEC);
        this.outputLines.push(`<span class="highlight">%SYS-5-CONFIG_I: Configured from console by console</span>`);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── Show commands (available in user and priv exec) ──
    if (lower.startsWith('show ') || lower.startsWith('sh ')) {
      this.handleShowCommand(cmd, lower);
      return;
    }

    // ── ping (available in user and priv exec) ──
    if (lower.startsWith('ping') || lower.startsWith('ping ')) {
      this.handlePing(cmd, lower);
      return;
    }

    // ── traceroute (available in user and priv exec) ──
    if (lower.startsWith('traceroute') || lower.startsWith('tracert') || lower.startsWith('trace ')) {
      this.handleTraceroute(cmd, lower);
      return;
    }

    // ── write memory / copy running-config startup-config ──
    if (lower === 'write memory' || lower === 'wr' || lower === 'copy running-config startup-config' || lower === 'copy run start') {
      if (this.mode === IOS_MODE.PRIV_EXEC) {
        this.outputLines.push(`<span class="highlight">Building configuration...</span>`);
        this.outputLines.push(`<span class="highlight">[OK]</span>`);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── reload ──
    if (lower === 'reload') {
      if (this.mode === IOS_MODE.PRIV_EXEC) {
        this.outputLines.push(`<span class="highlight">System configuration has been modified. Save? [yes/no]: yes</span>`);
        this.outputLines.push(`<span class="highlight">Proceed with reload? [confirm]</span>`);
        this.outputLines.push(``);
        this.outputLines.push(`<span class="error">% Reload in progress...</span>`);
        // Reload resets to user exec
        setTimeout(() => {
          this.mode = IOS_MODE.USER_EXEC;
          this.modeStack = [];
          this.outputLines = [
            `<span class="highlight">Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.2(7)E</span>`,
            `<span class="highlight">System restarted --</span>`,
            ``
          ];
          this.updatePromptUI();
          this.updateOutput();
        }, 800);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── no shutdown / shutdown ──
    if (lower === 'no shutdown' || lower === 'no shut') {
      if (this.mode === IOS_MODE.INTERFACE) {
        this.outputLines.push(`<span class="highlight">%LINK-5-CHANGED: Interface is up, line protocol is up</span>`);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    if (lower === 'shutdown' || lower === 'shut') {
      if (this.mode === IOS_MODE.INTERFACE) {
        this.outputLines.push(`<span class="highlight">%LINK-5-CHANGED: Interface is down, line protocol is down</span>`);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── ip address (interface config) ──
    if (lower.startsWith('ip address ')) {
      if (this.mode === IOS_MODE.INTERFACE) {
        this.outputLines.push(``);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── switchport commands (interface config) ──
    if (lower.startsWith('switchport')) {
      if (this.mode === IOS_MODE.INTERFACE) {
        this.outputLines.push(``);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── ip route (global config) ──
    if (lower.startsWith('ip route ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
        this.outputLines.push(``);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── hostname (global config) ──
    if (lower.startsWith('hostname ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
        const newName = cmd.substring(9).trim().toUpperCase();
        this.currentHost = newName;
        this.updatePromptUI();
        this.outputLines.push(`<span class="highlight">% Hostname changed to ${newName}</span>`);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── network (router config mode) ──
    if (lower.startsWith('network ')) {
      if (this.mode === IOS_MODE.ROUTER) {
        this.outputLines.push(``);
      } else {
        this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
      }
      this.updateOutput();
      return;
    }

    // ── Lab-specific commands ──
    // Check all defined command patterns against the full command
    let matched = false;
    for (const [pattern, outputs] of Object.entries(lab.commands)) {
      if (lower.startsWith(pattern) && this.mode !== IOS_MODE.USER_EXEC) {
        const output = outputs[this.currentHost];
        if (output) {
          output.split('\n').forEach(line => {
            if (line.startsWith('% ') || line.includes('Error') || line.includes('Invalid')) {
              this.outputLines.push(`<span class="error">${line}</span>`);
            } else {
              this.outputLines.push(line);
            }
          });
        } else {
          this.outputLines.push(`<span class="error">% Command not available on ${this.currentHost}</span>`);
        }
        matched = true;
        break;
      }
    }

    // Fallback: try the command as a lab command regardless of mode
    if (!matched) {
      for (const [pattern, outputs] of Object.entries(lab.commands)) {
        if (lower.startsWith(pattern)) {
          const output = outputs[this.currentHost];
          if (output) {
            output.split('\n').forEach(line => {
              if (line.startsWith('% ') || line.includes('Error') || line.includes('Invalid')) {
                this.outputLines.push(`<span class="error">${line}</span>`);
              } else {
                this.outputLines.push(line);
              }
            });
          }
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      this.outputLines.push(`<span class="error">${Lang.t('labsInvalidCmd')}</span>`);
    }

    this.updateOutput();
  },

  // ── Show command handler ──

  handleShowCommand(cmd, lower) {
    const lab = this.currentLab;

    // First check lab-specific show commands
    for (const [pattern, outputs] of Object.entries(lab.commands)) {
      if (lower.startsWith(pattern)) {
        const output = outputs[this.currentHost];
        if (output) {
          output.split('\n').forEach(line => {
            if (line.startsWith('% ') || line.includes('Error') || line.includes('Invalid')) {
              this.outputLines.push(`<span class="error">${line}</span>`);
            } else {
              this.outputLines.push(line);
            }
          });
        } else {
          this.outputLines.push(`<span class="error">% Command not available on ${this.currentHost}</span>`);
        }
        this.updateOutput();
        return;
      }
    }

    // Generic show commands that always work
    const showMap = {
      'show version': `Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.2(7)E
Copyright (c) 1986-2024 by Cisco Systems, Inc.
ROM: Bootstrap program is C2960 boot loader
${this.getHostname()} uptime is 0 days, 2 hours, 34 minutes
System image file is "flash:c2960-lanbasek9-mz.152-7.E.bin"`,

      'show clock': `*14:28:22.735 UTC Mon May 25 2026`,

      'show running-config': `Building configuration...
Current configuration : 1853 bytes
!
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
!
hostname ${this.getHostname()}
!
interface GigabitEthernet0/0
 ip address dhcp
 duplex auto
 speed auto
!
interface GigabitEthernet0/1
 no ip address
 duplex auto
 speed auto
!
end`,

      'show startup-config': `startup-config is not present`,

      'show ip interface brief': `Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0      unassigned      YES unset  up                    up
GigabitEthernet0/1      unassigned      YES unset  up                    up
Vlan1                   unassigned      YES unset  up                    up`,

      'show interfaces': `GigabitEthernet0/0 is up, line protocol is up
  Hardware is Gigabit Ethernet, address is 0050.7966.6800
  Internet address is unassigned
  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec,
     reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  Full-duplex, 1000Mb/s, media type is RJ-45
  input errors 0, CRC 0, frame 0, overrun 0, ignored 0
  output errors 0, collisions 0, interface resets 0`,

      'show interfaces status': `Port      Name               Status       Vlan       Duplex  Speed Type
Gi0/0     Management          connected    1          a-full  a-1000 10/100/1000BaseTX
Gi0/1     --                  notconnect   1          auto    auto   10/100/1000BaseTX`,

      'show mac address-table': `          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0050.7966.6800    DYNAMIC     Gi0/0
   1    0050.7966.6801    DYNAMIC     Gi0/0
Total Mac Addresses: 2`,

      'show cdp neighbors': `Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone,
                  D - Remote, C - CVTA, M - Two-port Mac Relay

Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID
${this.getHostname() === 'SW1' ? 'SW2' : 'SW1'}
                 ${this.getHostname() === 'SW1' ? 'Gi0/3' : 'Gi0/1'}
                                 150              S     CISCO     ${this.getHostname() === 'SW1' ? 'Gi0/1' : 'Gi0/3'}`,

      'show cdp neighbors detail': `--------------------------
Device ID: ${this.getHostname() === 'SW1' ? 'SW2' : 'SW1'}
Entry address(es):
  IP address: 10.0.0.${this.getHostname() === 'SW1' ? '2' : '1'}
Platform: cisco CISCO,  Capabilities: Switch
Interface: ${this.getHostname() === 'SW1' ? 'GigabitEthernet0/3' : 'GigabitEthernet0/1'}
Port ID (outgoing port): ${this.getHostname() === 'SW1' ? 'GigabitEthernet0/1' : 'GigabitEthernet0/3'}
Holdtime : 150 sec

Version :
Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.2(7)E`,

      'show lldp neighbors': `Capability codes:
    (R) Router, (B) Bridge, (T) Telephone, (C) COAX, (S) Satellite,
    (P) Repeater, (H) Host

Device ID           Local Intf     Hold-time  Capability  Port ID
Total entries displayed: 0`,

      'show vlan brief': `VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gi0/0, Gi0/1, Gi0/2, Gi0/3
10   DATA                             active    
20   VOICE                            active    
1002 fddi-default                     act/unsup
1003 token-ring-default               act/unsup
1004 fddinet-default                  act/unsup
1005 trnet-default                    act/unsup`,

      'show interfaces trunk': `Port        Mode         Encapsulation  Status        Native vlan
Gi0/3       on           802.1q         trunking      1

Port        Vlans allowed on trunk
Gi0/3       1-4094

Port        Vlans allowed and active in management domain
Gi0/3       1

Port        Vlans in spanning tree forwarding state and not pruned
Gi0/3       1`,

      'show spanning-tree': `VLAN0001
  Spanning tree enabled protocol ieee
  Root ID    Priority    32769
             Address     0050.7966.6800
             This bridge is the root
  Bridge ID  Priority    32769  (priority 32768 sys-id-ext 1)
             Address     0050.7966.6800
  Aging Time 300 sec

Interface           Role Sts   Cost      Prio Type
------------------- ---- --- --------- ---- --------------------------------
Gi0/0               Desg FWD   4         128  P2p
Gi0/1               Desg FWD   4         128  P2p`,

      'show spanning-tree root': `                                        Root Hello Max Fwd
Vlan                   Root ID          Cost    Time  Age Dly  Root Port
---------------- -------------------- --------- ----- --- ---  ------------
VLAN0001         32769 0050.7966.6800        0    2    20  15`,

      'show ip route': `Codes: C - connected, S - static, O - OSPF, IA - OSPF inter area
       E1 - OSPF external type 1, E2 - OSPF external type 2

Gateway of last resort is not set

C    192.168.1.0/24 is directly connected, GigabitEthernet0/0
     192.168.1.1/32 is directly connected, GigabitEthernet0/0`,

      'show ip ospf neighbor': `Neighbor ID     Pri   State           Dead Time   Address         Interface
(no neighbors found)`,

      'show ip ospf interface': `GigabitEthernet0/0 is up, line protocol is up
  Internet Address 192.168.1.1/24, Area 0
  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State DR, Priority 1
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5`,

      'show ip arp': `Protocol  Address          Age (min)  Hardware Addr   Type   Interface
Internet  192.168.1.1             -   0050.7966.6800  ARPA   GigabitEthernet0/0
Internet  192.168.1.10            5   0050.7966.680a  ARPA   GigabitEthernet0/0`,

      'show ip int brief': `Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0      192.168.1.1     YES manual up                    up
GigabitEthernet0/1      unassigned      YES unset  up                    up`,

      'show port-security': `Secure Port  MaxSecureAddr  CurrentAddr  SecurityViolation  Security Action
                (Count)       (Count)          (Count)
   Gi0/10              1            1                 0         Shutdown
----------------------------------------------------------------------
Total Addresses in System: 1
Max Addresses limit in System: 1024`,

      'show flash': `Directory of flash:/

 1  -rw-     4670455   <no date>  c2960-lanbasek9-mz.152-7.E.bin
 2  -rw-       29541   <no date>  config.text

163145728 bytes total (158447232 bytes free)`,

      'show ip dhcp binding': `Bindings from all pools not associated with VRF:
IP address      Client-ID/              Lease expiration        Type
                Hardware address/
                User name
192.168.1.2     0100.5079.6668.0a       May 26 2026 02:00 PM    Automatic
192.168.1.3     0100.5079.6668.0b       May 26 2026 02:15 PM    Automatic`,

      'show ip dhcp pool': `Pool LAN :
 Utilization mark (high/low)    : 100 / 0
 Subnet size (first/next)       : 0 / 0
 Total addresses                : 254
 Leased addresses               : 2
 Pending event                  : None
 1 subnet is currently in the pool :
 Current index        IP address range                    Leased addresses
 192.168.1.4          192.168.1.1      - 192.168.1.254    2`,

      'show ip nat translations': `Pro Inside global      Inside local       Outside local      Outside global
--- 203.0.113.10       192.168.1.10       ---                ---`,

      'show ip nat statistics': `Total translations: 1 (0 static, 1 dynamic, 0 extended)
Outside interfaces: GigabitEthernet0/0
Inside interfaces: GigabitEthernet0/1
Hits: 342  Misses: 0
Expired translations: 0`,

      'show access-lists': `Standard IP access list 1
    10 permit 192.168.1.0, wildcard bits 0.0.0.255 (42 matches)
    20 deny any (3 matches)`,

      'show logging': `Syslog logging: enabled (0 messages dropped, 0 flushes)
    Console logging: level debugging, 0 messages logged
    Monitor logging: level debugging, 0 messages logged
    Buffer logging: level debugging, 0 messages logged
    Trap logging: level informational, 0 message lines logged
Log Buffer (4096 bytes):
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up`,

      'show processes cpu': `CPU utilization for five seconds: 2%/0%; one minute: 3%; five minutes: 3%
 PID Runtime(ms)  Invoked      uSecs   5Sec   1Min   5Min  TTY Process
   1           0         1          0  0.00%  0.00%  0.00%   0 Chunk Manager
   2         324     32865          9  0.00%  0.00%  0.00%   0 Load Meter`,
    };

    // Try generic show command
    let matched = false;
    for (const [pattern, output] of Object.entries(showMap)) {
      if (lower.startsWith(pattern)) {
        output.split('\n').forEach(line => {
          this.outputLines.push(line);
        });
        matched = true;
        break;
      }
    }

    if (!matched) {
      this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
    }
    this.updateOutput();
  },

  // ── Ping handler ──

  handlePing(cmd, lower) {
    const parts = cmd.split(' ');
    const target = parts[1] || 'unknown';

    if (this.mode === IOS_MODE.USER_EXEC && lower === 'ping') {
      // Extended ping in user exec = switch to extended mode
      this.outputLines.push(`<span class="highlight">Protocol [ip]:</span>`);
      // In a real sim we'd handle this interactively; for now show result
    }

    // Check if the lab has a custom ping response
    const lab = this.currentLab;
    for (const [pattern, outputs] of Object.entries(lab.commands)) {
      if (lower.startsWith(pattern) && outputs[this.currentHost]) {
        outputs[this.currentHost].split('\n').forEach(line => {
          if (line.startsWith('% ') || line.includes('Error') || line.includes('Invalid')) {
            this.outputLines.push(`<span class="error">${line}</span>`);
          } else {
            this.outputLines.push(line);
          }
        });
        this.updateOutput();
        return;
      }
    }

    // Generic ping response
    if (target === 'unknown') {
      this.outputLines.push(`<span class="error">% Incomplete command.</span>`);
    } else {
      this.outputLines.push(`Type escape sequence to abort.`);
      this.outputLines.push(`Sending 5, 100-byte ICMP Echos to ${target}, timeout is 2 seconds:`);
      if (lower.includes('.')) {
        // Looks like an IP — assume success
        this.outputLines.push(`!!!!!`);
        this.outputLines.push(`Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`);
      } else {
        this.outputLines.push(`..!.!`);
        this.outputLines.push(`Success rate is 60 percent (3/5), round-trip min/avg/max = 1/3/5 ms`);
      }
    }
    this.updateOutput();
  },

  // ── Traceroute handler ──

  handleTraceroute(cmd, lower) {
    const parts = cmd.split(' ');
    const target = parts[1] || 'unknown';

    if (target === 'unknown') {
      this.outputLines.push(`<span class="error">% Incomplete command.</span>`);
    } else {
      this.outputLines.push(`Type escape sequence to abort.`);
      this.outputLines.push(`Tracing the route to ${target}`);
      this.outputLines.push(`  1 10.0.0.1 1 msec 0 msec 1 msec`);
      this.outputLines.push(`  2 203.0.113.1 2 msec 2 msec 1 msec`);
    }
    this.updateOutput();
  },

  // ── Help ──

  showHelp() {
    const lab = this.currentLab;
    const cmds = Object.keys(lab.commands);
    this.outputLines.push(`<span class="highlight">${Lang.t('labsAvailableCmds')}</span>`);

    // Mode-specific commands
    if (this.mode === IOS_MODE.USER_EXEC) {
      this.outputLines.push(`  enable         Enter privileged mode`);
      this.outputLines.push(`  show           Show running system information`);
      this.outputLines.push(`  ping           Send ICMP echo requests`);
      this.outputLines.push(`  traceroute     Trace route to destination`);
    } else if (this.mode === IOS_MODE.PRIV_EXEC) {
      this.outputLines.push(`  configure terminal  Enter global configuration mode`);
      this.outputLines.push(`  show                Show running system information`);
      this.outputLines.push(`  ping                Send ICMP echo requests`);
      this.outputLines.push(`  traceroute          Trace route to destination`);
      this.outputLines.push(`  write memory        Save configuration`);
      this.outputLines.push(`  reload              Reload the system`);
      this.outputLines.push(`  disable             Return to user EXEC mode`);
      this.outputLines.push(`  copy running-config startup-config  Save configuration`);
    } else if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
      this.outputLines.push(`  hostname          Set the system hostname`);
      this.outputLines.push(`  interface         Enter interface configuration mode`);
      this.outputLines.push(`  vlan              Create a VLAN`);
      this.outputLines.push(`  ip route          Configure a static route`);
      this.outputLines.push(`  router ospf       Enter OSPF configuration mode`);
      this.outputLines.push(`  line              Configure terminal lines`);
      this.outputLines.push(`  exit              Return to privileged EXEC mode`);
      this.outputLines.push(`  end               Return to privileged EXEC mode`);
    } else if (this.mode === IOS_MODE.INTERFACE) {
      this.outputLines.push(`  ip address        Set IP address on interface`);
      this.outputLines.push(`  no shutdown       Enable the interface`);
      this.outputLines.push(`  shutdown          Disable the interface`);
      this.outputLines.push(`  switchport        Configure switch port parameters`);
      this.outputLines.push(`  exit              Return to global config mode`);
      this.outputLines.push(`  end               Return to privileged EXEC mode`);
    } else {
      this.outputLines.push(`  exit     Return to previous mode`);
      this.outputLines.push(`  end      Return to privileged EXEC mode`);
    }

    // Lab-specific commands
    this.outputLines.push(`<span class="highlight">Scenario commands:</span>`);
    cmds.forEach(c => this.outputLines.push(`  ${c}`));

    // General
    this.outputLines.push(`<span class="highlight">System commands:</span>`);
    this.outputLines.push(`  host <name>      ${Lang.t('labsChangeHost')}`);
    this.outputLines.push(`  clear/cls        ${Lang.t('labsClear')}`);
    this.outputLines.push(`  ?/help           ${Lang.t('labsHelp')}`);
  },

  // ── Output rendering ──

  updateOutput() {
    const output = document.getElementById('labOutput');
    if (output) {
      output.innerHTML = this.outputLines.join('\n');
      output.scrollTop = output.scrollHeight;
    }
  },

  // ── Answer checking ──

  checkAnswer() {
    const lab = this.currentLab;
    const feedback = document.getElementById('labAnswerFeedback');
    feedback.classList.remove('hidden');

    if (this.selectedAnswer === lab.answer) {
      this.solved = true;
      feedback.innerHTML = `
        <div class="explanation-panel show">
          <div class="exp-header correct-header">${Lang.t('labsCorrect')}</div>
          <div class="exp-text">${Lang.labExplanation(lab)}</div>
          ${lab.solvedCommand ? `<div class="exp-text mt-2"><strong>${Lang.t('labsSolution')}</strong> ${Lang.t('labsSolutionCmd')} <code>${lab.solvedHost}</code>, ${Lang.t('labsExecCmd')}<br><code>${lab.solvedCommand}</code></div>` : ''}
        </div>`;
      Storage.recordLab(lab.id, true);
      // Auto-fix: apply the solution command in the CLI
      if (lab.solvedCommand && lab.solvedHost) {
        const lines = lab.solvedCommand.split('\\n');
        lines.forEach(l => {
          this.outputLines.push(``);
          this.outputLines.push(`<span class="highlight">% Applying fix: ${l}</span>`);
        });
        this.updateOutput();
      }
    } else {
      feedback.innerHTML = `
        <div class="explanation-panel show">
          <div class="exp-header incorrect-header">${Lang.t('labsIncorrectPrefix')}${String.fromCharCode(65 + lab.answer)}.</div>
          <div class="exp-text">${Lang.labExplanation(lab)}</div>
          ${lab.solvedCommand ? `<div class="exp-text mt-2"><strong>${Lang.t('labsSolution')}</strong> ${Lang.t('labsSolutionCmd')} <code>${lab.solvedHost}</code>, ${Lang.t('labsExecCmd')}<br><code>${lab.solvedCommand}</code></div>` : ''}
        </div>`;
    }

    // Highlight correct/incorrect in options
    document.querySelectorAll('#labOptions .option-item').forEach((item, i) => {
      item.classList.remove('correct', 'incorrect', 'selected');
      if (i === lab.answer) item.classList.add('correct');
      if (i === this.selectedAnswer && i !== lab.answer) item.classList.add('incorrect');
    });

    if (typeof App !== 'undefined') App.refresh();
  },

  // ── Input listener management ──

  ensureInputListener() {
    if (this.inputReady) return;
    const input = document.getElementById('labInput');
    if (!input) return;

    // Use event delegation via the terminal container to survive DOM changes
    const terminal = document.querySelector('.lab-terminal');
    if (terminal) {
      terminal.addEventListener('keydown', (e) => {
        if (e.target && e.target.id === 'labInput' && e.key === 'Enter') {
          e.preventDefault();
          const cmd = e.target.value.trim();
          if (cmd) {
            this.executeCommand(cmd);
            e.target.value = '';
          }
        }
      });
      this.inputReady = true;
    } else {
      // Fallback: direct listener
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim();
          if (cmd) {
            this.executeCommand(cmd);
            input.value = '';
          }
        }
      });
      this.inputReady = true;
    }
  },

  // ── Tab completion (syntax: show ?) ──

  getTabCompletions(partial) {
    const lab = this.currentLab;
    const all = [];

    // Built-in commands based on mode
    if (this.mode === IOS_MODE.USER_EXEC) {
      all.push('enable', 'show', 'ping', 'traceroute', '?', 'help', 'clear', 'cls', 'host');
    } else if (this.mode === IOS_MODE.PRIV_EXEC) {
      all.push('configure terminal', 'show', 'ping', 'traceroute', 'write memory', 'reload',
               'disable', 'copy running-config startup-config', 'debug', '?', 'help', 'clear', 'cls', 'host');
    } else if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
      all.push('hostname', 'interface', 'vlan', 'ip route', 'router ospf', 'line',
               'exit', 'end', '?', 'help');
    } else if (this.mode === IOS_MODE.INTERFACE) {
      all.push('ip address', 'no shutdown', 'shutdown', 'switchport', 'exit', 'end', '?', 'help');
    }

    // Lab-specific commands
    Object.keys(lab.commands).forEach(c => all.push(c));

    return all.filter(cmd => cmd.startsWith(partial));
  }
};

// ═══ Global setup — Single event delegation, no cloneNode ──

if (typeof window !== 'undefined') {
  window.LabSim = LabSim;

  // Use a document-level delegation for the lab input
  document.addEventListener('keydown', (e) => {
    if (e.target && e.target.id === 'labInput' && e.key === 'Enter') {
      e.preventDefault();
      const cmd = e.target.value.trim();
      if (cmd) {
        LabSim.executeCommand(cmd);
        e.target.value = '';
      }
    }
  });

  // Re-init input when navigating to labs view
  window._setupLabInput = () => {
    LabSim.inputReady = false;
    LabSim.ensureInputListener();
  };
}
