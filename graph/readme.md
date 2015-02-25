# Graph Algorithms

Most of the graph algorithms on the platform can work with two modes of input. They have a basic graph reader that can handle .gml files and you can also pass in adjacency lists in the form of Map<String,String[]> edgeMap or Map<String, Map<String, Double>>. Please refer to specific algorithm’s description pages for more details. If you have data in any other format, please search the site for a converter, and if none is there to be found, please [contact us](mailto:support@@algorithmia.com).

Depending on the algorithm, there may be some requirements on the type of the graph input. The most specialized versions would be Directed and Weighted, Undirected and Weighted, Directed but not Weighted, Undirected and not Weighted. If the requirements of the algorithm are not too specific, algorithms read the data in the most relaxed way (e.g. if it does not matter whether the graphs is weighted or not) automatically. 

Here is a code sample in Java, for calling [Minimum Spanning Tree algorithm](https://algorithmia.com/algorithms/graph/JKruskalMinimumSpanningTree). Note that this code depends on [Gson](https://code.google.com/p/google-gson/) and [Apache Commons](https://commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/IOUtils.html) libraries.

```
		URL url = new URL("http://api.algorithmia.com/api/graph/JKruskalMinimumSpanningTree");
        URLConnection urlConnection = url.openConnection();
        urlConnection.setDoInput(true);
        urlConnection.setDoOutput(true);
        urlConnection.setRequestProperty("Content-Type", "application/json");
        urlConnection.setRequestProperty("Authorization", "YOUR_API_KEY");
        urlConnection.setRequestProperty("Accept", "application/json");
        urlConnection.connect();
        OutputStreamWriter outputStream = new OutputStreamWriter(urlConnection.getOutputStream());
        Map<String, String[]> map = new HashMap<>();
        String a = "a", b = "b", c = "c";
        map.put("a", new String[]{b});
        map.put("b", new String[]{c});
        map.put("c", new String[]{a});
        outputStream.write(new Gson().toJson(map));
        outputStream.flush();
        outputStream.close();
        HttpURLConnection httpConn = (HttpURLConnection) urlConnection;
        InputStream is;
        if (httpConn.getResponseCode() >= 400) {
            is = httpConn.getErrorStream();
        } else {
            is = httpConn.getInputStream();
        }
        List<String> list = IOUtils.readLines(is,"UTF-8");
        StringBuilder sb = new StringBuilder();
        for(String s : list){
            sb.append(s + "\n");
        }
        System.out.println(sb.toString());
```