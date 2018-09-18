/**
 * Created by lenovo on 2018/9/18.
 */
//判断是否登录成功
if(!localStorage.getItem("isLogin")){
    location.href = 'login.html';
}


$(function(){
    var page = 1;
    var pageSize = 3;
    //获取总页数
    var totalPage = 1;

    var brandLogo = '';

    getPage();

    //分页处理，下一页
    $("#nextBtn").on("click", function(){
        page++;

        //判断是否到了最大页面
        if(page > totalPage){
            page = totalPage;
            alert("已经最后一页");
            return;
        }

        getPage();
    });

    //分页处理，上一页
    $("#prevBtn").on("click", function(){
        page--;

        //判断是否到了最大页面
        if(page < 1){
            page = 1;
            alert("没有上一页了");
            return;
        }

        getPage();
    });

    //查询一级分类添加商品分类
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function(result){
            //console.log(result);
            //渲染
            var html = template("selectTemp", result);
            //console.log(html);
            $("#selectId").html(html);
        }
    });

    //图片上传
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            //console.log(data);

            //按图片显现
            $("#bigImg").attr("src", data.result.picAddr);
            brandLogo = data.result.picAddr;
        }
    });

    //添加分类
    $("#btn").on("click", function(){
        //console.log("11");
        //获取元素
        var categoryId = $()
        var name = $("[name='name']").val();
        var categoryId = $("[name='categoryId']").val();

        //验证
        if($.trim(name) == '') {
            console.log("请输入用户名");
            return;
        }

        //请求数据
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: {
                brandName: name,
                categoryId: categoryId,
                brandLogo: brandLogo
            },
            success: function(result){
                //console.log(result);
                if(result.success) {
                    location.reload();
                }
            }

        });

    });


    function getPage(){
        //二级分类渲染
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(result){
                console.log(result);
                totalPage = Math.ceil(result.total / pageSize);
                //渲染
                var html = template("categorySecondTemp", result);
                //console.log(html);
                $("#categorySecondTable").html(html);
            }
        });
    }

});