// inject scripts into tab context
bootstrapPHPPScript("js/algorithmia.js");
bootstrapPHPPScript("js/mustache.js");
bootstrapPHPPScript("js/recommender.js");

// set extension path
var script = document.createElement('script');
script.appendChild(document.createTextNode('var PHPP_PATH = "'+ chrome.extension.getURL("") +'";'));
(document.head || document.documentElement).appendChild(script);

function bootstrapPHPPScript(name)
{
	console.log("[PGEN] Loading " + name);
	
	var j = document.createElement('script');
	j.src = chrome.extension.getURL(name);
	(document.head || document.documentElement).appendChild(j);
}

