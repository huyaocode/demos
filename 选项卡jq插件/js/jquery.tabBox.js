(function ($) {
    //具体插件功能实现
    var tab = {
        init: function (options) {
            this.opt = options;
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var self = this;
            var opt = this.opt;
            var wrap = opt.father;
            var len = opt.tabList.length;
            //头部
            var header = $('<div class="header"></div>');
            var title = $('<h3>' + opt.title + '</h3>');
            var oUl = $('<ul class="tabs" ></ul>');
            var tabHtml = '';
            for (var i = 0; i < len; i++) {
                tabHtml += '<li><a href="javascript:void(0)">' + opt.tabList[i] + '</a></li>';
            }
            wrap.append(header.append(title).append(oUl.html(tabHtml)));
            $('#tabBox .header .tabs li').eq(0).addClass('current');
            //主体
            //ul.tab-contents -> li.tab{$}
            var allDom = $('<ul class="tab-contents"></ul>');
            var tabPageHtml = '';
            for (var i = 0; i < len; i++) {
                tabPageHtml += '<li class="tab' + i + '"><ul>'+opt.tabContents[i]+'</ul></li>';
            }
            wrap.append(allDom.html(tabPageHtml));
            $('#tabBox .tab-contents li').eq(0).addClass('current');
        },
        bindEvent: function () {
            $('#tabBox .header .tabs li').on('click', function(e){
                var index = $(this).index();
                $('#tabBox .header .tabs .current').removeClass('current');
                $('#tabBox .header .tabs li').eq(index).addClass('current');
                $('#tabBox .tab-contents .current').removeClass('current');
                $('#tabBox .tab-contents>li').eq(index).addClass('current');
            })
        }
    }


    $.fn.extend({
        tabs: function (options) {
            options.father = $(this);
            tab.init(options);
        }
    })

})(jQuery)