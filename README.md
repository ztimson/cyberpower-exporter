# CyberPower Exporter

Export UPS data via HTTP for prometheus service

## Setup

### Prerequisites

- [Bun](https://bun.sh)

### Instructions

1. Download the [PowerPanel](https://cyberpower.com/global/en/product/sku/powerpanel_for_linux#downloads)
2. Install the package: `sudo dpkg -i powerpanel.deb`
3. Install the service: 
4. Start service automatically: `sudo systemctl enable power-exporter && sudo systemctl start power-exporter`
