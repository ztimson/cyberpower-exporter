# CyberPower Exporter

Export UPS data via HTTP for prometheus service

## Setup

### Prerequisites

- [Bun](https://bun.sh)
- [PowerPanel](https://www.cyberpower.com/global/en/product/sku/powerpanel_for_linux#downloads)

### Instructions

1. Clone the repository: `git clone https://git.zakscode.com/ztimson/ups-exporter.git`
2. Run the install script: `cd ups-exporter && ./install.sh`
3. Setup Prometheus to scrape exporter: [http://localhost:1024](http://localhost:1024)
```yml
  - job_name: 'power'
    static_configs:
      - targets: ['<IP>:1024']
```
