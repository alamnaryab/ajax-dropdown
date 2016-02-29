# ajax-dropdown
ajax dropdown to fetch data from database without refreshing page like countries, authors, cities

##How to use

1. download `alamajax.js` and `alam-ajax.css`
2. in your html file `<head>` section add above css, Jquery library and above js as shown below
3. in head section add a script tag and initilize `alamajax()` function on input(s)
4. in body create your inputs
whole code will look like this
...
&lt;!doctype html>  
&lt;html>  
&lt;head>  
&lt;meta charset="utf-8">  
&lt;title>Ajax dropdown</title>  
&lt;link rel="stylesheet" type="text/css" href="alam-ajax.css" />  
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>  
&lt;script type="text/javascript" src="alamajax.js"></script>  
&lt;script> 
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
&lt;/script>  
&lt;/head>  
&lt;body>
	<input type="text" class="form-control ajax-input txt" name="countries" />    
  <input type="text" class="form-control ajax-input txt" name="countries" />
&lt;/body>  
&lt;/html>
...

##Possible options and its uses

...  
   source			    :	false,  
   htmlOptions 	  :	false,  
   jsonOptions 	  :	{  
	   	 value : 	'id',  
		   text	: 	'title',  
	   },  
   filterBy		    : 	false,  
   requestMethod	  :	'get',  
   hiddenFieldName	:	false  
...

**source :** it is mandatory and accepts url server side ajax file, which will be returning data to dropdown  
**htmlOptions :** optional property, by default it is false, if it is true it will be looking for html(&lt;ul>&lt;li>s) result and will be showing as it is without any changes  
**jsonOptions :** if `htmlOptions` above is not set to `true`, then it will be looking for JSON object and you have to provide 2 sub properties  
**value :** the id field which will be populating as hidden field, to be saved in DB, name of DB field or JSON key  
**text :** text to be displayed, name of DB field or JSON key  
**filterBy :** if you want to send DB field name to php file for where condition `where 'filterBy' =  text.val()`, default is false. 
**requestMethod :**default is get you can change it to post   
**hiddenFieldName :** an extra hidden field will be generated with name = textboxName_id, _id will be appended to parent textbox, while you can specify  your own name too

