FROM python:3

RUN apt-get update && apt-get -y upgrade && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    tesseract-ocr-ces \
    tesseract-ocr-slk \
    tesseract-ocr-eng \
    tesseract-ocr-deu \
    jpegoptim \
    pdftk

RUN pip install --upgrade pip

RUN pip install img2pdf

RUN mkdir -p \
    /source \
    /tmp/source

WORKDIR /digiport

ADD digiport.sh .

CMD ["/bin/bash","-c","./digiport.sh"]
