(function () {

    var Model = function () {
        this.posArr = [];

    }
    /**
     * 规范
     */
    Model.prototype.init = function (arr, width, height, needSort) {
        if (needSort) {
            arr.sort((a, b) => b.size - a.size);
        }
        var oBlock = {
            w: width,
            h: height,
            x: 0,
            y: 0
        };
        this.splitBlock(arr, oBlock);
        return this.posArr;
    }
    /**
     * 返回
     */
    Model.prototype.splitBlock = function (arr,block) {

        //递归出口,当被切割到只剩一个的时候，就将他推入到结果数组中
        if (arr.length === 1) {
            this.posArr.push({
                info: arr[0],
                pos: block
            })
            return;
        }
        //计算分割位置
        var mid = arr.length / 2;
        var prevLen = 0, nextLen = 0, sumLen;    //前一段的长度
        var preArr = [], nextArr = [];
        arr.forEach(function (ele, i) {
            if (i < mid) {
                prevLen += ele.size;
                preArr.push(ele)
            } else {
                nextLen += ele.size;
                nextArr.push(ele)
            }
        });
        sumLen = prevLen + nextLen;
        //是否横向切割,就是高比宽大。横着一条线
        var splitByCol = block.h > block.w;

        var prevBlock = {
            x: block.x,
            y: block.y,
            w: !splitByCol ? (prevLen / sumLen) * block.w : block.w,
            h: splitByCol ? (prevLen / sumLen) * block.h : block.h,
        }

        var nextBlock = {
            x: block.x + ((!splitByCol) ? (prevLen / sumLen) * block.w : 0),
            y: block.y + ((splitByCol ? (prevLen / sumLen) * block.h : 0)),
            w: (!splitByCol) ? (nextLen / sumLen) * block.w : block.w,
            h: splitByCol ? (nextLen / sumLen) * block.h : block.h,
        }

        //前
        this.splitBlock(preArr, prevBlock);
        //后
        this.splitBlock(nextArr, nextBlock);
    }

    window.SpliteBlock = Model;
})();


