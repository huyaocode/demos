/**
 * 搜索框插件
 */
(function ($) {
    function Search(wrapper, placehoder) {
        this.wrapper = wrapper;
        this.createDom(placehoder);
        this.bindEvent();
    }
    Search.prototype.createDom = function (placehoder) {
        this.wrapper.html('<input type="text" placeholder="' + placehoder + '"><button>搜索</button>')
    }
    Search.prototype.bindEvent = function () {
        var self = this;
        //点击事件查询
        $('#searchBox button').on('click', function () {
            self.query($('#searchBox input').val())
        })
        //回车执行查询
        $('#searchBox input').on('keyup', function (e) {
            if (e.keyCode == '13') {
                var value = $(this).val();
                value && self.query(value);
            }
        })
        var pauseTimer = null;
        $('#searchBox input').on('keyup', function (e) {
            if (e.keyCode == '13') {
                var value = $(this).val();
                value && self.query(value);
            } else {
                //当用户输入停止的事件绑定
                clearTimeout(pauseTimer);
                var domInput = $(this);
                pauseTimer = setTimeout(function () {
                    var value = domInput.val();
                    value && self.preQuery(value);
                }, 500);
            }
        })
    }
    //当用户输入停止500毫秒时触发
    Search.prototype.preQuery = function (value) {
        console.log('preQuery', value);
    }
    //用户回车或者点击搜索时触发
    Search.prototype.query = function (value) {
        console.log(value);
    }

    $.fn.extend({
        searchBox: function (placehoder) {
            new Search(this, placehoder);
        }
    })

}(jQuery));



