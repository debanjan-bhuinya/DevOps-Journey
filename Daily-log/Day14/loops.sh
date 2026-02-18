#!/bin/bash

echo "Starting the loop..."

for i in 1 2 3 4 5
do
    echo "Creating file_$i.txt"
    touch file_$i.txt
done

echo "Loop finished!"
