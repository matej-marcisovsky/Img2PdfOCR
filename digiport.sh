#! /bin/bash

SOURCE="/source"
TEMP="/tmp/source"

for file in "$SOURCE"/*.jpg; do
    [ -f "$file" ] || break
    filename=$(basename -- "$file")

    echo "Processing $filename file..."
    cp $file $TEMP
    cd $TEMP

    echo -e "\t Optimizing..."
    jpegoptim --strip-all --quiet $filename

    echo -e "\t OCR..."
    convert $filename -threshold 75% $filename.bw
    tesseract $filename.bw $filename.to --oem 1 --psm 11 --dpi 300 -l ces+slk+eng+deu -c textonly_pdf=true pdf
    rm $filename.bw
done

echo -e "\t Creating PDF..."
pdftk *.pdf cat output to_result.pdf
rm *.to.pdf
img2pdf *.jpg -o img_result.pdf
pdftk to_result.pdf multistamp img_result.pdf output $SOURCE/result.pdf
