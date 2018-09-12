/**
 * Created by lenovo on 2018/9/12.
 */
$(function(){
    //获得slider插件对象

    var gallery = mui('.mui-slider');

    gallery.slider({

        interval:3000//自动轮播周期，若为0则不自动播放，默认为0；

    });

    //如果希望手动去控制轮播。则将interval的参数值设为0即可。
    //若要跳转到第x张图片，则可以使用图片轮播插件的gotoItem方法，例如：
    ////获得slider插件对象
    //var gallery = mui('.mui-slider');
    //gallery.slider().gotoItem(index);//跳转到第index张图片，index从0开始；
});