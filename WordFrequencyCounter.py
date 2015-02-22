import urllib2
url = 'http://api.algorithmia.com/api/diego/WordFrequencyCounter'
data = '"Counting all the magic magic counting words."'
req = urllib2.Request(url, data, {'Content-Type': 'application/json'})
req.add_header('Authorization', '[ALGORITHMIA API KEY]')
f = urllib2.urlopen(req)
for x in f:
	    print(x)
f.close()