$(function(){

	//退出功能
	$(".login_out_bot").on('click', function(){
		//console.log("11");

		//提示是否退出
		if(confirm("确定要退出吗?")){
			//请求登出接口
			$.ajax({
				url: '/employee/employeeLogout',
				type: 'get',
				success: function(result){
					//console.log(result);
                    if(result.success){
						localStorage.removeItem("isLogin");
						location.href = 'login.html';
					} else {
						alert("退出失败");
					}
				}
			});
		}

	});


	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});