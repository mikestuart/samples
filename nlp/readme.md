# NLP

Natural Language Processing is a body of research concerned with extracting meaning from language, usually in the form of text. We have made available some of the most popular open source software for processing natural language text, including most of Stanford’s CoreNLP and Apache’s OpenNLP, in addition to a few other tools. These algorithms are collected under usernames StanfordNLP, ApacheOpenNLP, and nlp

Many of these tools are concerned simply with putting the text into an easier to use form, like splitting it into sentences, splitting sentences into words (or tokens, as they are more commonly known), and reducing words to their lemmas (simplified forms).


Others do more advanced things like identifying parts of speech or parsing the sentence for grammatical structure. We may not remember what coordinating conjunctions or gerunds are, but thanks to NLP, we don’t have to.

```
curl -X POST -d '"The dog chased the ball"' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/StanfordNLP/POSTagger
```
```
[["DT","NN","VBD","DT","NN"]]
```

Note this uses the grammar labelling conventions of the Penn Treebank, see the page for /StanfordNLP/POSTagger to learn more.

There are also tools to identify the types of entities referred to in a text.

```
curl -X POST -d '"Jim went to Stanford University and later worked for Microsoft."' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/StanfordNLP/NamedEntityRecognition
```
```
[["Jim","PERSON"],["went","O"],["to","O"],["Stanford","ORGANIZATION"],["University","ORGANIZATION"],["and","O"],["later","O"],["worked","O"],["for","O"],["Microsoft","ORGANIZATION"],[".","O"]]
```
At the moment our tools are targeted for English, but most of them include the option to upload your own models, for English or other languages, via the data API. This is just a sampling of the algorithms, also included are things like language detection/identification, profanity detection, sentiment analysis, coreference resolution, and automatic topic tagging. 
