# Moongoose

## Installation
##### Install Raspbian Jessie
https://www.raspberrypi.org/downloads/raspbian/
##### Configure static IP address
http://weworkweplay.com/play/automatically-connect-a-raspberry-pi-to-a-wifi-network/  
I use IP `192.168.1.234`
##### Configure RPI with raspi-config
 ```bash
sudo raspi-config
```
Expand filesystem, boot in console (without graphic interface), set timezone, enable camera and ssh server.  
Reboot. Default login - `pi`. Default password - `raspberry`
##### Add new user and add it to sudoers
https://www.digitalocean.com/community/tutorials/how-to-add-delete-and-grant-sudo-privileges-to-users-on-a-debian-vps
##### SSH is up!
Now ssh is available. All next steps can be done via ssh. I prefer to use tmux and vim. My configs are here - https://github.com/Foton512/configs
##### Clone repo
Clone repo to home dir:  
```bash
cd ~
git clone https://github.com/Foton512/moongoose.git
```
My home dir is `/home/foton` and it is used in all config files and scripts in this repo
##### Configure nginx
```bash
sudo apt-get install nginx
sudo cp ~/moongoose/config/nginx/goose /etc/nginx/sites-available/
sudo rm /etc/nginx/sites-enabled/default
sudo ln /etc/nginx/sites-available/goose /etc/nginx/sites-enabled/goose
sudo service nginx reload
```
Goose frontend is working now! You can check it at `192.168.1.234` in your browser
##### Install MJPG-Streamer
```bash
sudo apt-get install libjpeg8-dev imagemagick
mkdir ~/downloads
cd ~/downloads
wget http://lilnetwork.com/download/raspberrypi/mjpg-streamer.tar.gz
tar xvzf mjpg-streamer.tar.gz
cd mjpg-streamer/mjpg-streamer
make
sudo make install
```
Allow access to camera for current user:
```
sudo usermod -a -G video foton
sudo reboot
```
You can test camera by running `raspistill -o test.jpg`
##### Building goose_brains
Build OpenCV 3
```
sudo apt-get update
sudo apt-get upgrade

sudo apt-get install build-essential cmake cmake-curses-gui \
    pkg-config libpng12-0 libpng12-dev libpng++-dev \
    libpng3 libpnglite-dev zlib1g-dbg zlib1g zlib1g-dev \
    pngtools libtiff4-dev libtiff4 libtiffxx0c2 libtiff-tools libeigen3-dev
```
```
sudo apt-get install cmake
```
