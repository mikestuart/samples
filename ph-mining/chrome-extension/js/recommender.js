var PHRecommender =
{
	init: function()
	{
		console.log("[PGEN] Recommender is alive...");

		// observe history
		PHRecommender.observeHistory();

		// show recommendations
		PHRecommender.refreshRecommendations();
	},

	injectHTML: function(callback)
	{
		var path = PHPP_PATH + "recommendations_widget.html";

		$.get(path, function(result) {
			$("body").append(result);

			var fontpath = $("#fontawesome-template").text().replace("__PATH__", PHPP_PATH);
			$("body").append(fontpath);

			callback();
		});
	},

	getProductId: function()
	{
		// This is far from ideal. Let me know if you have better ideas.
		var productId = "";

		$("a[data-popover-href]").each(function(index, item) {
			var url = $(item).attr("data-popover-href");

			if (url == undefined || url.indexOf("/maker_suggestions/new") == -1)
				return;
			
			productId = url.replace("/posts/", "").replace("/maker_suggestions/new", "");
		});

		return productId;
	},

	observeHistory: function()
	{
		// Surprised there's no better way to do this => http://stackoverflow.com/q/4570093
		var previousState = window.history.state;

		setInterval(function() {
			if (previousState !== window.history.state) {
				previousState = window.history.state;
				setTimeout(PHRecommender.refreshRecommendations, 1500); // delay because history changes before HTML render
			}
		}, 100);
	},

	refreshRecommendations: function()
	{
		console.log("[PGEN] Analyzing new page. - " + window.location);

		var productId = PHRecommender.getProductId();

		if (productId == "")
		{
			console.log("[PGEN] Doesn't look like a product. Abort.");
			return;
		}

		console.log("[PGEN] Product id (" + productId + ") - getting recommendations.");

		// create section in sidebar
		$("#similar").parent().append($("#pgen-recomm-template").text());

		PHRecommender.getRecommendations(productId);
		//PHRecommender.fakeRecommendations(productId);
	},

	getRecommendations: function(productId)
	{
		var client = Algorithmia.client("simfLtaJcV+/crnHmvaDAeFs61R1");

		client.algo("anaimi/ProductHuntRecommender").pipe(productId).then(function(output) {
			// TODO: handle wrong API keys
			if(output.error)
				return console.error("error: " + output.error);

			PHRecommender.renderRecommendations(output.result);
		});
	},

	fakeRecommendations: function(productId)
	{
		// used for UI testing purposes only
		setTimeout(function() {
			var result = [{"id":"28065","name":"Proposalist","tagline":"A professional, web-based proposal builder. ","url":"http://www.producthunt.com/tech/proposalist"},{"id":"28056","name":"Genius Sign","tagline":"iOS document signing app, from the makers of Genius Scan","url":"http://www.producthunt.com/tech/genius-sign-2"},{"id":"28076","name":"PocketRocket","tagline":"One article from Pocket to your Inbox everyday","url":"http://www.producthunt.com/tech/pocketrocket"}];
			PHRecommender.renderRecommendations(result);
		}, 3000);
	},

	renderRecommendations: function(posts)
	{
		// hide loading
		$("#pgen-loading").hide();

		// create posts
		var template = $("#pgen-card-template").text();

		for(var i = 0; i < posts.length; i++)
		{
			var p = posts[i];

			if (p.tagline.length > 50)
				p.tagline = p.tagline.substring(0, 42) + "...";

			var html = Mustache.render(template, p);
			$("#pgen-cards").append(html);
		}

		// nothing to show?
		if (posts.length == 0)
		{
			$("#pgen-empty").show();
		}
		else
		{
			$("#pgen-empty").hide();
		}

	}
}

$(PHRecommender.injectHTML(PHRecommender.init));