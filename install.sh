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
cp ups-exporter.js /usr/local/bin/ups-exporter.js
chmod +x /usr/local/bin/ups-exporter.js

# Setup service
echo "Stting Up Service..."
cp ups-exporter.service /etc/systemd/system/ups-exporter.service
chmod +x /etc/systemd/system/ups-exporter.service
systemctl enable ups-exporter
systemctl restart ups-exporter

echo "Done!"
sleep 1
echo ""
journalctl -u ups-exporter -n 1
