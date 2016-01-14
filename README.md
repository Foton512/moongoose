# Moongoose
Goose robot with computer vision. Based on raspberry pi and arduino. Has friendly frontend.

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
Build OpenCV 3 (http://www.pyimagesearch.com/2015/10/26/how-to-install-opencv-3-on-raspbian-jessie/)
```
sudo apt-get update
sudo apt-get upgrade
sudo rpi-update
sudo reboot
sudo apt-get install build-essential git cmake pkg-config
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
sudo apt-get install libxvidcore-dev libx264-dev
sudo apt-get install libgtk2.0-dev
sudo apt-get install libatlas-base-dev gfortran
cd ~/downloads
wget -O opencv.zip https://github.com/Itseez/opencv/archive/3.0.0.zip
unzip opencv.zip
wget -O opencv_contrib.zip https://github.com/Itseez/opencv_contrib/archive/3.0.0.zip
unzip opencv_contrib.zip
cd opencv-3.0.0
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D INSTALL_C_EXAMPLES=ON -D OPENCV_EXTRA_MODULES_PATH=~/downloads/opencv_contrib-3.0.0/modules -D BUILD_EXAMPLES=ON ..
make -j4 # IT TAKES 2 HOURS!!!
sudo make install
```
