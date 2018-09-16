/**
 * Created by lenovo on 2018/9/12.
 */
$(function(){
    //���slider�������

    var gallery = mui('.mui-slider');

    gallery.slider({

        interval:3000//自动轮播周期，若为0则不自动播放，默认为0；

    });

    ////获得slider插件对象
    //var gallery = mui('.mui-slider');
    //gallery.slider().gotoItem(index);//跳转到第index张图片，index从0开始；
});