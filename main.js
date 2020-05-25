var that;
class tab {
    constructor(id){
        that = this
        this.main = document.querySelector(id)
        this.add = this.main.querySelector('.tabadd')
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        this.fsection = this.main.querySelector('.tabscon')
        this.init() 
    }
    init() {
        this.updateNode()
        // init初始化操作让相关的元素绑定事件
        this.add.onclick = this.addtab
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
            this.remove[i].onclick = this.removeTab
            this.spans[i].ondblclick = this.ediTab
            this.sections[i].ondblclick = this.ediTab
        }
    }
    updateNode() {
        //重新获取对应的元素，涉及到动态添加元素。
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.remove = this.main.querySelectorAll('.iconfont')
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }
    //1.切换功能
    toggleTab() {
        that.clearClass()
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
    }
    clearClass() {
        //清除活跃状态样式
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
    //2.添加功能
    addtab(){
        that.clearClass() //调用函数清除已存在样式元素
        // （1）创建li和section元素
        var li = '<li class="liactive"><span>新内容</span><span class="iconfont"></span></li>'
        var section = '<section class="conactive">新content</section>'
        that.ul.insertAdjacentHTML('beforeend', li)
        that.fsection.insertAdjacentHTML('beforeend',section)
        that.init()
    }
    //3.删除功能
    removeTab(ev) {
        ev.stopPropagation()//阻止冒泡，防止li的切换点击事件
        var index = this.parentNode.index
        // 根据索引号删除对应的li和section  remove（）方法可以直接删除指定的元素
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()
        //当删除不是选中状态的li的时候，原来的选中状态li保持不变
        if(document.querySelector('.liactive')) return
        //当删除了选中状态的这个li的时候，让它的前一个li处于选中状态
        index--
        //自动添加点击事件，不需要鼠标点击触发
        that.lis[index] && that.lis[index].click()
    }
    //4.修改功能
    ediTab() {
        var str = this.innerHTML
        //双击禁止选中文字
        window.getSelection?window.getSelection().removeAllRanges() : document.getSelection.empty()
        this.innerHTML = "<input type='text' />"
        var input = this.children[0]
        input.value = str
        input.select() //文本框内容处于选中状态
        // 离开文本框就把文本框里面的值给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value
        }
        //处理回车给span值
        input.onkeyup = function(e) {
            if (e.keyCode === 13){
                this.blur()
            }
            
        }

    }
}
// 实例类
new tab('#tab')

