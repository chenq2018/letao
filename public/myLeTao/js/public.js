/**
 * Created by lenovo on 2018/9/15.
 */
$(function(){
    //��footer���������ת
    $("body").on("tap", 'a', function(){
       //��תҳ��mui.openWindow()����
       mui.openWindow({
           url: $(this).attr('href')
       })
    });

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