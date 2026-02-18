#!/bin/bash

mkdir -p Backup

for i in 1 2 3 4 5
do
    FILE="file_$i.txt"
    if [ -f "$FILE" ]; then
        echo "Moving $FILE to Backup folder..."
        mv $FILE Backup/
    else
        echo "Warning: $FILE is missing!"
    fi
done
