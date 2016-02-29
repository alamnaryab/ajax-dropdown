$(function(){
	$(".alam-ajax-wrapper").append('<div class="alam-ajax-dropdown-wrapper"></div>');
	$(".alam-ajax-wrapper").prepend('<input type="hidden" id="'+$(".ajax-input").attr('name')+'_id" class="alam-ajax-id" >');
	$(".ajax-input").keyup(function(){
		$(".alam-ajax-dropdown-wrapper").parent(".alam-ajax-wrapper").find(".alam-ajax-id").val('');
		$.ajax({
			url:'alam-ajax.php',
			type:'get',
			data:{'title':$(this).val()},
			beforeSend: function(){
				$(".alam-ajax-dropdown-wrapper").show().html('<img alt="Loading..." src="loading.gif" />');	
			},
			success:function(data){
				var obj = $.parseJSON(data);
				if(obj.length){
					var ul = '<ul>';
					$.each(obj, function(i, item) {
						ul += ' <li data-id="'+item.id+'">';
						ul += item.title;
						ul += ' </li>';
					});
					ul += ' </ul>';
					$(".alam-ajax-dropdown-wrapper").html(ul);	
				}else{
					$(".alam-ajax-dropdown-wrapper").html('<div style="text-align:center;">No match found.</span>');
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
				$(".alam-ajax-dropdown-wrapper").html(msg);
			},	
		});	
	});	
	
	$(".alam-ajax-dropdown-wrapper").on("click"," ul li",function(){
		$(".ajax-input").val($(this).html());
		$(".alam-ajax-dropdown-wrapper").parent(".alam-ajax-wrapper").find(".alam-ajax-id").val($(this).attr('data-id'));
		$(".alam-ajax-dropdown-wrapper").hide();
	});
});
