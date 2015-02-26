# Weka Algorithms

## Weka Classifiers

[Weka](http://www.cs.waikato.ac.nz/ml/weka/) is a library of machine learning algorithms implemented in Java. The [Weka](https://algorithmia.com/users/weka) algorithms that are on Algorithmia take in flat Json as input. It is assumed that any data that is going to be used with these algorithms will be large in size, so all interaction is done through [Data](http://algorithmia.com/data) collections. The classes in the Weka package that inherit from the same class call into one [main algorithm](https://algorithmia.com/algorithms/weka/WekaClassification) that initializes the relevant subclass and handles training and evaluation. 

You can use the [Data](https://algorithmia.com/assets/doc/java/index.html) api to query (CollectionRef->list()) the sample training data we host under two collections: data://weka/NumericSamples and data://weka/NominalSamples.

You can look at the [DigitRecognition algorithm](https://algorithmia.com/algorithms/weka/DigitRecognition) we made for a quick demo. That algorithm takes in either a matrix or an array of doubles that represent a black and white picture. The picture is a hand-drawn digit, and we feed it to a pretrained model on the MNIST dataset that will classify which of the 10 digits this particular one is. 

The DigitRecognition algorithm is the algorithm that we use in our [blog post](http://algorithmia.com/blog), and the input looks like:

```
[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,255,255,255,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,255,255,255,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,255,255,0,0,255,255,255,255,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,255,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,255,0,0,255,255,0,0,255,255,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,255,255,255,255,0,0,0,0,255,255,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,255,255,255,0,0,0,0,0,255,255,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
```

So it is actually a representation of the number 2 that we draw on the canvas. Giving this raw `double[][]` input into the DigitRecognition algorithm, we let it prepare the proper Json input for the main algorithm and call it, obtain the classification result and return it:

```
Instance inst = new Instance(1.0, newArray);
return apply(inst);
```

```
JsonObject mainElt = new JsonObject();
Gson gson = new Gson();
String elt = gson.toJson(inst);
JsonObject obj = gson.fromJson(elt, JsonObject.class);
mainElt.add("example",obj);
mainElt.addProperty("trainUrl","data://weka/DigitModel/trainSmall.arff");
mainElt.addProperty("classIndex",784);
mainElt.addProperty("mode","single");
mainElt.addProperty("modelUrl","data://weka/DigitModel/model50.txt");
mainElt.addProperty("demo","handwriting");
return Algorithmia.call("/weka/WekaClassification", mainElt, JsonObject.class);
```

A step-by-step explanation of how to train a Weka model is provided here.

* Create a collection on algorithmia.com/data and upload your training data. We will assume that the collection is called “SampleCollection”, and we will also assume that the training data you uploaded is called “train.csv”.
* Any transformation you would like to do on the data can be done by the preprocessing tools on the platform. For example, CsvToArff algorithm on the platform just takes in the Data url to the csv file that you uploaded and a path that you specify for the result arff file and does all the work for you. There are also algorithms that do transformations, etc
* Let’s assume that you would like to train a random forest model with 10-fold cross-validation.   This means, the mode will be equal to “train”, we will provide the url to the file in our Data collection through the “trainUrl” parameter, we will provide a url to save the model to, through modelSaveUrl, and we will set the cv option to 10. We will not set any options through the “option” parameter, but looking at each different option on Weka’s website, you can set any option you like through this parameter by specifying the option name and option value, separated by a space. Lastly, Weka needs to know the class label index (columnwise) to be able to tell how to learn. This is done through the classIndex parameter. The final input to the algorithm will look like this: {}
* Once we supply this input to the Random Forest algorithm, the algorithm will return the statistical results of the cross-validated training phase. Do not worry, navigate to the collection you specified for the model to be saved, and there, you will see your trained model!

That is it! You can read about the other parameters below. The main algorithm was designed with all of the functions of classification in mind. For example, passing in the number of cross-validation folds and a trainUrl makes testUrl parameter not required.

The parameters that are passed in via the Json object are as follows:

* mode: One of train/update/load. Use "train" to train a new classifier, use "update" if you have new instances to train an existing updateable classifier, use "load" to load an existing classifier for classifying test data
* trainUrl: The path to the training data that you uploaded to your Data collection. This file needs to be in the arff format. If your data is in a different format, you can search our platform for a converter (e.g. -link to csv to arff-)
* testUrl: The path to the test data that you would like to get the labels using this classifier (optional if you would like to use the cross-validation option -train mode-)
* modelUrl: The path that has an already trained and saved model to load (optional, required for loading mode only)
* modelSaveUrl: The path that you would like to save the model to (if you give the path to an existing file, it will be overwritten)
* cv: The number of cross-validation folds that you would like to use
* options: A string that contains any options that you would like to specifically set for this classifier (format: param name followed by desired value separated by space: e.g. "-C 5 -t 2"). For options specific to this classifier, please see Wekadocs linked above
classIndex: Specify the index of the class values in the test set (caution: When using a test set, assumes that the class values are at the last index if the classIndex parameter is not specified, so please arrange accordingly)

```
private String type = "Logistic", mode, options, trainUrl, testUrl, modelUrl;
        private double[] example;
        private int cv = 10, classIndex = -1;
```

As mentioned, all of the classifiers on the platform just add the type of the classifier to this information and pass it to the central Weka classifier algorithm. This allows for code reuse and easily controllable behavior.

We are currently using the Weka version 3.6.11, available on Maven central. That code is licensed under [GPL 2.0](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html) and thus, all of our code is available and holds the same license.
