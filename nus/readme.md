# National University of Singapore Algorithms

##Search Engine Aggregator

This algorithm uses Google, Bing, DuckDuckGo, Facebook, Twitter and Wikipedia to search for a given phrase. You can either pass in just your search query, in which case the algorithm sets the number of returned results to 10 and searches all of the supported engines, or you can specify the number of results, the engines you prefer and the query in a flat Json, as demonstrated in the sample input. The output is structured Json where the first object contains the results (objects that contain the search client name and the title, url and snippet of the top results in an array) and the second object contains information specific to search clients on how long the search took and how many total results were there. Given below is a simple request to this algorithm:

```
<script src="//algorithmia.com/assets/javascripts/algorithmia.js" type="text/javascript"></script>
<script>
var input = "John Doe";
var api_key = "YOUR_API_KEY";
Algorithmia.client(api_key).algo("algo://nus/SearchEngineAggregator").pipe(input).then(console.log);
</script>
```

## Background Search

This algorithm is very similar to the aggregate search engine but instead of Facebook and Twitter’s pages and tweets, it searches through the users of these services. It is intended to serve as an aggregate of the online information about a particular person. The API rate limits of the services apply, so you are welcome to use your own API keys for these services to build other algorithms.

Here is a sample output for querying the algorithm for "John Doe":

