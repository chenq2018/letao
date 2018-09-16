/**
 * Created by lenovo on 2018/9/16.
 */
$(function(){
    //获取localstore储存的信息
    var update = JSON.parse(localStorage.getItem("shop"));
    console.log(update);
    var maxNum = 0;
    var size = null;

    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        async: false,
        data: {
           id: update.id
        },
        success: function(result){
            //console.log(result);
            maxNum = result.productNum;
            //渲染到页面中
            var html = template("updateDetail", update);
            $(".detailBox").html(html);

        }
    });

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

    //确认修改
    $(".detailBox").on("tap", '#check', function(){
        //console.log("aaa");
        mui.confirm("你确定修改商品吗?", function(message){
            // 跳转到detail页面
            if(message.index == 1){
                $.ajax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                        id: update.id,
                        size: size,
                        num: op.val()
                    },
                    success: function(result){
                        //console.log(result);
                        mui.toast("修改商品成功!");
                        setTimeout(function(){
                            location.href = 'cart.html';
                        }, 2000);
                    }
                });
            }

        });

    })
});