# OpenCV algorithms

Using [OpenCV Java wrappers](https://github.com/PatternConsulting/opencv) on Algorithmia requires some setup, but nothing that will take too much time.

Let's go through the step required to create your own algorithm that uses OpenCV. These requirements are not specific to our platform. First, make sure that you add the dependencies:

```
libraryDependencies += "nu.pattern" % "opencv" % "2.4.9-7"
```

Then, to avoid encountering the "UnsatisfiedLinkError" problem, in your code, inside a static block, do:

```
nu.pattern.OpenCV.loadLocally();
```

Now you are ready to code away! Here is a [sample algorithm](https://algorithmia.com/algorithms/zskurultay/ImageSimilarity/edit). This algorithm tries to measure the similarity between two given images by using OpenCV's pattern detection algorithms. The process includes feature detection, descriptor extraction and matching. First off, reading an image into a Mat is straightforward, using [Data](http://algorithmia.com/data) api, just do:

```
private Mat readImages(String url) throws IOException{
	    FileRef fileRef = DataAPI.get(url);
	    File file = fileRef.file();
        return Highgui.imread(file.getAbsolutePath(), Highgui.IMREAD_GRAYSCALE);
}
```

Then, you are free to play with the Mats:

```
private MatOfKeyPoint detectFeatures(Mat mat) {
	FeatureDetector featureDetector = FeatureDetector.create(FeatureDetector.SURF);
	MatOfKeyPoint keyPoints = new MatOfKeyPoint();
	featureDetector.detect(mat, keyPoints);
	return keyPoints;
}

private Mat computeDescriptors(Mat mat, MatOfKeyPoint kp){
	Mat descriptors = new Mat();
	DescriptorExtractor descriptorExtractor = DescriptorExtractor.create(DescriptorExtractor.SURF);
	descriptorExtractor.compute(mat, kp, descriptors);
	return descriptors;
}

private MatOfDMatch matchDescriptors(Mat d1, Mat d2){
	DescriptorMatcher descriptorMatcher = DescriptorMatcher.create(DescriptorMatcher.FLANNBASED); 
	MatOfDMatch matches = new MatOfDMatch();
	descriptorMatcher.match(d1, d2, matches);
	return matches;
}
```

The final code that uses the above methods looks like this:

```
public double measureSimilarity(String url1, String url2) throws IOException{
    	double result;
		Mat mat1 = readImages(url1);
		Mat mat2 = readImages(url2);

		MatOfKeyPoint keyPoints1 = detectFeatures(mat1);
		MatOfKeyPoint keyPoints2 = detectFeatures(mat2);

		Mat descriptors1 = computeDescriptors(mat1, keyPoints1);
		Mat descriptors2 = computeDescriptors(mat2, keyPoints2);
		MatOfDMatch matches = matchDescriptors(descriptors1, descriptors2);

		MatOfDMatch bestMatches = extractBestMatches(matches);

		result = calculateScore(bestMatches, keyPoints1, keyPoints2);
		System.out.println(result);
		return result;
	}
```

You can use your own calculateScore algorithm that matches your needs best.