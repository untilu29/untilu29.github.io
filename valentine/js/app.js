(function (lettuce) {
    var L = new lettuce(),
		irRemote = "2",
		fullStar = "1",
	    data = {
		rise: "",
		down: "",
		yours: "One day, you appeared",
		together: "And then",
		rose: "I luv u",
	    };

	function render(element) {
		var html = '<div class="' + element + '"><h3>{%=o.' +  element + '%}</h3></div>';
		var result = L.Template.tmpl(html, data);
		document.getElementById("results").innerHTML = result;
	}

	function rise() {
		render('rise');
	}

    function down() {
	    render('down');
    }

	function yours() {
		render('yours');
		lettuce.post("/serial", fullStar);
	}

	function together() {
		render('together');
	}

	function rose() {
		render('rose');
	}

	function showLove() {
		location.replace("/memories/");
	}

    function final() {
	    document.getElementById("results").innerHTML = '<canvas width="1440" height="740"></canvas>';
	    lettuce.post("/serial", irRemote);
	    L.Event.trigger("showLove")
    }

	L.Event.on("showLove", showLove);

    var home = function (){
        L.Router.navigate("");
    };

    L.Router
        .add(/#/, home)
        .add(/#about/, rise)
        .add(/#what/, down)
        .add(/#why/, final)
	    .add(/#yours/, yours)
	    .add(/#together/, together)
	    .add(/#rose/, rose)
        .load();

	function show(func, n){
		var p = new L.Promise();
		var code = function () {
			if (func !== undefined) {
				func();
				L.FX.fadeIn(document.getElementById('results'), {
					duration: 3000, complete: function () {
					}
				});
			}
			p.done(null, n);
		};
		setTimeout(code, n);
		return p;
	}

	var p = new L.Promise();
	show(undefined, 3000).then(
		function() {
			return show(yours, 0)
		}
	).then(
		function() {
			return show(rise, 3000)
		}
	).then(
		function() {
			return show(down, 3000)
		}
	).then(
		function() {
			return show(together, 3000)
		}
	).then(
		function() {
			return show(rose, 3000)
		}
	).then(
		function() {
			return show(final, 3000)
		}
	);

}(lettuce));
