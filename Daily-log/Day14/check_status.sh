#!/bin/bash

FILE_NAME="error.log"

if [ -f "$FILE_NAME" ]; then
    echo "Danger! $FILE_NAME exists."
else
    echo "All good. No error log found."
fi
