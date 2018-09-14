/**
 * Created by lenovo on 2018/9/13.
 */

//***连接数据库先要将modles中的db.js修改密码为root，重启npm服务器 db.js报错不要紧***
//获取地址栏中的keyword值
var value = getURL(location.href, 'keyword');
//console.log(value);
var page = 1;
var html = '';
//定义初始排序顺序，依据接口文档
var priceSort = 1;
//改变this指向问题
var that = null;

$(function(){

    //实现上拉刷新，使用mui模板
    mui.init({
        pullRefresh : {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback : ajax //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //实现价格排序工能，价格点击事件，click事件无法弹窗，用tap
    $("#price").on("tap", function(){
        //alert('aa');
        //每点一次，就实现顺逆的互换，1升序 2降序
        priceSort = priceSort == 1 ? 2 : 1;
        //初始化参数
        html = "";
        page = 1;
        //重置上拉加载，mui组件
        //pullup-container为在mui.init方法中配置的pullRefresh节点中的container参数；
        //注意：refresh()中需传入true
        mui('#refreshContainer').pullRefresh().refresh(true);
        //重新渲染
        ajax();
    })


});

//封装函数
function getURL(url, name){
   //地址以?号分隔地址，截取用substr
   var param = url.substr(url.indexOf('?')+1);
   //console.log(param);

   //当传入的参数比较多时，会以&分隔，分隔用split
   var params = param.split('&');
   //console.log(params);

   //循环数组
    var keys;
    $.each(params, function(i, v){
        //键值对以=号分隔
        var key = v.split('=');
        //console.log(key[0]);
        if(key[0] == name){
            keys = key[1];
            //结束循环
            return false;
        }
    });
    return keys || null;

    //for(var i = 0; i< params.length; i++){
    //    var current = params[i].split("=");
    //    if(current[0] == name){
    //        return current[1];
    //    }
    //}

    //return null;

}

function ajax(){
    //重置this，改变this指向
    if(!that){
       that = this;
    }

    //ajax请求搜索结果
    $.ajax({
        type: 'get',
        url: ' /product/queryProduct',
        data: {
            proName: value,
            page: page++,
            pageSize: 3,
            price: priceSort
        },
        success: function(result){
           //判断数据是否存在
           if(result.data.length > 0){
               html += template('sports', {"item": result.data});
               $(".sport").find('ul').html(html);

               //注意：
               //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
               //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
               //this要是当前函数的this
               that.endPullupToRefresh(false);
           } else {
               that.endPullupToRefresh(true);
           }

        }
    });
}