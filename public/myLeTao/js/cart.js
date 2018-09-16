/**
 * Created by lenovo on 2018/9/16.
 */
$(function(){
    //获取商品信息
    var shopping = null;

    //请求购物车查询数据
    $.ajax({
       url: '/cart/queryCart',
       type: 'get',
       async: false,
       success: function(result){
          console.log(result);
           shopping = result;
          //渲染
          var html = template('cartTemp', {"item": result});
           //console.log(html);
          $("#cartUl").html(html);
       }
    });

    //编辑操作
    //点击事件
    $("#cartUl").on("tap", "#edit", function(){
         //console.log(id);
         //获取id值
         var id = $(this).data("id");
         //获取父DOM
         var li = this.parentNode.parentNode;

         //遍历数组
         $.each(shopping, function(i, v){
            if(shopping[i].id == id){
                //储存信息
                localStorage.setItem("shop", JSON.stringify(shopping[i]));
            }
         });

         //消息提示框
         mui.confirm("你是否要选择商品?", function(message){
             // 跳转到detail页面
             message.index == 1 ? setTimeout(function(){
                 location.href = "updateDetail.html";
             }, 2000) : mui.swipeoutClose(li);

         });
    });

    //删除商品事件
    $("#cartUl").on("tap", "#delete", function(){
        //console.log('aa');
        //获取id值
        var id = $(this).data("id");
        //获取父DOM
        var li = this.parentNode.parentNode;

        //消息提示框
        mui.confirm("你确定要删除商品吗?", function(message){
            // 跳转到detail页面
            if(message.index == 1){
               //调用删除接口
                $.ajax({
                    url: '/cart/deleteCart',
                    type: 'get',
                    data: {id: id},
                    success: function(result){
                        //console.log(result);
                        location.reload();
                    }
                });
            } else {
                mui.swipeoutClose(li);
            }

        });
    })
});