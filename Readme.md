# Mithril Pagination module

A small pagination module for mithril. Pass in an array of items and it paginates based on the options provided.

## How to use

	// Mock some data
	var items = [];

	for (var i = 0; i<15; i++) {
	    items.push({'name':'Item #'+i})
	}

	/**
	 * Your Module
	 */

	var app = {},
		options = {
			perPage  : 5,				
			data     : items,
			limit    : 10,		
			ellipsis : '&hellip;',
			edges    : 2
		};

	/* Controller */
	app.controller = function(){


		this.paginate = new mpaginate.controller(options)

	}


	/* View */
	app.view = function(ctrl){
		return [
			mpaginate.view(ctrl.paginate)
		]			
	}



	/* Initialize the app */

	m.module(document.getElementById('paginate'), app)


## Options

	{
		perPage  : 10,
		page     : 1,
		data     : Array,
		limit    : 10 // Page number limit when should ellipsis text be display
		ellipsis : '&hellip;',
		edges    : 2 // Number of pages before and after the current page
	}

## Todo

1. Support Async loading of items
2. Support large sets of items - Done