# Mahout

[training]: https://algorithmia.com/algorithms/mahout/RandomForestTrain
[application]: https://algorithmia.com/algorithms/mahout/RandomForestApply

In machine learning, one usually first trains a model using labelled data then applies this model to label new (unlabelled) data. At this point, most algorithms in Algorithmia only operate on data stored in files, primarily CSV. Both data and trained models are stored and accessed via the Data API. We currently expose Mahout's random forests, split into [training] [] and [application] [] routines.

[training algorithm page]: https://algorithmia.com/algorithms/mahout/RandomForestTrain
To train a random forest model in Mahout, we specify the DataAPI url of the training set, the DataAPI url where we will put the trained model, a descriptor for the training set (see the [training algorithm page] for more info, but in this case, the descriptor is a string specifying columns of the training data, where L denotes the category label and N denotes a numerical attribute), and the number of trees in the trained random forest. The algorithm returns the DataAPI url of the file that holds the random forest model.

[the API documentation]: https://algorithmia.com/docs/api#data
We host the training data in a directory under the mahout user, but you need to store the trained model under your own account. Create a data directory under your username called DigitRecognizer, see [the API documentation] [] for instructions.

```
curl -X POST -d '["data://mahout/DigitRecognizer/trainShort.csv", "data://<your username>/DigitRecognizer/rfShort.model","L N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N ", 100]' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/mahout/RandomForestTrain
```
```
"data://mahout/DigitRecognizer/rfShort.model"
```

To apply the trained model, we specify the filepath of the data we wish to label, the filepath of the model, the filepath of the original training data (it isn’t all loaded, but is necessary to inform the labelling algorithm), and a data descriptor string. For this example we use a small file containing 3 handwritten digits, 7,5, and 1.

```
curl -X POST -d '["data://mahout/DigitRecognizer/testShortNoLabelPlusHeader.csv","data://<your username>/DigitRecognizer/rfShort.model","data://mahout/DigitRecognizer/train.csv","L N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N N "]' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/mahout/RandomForestApply
```
```
[7,5,1]
```

[recommendation]: https://algorithmia.com/algorithms/mahout/Recommendation
We have also included Mahout’s [recommendation] functionality. Recommendation is in practice related to machine learning but in some ways simpler, as there is no distinction between training and test data and no model is trained per se. The recommender takes a CSV file (via the Data API) as input, where each line is of form userID,itemID,value, where the first two refer to a specific user and a specific item, respectively, and the last denotes the user’s preference for the item (often 1 through 5, referring to the 1 through 5 star scale, though other (non-negative) real values are possible). We currently expose the major modes of the recommender, user-based,item-based, and matrix factorization. To do user-based recommendation on a movie rating dataset, run the cURL command below, specifying the DataAPI url of the preferences file (“movies.csv in this case”), the DataAPI url of the file in which we store the resulting recommendations, and the mode, which in this case is user-based.

Create a data folder called Recommender, modify the curl command below with your username and your api key.

```
curl -X POST -d '["data://mahout/Recommender/movies.csv","data://<your username>/Recommender/demoRec.txt","user"]' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/mahout/Recommendation
```
