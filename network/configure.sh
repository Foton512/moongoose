#!/usr/bin/env bash

folder=$1

echo "Copying config files"
cp $folder/interfaces /etc/network/interfaces
cp $folder/dhcpd.conf /etc/dhcp/dhcpd.conf
cp $folder/isc-dhcp-server /etc/default/isc-dhcp-server
cp $folder/hostapd.conf /etc/hostapd/hostapd.conf
cp $folder/hostapd /etc/default/hostapd
cp $folder/ifplugd /etc/default/ifplugd

reboot
