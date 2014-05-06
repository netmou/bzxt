/* 
 *this is a picture slide 
 */
var Slide = {
    dest: null,
    width: 980,
    length: 3,
    time: 300,
    sleep: 4000,
    index: 0,
    last: 0,
    animal: function(index) {
        var caller = this;
        var scrollLeft = index * caller.width;
        var curScrollLeft = $(caller.dest).scrollLeft();
        var speed = caller.time / 15;
        var offset = (scrollLeft - curScrollLeft) / speed;
        var counter = setInterval(function() {
            var left = $(caller.dest).scrollLeft();
            if (left < scrollLeft) {
                $(caller.dest).scrollLeft(left + offset);
            } else {
                $(caller.dest).scrollLeft(scrollLeft);
                caller.alterTab(index);
                clearInterval(counter);
            }
        }, speed);
    },
    alterTab: function(index) {
        var obj = $(".on-tab li").get(index);
        if (this.last) {
            $(this.last).css(this.normalTab);
        }
        $(obj).css(this.focusTab);
        this.last = obj;
    },
    initSlide: function(paramObj) {
        paramObj = paramObj || {};
        for (var property in paramObj) {
            this[property] = paramObj[property];
        }
        var caller = this;
        var player = null;
        var index = 0;
        var initPlayer = function() {
            player = setInterval(function() {
                index = ++index % caller.length;
                caller.animal(index);
            }, caller.sleep);
        };
        $(this.dest).mouseover(function() {
            clearInterval(player);
        });
        $(this.dest).mouseout(function() {
            initPlayer();
        });
        $(".on-tab li").click(function() {
            if (caller.last) {
                $(".on-tab li").css(caller.normalTab);
            }
            caller.animal($(this).index());
            index = $(this).index();
            caller.last = this;
        });
        initPlayer();
    },
    normalTab: {
        border: "1px solid #444"
    },
    focusTab: {
        border: "2px solid #f44"
    }
};