#!/usr/bin/env bash

cleanUpDistFolder () {
    if [ -d ./dist ]
    then rm -rf dist
    fi
}

cleanUpImagesFolder () {
    if [ -d ./images ]
    then rm -rf images && mkdir images
    fi
}

cleanUpDistFolder
cleanUpImagesFolder