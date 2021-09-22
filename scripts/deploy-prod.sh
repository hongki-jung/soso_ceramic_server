#!/bin/bash
AWS_PROFILE=tutorial-sample

# DOCKER_MACHINE=kidscare-machine
# IMAGE_NAME=kidscare
# REGISTRY_URL=506876573492.dkr.ecr.ap-northeast-2.amazonaws.com/kidscare:latest


DOCKER_MACHINE=sampleMachine
IMAGE_NAME=my_test_registry
REGISTRY_URL=398347689659.dkr.ecr.ap-northeast-2.amazonaws.com/my_test_registry

# cd client
# npm run build
# cd ..





eval $(docker-machine env --shell bash -u)
docker build -t ${IMAGE_NAME} .
docker tag ${IMAGE_NAME}:latest ${REGISTRY_URL}

# $(aws ecr get-login --no-include-email --region ap-northeast-2 --profile ${AWS_PROFILE})
aws ecr get-login-password --region ap-northeast-2 --profile ${AWS_PROFILE} | docker login --username AWS --password-stdin ${REGISTRY_URL}
docker push ${REGISTRY_URL}

eval $(docker-machine env --shell bash ${DOCKER_MACHINE})
docker pull ${REGISTRY_URL}

docker-machine scp -d ./nginx/nginx.tmpl ${DOCKER_MACHINE}:/home/ubuntu
docker-machine scp -d ./docker-compose.yml ${DOCKER_MACHINE}:/home/ubuntu
docker-machine ssh ${DOCKER_MACHINE} "docker-compose -f docker-compose.yml -p server up -d --remove-orphans"

docker rmi -f $(docker images -f dangling=true -q)
eval $(docker-machine env --shell bash -u)
docker rmi -f $(docker images -f dangling=true -q)
