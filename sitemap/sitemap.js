//
// Algorithmia Site Crawler
//

(function() {
  var api_key, app, colorScale, getLinks, getPageMap, graphObj, normalize, pagerank, sortMap, startViz, transformGraph, updateGraph, updateRanking;

  api_key = "953ee0c315874b219bd6d7ff1d4c8482";

  app = angular.module("algorithmia", []);

  colorScale = d3.scale.linear().domain([0, 0.4, 1]).range(["yellow", "red", "#5000be"]);

  app.controller("SiteMapControl", function($scope, $http) {
    var count, doScrape, pending;
    // Defaults
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
    graphObj = Algorithmia.viz.startGraph(svg, width, height, colors, radius, clickHandler);
  };

  // Update the visualization
  updateGraph = function(data) {
    var graph, key, nodes, nodeset, ranking, svg, value, values, _i, _len;
    svg = d3.select("svg.viz");
    nodeset = {};
    for (key in data) {
      values = data[key];
      nodeset[key] = true;
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        nodeset[value] = true;
      }
    }
    nodes = Object.keys(nodeset);
    ranking = function(d) {
      return -1;
    };
    graph = {
      nodes: nodes,
      links: data
    };
    graphObj.update(graph, ranking);
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
    var pageMap, transformedGraph;
    $("#demo-status").text("");
    $("#pagerank-out").text("");
    pageMap = getPageMap(graph);
    transformedGraph = transformGraph(graph, pageMap);
    $("#pagerank-in").html("<pre>" + JSON.stringify(transformedGraph, null, 2) + "</pre>");
    Algorithmia.query("/thatguy2048/PageRank", api_key, transformedGraph, function(error, result) {
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
        ranking[pageMap[i]] = rank;
      }
      if (cb) {
        cb(ranking);
      }
    });
  };

  getPageMap = function(graph) {
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

  transformGraph = function(graph, pageMap) {
    var i, link, links, page, transformedGraph;
    transformedGraph = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = pageMap.length; _i < _len; _i++) {
        i = pageMap[_i];
        _results.push([]);
      }
      return _results;
    })();
    for (page in graph) {
      links = graph[page];
      transformedGraph[pageMap.indexOf(page)] = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = links.length; _i < _len; _i++) {
          link = links[_i];
          _results.push(pageMap.indexOf(link));
        }
        return _results;
      })();
    }
    return transformedGraph;
  };

  normalize = function(data) {
    var d, max, min, _i, _j, _len, _len1, _results;
    min = null;
    max = null;
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      if (min === null || d < min) {
        min = d;
      }
      if (max === null || d > max) {
        max = d;
      }
    }
    _results = [];
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      _results.push((d - min) / (max - min));
    }
    return _results;
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
