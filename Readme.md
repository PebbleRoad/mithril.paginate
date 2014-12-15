# Mithril Pagination module

A small pagination module for mithril. Pass in an array of items and it paginates based on the options provided.

## How to use

	/**
	 * Your Module
	 */
	
	var app = {},
		options = {
			perPage: 10
		};

	/* Controller */
	app.controller = function(){			

		this.items = new paginate.controller(items, options)			

	}

	/* View */
	app.view = function(ctrl){

		return paginate.view(ctrl.items);
	}

	/* Initialize the app */

	m.module(document.getElementById('paginate'), app)


## Options

	{
		perPage: 10,
		page: 1
	}

## Todo

1. Support Async loading of items
2. Support large sets of items