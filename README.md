# Moongoose

## Installation
* Install Raspbian Jessie - https://www.raspberrypi.org/downloads/raspbian/
* Configure static IP address - http://weworkweplay.com/play/automatically-connect-a-raspberry-pi-to-a-wifi-network/
* Configure RPI with `sudo raspi-config` (https://www.raspberrypi.org/documentation/configuration/raspi-config.md): expand filesystem, boot in console (without graphic interface), set timezone, enable camera and ssh server. Reboot. Default login - `pi`. Default password - `raspberry`
* Add new user and add it to sudoers - https://www.digitalocean.com/community/tutorials/how-to-add-delete-and-grant-sudo-privileges-to-users-on-a-debian-vps
* Now ssh is available. All next steps can be done via ssh. I prefer to use tmux and vim. My configs are here - https://github.com/Foton512/configs
* Clone repo to home dir: `cd ~; git clone https://github.com/Foton512/moongoose.git`. My home dir is `/home/foton` and it is used in all config files and scripts in this repo
* Configure nginx
  * `sudo apt-get install nginx`
  * `sudo cp ~/moongoose/config/nginx/goose /etc/nginx/sites-available/`
  * `sudo rm /etc/nginx/sites-enabled/default; sudo ln /etc/nginx/sites-available/goose /etc/nginx/sites-enabled/goose`
