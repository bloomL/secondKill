var seckill ={
    //封装秒杀相关ajax的URL
    URL : {
        now : function () {
            return '/seckill/time/now';
        },
        exposer : function (seckillId) {
            return '/seckill/'+seckillId+'/exposer';
        },
        execution : function (seckillId,md5) {
            return '/seckill/'+seckillId+'/'+md5+'/exection';
        }
    },
    handleSeckill: function(seckillId,node){
        //处理秒杀逻辑
        node.hide()
            .html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>');
        $post(seckill.URL.exposer(),{},function (result) {
            if (result && result['success']){
                var exposer = result['data'];
                if (exposer['exposed']){
                    //开启秒杀
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId,md5);
                    console.log("killUrl:"+killUrl);
                    //绑定一次点击事件
                    $('#killBtn').one('click',function () {
                        $(this).addClass('disabled');
                        $.post(killUrl,{},function (result) {
                            if (result && result['success']){
                                var killResult = result['data'];
                                var state = killResult['state'];
                                var stateInfo = killResult['stateInfo'];
                                node.html('<span class="label label-success">'+stateInfo+'</span>')
                            }
                        });
                    });
                    node.show();
                }else {
                    //未开启秒杀
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    //重新计算计时逻辑
                    seckill.countdown(seckillId,now,start,end);
                }
            }else {
                console.log('result:'+result);
            }
        })
    },
    countdown : function(seckillId,nowTime,startTime,endTime) {
        var seckillBox = $('#seckill-box');
        if (nowTime > endTime){
            seckillBox.html('秒杀结束！');
        }else if (nowTime < startTime){
            //计时事件绑定
            var killTime = new Date(startTime+1000);
            seckillBox.countdown(killTime,function (event) {
                var format = event.strftime('秒杀倒计时: %D天 %H时 %M分 %S秒');
                seckillBox.html(format);
            }).on('finish.countdown',function () { //事件完成后回调事件
                //获取秒杀地址，执行秒杀；
                seckill.handleSeckill();
            })
        }else {
            //秒杀开始
            seckill.handleSeckill();
        }
    },

    //验证手机号
    validatePhone : function(phone){
        if (phone && phone.length == 11 && !isNaN(phone)){
            return true;
        }else {
            return false;
        }
    },
    //详情页秒杀
    detail : {
        //详情页初始化
        init : function (param) {
            //cookie中查找手机号
            var killPhone = $.cookie('killPhone');
            //验证手机号
            if (seckill.validatePhone(killPhone)){
                var killPhoneModal = $('#killPhoneModal');
                //显示弹出层
                killPhoneModal.modal({
                    show: true,//显示弹出层
                    backdrop: 'static',//禁止位置关闭
                    keyboard: false//关闭键盘事件
                });
                $('killPhoneBtn').click(function () {
                    var inputPhone = $('#killPhoneKey').val();
                    console.log('inputPhone='+inputPhone);
                    if (seckill.validatePhone(inputPhone)){
                        //将电话写入cookie
                        $.cookie('killPhone',inputPhone,{expires:7,path: '/seckill'});
                        //刷新页面
                        window.location.reload();
                    }else {
                        $('#killPhoneMessage').hide().html('<lable class="label label-danger">手机号错误!</lable>').show(300);
                    }
                });
            }
            //已登录
            //计时交互
            var startTime = param['startTime'];
            var endTime = param['endTime'];
            var seckillId = param['seckillID'];
            $.get(seckill.URL.now(),{},function (result) {
                if (result && result['success']){
                    var nowTime =result['data'];
                    //计时交互
                    seckill.countdown(seckillId,startTime,endTime);
                }else {
                    console.log('result:'+result);
                }
            })
        }
    }
}