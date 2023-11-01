#!/bin/bash

if [[ $1 = 'escape' ]]; then
    docker run --rm -it --pid=host --privileged ubuntu bash
else
    docker run --rm -it --privileged ubuntu bash
fi
