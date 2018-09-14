/**
 * Created by lenovo on 2018/9/12.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //一级分类获取数据
    $.ajax({
       type: "get",
       url:  "/category/queryTopCategory",
       success: function(result){
//此处报数据库异常是因为: PHPstudy的密码为root，而此处密码为空，在models——db.js——修改密码为root，再重启服务器npm start
//          console.log(result);
          var html = template('categoryLeft', {"item": result.rows});
          $(".mui-scroll > ul").html(html);

          if(result.rows.length){
              //获取点击ID，页面刷新时默认第一个被点击
              $(".mui-scroll > ul").find("li").eq(0).addClass('now').siblings('li').removeClass('now');

              //调用函数
              ajax(1);
          }
       }
    });

    //二级分类获取数据
    $(".mui-scroll > ul").on("click", 'li', function(){
        var id = $(this).attr('data-id');
        $(this).addClass('now').siblings('li').removeClass('now');

        //调用函数
        ajax(id);
    })

});

//ajax请求函数封装
function ajax(id){
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: {id: id},
        success: function(result){
            //console.log(result);
            var html = template('categoryRight', {"item": result.rows});
            $(".category_right > ul").html(html);

            if(result.rows.length == 0){
                $(".category_right").html('<div class="rightStyle">数据不存在</div>');
            }
        }
    });
}