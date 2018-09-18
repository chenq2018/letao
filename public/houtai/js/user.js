/**
 * Created by lenovo on 2018/9/18.
 */
//判断是否登录成功
if(!localStorage.getItem("isLogin")){
    location.href = 'login.html';
}

$(function(){
    //用户列表功能
    //请求一级查询
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page: 1,
            pageSize: 10
        },
        success: function(result){
            //console.log(result);
            //渲染
            var html = template("userTemp", result);
            //console.log(html);
            $("#userTable").html(html);
        }
    });


    $("#userTable").on("click", ".edit-btn", function(){
        //获取id与isDelete值
        var id = $(this).data("id");
        var isDelete = Number($(this).attr("data-isDelete"));

        //!isDelete，转换成的是字符串类型
        //用户状态管理
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            success: function(result){
                //console.log(result);
                if(result.success){
                     location.reload();
                }
            }
        });
    });

});