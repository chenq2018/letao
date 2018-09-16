/**
 * Created by lenovo on 2018/9/15.
 */
$(function(){
    /* 登录功能实现
     * 1. 给登录设置点击事件
     * 2. 获取登录内容值
     * 3. 对内容值进行验证
     * 4. 发送登录请求
     * 5. 返回登录结果，跳转个人中心
     */

    //一开始时让内容清空
    var userName = $('[name="userName"]').val('');

    //点击事件
    $(".width").on('tap', function(){
        //获取注册值
        userName = $('[name="userName"]').val();
        var password = $('[name="password"]').val();

        //验证用户名
        if($.trim(userName) == ''){
            mui.toast("请输入用户名");
            return;
        }

        //验证密码 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        var reg_password = /^[a-zA-Z]\w{5,17}$/;
        if($.trim(password) == '' || !reg_password.test(password)){
            mui.toast("密码为空或者密码格式不正确");
            return;
        }

        //发送登录请求
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: userName,
                password: password
            },
            beforeSend: function(){
              $('.width').html("正在登录中……");
            },
            success: function(result){
                //console.log(result);
                mui.toast('登录成功!');
                //跳转
                setTimeout(function(){
                    location.href = 'user.html';
                }, 2000);
            }
        });

    });

});