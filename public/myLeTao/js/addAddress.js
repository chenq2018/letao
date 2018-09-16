/**
 * Created by lenovo on 2018/9/15.
 */
$(function(){
    //判断是添加地址的跳转还是编辑页面跳转
    //获取isEdit后面的数字
    var id = Number(getURL(location.href, 'isEdit'));
    //此时id为string类型，要转换成数字类型
    //console.log(typeof(id));
    //如果是编辑跳转
    if(id == 1){
        //渲染
        //从address中获取localstore的储存数据
        if(localStorage.getItem("editAddress")){
            var addAddress = JSON.parse(localStorage.getItem("editAddress"));
            //console.log(addAddress);
            //渲染到添加地址页面
            var html = template("editAddress", addAddress);
            $("#form").html(html);
        }
    } else {
        var html = template("editAddress", {});
        $("#form").html(html);
    }


    //选择省市区功能
    // 通过new mui.PopPicker()初始化popPicker组件
    //new PopPicker({PopPicker.options}})
    //layer
    //Type: Int
    //picker显示列数
    var picker = new mui.PopPicker({
        layer: 3
    });

    //setData() 支持数据格式为: 数组，数组在city.js中
    picker.setData(cityData);

    //点击事件，显示picker
    $("#text").on("tap", function(){
        picker.show(function (selectItems) {
            //console.log(selectItems);
            console.log(selectItems[0].text);//智子
            console.log(selectItems[1].text);//zz
            console.log(selectItems[2].text);//zz

            //显示
            $("#text").val(selectItems[0].text + ' ' + selectItems[1].text + ' ' + selectItems[2].text);
        })
    })

    /* 添加收货地址到地址列表页面
     *  1. 添加点击事件
     *  2. 获取信息
     *  3. 验证信息
     *  4. 请求数据
     *  5. 返回数据
     *  6. 跳转到地址列表页面
     */
    $(".width").on("tap", function(){
        //获取信息
        var recipients = $('[name="recipients"]').val();
        var postcode = $('[name="postcode"]').val();
        var address = $('[name="address"]').val();
        var addressDetail = $('[name="addressDetail"]').val();

        //验证信息
        if(recipients.trim() == ''){
            mui.toast("请输入收货人姓名");
            return;
        }

        var reg_postcode = /[1-9]\d{5}(?!\d) /;
        if(postcode.trim() == '' || reg_postcode.test(postcode)){
            mui.toast("邮政编码为空或者格式不正确");
            return;
        }

        if(address.trim() == ''){
            mui.toast("请选择地址");
            return;
        }

        if(addressDetail.trim() == ''){
            mui.toast("请输入详细地址");
            return;
        }

        //判断是编辑跳转请求数据还是添加跳转请求数据
        //id=1编辑跳转，id=2添加跳转
        if(id){
            var url = '/address/updateAddress';
            var data = {
                id: addAddress.id,
                address: address,
                addressDetail: addressDetail,
                recipients: recipients,
                postcode: postcode
            };
        } else {
            var url = '/address/addAddress';
            var data = {
                address: address,
                addressDetail: addressDetail,
                recipients: recipients,
                postcode: postcode
            };
        }

        //数据请求
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function(result){
                console.log(result);
                if(id == 1){
                    mui.toast("编辑地址成功");
                } else {
                    mui.toast("添加地址成功");
                }

                setTimeout(function(){
                    //跳转
                    location.href = 'address.html';
                }, 2000);
            }
        });
    });

});