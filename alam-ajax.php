<?php
	$db = new mysqli("localhost","root","","ainbox");
	if($db->connect_error){
		echo 	$db->connect_error;
		exit;
	}
	$q= "select * from ajax where title like '%".str_replace("'","''",$_GET['title'])."%' order by title";
	$res = $db->query($q);
	if($res){
		$row = array();
		while($r = $res->fetch_assoc()){
			$row[] = $r;
		}
		echo json_encode($row);
	}else{
		echo "Error executing query";	
	}
	exit;
?>