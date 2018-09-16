/**
 * Created by lenovo on 2018/9/16.
 */
$(function(){
    //商品详情页面渲染
    //获取id值
    var id = getURL(location.href, 'id');
    //console.log(id);
    //商品最大num值
    var maxNum = 0;
    var size = null;

    if(id){
        $.ajax({
            url: '/product/queryProductDetail',
            type: 'get',
            async: false,
            data: {id: id},
            success: function(result){
                //console.log(result);
                //console.log(result.num);
                maxNum = result.num;

                //渲染到商品详细页面
                var html = template("detail", result);
                //console.log(html);
                $(".detailBox").html(html);
            }
        });

    } else {
        location.href = 'search.html';
    }

    //尺寸点击高亮
    $(".detailBox").on("tap", ".size span", function(){
        $(this).addClass('orange').siblings('span').removeClass('orange');
        size = $(this).html();
    });

    var op = $('#textSize');

    //点击-事件
    $(".detailBox").on('tap', '#reduce', function(){
        //$("#increase").removeClass("grey");
        var num = op.val();
        num--;
        if(num < 0){
            num = 0;
            //$("#reduce").addClass("grey");
        }
        op.val(num);

    });

    //点击+事件
    $(".detailBox").on('tap', '#increase', function(){
        //$("#reduce").addClass("grey");
        var num = op.val();
        num++;
        if(num > maxNum){
            num = maxNum;
            //$("#increase").addClass("grey");
        }
        op.val(num);

    });

    //var number = op.val();

    //添加购物车点击事件
    $("#shopcar").on("tap", function(){
        //添加购物车功能
        if(!size){
            mui.toast('请选择尺码');
            return;
        }

        //请求添加购物车
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num: op.val(),
                size: size
            },
            success: function(result){
                console.log(result);
                if(result.error && result.error == 400){
                    mui.toast("请先登录再购买");
                    setTimeout(function(){
                        location.href = 'login.html';
                    }, 2000);
                } else if(result.success) {
                    //给与提示
                    mui.confirm("加入购物车成功，是否跳转到购物车?", function(message){
                        if(message.index == 1){
                            location.href = "cart.html";
                        }
                    });
                }

            }
        });
    })

});