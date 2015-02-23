#################################################################
# Simple python app that uses 2 algorithms in algorithmia API   #
#     - Profanity Profanity                                     #
#     - Sentiment Analysis                                      #
#                                                               #
# Author: John Hammink <john.b.hammink@gmail.com>               #
#################################################################

import urllib2, json

def get_cuss_index(sentiment):
	url = 'https://api.algorithmia.com/api/nlp/ProfanityDetection'
	filterwords = ["cuss", "blow", "spooge", "waste"]
	ignore = True
	data = """["%s", ["%s"], %s]""" % (sentiment, filterwords, ignore)
	req = urllib2.Request(url, data, {'Content-Type': 'application/json'})
	req.add_header('Authorization', '[ALGORITHMIA API KEY]')
	response = urllib2.urlopen(req, json.dumps(data))
	f = response.read()
	curseDict = json.loads(f)
	curseResult = curseDict['result']
	cuss_index = sum(curseResult.values())
	return cuss_index

def analyze_sentiment(sentiment):
	url2 = 'http://api.algorithmia.com/api/nlp/SentimentAnalysis'
	data2 = str(sentiment)
	req2 = urllib2.Request(url2, data2, {'Content-Type': 'application/json'})
	req2.add_header('Authorization', '[ALGORITHMIA API KEY]')
	response = urllib2.urlopen(req2, json.dumps(data2))
	g = response.read()
	analysis = json.loads(g)
	analysisResult = analysis['result']
	return analysisResult

def gimme_your_verdict(cuss_index, analysisResult):
	highArousal = '"My, we are feisty today! Take five or go for a skydive!"'
	mediumArousal = '"Seems like you are feeling pretty meh"'
	lowArousal = '"Hey dude, are you awake?"'

	if cuss_index >= 2 or analysisResult >= 3:
    	    print highArousal
	elif cuss_index >= 1 or analysisResult >= 2:
    	    print mediumArousal
	else:
    	    print lowArousal
	print "Come back tomorrow!"    
    
if __name__ == '__main__':
	print "Come estas amigo?"
	sentiment = str(raw_input("How was your day? Swearing is allowed , even encouraged: "))
	cuss_index = get_cuss_index(sentiment)
	analysisResult = analyze_sentiment(sentiment)
	gimme_your_verdict(cuss_index, analysisResult)

