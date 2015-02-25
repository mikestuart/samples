#QR Codes and Barcodes
[ZXing]: https://github.com/zxing/zxing
[barcode]: https://algorithmia.com/users/barcode

Using the [ZXing] [] library, we provide you with the ability to both read and write QR codes and certain types of 1D barcode. All codes are read from and written to the Data API. Algorithms are grouped under username [barcode] [].

Before running this you must create a data directory title, just call it QRCodes. The following command will create a QR code encoding the provided text (“Bananas.”) and post it as qrCodeTest.png to QRCodes.

```
curl -X POST -d '["Bananas.","data:/<your username>/QRCodes/","qrCodeTest","png",200,200]' -H 'Content-Type: application/json' -H 'Authorization: <your API key>’' http://api.algorithmia.com/api/barcode/QRCodeGenerator
```

To read a barcode, place an image containing in one of your directories and execute this command.

```
curl -X POST -d '"data://<your username>/<your directory>/qrCodeTest.png"' -H 'Content-Type: application/json' -H 'Authorization: <your API key>' http://api.algorithmia.com/api/barcode/QRCodeReader
```
```
"Bananas."
```

The QR Code reader and generator can also handle a few other barcode formats - consult the individual algorithm pages for more.
