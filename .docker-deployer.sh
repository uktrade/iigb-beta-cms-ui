#!/bin/bash
[ -z "$DOCKER_PATH" ] && echo "DOCKER_PATH is not set, exiting..." && exit 1
[ -z "$DOCKER_IMAGE_NAME" ] && echo "DOCKER_IMAGE_NAME is not set, using name 'iigb-deployer' as image name" && \
     DOCKER_IMAGE_NAME=iigb


DOCKER_IMAGE="$DOCKER_IMAGE_NAME-deployer"

$DOCKER_PATH images && \
$DOCKER_PATH build --force-rm -t $DOCKER_IMAGE $PWD  && \
$DOCKER_PATH run --rm -i --name $DOCKER_IMAGE  -e BUCKET=$BUCKET -e BUILD_FOLDER=$BUILD_FOLDER -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e DID=$DID -e IIGB_STRUCTURE_ORG=$IIGB_STRUCTURE_ORG -e IIGB_STRUCTURE_REPO=$IIGB_STRUCTURE_REPO -e IIGB_STRUCTURE_DEV=$IIGB_STRUCTURE_DEV -e IIGB_STRUCTURE_LIVE=$IIGB_STRUCTURE_LIVE -e IIGB_STRUCTURE_PATH=$IIGB_STRUCTURE_PATH -e IIGB_CONTENT_ORG=$IIGB_CONTENT_ORG -e IIGB_CONTENT_REPO=$IIGB_CONTENT_REPO -e IIGB_CONTENT_DEV=$IIGB_CONTENT_DEV -e IIGB_CONTENT_LIVE=$IIGB_CONTENT_LIVE -e IIGB_CONTENT_PATH=$IIGB_CONTENT_PATH -e IIGB_CONTENT_MEDIA_PATH=$IIGB_CONTENT_MEDIA_PATH -e IIGB_GATE_KEEPER=$IIGB_GATE_KEEPER -e IIGB_CLIENT_ID=$IIGB_CLIENT_ID -e NO_ROBOTS=$NO_ROBOTS  $DOCKER_IMAGE /bin/bash -c "npm run deploy"

result=$?

$DOCKER_PATH images && \
$DOCKER_PATH rmi --force $DOCKER_IMAGE

if [ $result -ne 0 ]; then
     echo "Deployment failed!! See above for error details"
     exit 1
fi