```
{  
   "results":[  
      {  
         "client":"GoogleCustomClient",
         "results":{  
            "results":[  
               {  
                  "title":"John Doe - Wikipedia, the free encyclopedia",
                  "url":"http://en.wikipedia.org/wiki/John_Doe",
                  "snippet":"The names 'John Doe' for males, 'Jane Doe' or 'Jane Roe' for females, or ' Jonnie Doe' and 'Janie Doe' for children, or just 'Doe' non-gender-specifically areÂ ..."
               },
               {  
                  "title":"John Doe (TV Series 2002â2003) - IMDb",
                  "url":"http://www.imdb.com/title/tt0320038/",
                  "snippet":"Created by Brandon Camp, Mike Thompson. With Dominic Purcell, Jayne Brook, John Marshall Jones, William Forsythe. A man who seems to know everythingÂ ..."
               },
               {  
                  "title":"B.o.B - John Doe ft. Priscilla [Official Video] - YouTube",
                  "url":"http://www.youtube.com/watch?v=lZsj8uH2I8Q",
                  "snippet":"Jan 16, 2014 Download 'John Doe' ft. Priscilla - Available Everywhere http://smarturl.it/johndoe Stream: http://smarturl.it/streamjohndoe Directed By: K. AsherÂ ..."
               },
               {  
                  "title":"John Doe",
                  "url":"http://www.theejohndoe.com/",
                  "snippet":"John Doe News Â· John Doe's Tour Dates Â· John Doe's Bio Â· John Doe's Music Â· John Doe Photos Â· John Doe Videos Â· LinksÂ ..."
               },
               {  
                  "title":"John Doe (musician) - Wikipedia, the free encyclopedia",
                  "url":"http://en.wikipedia.org/wiki/John_Doe_(musician)",
                  "snippet":"John Doe (born John Nommensen Duchac; February 25, 1954) is an American singer, songwriter, actor, poet, guitarist and bass player. Doe co-founded theÂ ..."
               },
               {  
                  "title":"John Doe - TV.com",
                  "url":"http://www.tv.com/shows/john-doe/",
                  "snippet":"John Doe: Watch full length episodes & video clips. Read the latest John Doe episode guides & recaps, fan reviews, news, and much more."
               },
               {  
                  "title":"Watch John Doe Online - Free at Hulu",
                  "url":"http://www.hulu.com/john-doe",
                  "snippet":"Watch John Doe free online. Stream episodes and clips of John Doe instantly."
               },
               {  
                  "title":"John Doe: Vigilante | Hero or Villain? Justice or Vengeance? You ...",
                  "url":"http://johndoevigilantefilm.com/",
                  "snippet":"John Doe: Vigilante is a thrilling ride that you can now experience in the comfort of your own home. Check back regularly to find out where you can buy/rent John Â ..."
               },
               {  
                  "title":"John Doe investigation of Gov. Scott Walker's campaign must continue",
                  "url":"http://www.jsonline.com/news/opinion/john-doe-investigation-of-gov-scott-walkers-campaign-must-continue-b99345069z1-274159491.html",
                  "snippet":"Sep 5, 2014 The secret John Doe probe, a peculiarity of Wisconsin law, was launched by Milwaukee County District Attorney John Chisholm, a Democrat,Â ..."
               },
               {  
                  "title":"iTunes - Music - John Doe (feat. Priscilla) - Single by B.o.B",
                  "url":"https://itunes.apple.com/us/album/john-doe-feat.-priscilla-single/id761864897",
                  "snippet":"Dec 3, 2013 Preview songs from John Doe (feat. Priscilla) - Single by B.o.B on the iTunes Store. Preview, buy, and download John Doe (feat. Priscilla)Â ..."
               }
            ]
         }
      },
      {  
         "client":"TwitterClient",
         "results":{  
            "results":[  
               {  
                  "title":"????@sony????? (xeno_john_doe)",
                  "url":"https://twitter.com/xeno_john_doe/status/555888256022097922",
                  "snippet":"????????????????????????????????????????????????????"
               },
               {  
                  "title":"?????????bot (John_Doe_bot)",
                  "url":"https://twitter.com/John_Doe_bot/status/555887974638817280",
                  "snippet":"?????????????????"
               },
               {  
                  "title":"iamjoegarcia (likejoe)",
                  "url":"https://twitter.com/likejoe/status/555887916535132160",
                  "snippet":"That John Wall cut dribble doe!"
               },
               {  
                  "title":"Ben Dorries (bendorries)",
                  "url":"https://twitter.com/bendorries/status/555886794403618816",
                  "snippet":"@BarringtonD I dunno but really looking forward to the big clash between John Doe and Zheng Li Long Wi"
               },
               {  
                  "title":"IreaBrittany (IreaBrittany)",
                  "url":"https://twitter.com/IreaBrittany/status/555885530919878657",
                  "snippet":"Mascle watch-night service control: the lucrative interest vice an john doe concerning so allow for: qSwxSuAzF"
               },
               {  
                  "title":"Siel Broer Vyf (GÃ¤d) (Avatar_Kasper)",
                  "url":"https://twitter.com/Avatar_Kasper/status/555885382558945280",
                  "snippet":"Check out @rahmagawd documentary for his sophomore tape 'John Doe' and it contains the date for hisâ¦ http://t.co/jS7ZNUeQ0a"
               },
               {  
                  "title":"Pascal Gabo (Paskyg2293)",
                  "url":"https://twitter.com/Paskyg2293/status/555884629563944961",
                  "snippet":"John Doe nigga, you know that convo nigga ??"
               },
               {  
                  "title":"OGCK (OgCrooklyn)",
                  "url":"https://twitter.com/OgCrooklyn/status/555883821380280320",
                  "snippet":"RT @Avatar_Kasper: New track today coming from @rahmagawd (featuring @ogcrooklyn) up than anticipation for 'John Doe'â¦ http://t.co/54D70ug0Id"
               },
               {  
                  "title":"Binjin (__Timberlee)",
                  "url":"https://twitter.com/__Timberlee/status/555881948359323648",
                  "snippet":"Heyyyy. Dorrians name in my phone will be John Doe ????."
               },
               {  
                  "title":"HamphreyDunce (HamphreyDunce)",
                  "url":"https://twitter.com/HamphreyDunce/status/555881565192859649",
                  "snippet":"Cambridge dam true john doe - empathetic very gentry advantage: xWQlQzeLk"
               }
            ]
         }
      },
      {  
         "client":"FacebookClient",
         "results":{  
            "results":[  

            ]
         }
      },
      {  
         "client":"DuckDuckGoClient",
         "results":{  
            "results":[  
               {  
                  "title":"Wikipedia",
                  "url":"https://en.wikipedia.org/wiki/John_Doe_(disambiguation)",
                  "snippet":""
               },
               {  
                  "title":"John Doe",
                  "url":"https://duckduckgo.com/John_Doe",
                  "snippet":"John Doe The names 'John Doe' for males, 'Jane Doe' or 'Jane Roe' for females, or 'Jonnie Doe' and..."
               },
               {  
                  "title":"\"John Doe\" (song)",
                  "url":"https://duckduckgo.com/John_Doe_(song)",
                  "snippet":"'John Doe' (song)A song by American hip hop recording artist B.o.B, featuring guest vocals from American..."
               },
               {  
                  "title":"John Doe (musician)",
                  "url":"https://duckduckgo.com/John_Doe_(musician)",
                  "snippet":"John Doe (musician)An American singer, songwriter, actor, poet, guitarist and bass player."
               },
               {  
                  "title":"John Doe (Seven)",
                  "url":"https://duckduckgo.com/seven_(film)",
                  "snippet":"John Doe (Seven)A 1995 American detective-psychological thriller film written by Andrew Kevin Walker and directed..."
               },
               {  
                  "title":"John Doe (TV series)",
                  "url":"https://duckduckgo.com/John_Doe_(TV_series)",
                  "snippet":"John Doe (TV series)An American science fiction drama television series that aired on Fox during the 2002â2003 TV..."
               },
               {  
                  "title":"\"John Doe\" (Prison Break)",
                  "url":"https://duckduckgo.com/John_Doe_(Prison_Break)",
                  "snippet":"'John Doe' (Prison Break)The thirty-sixth episode of the American television series Prison Break and is the fourteenth..."
               },
               {  
                  "title":"\"John Doe\" (The X-Files)",
                  "url":"https://duckduckgo.com/John_Doe_(The_X-Files)",
                  "snippet":"'John Doe' (The X-Files)The seventh episode of the ninth season of the American science fiction television series The..."
               },
               {  
                  "title":"Johndoe",
                  "url":"https://duckduckgo.com/Johndoe",
                  "snippet":"JohndoeA Norwegian punk, rock and powerpop band from Trondheim made up of Jonas Skybakmoen, Terje Uv..."
               },
               {  
                  "title":"D.O.E.",
                  "url":"https://duckduckgo.com/D.O.E.",
                  "snippet":"D.O.E. D.O.E. is an American rapper/songwriter, born in North Side Queens."
               }
            ]
         }
      },
      {  
         "client":"BingClient",
         "results":{  
            "results":[  
               {  
                  "title":"John Doe (TV Series 2002â2003) - IMDb",
                  "url":"http://www.imdb.com/title/tt0320038/",
                  "snippet":"With Dominic Purcell, John Marshall Jones, Jayne Brook, William Forsythe. A man who seems to know everything but his own name helps police solve crimes as he searches"
               },
               {  
                  "title":"John Doe",
                  "url":"http://theejohndoe.com/",
                  "snippet":"ALL ABOARD!! 2015 Roots On The Rails, Train Trip: John Doeâs Golden State Xpress. John Doeâs first best-ever collection, on pre-order now: READ MORE"
               },
               {  
                  "title":"John Doe - Wikipedia, the free encyclopedia",
                  "url":"http://en.wikipedia.org/wiki/John_Doe",
                  "snippet":"The names 'John Doe' for males, 'Jane Doe' or 'Jane Roe' for females, or ' Jonnie Doe ' and ' Janie Doe ' for children, or just ' Doe ' non-gender-specifically are"
               },
               {  
                  "title":"John Doe (musician) - Wikipedia, the free encyclopedia",
                  "url":"http://en.wikipedia.org/wiki/John_Doe_(musician)",
                  "snippet":"John Doe (born John Nommensen Duchac ; February 25, 1954) is an American singer, songwriter, actor, poet, guitarist and bass player. Doe co-founded the much-praised"
               },
               {  
                  "title":"John Doe (TV series) - Wikipedia, the free encyclopedia",
                  "url":"http://en.wikipedia.org/wiki/John_Doe_(TV_series)",
                  "snippet":"John Doe is an American science fiction drama television series that aired on Fox during the 2002â2003 TV season. Contents 1 Synopsis 2 Who is John Doe? 3 Cast 3.1"
               },
               {  
                  "title":"John Doe - TV.com",
                  "url":"http://www.tv.com/shows/john-doe/",
                  "snippet":"John Doe: Watch full length episodes & video clips. Read the latest John Doe episode guides & recaps, fan reviews, news, and much more."
               },
               {  
                  "title":"Amazon.com: John Doe: Songs, Albums, Pictures, Bios",
                  "url":"http://www.amazon.com/John-Doe/e/B000AQ3IB2",
                  "snippet":"Visit Amazon.com's John Doe Store to shop for John Doe albums (CD, MP3, Vinyl), concert tickets, and other John Doe-related products (DVDs, Books, T-shirts). Also"
               },
               {  
                  "title":"Watch John Doe Online - Free at Hulu - Watch TV and movies",
                  "url":"http://www.hulu.com/john-doe",
                  "snippet":"Watch John Doe free online. Stream episodes and clips of John Doe instantly."
               },
               {  
                  "title":"John doe | Define John doe at Dictionary.com",
                  "url":"http://dictionary.reference.com/browse/John+Doe",
                  "snippet":"The judge issued a John Doe warrant so the police could arrest the culprit when they identified him."
               },
               {  
                  "title":"john doe | LinkedIn",
                  "url":"https://www.linkedin.com/pub/john-doe/b0/295/147",
                  "snippet":"View john doe's professional profile on LinkedIn. LinkedIn is the world's largest business network, helping professionals like john doe discover inside connections to"
               }
            ]
         }
      }
   ]
}
```