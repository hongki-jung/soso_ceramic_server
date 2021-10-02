#!/bin/bash



ssh-add -k /Users/jeonghong-gi/Desktop/myKey/tutorial-sample.pem
docker-machine create --driver generic --generic-ip-address=52.79.202.226 --generic-ssh-user ubuntu myDockerMachine

#prod
docker-machine create --driver generic --generic-ip-address=52.79.202.226 --generic-ssh-user ubuntu myDockerMachine
