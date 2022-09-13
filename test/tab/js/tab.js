var that;

class tab {
    constructor(id) {
        that = this;  //this指向tab
        //this指实例对象的this
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll('li')
        this.ul = this.main.querySelector('ul');
        this.sections = this.main.querySelectorAll('section')
        this.spans = this.ul.querySelectorAll('li>span')
        this.tabscon = this.main.querySelector('.tabscon')
        this.add = this.main.querySelector('.tabadd');
        this.remove = this.ul.querySelectorAll('.iconfont')
        this.init()//页面加载就开始运行
    }

    init() {
        this.updated_style();//在每次进行增删改查 重新获取变化的li 和section
        //初始化操作
        // 为每一项添加响应
        for (let i = 0; i < this.lis.length; i++) {
            console.log(this);//tab
            this.lis[i].index = i;
            this.lis[i].onclick = this.switchTab;
            this.add.onclick = this.addTab;
            this.remove[i].addEventListener('click', this.removeTab);
            //remove  当添加新元素时 需要再重新获取  
            this.spans[i].addEventListener('dblclick', this.editTab)
            this.sections[i].addEventListener('dblclick',this.editTab)
        }
    }
    clearStyle() {
        console.log(this);//tab
        for (let i = 0; i < that.lis.length; i++) {
            that.lis[i].className = ' ';
            that.sections[i].className = ''
        }
    }

    updated_style() {
        //在每一次数量发生变化对应需要重新更新获取li和section
        //重新获取所有的li 和 section
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.ul.querySelectorAll('.iconfont');

    }

    switchTab() {  //这里所有this 指向lis
        that.clearStyle();
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive';
        //  this.section[this.index].className='conactive'  this.指向lis
    }

    addTab() {
        //添加之后激活添加的
        //需要添加时 清楚前面的样式 激活添加的选项
        that.clearStyle();
        var text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur laboriosam placeat corporis, nemo perspiciatis, blanditiis similique, adipisci deleniti ad nihil ratione aut debitis architecto odit laudantium ea sed nostrum vel?'
        var li = '<li class="liactive"><span>新选项</span><span class="iconfont icon-guanbi">41</span></li>'
        var section = '<section class="conactive">' + text + '</section>'
        that.tabscon.insertAdjacentHTML('beforeend', section)
        that.ul.insertAdjacentHTML('beforeend', li)
        that.init() //添加完后初始化 重新获取li和section 列表
    }

    removeTab(e) {
        //停止冒泡
        e.stopPropagation();
        that.updated_style()
        //点击小叉号 会出现冒泡事件 直接触发 点击的效果
        var index = this.parentNode.index
        that.lis[index].remove();
        that.sections[index].remove()
        that.init()

        //当删除一个li 
        //如果删除的 非选定 选定部分保持 不变
        //如果删除的是选定状态 让他前面的一个li为选定状态
        //如果存在激活状态 即有类名 liactive存在   
        //如果为第一个状态 return 结束后面语句
        if (document.querySelector('.liactive')) return;
        //手动调用点击事件 不需要鼠标触发
        index--;
        that.lis[index].onclick()
    }
    editTab() {

        var span_text = this.innerHTML
        this.innerHTML = '<input type="text" style="border:none; outline:none">'
        var input =this.children[0];
        input.value = span_text
        console.log(input.value);
        input.select()
        input.onblur = function()  {
            console.log(this);
            console.log(this.value);
            this.parentNode.innerHTML = this.value
        }
        input.onkeyup=function(e){
            if(e.keyCode===13){
                this.blur();
            }
        }
    }
}
var task = new tab('#tab')
/*
后来添加的标签使用交互
   因为添加后的标签并不能在对象里面被获取  
    在每一次点击后增加标签  并重新初始化 和 获取标签  并重新绑定
*/



console.log(that);












































