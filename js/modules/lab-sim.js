// ═══════════════════════════════════════════
// Lab Simulator — Cisco IOS CLI Simulator
// ═══════════════════════════════════════════
// Full mode system with reliable input handling.
// Every call to loadLab() re-attaches the input
// listener fresh — no flags, no delegation conflicts.
// ═══════════════════════════════════════════

const IOS_MODE = {
  USER_EXEC: 'user',
  PRIV_EXEC: 'priv',
  GLOBAL_CONFIG: 'gconf',
  INTERFACE: 'if',
  VLAN: 'vlan',
  LINE: 'line',
  ROUTER: 'router',
};

const LabSim = {
  currentLab: null,
  currentHost: null,
  mode: IOS_MODE.USER_EXEC,
  modeStack: [],
  outputLines: [],
  selectedAnswer: null,
  solved: false,

  loadLab(labId) {
    this.currentLab = LAB_SCENARIOS.find(l => l.id === labId);
    if (!this.currentLab) return;

    this.currentHost = this.currentLab.initialHost;
    this.mode = IOS_MODE.PRIV_EXEC;
    this.modeStack = [];
    this.outputLines = [];
    this.selectedAnswer = null;
    this.solved = false;

    this.render();
  },

  getHostname() { return this.currentHost || 'Router'; },

  getPrompt() {
    const h = this.getHostname();
    const map = {
      [IOS_MODE.USER_EXEC]: `${h}>`,
      [IOS_MODE.PRIV_EXEC]: `${h}#`,
      [IOS_MODE.GLOBAL_CONFIG]: `${h}(config)#`,
      [IOS_MODE.INTERFACE]: `${h}(config-if)#`,
      [IOS_MODE.VLAN]: `${h}(config-vlan)#`,
      [IOS_MODE.LINE]: `${h}(config-line)#`,
      [IOS_MODE.ROUTER]: `${h}(config-router)#`,
    };
    return map[this.mode] || `${h}#`;
  },

  setMode(m) { this.mode = m; this.updatePromptUI(); },
  pushMode(m) { this.modeStack.push(this.mode); this.setMode(m); },
  popMode() { this.setMode(this.modeStack.length > 0 ? this.modeStack.pop() : IOS_MODE.PRIV_EXEC); },

  updatePromptUI() {
    const p = document.getElementById('labPrompt');
    const t = document.getElementById('labTermTitle');
    if (p) p.textContent = this.getPrompt();
    if (t) t.textContent = `${this.getHostname()}> enable`;
  },

  // ── Render: re-builds scenario + re-attaches input listener ──

  render() {
    const lab = this.currentLab;
    if (!lab) return;

    // Scenario + question
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

    // Lab selector — always rebuild options
    const sel = document.getElementById('labSelector');
    if (sel) {
      // Replace the select entirely to kill any stale listeners
      const newSel = document.createElement('select');
      newSel.id = 'labSelector';
      newSel.style.cssText = sel.style.cssText || 'background:var(--bg-input);color:var(--text-primary);border:1px solid var(--border-card);border-radius:var(--radius-sm);padding:8px 12px;font-family:var(--font-sans)';
      LAB_SCENARIOS.forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.id;
        opt.textContent = Lang.isEn() ? (l.titleEn || l.title) : l.title;
        newSel.appendChild(opt);
      });
      newSel.value = lab.id;
      newSel.addEventListener('change', (e) => { this.loadLab(e.target.value); });
      sel.parentNode.replaceChild(newSel, sel);
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

    // ── ATTACH INPUT LISTENER FRESH EVERY TIME ──
    this.attachInput();
  },

  // ── Attach Enter listener directly on #labInput (fresh each render) ──

  attachInput() {
    const input = document.getElementById('labInput');
    if (!input) return;

    // Remove ALL previous listeners by cloning + replacing
    const newInput = input.cloneNode(true);
    newInput.id = 'labInput';
    newInput.className = 'terminal-input';
    newInput.setAttribute('autocomplete', 'off');
    // Preserve placeholder
    const oldPlaceholder = input.getAttribute('placeholder');
    if (oldPlaceholder) newInput.setAttribute('placeholder', oldPlaceholder);
    if (Lang && Lang.current) {
      const i18nKey = input.getAttribute('data-i18n-placeholder');
      if (i18nKey) newInput.setAttribute('placeholder', Lang.t(i18nKey));
    }

    newInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = newInput.value.trim();
        if (cmd) {
          this.executeCommand(cmd);
          newInput.value = '';
        }
      }
    });

    input.parentNode.replaceChild(newInput, input);

    // Auto-focus the input after a tiny delay (DOM needs to settle)
    setTimeout(() => newInput.focus(), 50);
  },

  // ── Core command execution ──

  executeCommand(rawCmd) {
    if (!this.currentLab) return;
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const lab = this.currentLab;
    const prompt = this.getPrompt();
    this.outputLines.push(`<span class="prompt">${prompt}</span> <span class="cmd">${cmd}</span>`);
    const lower = cmd.toLowerCase();

    // --- Built-in commands ---

    if (lower === '?' || lower === 'help') { this.showHelp(); this.updateOutput(); return; }
    if (lower === 'clear' || lower === 'cls') { this.outputLines = []; this.updateOutput(); return; }

    // host switch
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

    // enable / disable
    if (lower === 'enable' || lower === 'en') {
      if (this.mode === IOS_MODE.USER_EXEC) { this.setMode(IOS_MODE.PRIV_EXEC); this.outputLines.push(``); }
      else { this.outputLines.push(`<span class="error">% Already in privileged mode</span>`); }
      this.updateOutput(); return;
    }
    if (lower === 'disable') {
      if (this.mode === IOS_MODE.PRIV_EXEC) { this.setMode(IOS_MODE.USER_EXEC); }
      else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // configure terminal
    if (lower === 'configure terminal' || lower === 'conf t' || lower === 'config t') {
      if (this.mode === IOS_MODE.PRIV_EXEC) {
        this.pushMode(IOS_MODE.GLOBAL_CONFIG);
        this.outputLines.push(`<span class="highlight">Enter configuration commands, one per line.  End with CNTL/Z.</span>`);
      } else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // interface
    if (lower.startsWith('interface ') || lower.startsWith('int ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG || this.mode === IOS_MODE.INTERFACE) {
        this.pushMode(IOS_MODE.INTERFACE);
        this.outputLines.push(``);
      } else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // vlan
    if (lower.startsWith('vlan ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
        this.pushMode(IOS_MODE.VLAN);
        this.outputLines.push(`<span class="highlight">% Entering VLAN config mode.</span>`);
      } else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // line
    if (lower.startsWith('line ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) { this.pushMode(IOS_MODE.LINE); this.outputLines.push(``); }
      else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // router
    if (lower.startsWith('router ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
        this.pushMode(IOS_MODE.ROUTER);
        this.outputLines.push(`<span class="highlight">% Entering routing protocol config mode.</span>`);
      } else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // exit
    if (lower === 'exit') {
      if (this.mode === IOS_MODE.USER_EXEC) {
        this.outputLines.push(`<span class="error">% Connection closed by foreign host.</span>`);
      } else if (this.mode !== IOS_MODE.PRIV_EXEC) {
        this.popMode();
        if (this.mode === IOS_MODE.GLOBAL_CONFIG || this.mode === IOS_MODE.PRIV_EXEC) {
          this.outputLines.push(`<span class="highlight">% Exiting configuration mode.</span>`);
        }
      } else {
        this.setMode(IOS_MODE.USER_EXEC);
      }
      this.updateOutput(); return;
    }

    // end
    if (lower === 'end') {
      if (this.mode !== IOS_MODE.USER_EXEC && this.mode !== IOS_MODE.PRIV_EXEC) {
        this.modeStack = [];
        this.setMode(IOS_MODE.PRIV_EXEC);
        this.outputLines.push(`<span class="highlight">%SYS-5-CONFIG_I: Configured from console by console</span>`);
      } else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // show commands
    if (lower.startsWith('show ') || lower.startsWith('sh ')) { this.handleShow(lower); return; }

    // ping / traceroute
    if (lower.startsWith('ping')) { this.handlePing(cmd, lower); return; }
    if (lower.startsWith('traceroute') || lower.startsWith('trace ')) { this.handleTrace(cmd, lower); return; }

    // write memory / copy run start
    if (lower === 'write memory' || lower === 'wr' || lower.startsWith('copy run')) {
      if (this.mode === IOS_MODE.PRIV_EXEC) {
        this.outputLines.push(`<span class="highlight">Building configuration...</span>`);
        this.outputLines.push(`<span class="highlight">[OK]</span>`);
      } else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // reload
    if (lower === 'reload') {
      if (this.mode === IOS_MODE.PRIV_EXEC) {
        this.outputLines.push(`<span class="highlight">Proceed with reload? [confirm]</span>`);
        this.outputLines.push(``);
        this.outputLines.push(`<span class="error">% Reload in progress...</span>`);
        setTimeout(() => {
          this.mode = IOS_MODE.USER_EXEC; this.modeStack = [];
          this.outputLines = [`<span class="highlight">C2960 Software (C2960-LANBASEK9-M), Version 15.2(7)E</span>`, `<span class="highlight">System restarted --</span>`, ``];
          this.updatePromptUI(); this.updateOutput();
        }, 800);
      } else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // interface config: no shutdown / shutdown / ip address / switchport / hostname
    if (lower === 'no shutdown' || lower === 'no shut') {
      if (this.mode === IOS_MODE.INTERFACE) { this.outputLines.push(`<span class="highlight">%LINK-5-CHANGED: Interface is up, line protocol is up</span>`); }
      else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }
    if (lower === 'shutdown' || lower === 'shut') {
      if (this.mode === IOS_MODE.INTERFACE) { this.outputLines.push(`<span class="highlight">%LINK-5-CHANGED: Interface is down, line protocol is down</span>`); }
      else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }
    if (lower.startsWith('ip address ')) {
      if (this.mode === IOS_MODE.INTERFACE) { this.outputLines.push(``); }
      else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }
    if (lower.startsWith('switchport')) {
      if (this.mode === IOS_MODE.INTERFACE) { this.outputLines.push(``); }
      else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }
    if (lower.startsWith('ip route ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) { this.outputLines.push(``); }
      else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }
    if (lower.startsWith('hostname ')) {
      if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
        this.currentHost = cmd.substring(9).trim().toUpperCase();
        this.updatePromptUI();
        this.outputLines.push(`<span class="highlight">% Hostname changed to ${this.currentHost}</span>`);
      } else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }
    if (lower.startsWith('network ')) {
      if (this.mode === IOS_MODE.ROUTER) { this.outputLines.push(``); }
      else { this.outputLines.push(`<span class="error">% Invalid input</span>`); }
      this.updateOutput(); return;
    }

    // --- Lab-specific commands ---
    let matched = false;
    for (const [pattern, outputs] of Object.entries(lab.commands)) {
      if (lower.startsWith(pattern)) {
        const output = outputs[this.currentHost];
        if (output) {
          output.split('\n').forEach(line => {
            if (line.startsWith('% ') || line.includes('Error') || line.includes('Invalid')) {
              this.outputLines.push(`<span class="error">${line}</span>`);
            } else { this.outputLines.push(line); }
          });
        } else {
          this.outputLines.push(`<span class="error">% Command not available on ${this.currentHost}</span>`);
        }
        matched = true;
        break;
      }
    }

    if (!matched) {
      this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
    }
    this.updateOutput();
  },

  // ── Show command handler ──

  handleShow(lower) {
    const lab = this.currentLab;

    // Check lab-specific show commands first
    for (const [pattern, outputs] of Object.entries(lab.commands)) {
      if (lower.startsWith(pattern)) {
        const output = outputs[this.currentHost];
        if (output) {
          output.split('\n').forEach(l => {
            if (l.startsWith('% ') || l.includes('Error') || l.includes('Invalid')) {
              this.outputLines.push(`<span class="error">${l}</span>`);
            } else { this.outputLines.push(l); }
          });
        } else {
          this.outputLines.push(`<span class="error">% Command not available on ${this.currentHost}</span>`);
        }
        this.updateOutput();
        return;
      }
    }

    // Generic show commands
    const showMap = {
      'show version': `Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.2(7)E\nCopyright (c) 1986-2024 by Cisco Systems, Inc.\n${this.getHostname()} uptime is 0 days, 2 hours, 34 minutes\nSystem image file is "flash:c2960-lanbasek9-mz.152-7.E.bin"`,
      'show clock': `*14:28:22.735 UTC Mon May 25 2026`,
      'show running-config': `Building configuration...\nCurrent configuration : 1853 bytes\n!\nversion 15.2\nhostname ${this.getHostname()}\n!\ninterface GigabitEthernet0/0\n ip address dhcp\n duplex auto\n speed auto\n!\ninterface GigabitEthernet0/1\n no ip address\n duplex auto\n speed auto\n!\nend`,
      'show startup-config': `startup-config is not present`,
      'show ip interface brief': `Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0      unassigned      YES unset  up                    up\nGigabitEthernet0/1      unassigned      YES unset  up                    up\nVlan1                   unassigned      YES unset  up                    up`,
      'show interfaces': `GigabitEthernet0/0 is up, line protocol is up\n  Hardware is Gigabit Ethernet, address is 0050.7966.6800\n  MTU 1500 bytes, BW 1000000 Kbit/sec\n  Full-duplex, 1000Mb/s, media type is RJ-45\n  input errors 0, CRC 0, frame 0, overrun 0\n  output errors 0, collisions 0, interface resets 0`,
      'show interfaces status': `Port      Name               Status       Vlan       Duplex  Speed Type\nGi0/0     Management          connected    1          a-full  a-1000 10/100/1000BaseTX\nGi0/1     --                  notconnect   1          auto    auto   10/100/1000BaseTX`,
      'show mac address-table': `          Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n   1    0050.7966.6800    DYNAMIC     Gi0/0\n   1    0050.7966.6801    DYNAMIC     Gi0/0\nTotal Mac Addresses: 2`,
      'show cdp neighbors': `Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID\n${this.getHostname() === 'SW1' ? 'SW2' : 'SW1'}                 ${this.getHostname() === 'SW1' ? 'Gi0/3' : 'Gi0/1'}                                 150              S     CISCO     ${this.getHostname() === 'SW1' ? 'Gi0/1' : 'Gi0/3'}`,
      'show lldp neighbors': `Total entries displayed: 0`,
      'show vlan brief': `VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Gi0/0, Gi0/1, Gi0/2, Gi0/3\n10   DATA                             active    \n20   VOICE                            active    \n1002 fddi-default                     act/unsup\n1003 token-ring-default               act/unsup\n1004 fddinet-default                  act/unsup\n1005 trnet-default                    act/unsup`,
      'show interfaces trunk': `Port        Mode         Encapsulation  Status        Native vlan\nGi0/3       on           802.1q         trunking      1\n\nPort        Vlans allowed on trunk\nGi0/3       1-4094\n\nPort        Vlans allowed and active in management domain\nGi0/3       1\n\nPort        Vlans in spanning tree forwarding state and not pruned\nGi0/3       1`,
      'show spanning-tree': `VLAN0001\n  Spanning tree enabled protocol ieee\n  Root ID    Priority    32769  Address     0050.7966.6800\n  This bridge is the root\n  Bridge ID  Priority    32769  Address     0050.7966.6800\n\nInterface           Role Sts   Cost      Prio Type\nGi0/0               Desg FWD   4         128  P2p\nGi0/1               Desg FWD   4         128  P2p`,
      'show spanning-tree root': `Vlan                   Root ID          Cost    Time  Age Dly\nVLAN0001         32769 0050.7966.6800        0    2    20  15`,
      'show ip route': `Codes: C - connected, S - static, O - OSPF, IA - OSPF inter area\n\nGateway of last resort is not set\n\nC    192.168.1.0/24 is directly connected, GigabitEthernet0/0\n     192.168.1.1/32 is directly connected, GigabitEthernet0/0`,
      'show ip ospf neighbor': `Neighbor ID     Pri   State           Dead Time   Address         Interface\n(no neighbors found)`,
      'show ip ospf interface': `GigabitEthernet0/0 is up, line protocol is up\n  Internet Address 192.168.1.1/24, Area 0\n  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1\n  Timer intervals configured, Hello 10, Dead 40, Wait 40`,
      'show ip arp': `Protocol  Address          Age (min)  Hardware Addr   Type   Interface\nInternet  192.168.1.1             -   0050.7966.6800  ARPA   GigabitEthernet0/0\nInternet  192.168.1.10            5   0050.7966.680a  ARPA   GigabitEthernet0/0`,
      'show ip int brief': `Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0      192.168.1.1     YES manual up                    up\nGigabitEthernet0/1      unassigned      YES unset  up                    up`,
      'show port-security': `Secure Port  MaxSecureAddr  CurrentAddr  SecurityViolation  Security Action\n   Gi0/10              1            1                 0         Shutdown\nTotal Addresses in System: 1\nMax Addresses limit in System: 1024`,
      'show flash': `Directory of flash:/\n\n 1  -rw-     4670455   c2960-lanbasek9-mz.152-7.E.bin\n 2  -rw-       29541   config.text\n\n163145728 bytes total (158447232 bytes free)`,
      'show ip dhcp binding': `IP address      Client-ID/              Lease expiration        Type\n192.168.1.2     0100.5079.6668.0a       May 26 2026 02:00 PM    Automatic\n192.168.1.3     0100.5079.6668.0b       May 26 2026 02:15 PM    Automatic`,
      'show ip dhcp pool': `Pool LAN :\n Total addresses                : 254\n Leased addresses               : 2\n Current index        IP address range                    Leased addresses\n 192.168.1.4          192.168.1.1      - 192.168.1.254    2`,
      'show ip nat translations': `Pro Inside global      Inside local       Outside local      Outside global\n--- 203.0.113.10       192.168.1.10       ---                ---`,
      'show ip nat statistics': `Total translations: 1\nOutside interfaces: GigabitEthernet0/0\nInside interfaces: GigabitEthernet0/1\nHits: 342  Misses: 0`,
      'show access-lists': `Standard IP access list 1\n    10 permit 192.168.1.0, wildcard bits 0.0.0.255 (42 matches)\n    20 deny any (3 matches)`,
      'show logging': `Syslog logging: enabled\n    Console logging: level debugging\n    Buffer logging: level debugging\n    Trap logging: level informational\nLog Buffer:\n%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up`,
      'show processes cpu': `CPU utilization for five seconds: 2%/0%; one minute: 3%; five minutes: 3%\n PID Runtime(ms)  Invoked      uSecs\n   1           0         1          0\n   2         324     32865          9`,
    };

    for (const [pattern, output] of Object.entries(showMap)) {
      if (lower.startsWith(pattern)) {
        output.split('\n').forEach(l => this.outputLines.push(l));
        this.updateOutput();
        return;
      }
    }

    this.outputLines.push(`<span class="error">% Invalid input detected at '^' marker.</span>`);
    this.updateOutput();
  },

  handlePing(cmd, lower) {
    const target = cmd.split(' ')[1];
    if (!target) { this.outputLines.push(`<span class="error">% Incomplete command.</span>`); this.updateOutput(); return; }
    this.outputLines.push(`Type escape sequence to abort.`);
    this.outputLines.push(`Sending 5, 100-byte ICMP Echos to ${target}, timeout is 2 seconds:`);
    this.outputLines.push(`!!!!!`);
    this.outputLines.push(`Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`);
    this.updateOutput();
  },

  handleTrace(cmd, lower) {
    const target = cmd.split(' ')[1];
    if (!target) { this.outputLines.push(`<span class="error">% Incomplete command.</span>`); this.updateOutput(); return; }
    this.outputLines.push(`Type escape sequence to abort.`);
    this.outputLines.push(`Tracing the route to ${target}`);
    this.outputLines.push(`  1 10.0.0.1 1 msec 0 msec 1 msec`);
    this.outputLines.push(`  2 203.0.113.1 2 msec 2 msec 1 msec`);
    this.updateOutput();
  },

  showHelp() {
    const lab = this.currentLab;
    const cmds = Object.keys(lab.commands);
    this.outputLines.push(`<span class="highlight">${Lang.t('labsAvailableCmds')}</span>`);
    if (this.mode === IOS_MODE.USER_EXEC) {
      this.outputLines.push(`  enable           Enter privileged mode`);
      this.outputLines.push(`  show             Show running system information`);
      this.outputLines.push(`  ping             Send ICMP echo requests`);
      this.outputLines.push(`  traceroute       Trace route to destination`);
    } else if (this.mode === IOS_MODE.PRIV_EXEC) {
      this.outputLines.push(`  configure terminal   Enter global configuration mode`);
      this.outputLines.push(`  show                 Show running system information`);
      this.outputLines.push(`  ping                 Send ICMP echo requests`);
      this.outputLines.push(`  traceroute           Trace route to destination`);
      this.outputLines.push(`  write memory         Save configuration`);
      this.outputLines.push(`  reload               Reload the system`);
      this.outputLines.push(`  disable              Return to user EXEC mode`);
    } else if (this.mode === IOS_MODE.GLOBAL_CONFIG) {
      this.outputLines.push(`  hostname      Set the system hostname`);
      this.outputLines.push(`  interface     Enter interface configuration mode`);
      this.outputLines.push(`  vlan          Create a VLAN`);
      this.outputLines.push(`  ip route      Configure a static route`);
      this.outputLines.push(`  router ospf   Enter OSPF configuration mode`);
      this.outputLines.push(`  line          Configure terminal lines`);
      this.outputLines.push(`  exit/end      Return to privileged EXEC mode`);
    } else if (this.mode === IOS_MODE.INTERFACE) {
      this.outputLines.push(`  ip address    Set IP address on interface`);
      this.outputLines.push(`  no shutdown   Enable the interface`);
      this.outputLines.push(`  shutdown      Disable the interface`);
      this.outputLines.push(`  switchport    Configure switch port parameters`);
      this.outputLines.push(`  exit/end      Return to higher mode`);
    } else {
      this.outputLines.push(`  exit    Return to previous mode`);
      this.outputLines.push(`  end     Return to privileged EXEC mode`);
    }
    this.outputLines.push(`<span class="highlight">Scenario commands:</span>`);
    cmds.forEach(c => this.outputLines.push(`  ${c}`));
    this.outputLines.push(`<span class="highlight">System commands:</span>`);
    this.outputLines.push(`  host <name>   ${Lang.t('labsChangeHost')}`);
    this.outputLines.push(`  clear/cls     ${Lang.t('labsClear')}`);
    this.outputLines.push(`  ?/help        ${Lang.t('labsHelp')}`);
  },

  updateOutput() {
    const out = document.getElementById('labOutput');
    if (out) { out.innerHTML = this.outputLines.join('\n'); out.scrollTop = out.scrollHeight; }
  },

  checkAnswer() {
    const lab = this.currentLab;
    const fb = document.getElementById('labAnswerFeedback');
    if (!fb) return;
    fb.classList.remove('hidden');

    if (this.selectedAnswer === lab.answer) {
      this.solved = true;
      fb.innerHTML = `<div class="explanation-panel show"><div class="exp-header correct-header">${Lang.t('labsCorrect')}</div><div class="exp-text">${Lang.labExplanation(lab)}</div>${lab.solvedCommand ? `<div class="exp-text mt-2"><strong>${Lang.t('labsSolution')}</strong> ${Lang.t('labsSolutionCmd')} <code>${lab.solvedHost}</code>, ${Lang.t('labsExecCmd')}<br><code>${lab.solvedCommand}</code></div>` : ''}</div>`;
      Storage.recordLab(lab.id, true);
    } else {
      fb.innerHTML = `<div class="explanation-panel show"><div class="exp-header incorrect-header">${Lang.t('labsIncorrectPrefix')}${String.fromCharCode(65 + lab.answer)}.</div><div class="exp-text">${Lang.labExplanation(lab)}</div>${lab.solvedCommand ? `<div class="exp-text mt-2"><strong>${Lang.t('labsSolution')}</strong> ${Lang.t('labsSolutionCmd')} <code>${lab.solvedHost}</code>, ${Lang.t('labsExecCmd')}<br><code>${lab.solvedCommand}</code></div>` : ''}</div>`;
    }

    document.querySelectorAll('#labOptions .option-item').forEach((item, i) => {
      item.classList.remove('correct', 'incorrect', 'selected');
      if (i === lab.answer) item.classList.add('correct');
      if (i === this.selectedAnswer && i !== lab.answer) item.classList.add('incorrect');
    });
    if (typeof App !== 'undefined') App.refresh();
  },
};

// ── Export globally ──

if (typeof window !== 'undefined') {
  window.LabSim = LabSim;
}
