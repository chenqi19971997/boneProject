<?php  
$userName=$_POST['userName'];
$password=$_POST['password'];
// 从数据库获取数据
$conn=mysqli_connect('localhost','root','root','2008'); 
mysqli_query($conn,"set charset 'utf8'");	
mysqli_query($conn,"set character set 'utf8'");
echo "select * from users where userName=$userName, password=$password";
// sql语句
$sql="select * from users where userName=$userName and password=$password";
// 得到查询结果s               
									
$res=mysqli_query($conn,$sql);
echo json_encode($res);

if(!empty($res)){
	echo json_encode(array(
		"code"=>200,
		"body"=>array(
		"msg"=>'登录成功'
		)
	));
}else{
	echo json_encode(array(	
		"code"=>201,
		"body"=>array(
		"msg"=>'登录失败'
		)
	));
}
