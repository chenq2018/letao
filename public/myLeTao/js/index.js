/**
 * Created by lenovo on 2018/9/12.
 */
$(function(){
    //���slider�������

    var gallery = mui('.mui-slider');

    gallery.slider({

        interval:3000//�Զ��ֲ����ڣ���Ϊ0���Զ����ţ�Ĭ��Ϊ0��

    });

    //���ϣ���ֶ�ȥ�����ֲ�����interval�Ĳ���ֵ��Ϊ0���ɡ�
    //��Ҫ��ת����x��ͼƬ�������ʹ��ͼƬ�ֲ������gotoItem���������磺
    ////���slider�������
    //var gallery = mui('.mui-slider');
    //gallery.slider().gotoItem(index);//��ת����index��ͼƬ��index��0��ʼ��
});