var Demo = {
	ratios: [],

	init: function()
	{
		Demo.loadCollusionRatios();
	},

	loadCollusionRatios: function()
	{
		// the below code gets results from https://algorithmia.com/algorithms/ANaimi/ProductHuntVoteRings
		var client = Algorithmia.client("simknwQAmSSP+KnOv3/i9MMzWrp1");

		client.algo("ANaimi/ProductHuntVoteRings").pipe([0.5, 20]).then(function(output) {
			if(output.error)
				return console.error("Algorithmia API Error: ", output.error);

			Demo.ratios = output.result;
			Demo.renderViews();
			console.log(output.result);
		});
	},

	renderViews: function()
	{
		$("#demo .demo-loading").fadeOut();
		Demo.renderButtons();
		Demo.showPostDetails(Demo.ratios[0].postId);
	},

	renderButtons: function()
	{
		var html = "";
		var template = $("#post-button").html();

		for(var i = 0; i < Demo.ratios.length; i++)
		{
			var r = Demo.ratios[i];
			html += Mustache.render(template, r);
		}

		$("#demo .box-list").append(html);

		$("#demo .post-button").on('click', Demo.postButtonClicked);
	},

	postButtonClicked: function(ev)
	{
		var elem = $(ev.toElement);
		var id = elem.attr("data-id");
		ev.preventDefault();

		Demo.showPostDetails(id);
	},

	showPostDetails: function(id)
	{
		if (Demo.currentlyShowing == id)
			return;
		else
			Demo.currentlyShowing = id;

		var ratio = Demo.getRatio(id);
		var voters = ratio.post.voters.split(',').sort();
		var colluders = ratio.users.split(',');

		// meta
		$("#demo .box-content h2").html(ratio.post.name);
		$("#demo .ext-url").attr("href", ratio.post.url);
		$("#demo .box-content h3").html(ratio.post.tagline.replace('"', "\'"));

		// stats
		var stats = "This post was up voted by " + ((voters.length < 20) ? (voters.length + " users. ") : "20+ users. ");
		stats += (voters.length == colluders.length) ? "All of them " : colluders.length + " of them ";
		stats += "have a collusion ratio of " + ratio.ratio.toFixed(2) + ".<br />";
		stats += "Votes(U,P) = " + ratio.commonVotes + ", Votes(U,-P) = " + ratio.outsideVotes + ", Votes(U,*) = " + ratio.allVotes;
		$("#demo .box-content .stats").html(stats);

		// votes
		votes = "";

		for(var i = 0; i < voters.length; i++)
		{
			cls = colluders.indexOf(voters[i]) > -1 ? "colluder" : "";
			votes += "<span class='" + cls + "'>" + Demo.cutify(voters[i]) + "</span>";
		}

		$("#demo .voters").html(votes);
	},

	getRatio: function(id)
	{
		return Demo.ratios.filter(function(o) { return o.postId == id; })[0];
	},

	cutify: function(id) {
		var fruits = ["Apple","Apricot","Avocado","Banana","Bilberry","Blackberry","Blackcurrant","Blueberry","Cantaloupe","Currant","Cherry","Coconut","Cranberry","Grape","Raisin","Guava","Kiwi","Lemon","Lime","Mango","Melon","Cantaloupe","Honeydew","Watermelon","Olive","Orange","Tangerine","Papaya","Peach","Pear","Pineapple","Raspberry"];
		var fruit = fruits[Math.floor(Math.random()*fruits.length)];
		return fruit + "_" + id;
	}
};

$(Demo.init);