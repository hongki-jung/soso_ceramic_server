#!/bin/bash
AWS_PROFILE=soso-ceramic-studio
IMAGE_NAME=soso-ceramic-studio-client
REGISTRY_URL=398347689659.dkr.ecr.ap-northeast-2.amazonaws.com/soso-ceramic-studio-client:latest

# rm -rf .next/
# npm run build

eval $(docker-machine env --shell bash -u)
docker build -t ${IMAGE_NAME} .
docker tag ${IMAGE_NAME}:latest ${REGISTRY_URL}

# $(aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 506876573492.dkr.ecr.ap-northeast-2.amazonaws.com)
aws ecr get-login-password --region ap-northeast-2 --profile ${AWS_PROFILE} | docker login --username AWS --password-stdin ${REGISTRY_URL}
docker push ${REGISTRY_URL}
