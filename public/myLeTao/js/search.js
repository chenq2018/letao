/**
 * Created by lenovo on 2018/9/13.
 */
$(function(){
    //先清空搜索框内容
    $(".searchBox").find('input').val("");

    //点击搜索按钮获得搜索框内容
    $(".search").on("click", function(){
        var keyword = $(this).siblings("input").val();
        //alert(keyword);

        //判断搜索框内容是否存在
        if(keyword.trim() != ''){
            //储存搜索
            //push: 往后加
            //pop: 删除后面
            //unshift: 前面添加
            //shift: 前面删除

            keyArr.unshift(keyword);
            //储存到本地，传入的都是字符串，序列化
            //localStorage中的S要大写
            localStorage.setItem("store", JSON.stringify(keyArr));

            //存在跳转
            location.href = "search-result.html?keyword="+ keyword +"";
        } else {
            alert("请输入搜索的商品内容!");
        }

    });

    //定义一个空数组储存搜索历史
    var keyArr = [];
    //实现搜索历史
    if(localStorage.getItem("store")){
        //转换成数组
        keyArr = JSON.parse(localStorage.getItem("store"));
        //console.log(keyArr);
        //模板引擎
        var html = template('items', {"item": keyArr});
        $(".mui-table-view").html(html);
    }

    //清空历史
    $(".clear").on("click", function(){
        $(".mui-table-view").html("");
        localStorage.removeItem("store");
    });

    //实现点击搜索结果跳转页面，事件委托
    $(".mui-table-view").on('click', 'li', function(){
       location.href = "search-result.html?keyword="+ $(this).text() +"";
    })

});