# Time Series

A lot of data comes in the form of real-valued signal that vary in time - stock prices, website traffic volume, sensor readings, etc. Sometimes the volume is low enough that a simple eye-balling of the data will do for interpretation, but more often than not, there’s so much, or it is so noisy that other tools are needed. Some tasks are very simple, such as locating any points in a series that exceed a certain threshold. Others are more complicated, such as removing known seasonality so as to isolate truly novel components of the signal. Many are simply pre-processing routines that put the data in a form more suitable for other methods of analysis, such as linear trend removal. Many of these algorithms are based on the Fourier transform implemented in the JTransforms library. All of our time series algorithms take a double array as input, representing an evenly spaced sampling of the time-varying signal.

More often than not, interesting applications will require several stages of processing and analysis. For instance, suppose you have a bunch of data on traffic to a major website, and wish to understand what influences traffic to this site. Perhaps you want to figure it out in order to do better server provisioning, or you’re trying to determine if an advertising campaign actually increased traffic. 

[TimeSeries]: https://algorithmia.com/users/TimeSeries

This is of course an extremely complex problem but a few good tools will get you a long way. We've put some of them under the username [TimeSeries] [] A full dataset for this problem won’t be terribly cooperative with copy paste, so where possible, we’ll use a toy time series to illustrate the relevant algorithm.

One of the easier questions to ask  is  “is traffic increasing or decreasing over time?” You can answer this approximately and very quickly by running your time series through TimeSeriesSummary. This calculates a bunch of basic empirical statistics (using Apache Commons Math), including mean, min, max, variance, standard deviation, and others. Most pertinent to the question at hand though, are the parameters of the linear model the algorithm fits to the data, the slope and correlation. A positive slope means an increasing trend, a negative one means decreasing, and close to zero means it isn’t changing much. Correlation gives you an idea how well the data fits the linear trend and variance/standard deviation will give you an idea how scattered the data is overall. The exact interpretation of these statistics is of course dependent on your particular problem.

```
curl -X POST -d '[0.0,0.99,2.1,3.0,3.8]' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/TimeSeries/TimeSeriesSummary
```
```
{"max":3.8,"var":2.3169199999999996,"geometricMean":0.0,"populationVariance":1.8535359999999996,"slope":0.961,"kurtosis":-1.393434890760644,"min":0.0,"correlation":0.9982466760726403,"intercept":0.05600000000000023,"mean":1.978,"rmse":0.08058535847162314,"skewness":-0.18733140947198368,"standardDeviation":1.522143225849657}
```

Often, we will want to remove the linear trend, either to expose deviations from the trend, or prepare the data for the next step of analysis. This is particularly important for seasonality analysis (discussed below), as these methods tend to behave badly on data that isn’t detrended.

```
curl -X POST -d '[0.1,0.9,1.8,3.0,4.1,5.2]' -H 'Content-Type: application/json' -H ‘Authorization: <your API key>’' http://api.algorithmia.com/api/TimeSeries/LinearDetrend
```
```
[0.1761904761904765,-0.060952380952380605,-0.1980952380952377,-0.035238095238094694,0.027619047619047585,0.09047619047619075]
```

There are other kinds of patterns that frequently occur in time series, such as periodic variation. This can occur over many scales, time of day (for instance, high at noon, low at midnight), day of the week (entertainment related sites might see high traffic on the weekends and lower traffic on weekdays), time of year (online retailers see an uptick around the holidays), or even longer time intervals like two-year election cycles (news sites). One of the simplest ways to detect seasonality is to produce an autocorrelation plot of a signal, which you can produce with /kenny/AutoCorrelate. See the algorithm page for more details of how to use the algorithm and interpret the results.

To remove this periodic variation, either a specific period that you designate or just the strongest periodic signals detected automatically, use /TimeSeries/RemoveSeasonality. The algorithm has a number of options, the most useful of which is “topNPeriods”, which removes the top N strongest periods detected in a signal. In this case, we use the other argument to set N to 1, so we remove only the dominant period.

```
curl -X POST -d '[[1,2,1,2,1,2,1,2,1,2],1,"topNPeriods"]' -H 'Content-Type: application/json' -H 'Authorization: <your api key>' http://api.algorithmia.com/api/TimeSeries/RemoveSeasonality
```
```
[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]
```

This is a somewhat artificially pristine time series with a period of 2, which is detected and removed perfectly. The values of the returned series should be interpreted as residuals, that is, this difference from what would be expected given knowledge of the periodic signal.

There are more algorithms for various form of seasonality removal, as well as for denoising and anomaly detection. The denoising algorithms are mostly moving averages, with the appropriateness of their application and the proper interpretation of their results depending very much of the specific problem being addressed. Our anomaly detection algorithms are fairly simple, detecting either thresholds exceeded, sudden jumps/dips, or values laying beyond a certain number of standard deviations beyond the rest of the data.

To complete our described use case, assume that we specifically want to see if an advertising campaign influenced traffic to a website. It isn’t enough just to look at the time period the campaign was supposed to have an effect, as other components of the signal may obscure it. Instead, we detrend, then remove seasonality. Real increases will in this case become much more obvious. Alternatively, if we are doing exploratory data analysis, we can go through all the previously described procedures to characterize linear and periodic trends, then detrend, remove seasonality, and run anomaly detection algorithms to figure out where unexpected traffic occurred, starting from there to seek explanations.
[this website]: https://datamarket.com/data/list/?q=cat:edb%20provider:tsdl

If you want to play with some more substantial data, have a look at [this website] [].
