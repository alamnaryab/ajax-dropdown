<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Ajax dropdown</title>
<link rel="stylesheet" type="text/css" href="alam-ajax.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

<script src="alamajax.js"></script>
<script>
	$(function(){
		$(".txt").ajaxDropdown({
			source:'alam-ajax.php',
			filterBy:'title',
			hiddenFieldName:'alamHidden'	
		});	
	});
</script>

</head>

<body>
	<input type="text" class="form-control ajax-input txt" name="countries" />
    <input type="text" class="form-control ajax-input txt" name="countries" />
    <hr>
    
	<div class="alam-ajax-wrapper">
    	<div id="alam-ajax-wrapper">
        	<input type="text" class="form-control ajax-input" />
        </div>
    </div>
</body>
</html>