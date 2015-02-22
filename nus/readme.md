# National University of Singapore Algorithms

##Search Engine Aggregator

This algorithm uses Google, Bing, DuckDuckGo, Facebook, Twitter and Wikipedia to search for a given phrase. You can either pass in just your search query, in which case the algorithm sets the number of returned results to 10 and searches all of the supported engines, or you can specify the number of results, the engines you prefer and the query in a flat Json, as demonstrated in the sample input. The output is structured Json where the first object contains the results (objects that contain the search client name and the title, url and snippet of the top results in an array) and the second object contains information specific to search clients on how long the search took and how many total results were there.

## Background Search

This algorithm is very similar to the aggregate search engine but instead of Facebook and Twitter’s pages and tweets, it searches through the users of these services. It is intended to serve as an aggregate of the online information about a particular person. The API rate limits of the services apply, so you are welcome to use your own API keys for these services to build other algorithms.