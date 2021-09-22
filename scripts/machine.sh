#!/bin/bash



ssh-add -k /Users/jeonghong-gi/Desktop/myKey/tutorial-sample.pem
docker-machine create --driver generic --generic-ip-address=3.35.4.27 --generic-ssh-user ubuntu sampleMachine

#prod
docker-machine create --driver generic --generic-ip-address=3.35.4.27 --generic-ssh-user ubuntu sampleMachine
