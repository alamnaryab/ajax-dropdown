<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Ajax dropdown</title>
<link rel="stylesheet" type="text/css" href="alam-ajax.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script type="text/javascript" src="alamajax.js"></script>
<script>
	$(function(){
		$(".txt").ajaxDropdown({
			//php or any other file which return data
			source:'alam-ajax.php',
			
			//field name to be filtered, where title=$(this).val()
			filterBy:'title',
			
			//if php file is returning ul as html(li must have data-id attribute with id)
			htmlOptions:false,
			
			//if php file is returning json object, specify value: the field with id/key/index and text:field name to display
			jsonOptions 	:	{
					value 	: 	'id',
					text	: 	'title',
				},
		});	
	});
</script>

</head>

<body>

	<input type="text" class="form-control ajax-input txt" name="countries" />
    
    <input type="text" class="form-control ajax-input txt" name="countries" />
    
</body>
</html>