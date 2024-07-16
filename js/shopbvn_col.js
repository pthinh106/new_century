var selectedSortby;
var tt = 'Thứ tự';
var selectedViewData = "data";
var filter = new Vnb.SearchFilter()

 function toggleFilter(e) {
	console.log(e);
	 _toggleFilter(e);
	 renderFilterdItems();
	 doSearch(1);
 }
  function _toggleFilterdqdt(e) {
	  var $element = $(e);
	  var group = 'Khoảng giá';
	  var field = 'price_min';
	  var operator = 'OR';	 
	  var value = $element.attr("data-value");	
	  filter.deleteValuedqdt(group, field, value, operator);
	  filter.addValue(group, field, value, operator);
	  renderFilterdItems();
	  doSearch(1);
  }
  function _toggleFilter(e) {
	  var $element = $(e);
	  var group = $element.attr("data-group");
	  var field = $element.attr("data-field");
	  var text = $element.attr("data-text");
	  var value = $element.attr("value");
	  var operator = $element.attr("data-operator");
	  var filterItemId = $element.attr("id");

	  if (!$element.is(':checked')) {
		  filter.deleteValue(group, field, value, operator);
	  }
	  else{
		  filter.addValue(group, field, value, operator);
	  }

	  $(".catalog_filters li[data-handle='" + filterItemId + "']").toggleClass("active");
  }
  function renderFilterdItems() {
	  var $container = $(".filter-container__selected-filter-list ul");
	  $container.html("");

	  $(".filter-container input[type=checkbox]").each(function(index) {
		  if ($(this).is(':checked')) {
			  var id = $(this).attr("id");
			  var name = $(this).closest("label").text();
			  addFilteredItem(name, id);
		  }
	  });

	  if($(".aside-content input[type=checkbox]:checked").length > 0)
		  $(".filter-container__selected-filter").show();
	  else
		  $(".filter-container__selected-filter").hide();
  }
  function addFilteredItem(name, id) {
	  var filteredItemTemplate = "<li class='filter-container__selected-filter-item' for='{3}'><a href='javascript:void(0)' onclick=\"{0}\"><i class='fa fa-close'></i> {1}</a></li>";
	  filteredItemTemplate = filteredItemTemplate.replace("{0}", "removeFilteredItem('" + id + "')");
	  filteredItemTemplate = filteredItemTemplate.replace("{1}", name);
	  filteredItemTemplate = filteredItemTemplate.replace("{3}", id);
	  var $container = $(".filter-container__selected-filter-list ul");
	  $container.append(filteredItemTemplate);
  }
  function removeFilteredItem(id) {
	  $(".filter-container #" + id).trigger("click");
  }
  function filterItemInList(object) {
	  q = object.val().toLowerCase();
	  q = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	  object.parent().next().find('li').show();
	  if (q.length > 0) {
		  object.parent().next().find('li').each(function() {
			  if ($(this).find('label').attr("data-filter").indexOf(q) == -1)
				  $(this).hide();
		  })
	  }
  }

  function clearAllFiltered() {
	  filter = new Vnb.SearchFilter();
	  

	   	$(".filter-container__selected-filter-list ul").html("");
		$(".filter-container input[type=checkbox]").prop('checked', false);
		$(".filter-container input[type=checkbox]").attr('checked', false);
		$(".filter-container input[type=checkbox]").removeAttr('checked');
		
		$(".filter-container__selected-filter").hide();

		doSearch(1);
	   }
	   function doSearch(page, options) {
		   if(!options) options = {};
		   if (page==0) page=1;
		   //NProgress.start();
		   $('.aside.aside-mini-products-list.filter').removeClass('active');
		   awe_showPopup('.loading');
		   filter.search({
			   page: page,
			   sortby: selectedSortby,
			   success: function (html) {
				   var $html = $(html);
				   // Muốn thay thẻ DIV nào khi filter thì viết như này
				   var $categoryProducts = $($html[0]); 
				   $(".category-products").html($categoryProducts.html());
				   if (page>1)
				   {
						pushCurrentFilterState({sortby: selectedSortby, page: page});
				   }
				   else
				   {
					   pushCurrentFilterState({sortby: selectedSortby});
				   }
				   awe_hidePopup('.loading');
				   awe_lazyloadImage();
				   $('html, body').animate({
					scrollTop: $('.block-collection').offset().top
					}, 0);
					//$('#open-filters').removeClass('openf');
					//$('.dqdt-sidebar').removeClass('openf');
					//$('.opacity_sidebar').removeClass('openf');
				   resortby(selectedSortby);
				   if (window.BPR !== undefined){
					   return window.BPR.initDomEls(), window.BPR.loadBadges();
				   }
			   }
		   });		
	   }
	   function sortby(sort) {			 
		   switch(sort) {
			   case "price-asc":
				   selectedSortby = "gia:asc";					   
				   break;
			   case "price-desc":
				   selectedSortby = "gia:desc";
				   break;
			   case "alpha-asc":
				   selectedSortby = "ten:asc";
				   break;
			   case "alpha-desc":
				   selectedSortby = "ten:desc";
				   break;
			   case "created-desc":
				   selectedSortby = "thoi_gian:desc";
				   break;
			   case "created-asc":
				   selectedSortby = "thoi_gian:asc";
				   break;
			   default:
				   selectedSortby = "";
				   break;
		   }

		   doSearch(1);
	   }
	   function resortby(sort) {
		   switch(sort) {				  
			   case "gia:asc":
				   tt = "Giá tăng dần";
				   $('.sort-cate-left .price-asc').addClass("active");
				   break;
			   case "gia:desc":
				   tt = "Giá giảm dần";
				   $('.sort-cate-left .price-desc').addClass("active");
				   break;
			   case "ten:asc":
				   tt = "Tên A → Z";
				   $('.sort-cate-left .alpha-asc').addClass("active");
				   break;
			   case "ten:desc":
				   tt = "Tên Z → A";
				   $('.sort-cate-left .alpha-desc').addClass("active");
				   break;
			   case "thoi_gian:desc":
				   tt = "Hàng mới nhất";
				   $('.sort-cate-left .created-desc').addClass("active");
				   break;
			   case "thoi_gian:asc":
				   tt = "Hàng cũ nhất";
				   $('.sort-cate-left .created-asc').addClass("active");
				   break;
			   default:
				   tt = "Mặc định";
				   $('.sort-cate-left .created-desc').addClass("active");
				   break;
		   }			 
		   $('#sort-by > ul > li > span').html(tt);
	   }
	   function _selectSortby(sort) {			 
		   resortby(sort);
		   switch(sort) {
			   case "price-asc":
				   selectedSortby = "gia:asc";
				   break;
			   case "price-desc":
				   selectedSortby = "gia:desc";
				   break;
			   case "alpha-asc":
				   selectedSortby = "ten:asc";
				   break;
			   case "alpha-desc":
				   selectedSortby = "ten:desc";
				   break;
			   case "created-desc":
				   selectedSortby = "thoi_gian:desc";
				   break;
			   case "created-asc":
				   selectedSortby = "thoi_gian:asc";
				   break;
			   default:
				   selectedSortby = sort;
				   break;
		   }
	   }
	   function toggleCheckbox(id) {
		   $(id).click();
	   }
	   function pushCurrentFilterState(options) {
			if(!options) options = {};
			var url = filter.buildSearchUrl(options);
			var queryString = url.slice(url.indexOf('?'));
			if (queryString)
			{
				queryString = this_url+"?"+url;	
			}
			else
			{
				queryString = this_url;
			}
			queryString=queryString.replace("?&","?");
			pushState(queryString);
	   }
	   function pushState(url) {
		   window.history.pushState({
			   turbolinks: true,
			   url: url
		   }, null, url)
	   }
	   function switchView(view) {			  
		   switch(view) {
			   case "list":
				   selectedViewData = "data_list";					   
				   break;
			   default:
				   selectedViewData = "data";
				   break;
		   }			   
		   doSearch(1);
	   }
	   function getAllUrlParams(url) {
		  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
		  var obj = {};
		  if (queryString) {
			queryString = queryString.split('#')[0];
			var arr = queryString.split('&');

			for (var i = 0; i < arr.length; i++) {
			  var a = arr[i].split('=');
			  var paramName = a[0];
			  var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
			  paramName = paramName.toLowerCase();
			  if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
			  if (paramName.match(/\[(\d+)?\]$/)) {
				var key = paramName.replace(/\[(\d+)?\]/, '');
				if (!obj[key]) obj[key] = [];
				if (paramName.match(/\[\d+\]$/)) {
				  var index = /\[(\d+)\]/.exec(paramName)[1];
				  obj[key][index] = paramValue;
				} else {
				  obj[key].push(paramValue);
				}
			  } else {
				if (!obj[paramName]) {
				  obj[paramName] = paramValue;
				} else if (obj[paramName] && typeof obj[paramName] === 'string'){
				  obj[paramName] = [obj[paramName]];
				  obj[paramName].push(paramValue);
				} else {
				  obj[paramName].push(paramValue);
				}
			  }
			}
		  }

		  return obj;
		}
	   function selectFilterByCurrentQuery() {
		   var isFilter = false;
		   var url = window.location.href;
		   var queryString = decodeURI(window.location.search);
		   var filters=getAllUrlParams(queryString);
		   var page = 0;
		   if(queryString) {
			   isFilter = true;
			  
			   $.urlParam = function(name){
				   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
				   if (results) return results[1];
				   else return 0;
			   }
			   page = $.urlParam('page');
			   
		   }
		   if(filters) {
				   
				   for (var key in filters) {
					  
					   var value=filters[key];
					   var items=value.split(",");
					   items.forEach(function(item) {
						   var element = $(".aside-content input[data-field='" + key + "'][value='" + item + "']");
						   element.attr("checked", "checked");
						   _toggleFilter(element);
					  });
   
					}
					
			
			   isFilter = true;
		   }
		   var sortOrder = getParameter(url, "sortby");
		   if(sortOrder) {
			   _selectSortby(sortOrder);
		   }
		   if(isFilter) {
				doSearch(page);
				renderFilterdItems();
		   }
	   }
	   function getParameter(url, name) {
		   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			   results = regex.exec(url);
		   return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	   }
	   $( document ).ready(function() {
		   $(window).on('popstate', function() {
			   location.reload(true);
		   });
		   selectFilterByCurrentQuery();
		   $('.filter-group .filter-group-title').click(function(e){
			   $(this).parent().toggleClass('active');
		   });

		   $('.filter-mobile').click(function(e){
			   $('.aside.aside-mini-products-list.filter').toggleClass('active');
		   });

		   $('#show-admin-bar').click(function(e){
			   $('.aside.aside-mini-products-list.filter').toggleClass('active');
		   });

		   $('.filter-container__selected-filter-header-title').click(function(e){
			   $('.aside.aside-mini-products-list.filter').toggleClass('active');
		   });
	   });