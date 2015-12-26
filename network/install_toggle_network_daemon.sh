#!/usr/bin/env bash

sudo cp toggle_network.sh /etc/init.d
sudo update-rc.d toggle_network.sh defaults
