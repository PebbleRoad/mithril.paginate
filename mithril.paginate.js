/* Module */

var paginate = (function(app){

	var defaultOptions = {
		perPage: 10,
		page: 1
	}

	/**
	 * Extend
	 */    
	var extend = function(obj, extObj) {
			if (arguments.length > 2) {
					for (var a = 1; a < arguments.length; a++) {
							extend(obj, arguments[a]);
					}
			} else {
					for (var i in extObj) {
							obj[i] = extObj[i];
					}
			}
			return obj;
	};

	/**
	 * Controller
	 * @return {[type]} [description]
	 */
	app.controller = function(items, options){

		/* Extend options */

		var options = extend(defaultOptions, options);

		this.perPage = m.prop(options.perPage)
		this.page    = m.prop(options.page - 1)
		this.items   = m.prop(items);

		/**
		 * Total pages
		 */
		
		this.totalPages = m.prop(Math.ceil(items.length/this.perPage()))

		/**
		 * Page list
		 */
		
		this.pageList = function(){

			var p = [];

			for(var i = 0; i < this.totalPages(); i ++){
				p.push(i)
			}

			return p;

		}.bind(this)


		/**
		 * Next page
		 */
		
		this.nextPage = function(){

			var current = this.page();

			++current;

			if(current > (this.totalPages() - 1)){
				current = (this.totalPages() - 1);
			}

			this.page(current)


		}.bind(this)

		/**
		 * Prev page
		 */
		
		this.prevPage = function(){

			var current = this.page();

			--current;

			if(current < 0){
				current = 0;
			}

			this.page(current)


		}.bind(this)
	}

	/**
	 * View
	 * @return {[type]} [description]
	 */
	app.view = function(ctrl){		
		return [
			m('ul.items', [
				ctrl.items()
				.slice(ctrl.page() * ctrl.perPage(), (parseInt(ctrl.page()) + 1) * ctrl.perPage())
				.map(function(item){
					return m('li', item.Name)
				})
			]),

			m('nav.pages', [
				m('a', {
					onclick: ctrl.prevPage,
					class: ctrl.page() == 0? 'disabled': ''
				}, 'Previous page'),
				ctrl.pageList().map(function(page){					
					return m('a', {
						onclick     : m.withAttr('data-page', ctrl.page),
						href        : '#',
						"data-page" : page
					}, page + 1)
				}),
				m('a', {
					onclick: ctrl.nextPage,
					class: ctrl.page() == (ctrl.totalPages() - 1)? 'disabled': ''
				}, 'Next page'),
			])
		]

	}


	return app;

})(paginate || {})

