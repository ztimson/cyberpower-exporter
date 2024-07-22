#!/bin/bash

if [ "$UID" != "0"  ]; then
	echo "Please run as root"
	exit 1
fi

# Install UPS driver
if [ -z "$(which pwrstat)" ]; then
	echo "Installing Power Panel..."
	dpkg -i powerpanel.deb
fi

# Setup exporter
echo "Installing Exporter..."
cp power-exporter.js /usr/local/bin/power-exporter.js
chmod +x /usr/local/bin/power-exporter.js

# Setup service
echo "Stting Up Service..."
cp power-exporter.service /etc/systemd/system/power-exporter.service
chmod +x /etc/systemd/system/power-exporter.service
systemctl enable power-exporter
systemctl restart power-exporter

echo "Done!"
sleep 1
echo ""
journalctl -u power-exporter -n 1
