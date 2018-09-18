/**
 * Created by lenovo on 2018/9/18.
 */
//判断是否登录成功
if(!localStorage.getItem("isLogin")){
    location.href = 'login.html';
}

$(function(){
    var page = 1;
    var pageSize = 10;
    var message = '';
    var mess = '';

    getPage();

    function getPage(){
        //请求商品查询
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(result){
                //console.log(result);
                message = result.rows;
                var html = template('productTemp', {'item': result.rows});
                //console.log(html);
                $("#productTable").html(html);
            }
        });
    }

    //请求二级分类获得品牌名称
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: 100
        },
        success: function(result){
            //console.log(result);
            //渲染品牌名称
            var html = template('brandNameTemp', {'item': result.rows});
            $("#select").html(html);
        }
    });

    //添加商品图片上传请求
    //图片上传
    //设置图片数组
    var Img = [];
    var dat = '';
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            //console.log(data);
            dat = data.result;
            Img.push(data.result);

            //console.log(Img);
        }
    });


    $('#addProduct').on("click", function(){
        //获取添加商品的值
        var proName = $('[name=proName]').val().trim();
        var oldPrice = $('[name=oldPrice]').val().trim();
        var price = $('[name=price]').val().trim();
        var proDesc = $('[name=proDesc]').val().trim();
        var size = $('[name=size]').val().trim();
        var num = $('[name=num]').val().trim();
        var brandId = $('#select').val();
        //console.log(brandId);

        //验证
        if(proName == ''){
            alert("请输入产品名称");
            return;
        }

        if(oldPrice == ''){
            alert("请输入商品原价");
            return;
        }

        if(price == ''){
            alert("请输入商品折扣价");
            return;
        }

        if(proDesc == ''){
            alert("请输入产品描述");
            return;
        }

        if(size == ''){
            alert("请输入产品尺寸");
            return;
        }

        if(num == ''){
            alert("请输入产品数量");
            return;
        }

        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                statu: 1,
                brandId: brandId,
                pic: Img
            },
            success: function(result){
                console.log(result);
                if(result.success){
                    location.reload();
                }
            }
        });
    });

    var status = 1;
    //更改商品状态
    $("#productTable").on("click", '.edit-btn', function(){
        //console.log("aa");
        var id = $(this).val();
        //console.log(id);
        var isStatu = Number($(this).attr("data-statu"));

        $.each(message, function(i, v){
            if(message[i].id == id) {
                mess = message[i];
            }
        });

        mess.statu == 1 ? mess.statu = 0 : mess.statu = 1;

        $.ajax({
            url: '/product/updateProduct',
            type: 'post',
            data: {
                id: id,
                proName: mess.proName,
                oldPrice: mess.oldPrice,
                price: mess.price,
                proDesc: mess.proDesc,
                size: mess.size,
                num: mess.num,
                statu: mess.statu,
                brandId: mess.brandId

            },
            success: function(result){
                //console.log(result);
                if(result.success) {
                    location.reload();
                }
            }
        });
    })
});