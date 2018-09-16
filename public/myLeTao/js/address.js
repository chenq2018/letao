/**
 * Created by lenovo on 2018/9/15.
 */
$(function(){
    var html = '';
    //设置接收地址的参数
    var address = null;

    //获取地址管理数据
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function(result){
            //console.log(result);
            address = result;
            //如果未登录，则跳转到登录页面
            if(result.error && result.error == 400){
                location.href = 'login.html';
            }
            //渲染
            html = template('address', {"item": result});
            $("#addressul").html(html);
        }
    });

    //删除确认提示框，因为编辑和删除都是加载a上，所以无法指定具体的a标签，给父盒子添加事件
    $("#addressul").on("tap", '.delete', function(){
        //获取ID值
        var id = $(this).attr("data-id");
        //console.log(id);
        //获取a标签父盒子元素
        var li = this.parentNode.parentNode;
        //console.log(li);

        //confirm( message, title, btnValue, callback [, type] )
        mui.confirm("确认删除吗?", "提示", function(res){
            //console.log(res);

            //res=0表示取消res=1为确认
            if(res.index == 1){
               //删除确认时，请求删除接口
                $.ajax({
                   url: '/address/deleteAddress',
                   type: 'post',
                   data: {id: id},
                   success: function(result){
                      //console.log(result);
                       if(result.success){
                           //重新页面加载
                           location.reload();
                       }
                   }
                });
            } else {
                //取消右侧突出部分 swipeoutClose()传入类名或标签名，给a标签父盒子取消右滑动
                mui.swipeoutClose(li);
            }
        });
    });

    //编辑功能
    $("#addressul").on("tap", '.edit', function(){
         //获取当前编辑的ID
         var id = this.getAttribute("data-id");
        //console.log(id);
         //遍历循环address数组
         $.each(address, function(i, v){
             if(address[i].id == id){
                 //表示是当前的元素编辑，储存数据到localstore
                 localStorage.setItem("editAddress", JSON.stringify(address[i]));
                 //找到当前元素则停止循环
             }
         });

         //跳转，为了区分是编辑跳转还是添加地址跳转，所以设置isEdit
         location.href= "addAddress.html?isEdit=1";
    })

});