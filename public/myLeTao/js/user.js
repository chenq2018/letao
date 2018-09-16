/**
 * Created by lenovo on 2018/9/15.
 */
//查询当前用户状态，如果没有登录则跳转到登录页面
//为了解决跳转页面时，用户页面闪现会员中心页面的问题，需要把异步请求变成同步async: false

//将要保存的用户信息
var userInfo = null;

$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    async: false,
    success: function(result){
        //console.log(result);
        if(result.error && result.error == 400){
            location.href = 'login.html';
        }

        userInfo = result;

        //不能在这里渲染，因为这是同步请求，页面还没加载
        //var html = template("userInfo1", userInfo);
        ////console.log(html);
        //$("#ul").html(html);
    }
});


$(function(){
   /* 退出登录功能
    * 1. 退出点击事件
    * 2. 请求退出接口
    * 3. 返回结果并跳转到首页
     */

    $(".center").on("tap", function(){
        $.ajax({
            url: "/user/logout",
            type: 'get',
            success: function(result){
                if(result.success){
                    mui.toast("退出登录成功");

                    setTimeout(function(){
                        location.href = 'index.html';
                    }, 2000);
                }
            }
        });
    });

    //渲染手机号和用户名
    var html = template("userInfo1", userInfo);
    //console.log(html);
    $("#ul").html(html);

});