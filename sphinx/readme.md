# Speech Recognition

The speech recognition (SR) algorithm on the platform uses [CMU Sphinx](), an open source library. The trained models are obtained from the [SourceForge page]() and are the latest in English model. If you would like to use different models in your speech recognition task, please feel free to use this algorithm as an example. We currently have two different algorithms under the sphinx namespace. The [Adaptive SR algorithm]() takes twice as long as the generic [SR algorithm]() because it makes an effort to adapt the recognition stats to the specific speaker by “listening to” the audio twice. If you are interested in this paradigm, you can read more about it here:


The first input to the algorithm is the link to the media file (either a Data url that contains a sound file or a Youtube video url) and the second input to the algorithm is the collection where the extracted text should be written to (a Data collection url). 

We can only process the Youtube videos that are licensed under the Creative Commons license due to the prohibitive nature of the Standard Youtube License. The algorithm runs the raw Youtube video found in the link through a pipeline of downloading it, extracting the sound, converting the sound file to the correct format and then performing SR on it. If instead of a Youtube link, a link to a file in a Data collection is given; the algorithm treats it as a sound file and just converts it to the correct format before performing SR. If you would like to upload a video file, you can preprocess it with the [sound extraction algorithm]().

![SR Pipeline](SRpipeline.png)