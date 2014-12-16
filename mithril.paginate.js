/* Module */

var mpaginate = (function(app){

	var defaultOptions = {
		perPage  : 10,
		page     : 1,
		limit    : 10,		
		ellipsis : '&hellip;',
		edges    : 2 
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
	app.controller = function(options){
		
		
		/* Extend options */

		this.options = extend(defaultOptions, options);

		this.perPage = m.prop(this.options.perPage)
		
		this.page    = m.prop(this.options.page - 1);

		
		/* Items */

		this.items = m.prop(this.options.data || []);

		/* Total pages */

		this.totalPages = m.prop(Math.ceil(this.items().length/this.perPage()))


		/**
		 * Page list
		 */
		
		this.pageList = function(){			

			var p = [],
				start = 0,
				end = this.totalPages(),
				left = Math.max(parseInt(this.page()) - this.options.edges, 0),
				right = Math.min(parseInt(this.page()) + this.options.edges, this.totalPages())
			
			for(var i = start; i < end; i ++){
				
				if(	i == 0 
					|| i == parseInt(this.totalPages()) - 1 
					|| this.totalPages() < this.options.limit){

					p.push(i)

				} else{

					if(i == (right + 1) || i == (left - 1)) p.push(this.options.ellipsis)

					if( i <= right && i >= left) p.push(i)
				}
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


		/**
		 * Change perPage
		 */
		
		this.changePerPage = function(value){
			
			this.perPage(value)

			/* Recalculate total pages */

			this.totalPages(Math.ceil(this.items().length/this.perPage()))

			/* Jump to page 1 */

			this.page(0);

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
					return m('li', item.name)
				})
			]),

			m('nav.pages', [
				m('a', {
					onclick: ctrl.prevPage,
					class: ctrl.page() == 0? 'disabled': ''
				}, 'Previous page'),
				ctrl.pageList().map(function(page){
					
					switch(page){
						
						case ctrl.options.ellipsis:
							return m('span.page-ellipsis', m.trust(page))
							break;

						default:
							return m('a', {
								onclick     : m.withAttr('data-page', ctrl.page),						
								'data-page' : page,
								className: page == ctrl.page()? 'page-current': ''
							}, parseInt(page) + 1)
							break;

					}
					
				}),
				m('a', {
					onclick: ctrl.nextPage,
					class: ctrl.page() == (ctrl.totalPages() - 1)? 'disabled': ''
				}, 'Next page'),
			]),
			m('label', 'Per page: '),
			m('select', {
				onchange: m.withAttr('value', ctrl.changePerPage)
			}, [
				m('option', 5),
				m('option', 10),
				m('option', 15)
			])
		]

	}


	return app;

})(mpaginate || {});