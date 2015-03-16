(function() {
  var api_key, app, colorScale, getLinks, getNodes, graphObj, graphObjectToMatrix, normalize, pagerank, sortMap, startViz, updateGraph, updateRanking;

  api_key = "[[ALGORITHMIA API KEY GOES HERE]]";

  app = angular.module("algorithmia", []);

  colorScale = d3.scale.linear().domain([0, 0.4, 1]).range(["yellow", "red", "#5000be"]);

  app.controller("SiteMapControl", function($scope, $http) {
    var count, doScrape, pending;
    $scope.siteUrl = "http://wa.gov/";
    $scope.depthLimit = 20;
    $scope.siteMap = {};
    $scope.scrapeStatus = "";
    pending = [];
    count = 0;
    $scope.link = {};
    setTimeout((function() {
      return $scope.scrape($scope.siteUrl);
    }), 0);
    $scope.scrape = function(url) {
      $scope.siteMap = {};
      $scope.pagerank = null;
      $scope.pagerankSorted = [];
      $scope.link = {};
      pending = [url];
      count = 0;
      startViz($scope);
      return doScrape();
    };
    doScrape = function() {
      var url;
      $scope.scrapeStatus = "Scraping site...";
      if (pending.length === 0 || count >= $scope.depthLimit) {
        $scope.scrapeStatus = "Running PageRank...";
        pagerank($scope.siteMap, function(ranking) {
          $scope.$apply(function() {
            $scope.scrapeStatus = "";
            $scope.pagerank = ranking;
            return $scope.pagerankSorted = sortMap(ranking);
          });
          updateRanking(ranking);
        });
        return;
      }
      url = pending.shift();
      if (!$scope.siteMap[url]) {
        count++;
        getLinks(url, function(error, links) {
          if (!error) {
            $scope.siteMap[url] = links;
            $scope.$apply(function() {
              return $scope.siteMap[url] = links;
            });
            updateGraph($scope.siteMap);
            pending = pending.concat(links);
          }
          doScrape();
        });
      } else {
        doScrape();
      }
    };
    $scope.loadLink = function(url) {
      $scope.scrapeStatus = "Summarizing and tagging...";
      $scope.link = {};
      $scope.link.url = url;
      Algorithmia.query("/util/Url2Text", api_key, url, function(err, result) {
        if (err) {
          return;
        }
        Algorithmia.query("/nlp/Summarizer", api_key, result, function(err, result) {
          if (err) {
            return;
          }
          return $scope.$apply(function() {
            return $scope.link.summary = result;
          });
        });
        return Algorithmia.query("/nlp/AutoTag", api_key, [result], function(err, result) {
          if (err) {
            return;
          }
          return $scope.$apply(function() {
            $scope.scrapeStatus = "";
            return $scope.link.tags = result;
          });
        });
      });
    };
    $scope.round = function(n) {
      return (Math.floor(n * 100) / 100).toFixed(2);
    };
  });

  graphObj = null;

  startViz = function($scope) {
    var clickHandler, colors, height, radius, svg, width;
    svg = d3.select("svg.viz");
    width = $(".viz-container").width();
    height = $(".viz-container").height();
    colors = function(d) {
      if (d.rank === -1) {
        return "blue";
      } else {
        return colorScale(d.rank);
      }
    };
    radius = function(d) {
      if (d.rank === -1) {
        return 6;
      } else {
        return 6 + d.rank * 6;
      }
    };
    clickHandler = function(d) {
      $scope.$apply(function() {
        $scope.loadLink(d.name);
      });
    };
    graphObj = new Algorithmia.viz.Graph(svg, width, height, colors, radius, clickHandler);
  };

  updateGraph = function(links) {
    var graph, svg;
    svg = d3.select("svg.viz");
    graph = {
      nodes: getNodes(links),
      links: links
    };
    graphObj.update(graph, null);
  };

  updateRanking = function(ranking) {
    var weight;
    weight = function(d) {
      return ranking[d];
    };
    graphObj.updateRanking(weight);
  };

  getLinks = function(url, cb) {
    var inputJson;
    inputJson = [url, true];
    Algorithmia.query("/web/GetLinks", api_key, inputJson, cb);
  };

  pagerank = function(graph, cb) {
    var graphMatrix, nodes;
    $("#demo-status").text("");
    $("#pagerank-out").text("");
    nodes = getNodes(graph);
    graphMatrix = graphObjectToMatrix(graph, nodes);
    $("#pagerank-in").html("<pre>" + JSON.stringify(graphMatrix, null, 2) + "</pre>");
    Algorithmia.query("/thatguy2048/PageRank", api_key, graphMatrix, function(error, result) {
      var errorSpan, i, pre, rank, ranking, _i, _len;
      if (error) {
        errorSpan = $('<span class="text-danger">').text(error);
        $("#pagerank-out").html(errorSpan);
        $("#demo-status").html(errorSpan);
        return;
      }
      pre = $("<pre>").text(JSON.stringify(result, null, 2));
      $("#pagerank-out").html(pre);
      $("#demo-status").text("");
      if (typeof result === "string") {
        result = JSON.parse(result);
      }
      result = normalize(result);
      ranking = {};
      for (i = _i = 0, _len = result.length; _i < _len; i = ++_i) {
        rank = result[i];
        ranking[nodes[i]] = rank;
      }
      if (cb) {
        cb(ranking);
      }
    });
  };

  getNodes = function(graph) {
    var link, links, page, pageMap, _i, _len;
    pageMap = [];
    for (page in graph) {
      links = graph[page];
      if (pageMap.indexOf(page) === -1) {
        pageMap.push(page);
      }
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        link = links[_i];
        if (pageMap.indexOf(link) === -1) {
          pageMap.push(link);
        }
      }
    }
    return pageMap;
  };

  graphObjectToMatrix = function(graph, nodes) {
    var i, links, page, transformedGraph;
    transformedGraph = nodes.map(function() {
      return [];
    });
    for (page in graph) {
      links = graph[page];
      transformedGraph[nodes.indexOf(page)] = links.map(function(link) {
        return nodes.indexOf(link);
      });
    }
    return transformedGraph;
  };

  normalize = function(data) {
    var max, min;
    min = Math.min.apply(Math, data);
    max = Math.max.apply(Math, data);
    return data.map(function(d) {
      return (d - min) / (max - min);
    });
  };

  sortMap = function(input) {
    var k, list, v;
    list = (function() {
      var _results;
      _results = [];
      for (k in input) {
        v = input[k];
        _results.push({
          url: k,
          rank: v
        });
      }
      return _results;
    })();
    list.sort(function(a, b) {
      return b.rank - a.rank;
    });
    return list;
  };

  $(function() {
    return $('[data-toggle="popover"]').popover();
  });

}).call(this);
