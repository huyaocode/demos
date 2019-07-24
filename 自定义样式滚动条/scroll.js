class Scroll {
    constructor(doms, thumbStyle) {
        this.container = doms.container;
        this.content = doms.content;
        this.yBar = doms.yBar;
        this.yBarContainer = doms.yBarContainer;

        this.thumbStyle = thumbStyle;

        this.initStyle();
        this.bindEvent();
    }

    initStyle() {
        const {
            thumbMarginTopBottom
        } = this.thumbStyle;
        this.yBar.style.top = thumbMarginTopBottom + 'px';
        this.containerHeight = getStyle(this.container, 'height') - thumbMarginTopBottom * 2;
        this.contentLen = this.content.scrollHeight;

        // 滚动条长度
        this.scrollBarLen = this.containerHeight * this.containerHeight / this.contentLen;
        this.yBar.style.height = this.scrollBarLen + 'px';
    }

    bindEvent() {
        this.yBar.addEventListener('mousedown', this.onMouseDown)
        this.content.addEventListener('scroll', this.onContentScroll)
    }

    // 卸载组件时调用
    scrollBarUnmounted() {
        this.yBar.removeEventListener('mousedown', this.onMouseDown)
        this.content.removeEventListener('scroll', this.onContentScroll)
    }

    onContentScroll = e => {
        e.stopPropagation();
        e.preventDefault();

        let curDiff = e.target.scrollTop;
        // 偏移 = (目前总偏移 * list窗口高度 ) / 所有listitem高度总和
        let diffY = (curDiff * this.containerHeight) / this.contentLen;
        this.yBar.style.top = this.thumbStyle.thumbMarginTopBottom + diffY + 'px';

        return false;
    }

    onMouseDown = e => {
        e.stopPropagation();
        e.preventDefault();

        const {
            thumbHoverWidth,
            thumbMarginRight
        } = this.thumbStyle;

        this.offsetY = e.clientY - e.target.offsetTop;
        this.yBar.style.width = thumbHoverWidth + 'px';
        this.yBar.style.borderRadius = thumbHoverWidth / 2 + 'px';
        this.yBar.style.backgroundColor = '#888888';
        this.yBarContainer.style.width = thumbHoverWidth + thumbMarginRight * 2 + 'px';

        document.addEventListener('mousemove', this.onMouseDrag)
        document.addEventListener('mouseup', this.onMouseUp);

        return false;
    }

    onMouseDrag = e => {
        e.stopPropagation();
        e.preventDefault();

        const {
            thumbMarginTopBottom
        } = this.thumbStyle;
        let newTop = e.clientY - this.offsetY;
        const minTop = thumbMarginTopBottom;
        const maxTop = this.containerHeight - this.scrollBarLen + thumbMarginTopBottom;
        // 边界
        if (newTop < minTop) {
            newTop = minTop;
        } else if (newTop > maxTop) {
            newTop = maxTop;
        }
        this.scrollContent(newTop)
        return false;
    }

    onMouseUp = e => {
        e.stopPropagation();
        e.preventDefault();

        const {
            thumbWidth,
            thumbMarginRight
        } = this.thumbStyle;

        this.yBar.style.width = thumbWidth + 'px';
        this.yBar.style.borderRadius = thumbWidth / 2 + 'px';
        this.yBar.style.backgroundColor = '#b0b0b0';
        this.yBarContainer.style.width = thumbWidth + thumbMarginRight * 2 + 'px';

        document.removeEventListener('mouseup', this.onMouseUp)
        document.removeEventListener('mousemove', this.onMouseDrag);
        return false;
    }

    scrollContent(scrollBarTop) {
        this.content.scrollTop = (scrollBarTop - this.thumbStyle.thumbMarginTopBottom) / this.containerHeight * this.contentLen;
    }
}

function getStyle(tar, attr) {
    return parseInt(window.getComputedStyle(tar)[attr]);
}