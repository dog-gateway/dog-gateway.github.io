var activeGraphs = new Array();
$(function() {
	"use strict";

	xively.setKey("FvnBTZvR0BL8Xi3mLpXaN8svwnG6acOpyUYliMzUvMLxcfak");

	$('#humidity').xively('live', {
		feed : 339886769,
		datastream : 'HUMIDITY_OFFICE'
	});
	$('#temperature').xively('live', {
		feed : 339886769,
		datastream : 'TEMPERATURE_OFFICE'
	});
	$('#pc-monitor').xively('live', {
		feed : 339886769,
		datastream : 'MeteringPowerOutlet_5_Power'
	});

	var startOfYesterday = moment(new Date()).subtract("hour", 6);
	var endOfYesterday = moment(new Date());

	console.log(startOfYesterday);
	console.log(endOfYesterday);

	var query = {
		start : startOfYesterday.toJSON(),
		end : endOfYesterday.toJSON(),
		interval : 10,
		limit : 1000
	};
	
	$('[data-stream]').each(
			function(index) {
				xively.setKey($(this).attr('data-key'));
				xively.datastream.history( $(this).attr('data-feed'), $(this).attr(
						'data-stream'), query, loadData);

			});

	setInterval(function() {
		$('[data-stream]').each(
				function(index) {
					xively.setKey($(this).attr('data-key'));
					xively.datastream.history($(this).attr('data-feed'), $(this).attr('data-stream'), query, loadData);

				});
		startOfYesterday = moment(new Date()).subtract("milliseconds", 10000);
		endOfYesterday = moment(new Date());
		query = {
			start : startOfYesterday.toJSON(),
			end : endOfYesterday.toJSON(),
			interval : 10,
			limit : 1000
		};
	}, 60000);

});

function loadData(data) {
	var unit = data.unit.label;
	var max = 0;
	var series = [];
	var filteredData = data.datapoints.filter(function(x) {
		return (x.value < 1000);
	});
	for ( var i = 0; i < filteredData.length; i++) {
		var date = moment(filteredData[i].at);
		var value = parseInt(filteredData[i].value);
		series[i] = {
			x : date.unix(),
			y : value
		};

		if (value > max)
			max = value;

	}
	drawGraph(series, unit, max, $('[data-stream=' + data.id + ']').get(0));
}

function drawGraph(data, unit, max, element) {
	var idGraph = $(element).attr('data-stream');
	var graph = activeGraphs[idGraph];
	if (graph == null) {
		graph = new Rickshaw.Graph({
			element : element,
			// width : 640,
			height : 200,
			min : -5,
			max : max * 1.2,
			renderer : 'line',
			series : [ {
				data : data,
				color : '#6060c0',
				name : unit
			} ]
		});

		activeGraphs[idGraph] = graph;

		var hoverDetail = new Rickshaw.Graph.HoverDetail({
			graph : graph
		});

		var legend = new Rickshaw.Graph.Legend({
			graph : graph,
			element : $(element).parent().find('.legend').get(0)
		// (document.getElementById('legend')
		});

		var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
			graph : graph,
			legend : legend
		});

		var axes = new Rickshaw.Graph.Axis.Time({
			graph : graph
		});

		axes.render();

		var yAxis = new Rickshaw.Graph.Axis.Y({
			graph : graph
		});

		yAxis.render();
	} else {
		// update graph data
		for ( var i = 0; i < data.length; i++) {
			graph.series[0].data.push(data[i]);
		}
		graph.series[0].data.splice(0, data.length);
	}
	graph.render();

}
