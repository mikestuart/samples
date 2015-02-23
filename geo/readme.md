# Geo

Sometimes you want to know something about elsewhere in the world. If you happen to have latitude/longitude coordinates for the specific elsewhere in the world (or a zipcode, if you’re in the U.S.), we can help you. Most of this functionality is fairly simple but might be a bit of work to get running yourself. Note that zip code data is based on data acquired from http://federalgovernmentzipcodes.us/, using data last updated 1/22/2012, so we can’t guarantee that everything is completely up to date. We have algorithms to retrieve various information pertaining to zipcodes, including state, demographic information, approximate latitude/longitude, etc. For latitude/longitude, we have algorithms to convert back and fourth between UTM (Universal Transerse Mercator coordinates, see here for more detail), and to find the geographic distance between two points.

```
curl -X POST -d '98101' -H 'Content-Type: application/json' -H 'Authorization: <your API key>' http://api.algorithmia.com/api/Geo/ZipToState
```
```
"WA"
```

```
curl -X POST -d '[47.6097,-122.3331]' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/Geo/LatLongToUTM
```
```
[10,"T",550121.0,5273137.0]
```

```
curl -X POST -d '"10 T 550121.0 5273137.0"' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/Geo/UTMToLatLong
```
```
[47.60970054642407,-122.33310941654601]
```
