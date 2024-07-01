#!/bin/bash

# Loop through all png files
for file in *.png; do
    # Get the filename without extension
    filename="${file%.*}"

    # Create a thumbnail with 150px width, maintaining aspect ratio
    convert "$file" -resize 150x150^ -gravity center -extent 150x150 "${filename}-thumb.png"
done