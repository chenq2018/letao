/**
 * Created by lenovo on 2018/9/15.
 */
$(function(){
    /* 注册功能实现
     * 1. 给注册设置点击事件
     * 2. 获取注册内容值
     * 3. 对内容值进行验证
     * 4. 发送注册请求
     * 5. 返回注册结果，跳转登录界面
     */

    //一开始时让内容清空
    //设置验证码获取变量
    var vCode;

    //点击事件
    $(".width").on('tap', function(){
        //获取注册值
        var oldPassword = $('[name="oldPassword"]').val();
        var newPassword = $('[name="newPassword"]').val();
        var againPassword = $('[name="againPassword"]').val();
        code = $('[name="code"]').val();


        //验证密码 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        var reg_password = /^[a-zA-Z]\w{5,17}$/;
        if($.trim(oldPassword) == '' || !reg_password.test(oldPassword)){
            mui.toast("原密码为空或者原密码格式不正确");
            return;
        }

        if($.trim(newPassword) == '' || !reg_password.test(newPassword)){
            mui.toast("新密码为空或者新密码格式不正确");
            return;
        }

        //验证密码确认
        if($.trim(againPassword) == '' || newPassword != againPassword){
            mui.toast("确认新密码为空或者两次密码不一致");
            return;
        }

        //验证验证码
        var reg_code = /^\d{6}$/;
        if($.trim(code) == '' || !reg_code.test(code) || code != vCode){
            mui.toast("验证码为空或者验证码不正确");
            return;
        }

        //发送注册请求
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                vCode: code
            },
            success: function(result){
                mui.toast('密码修改成功!');
                //跳转
                setTimeout(function(){
                    location.href = 'login.html';
                }, 2000);
            }
        });

    });

    //获取验证码
    $(".vCode").on("tap", function(){
        //请求验证码
        $.ajax({
            url: "/user/vCodeForUpdatePassword",
            type: 'get',
            success: function(result){
                vCode = result.vCode;
                console.log(result.vCode);
            }
        });
    })
});