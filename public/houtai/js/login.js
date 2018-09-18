/**
 * Created by lenovo on 2018/9/17.
 */
//先判断用户是否已经登录，如果是则直接登录到user界面
if(localStorage.getItem("isLogin")){
    location.href = 'user.html';
}

$(function(){
    /* 登录功能
    *  1. 点击登录按钮事件
    *  2. 获取内容值并验证
    *  3. 请求数据
    *  4. 跳转页面
     */

    $("#login").on("click", function(){
        //console.log("aaa");
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        console.log(username);
        console.log(password);

        //验证
        if($.trim(username) == '') {
            console.log("请输入用户名");
            return;
        }

        if($.trim(password) == '') {
            console.log("请输入密码");
            return;
        }

        //请求数据
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function(result){
                //console.log(result);
                if(result.success) {
                    localStorage.setItem("isLogin", true);
                    location.href = 'user.html';
                } else {
                    console.log(result.message);
                }
            }
        });
    });
});