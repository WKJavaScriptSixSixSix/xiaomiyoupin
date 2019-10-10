; (function ($) {
    "ues strict";
    $.fn.banner = function (options) {
        var obj = {};
        var { items, left, right, list, autoPlay, moveTime, delayTime, index } = options;
        list = list === false ? false : true;
        autoPlay = autoPlay === false ? false : true;
        moveTime = moveTime || 200;
        delayTime = delayTime || 2000;
        index = index || 0;
        obj.iPrev = items.length - 1;
        items.eq(index).css("left",0);
        if (list) {
            var str = "";
            for (var i = 0; i < items.length; i++) {
                str += `<li></li>`;
            }
            obj.ul = $("<ul>").html(str);
            this.append(obj.ul);
            obj.ul.css({
                width: "100px",
                height: 20,               
                position: "absolute",
                left: "50%",
                bottom:"25px",               
                display: "flex",
                marginLeft: "-50px",
                padding: 0,

            })
            obj.ul.children("li").css({
                flex: 1,
                listStyle: "none",
                borderRadius:"50%",
                background:"#eee",
                width:"20px",
                height:"20px",
                marginRight:"10px"
                
               
            }).eq(index).css({
                background: "red",
                
            })
            //绑定事件判断方向
            obj.ul.children("li").on("click", function () {
                if ($(this).index() > index) {
                    obj.listMove($(this).index(), 1);
                }
                if ($(this).index() < index) {
                    obj.listMove($(this).index(), -1)
                }
                obj.ul.children("li").css({
                    background: "#eee",
                    
                }).eq($(this).index()).css({
                    background: "red",
            
                })
                index = $(this).index();
            })
        }
        obj.listMove = function (iNow, type) {
            items.eq(index).css({
                left: 0
            }).stop().animate({
                left: -items.eq(0).width() * type
            }).end().eq(iNow).css({
                left: items.eq(0).width() * type
            }).stop().animate({
                left: 0
            })
        }
        if (left != undefined && left.length > 0 && right != undefined && right.length > 0) {
            left.on("click", function () {
                if (index == 0) {
                    index = items.length - 1
                    obj.iPrev = 0;
                } else {
                    index--;
                    obj.iPrev = index + 1;
                }
                right.on("click",obj.rightClick);
                obj.btnMove(1);
            })
                
        }
        obj.rightClick=function () {
            if (index == items.length - 1) {
                index = 0;
                obj.iPrev = items.length - 1;
            } else {
                index++;
                obj.iPrev = index - 1;
            }
            obj.btnMove(-1);

        }
        obj.btnMove = function (type) {
            items.eq(this.iPrev).css({
                left: 0
            }).stop().animate({
                left: items.eq(0).width() * type
            }).end().eq(index).css({
                left: -items.eq(0).width() * type
            }).stop().animate({
                left: 0
            })
            if (!list) return;
            this.ul.children("li").css({
                background: "#eee",
              
            }).eq(index).css({
                background: "red",
                
            })
        }
        //自动播放
        if (autoPlay) {
            var t = setInterval(() => {
                obj.rightClick();
                // right.trigger("click");
            }, delayTime);
            this.hover(function () {
                clearInterval(t)
            }, function () {

                t = setInterval(() => {
                    obj.rightClick();
                    //  right.trigger("click");
                }, delayTime)
            })
        }
    }
})(jQuery);