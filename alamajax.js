;(function ( $ ) {
    $.fn.ajaxDropdown = function( options ) {
        var elem = this;
        var main_wrapper = '<div class="alam-ajax-wrapper"><div id="alam-ajax-wrapper"></div></div>';
        var opt = $.extend({
			source			:	false,
            htmlOptions 	:	false,
			jsonOptions 	:	{
					value 	: 	'id',
					text	: 	'title',
				},
			filterBy		: 	false,
			requestMethod	:	'get',
			hiddenFieldName	:	false
        }, options );
        
		
		elem.each( function() {
			var el = $(this);
            el.wrap(main_wrapper);
			
			//apend hidden input to keep id,value, key
			var hiddenFiled = el.attr('name')+'_id';
			if(opt.hiddenFieldName!=false){
				hiddenFiled = opt.hiddenFieldName	
			}
			var hidden_input = '<input type="hidden" name="'+hiddenFiled+'" class="alamajax_id" >';
			el.after(hidden_input);
			
			//append dropdown container div
			el.after('<div class="alam-ajax-dropdown-wrapper"></div>');
			
			
        });
		
		$('body').bind("click", function (e) {
			$(".alam-ajax-dropdown-wrapper").hide();
		});
		
		$(".alam-ajax-dropdown-wrapper").on("click"," ul li",function(){
			var parentDrp = $(this).parents(".alam-ajax-wrapper");
			parentDrp.find("input[type=text]").val($(this).html());
			parentDrp.find("input[type=hidden]").val($(this).attr('data-id'));
			parentDrp.find(".alam-ajax-dropdown-wrapper").hide();
		});
		
        return elem.bind("keyup.ajaxDropdown", function () {
			var el = $(this);
			var drp = el.parent('div').find(".alam-ajax-dropdown-wrapper");
			if(opt.source==''){
				drp.hide();
				alert('Source file not defined');
			}else if(el.val().trim()==''){
				drp.hide();
			}else{
				$(".alam-ajax-dropdown-wrapper").hide();
				var myData = {};
				if(opt.filterBy!=false){
					myData[opt.filterBy]=el.val().trim();
				}
				$.ajax({
					url:opt.source,
					type:opt.requestMethod,
					data:myData,
					beforeSend: function(){
						drp.show().html('<img alt="Loading..." src="loading.gif" />');	
					},
					success:function(data){
						if(opt.htmlOptions!=false){
							drp.html(data);
						}else{
							var obj = $.parseJSON(data);
							if(obj.length){
								var ul = '<ul>';
								$.each(obj, function(i, item) {
									console.log(item);
									ul += ' <li data-id="'+item[opt.jsonOptions.value]+'">';
									ul += item[opt.jsonOptions.text];
									ul += ' </li>';
								});
								ul += ' </ul>';
								drp.html(ul);	
							}else{
								drp.html('<div style="text-align:center;">No match found.</span>');
							}
						}
					},
					error: function (jqXHR, exception) {
						var msg = '';
						if (jqXHR.status === 0) {
							msg = 'Not connect.\n Verify Network.';
						} else if (jqXHR.status == 404) {
							msg = 'Requested page not found. [404]';
						} else if (jqXHR.status == 500) {
							msg = 'Internal Server Error [500].';
						} else if (exception === 'parsererror') {
							msg = 'Requested JSON parse failed.';
						} else if (exception === 'timeout') {
							msg = 'Time out error.';
						} else if (exception === 'abort') {
							msg = 'Ajax request aborted.';
						} else {
							msg = 'Uncaught Error.\n' + jqXHR.responseText;
						}
						drp.html(msg);
					},	
				});	
			}
        });
		
		
		
    };
}( jQuery ));