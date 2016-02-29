<?php
/*
	create a table for testing and insert few records
	
	
	CREATE TABLE IF NOT EXISTS `ajax` (
	  `id` int(11) NOT NULL AUTO_INCREMENT,
	  `title` varchar(255) NOT NULL,
	  `description` varchar(255) NOT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;
	
	--
	-- Dumping data for table `ajax`
	--
	
	INSERT INTO `ajax` (`id`, `title`, `description`) VALUES
	(1, 'LMS', 'Learning management system'),
	(2, 'Goals', 'Personal Goals tracker'),
	(3, 'Task Manager', 'Office tasks management'),
	(4, 'Trre House', 'dummy dropdown'),
	(5, 'Lion group', 'family of lions'),
	(6, 'Tree house', 'The ultimate forest');
*/

	$db = new mysqli("localhost","root","","ainbox");
	if($db->connect_error){
		echo 	$db->connect_error;
		exit;
	}
	$q= "select * from ajax";
	if(isset($_GET['title'])){
		$q.=" where title like '%".trim(str_replace("'","''",$_GET['title']))."%' ";
	}
	$q.='  order by title';
	$res = $db->query($q);
	if($res){
		$row = array();
		echo '<ul>';
		while($r = $res->fetch_assoc()){
			echo '<li data-id="'.$r['id'].'">'.$r['title'].'</li>';
		}
		echo '</ul>';
	}else{
		echo "Error executing query";	
	}
	exit;
?>