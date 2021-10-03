#!/bin/bash
AWS_PROFILE=soso-ceramic-studio



DOCKER_MACHINE=myDockerMachine
IMAGE_NAME=soso-ceramic-studio

REGISTRY_URL=398347689659.dkr.ecr.ap-northeast-2.amazonaws.com/soso-ceramic-studio:latest
REGISTRY_URL_CLIENT=398347689659.dkr.ecr.ap-northeast-2.amazonaws.com/soso-ceramic-studio-client:latest


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
docker pull ${REGISTRY_URL_CLIENT}


docker-machine scp -d ./nginx/nginx.tmpl ${DOCKER_MACHINE}:/home/ubuntu
docker-machine scp -d ./docker-compose.yml ${DOCKER_MACHINE}:/home/ubuntu
docker-machine ssh ${DOCKER_MACHINE} "docker-compose -f docker-compose.yml -p server up -d --remove-orphans"

docker rmi -f $(docker images -f dangling=true -q)
eval $(docker-machine env --shell bash -u)
docker rmi -f $(docker images -f dangling=true -q)
