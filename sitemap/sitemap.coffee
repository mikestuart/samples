#
#  Algorithmia Site Crawler
#


api_key = "[[ALGORITHMIA API KEY GOES HERE]]"


# Initialize Angular
app = angular.module "algorithmia", []


# Graph opts
colorScale = d3.scale.linear().domain([0, 0.4, 1]).range(["yellow", "red", "#5000be"])


app.controller "SiteMapControl", ($scope, $http) ->
    # Defaults
    $scope.siteUrl = "http://wa.gov/"
    $scope.depthLimit = 20
    $scope.siteMap = {}
    $scope.scrapeStatus = ""
    pending = []
    count = 0

    # Link details
    $scope.link = {}

    # Auto scrape
    setTimeout((() -> $scope.scrape($scope.siteUrl)), 0)

    $scope.scrape = (url) ->
        $scope.siteMap = {}
        $scope.pagerank = null
        $scope.pagerankSorted = []
        $scope.link = {}
        pending = [url]
        count = 0
        startViz($scope)
        doScrape()

    doScrape = () ->
        $scope.scrapeStatus = "Scraping site..."
        if pending.length == 0 || count >= $scope.depthLimit
            # Done scraping, call pagerank
            $scope.scrapeStatus = "Running PageRank..."
            pagerank $scope.siteMap, (ranking) ->
                $scope.$apply () ->
                    $scope.scrapeStatus = ""
                    $scope.pagerank = ranking
                    $scope.pagerankSorted = sortMap(ranking)
                updateRanking(ranking)
                return
            return
        url = pending.shift()
        if ! $scope.siteMap[url]
            count++
            getLinks url, (error, links) ->
                if !error
                    $scope.siteMap[url] = links
                    $scope.$apply () ->
                        $scope.siteMap[url] = links
                    updateGraph($scope.siteMap)
                    pending = pending.concat(links)

                # Recurse
                doScrape()
                return
        else
            # Recurse
            doScrape()
        return

    # When a user clicks on a link, load summary and tags
    $scope.loadLink = (url) ->
        $scope.scrapeStatus = "Summarizing and tagging..."
        $scope.link = {}
        $scope.link.url = url
        Algorithmia.query "/util/Url2Text", api_key, url, (err, result) ->
            if err
                return
            Algorithmia.query "/nlp/Summarizer", api_key, result, (err, result) ->
                if err
                    return
                $scope.$apply () ->
                    $scope.link.summary = result
            Algorithmia.query "/nlp/AutoTag", api_key, [result], (err, result) ->
                if err
                    return
                $scope.$apply () ->
                    $scope.scrapeStatus = ""
                    $scope.link.tags = result
        return

    $scope.round = (n) -> (Math.floor(n * 100) / 100).toFixed(2)

    return


# Update the visualization
graphObj = null
startViz = ($scope) ->
    svg = d3.select("svg.viz")
    width = $(".viz-container").width()
    height = $(".viz-container").height()

    colors = (d) ->
        if d.rank == -1
            "blue"
        else
            colorScale(d.rank)
    # radius = 8
    radius = (d) ->
        if d.rank == -1
            6
        else
            6 + d.rank * 6
    clickHandler = (d) ->
        $scope.$apply ->
            $scope.loadLink(d.name)
            return
        return

    graphObj = new Algorithmia.viz.Graph(svg, width, height, colors, radius, clickHandler)
    return


# Update the structure of the graph in the visualization
updateGraph = (links) ->
    svg = d3.select("svg.viz")

    graph =
        nodes: getNodes(links)
        links: links

    # Render graph with null colors
    graphObj.update(graph, null)
    return


# Update the color of the visualization
updateRanking = (ranking) ->
    weight = (d) -> ranking[d]
    graphObj.updateRanking(weight)
    return


# Returns (via callback) the graph object from sitemap
getLinks = (url, cb) ->
    inputJson = [url, true]  # Restrict domain
    Algorithmia.query "/web/GetLinks", api_key, inputJson, cb
    return

pagerank = (graph, cb) ->
    $("#demo-status").text ""
    $("#pagerank-out").text ""

    # Transform input graph into matrix form, indexed by nodes list
    nodes = getNodes(graph)
    graphMatrix = graphObjectToMatrix(graph, nodes)

    $("#pagerank-in").html "<pre>" + JSON.stringify(graphMatrix, null, 2) + "</pre>"
    Algorithmia.query "/thatguy2048/PageRank", api_key, graphMatrix, (error, result) ->
        if error
            errorSpan = $('<span class="text-danger">').text error
            $("#pagerank-out").html errorSpan
            $("#demo-status").html errorSpan
            return

        pre = $("<pre>").text JSON.stringify(result, null, 2)
        $("#pagerank-out").html pre

        $("#demo-status").text ""

        # Re-transform into map from url -> pagerank
        if typeof(result) == "string"
            result = JSON.parse(result)

        # Normalize
        result = normalize(result)

        ranking = {}
        for rank,i in result
            ranking[nodes[i]] = rank

        if cb
            cb ranking

        return
    return

# Returns a list of all nodes from a graph object
getNodes = (graph) ->
    pageMap = []
    for page,links of graph
        if pageMap.indexOf(page) == -1
            pageMap.push(page)
        for link in links
            if pageMap.indexOf(link) == -1
                pageMap.push(link)
    pageMap

# Map string nodes into ints indexed by nodes list
graphObjectToMatrix = (graph, nodes) ->
    transformedGraph = nodes.map () -> []
    for page,links of graph
        transformedGraph[nodes.indexOf(page)] = links.map (link) -> nodes.indexOf(link)
    transformedGraph

# Normalize a list to be in the range [0,1]
normalize = (data) ->
    # Find data bounds
    min = Math.min.apply Math, data
    max = Math.max.apply Math, data
    # Normalize data
    data.map (d) -> ((d - min) / (max - min))

# Sort a map by value {a:2, b:1} into [{b:1},{a:2}]
sortMap = (input) ->
    list = ({url:k, rank:v} for k,v of input)
    list.sort (a,b) -> b.rank - a.rank
    list


# Initialize popover
$(() -> $('[data-toggle="popover"]').popover())
