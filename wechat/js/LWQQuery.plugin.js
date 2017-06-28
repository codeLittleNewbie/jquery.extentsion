/**
 * Created by W-Q on 2017/6/25.
 */

// 依赖于jQuery
$.fn.extent({
    appendTo: function (obj) {
        // 追加到后面的对象的内容后面
        // 这个返回值,可以一开始用数组先装,最后用$来包装一下
        // 也可以直接使用jQuery对象,因为我们也有push方法
        // 但是还是推荐是用数组的形式!
        obj = $(obj);
        var arr = $();
        if (arguments.length == 0) {
            return $();
        }
        else {
            this.each(function (_, children) {
                $.each(obj, function (index, parent) {
                    index == 0 ? parent.appendChild(children) : parent.appendChild(children.cloneNode(true));
                    arr.push(children);
                })
            });
            return arr;
        }
    },
    prependTo: function (obj) {
        obj = $(obj);
        var res = [];
        if (arguments.length == 0) {
            return $();
        }
        else {
            this.each(function (_, children) {
                obj.each(function (index, parent) {
                    console.log("-");
                    res.push(children);
                    index == 0 ? parent.insertBefore(children, parent.childNodes[0]) : parent.insertBefore(children.cloneNode(true), parent.childNodes[0]);
                })
            });
            return res;
        }
    },
    append: function (obj) {
        /*if (arguments.length != 0){
         this.each(function (_,parent) {
         $.each(obj,function (index, children) {
         index == 0 ? parent.appendChild(children) : parent.appendChild(children.cloneNode(true));
         })
         })
         }*/

        if (arguments.length == 0) {
            return $();
        }
        else {
            if ($.isObject(obj)) {
                obj = $(obj)
                obj.appendTo(this);


                // 总结下来,就是要先遍历子元素
                // 不可以先遍历父元素
                /*var temp = this;
                 $.each(obj,function (_, children) {
                 temp.each(function (index, parent) {
                 index == 0 ? parent.appendChild(children) : parent.appendChild(children.cloneNode(true));
                 })
                 })*/
            }


            else {
                this.each(function () {
                    this.innerHTML = this.innerHTML + obj;
                })
            }
        }
    },
    prepend: function (obj) {
        if (arguments.length == 0) {
            return $();
        }
        else {
            if ($.isObject(obj)) {
                obj = $(obj);
                obj.prependTo(this);
            }
            else {
                this.each(function () {
                    this.innerHTML = obj + this.innerHTML;
                })
            }
        }
    },
    attr : function (param1,param2) {
        if (arguments.length == 0 || (!this.isString(param1) && !this.isObject(param1))){
            throw "请输入正确的参数!";
        }
        else if (arguments.length == 1){
            // 获取值,如果多个值,只会返回第一个
            if (this.isString(param1)){
                return this.get(0).getAttribute(param1);
            }
            // 传入的为一个对象
            else if (this.isObject(param1)){
                for (var attr in param1) {
                     this.each(function () {
                         this.setAttribute(attr,param1[attr]);
                     })
                }
            }
        }
        // 设置值
        else if (arguments.length == 2){
            this.each(function (index, value) {
                value.setAttribute(param1,param2);
            })
        }
    },
    removeAttr : function (param) {
        if (param != undefined && !this.isString(param)){
            throw "请输入一个字符串";
        }
        else {
            var strArr = [];
            if (param.indexOf("") != -1){
                strArr = param.split(" ");
                this.each(function () {
                    for (var i = 0; i < strArr.length; i++) {
                        var obj = strArr[i];
                        this.removeAttribute(obj);
                    }
                })
            }else {
                this.each(function () {
                    this.removeAttribute(param);
                })
            }
        }
        return this;
    },
    prop : function (param1,param2){
        if (arguments.length == 0){
            throw "请传递参数,谢谢";
        }
        // 参数1
        else if (arguments.length == 1){
            if (this.isString(param1)){
                // 获取值
                this.each(function () {
                    return this[param1];
                });
                // 判断是否为数组
            }else if (this.isArray(param1)){
                return undefined;
                // 判断是否为对象
            }else if (this.isObject(param1)){
                this.each(function () {
                    for (var attr in param1) {
                        this[attr] = param1[attr];
                    }
                });
                return this;
            }
        }
        // 参数二
        else if (arguments.length == 2){
            this.each(function () {
                this[param1] = param2;
            })
        }
        // 数字===其他情况
        else {
            return undefined;
        }

        return this;
    },
    removeProp : function (param) {
        if (this.isString(param)){
            this.each(function () {
                delete this[param];
            })
        }
        return this;
    },
    getStyle : function (dom,name){
      if (window.getComputedStyle){
          return window.getComputedStyle(dom)[name];
      }else {
          return dom.currentStyle(name);
      }
    },
    css : function (param1,param2) {
        if (typeof param2 == "number"){
            param2 += "px";
        }
        if (arguments.length == 0 || (!this.isObject(param1) && !this.isString(param1))){
            throw "请传递参数!";
        }
        if (arguments.length == 1){
            if (this.isString(param1)){
                return this.getStyle(this.get(0),param1);
            }
            else if (this.isObject(param1)){
                this.each(function () {
                    for (var attr in param1) {
                         this.style[attr] = param1[attr];
                    }
                })
            }
        }
        else if (arguments.length == 2){
            this[0].style[param1] = param2;
        }
        return this;
    },
    val : function (value) {
        if (arguments.length == 0){
            // return this[0].getAttribute("value");
            return this[0].value;
        }
        else if(arguments.length == 1){
            this.each(function () {
                this.value = value;
            });
            return this;
        }
    }
});




/**
 * jQuery样式操作
 */
$.fn.extent({
    hasClass : function (str) {
        if (this.isString(str)){
            var flag = false;
            var strArr = [];
            this.each(function () {
                strArr = this.className.split(" ");
                if (strArr.indexOf(str) != -1){
                    flag = true;
                    return false;
                }
            });
            return flag;
        }else{
            return false;
        }
    },
    addClass:function (classT) {
        //(1) 先判断是否传递了字符串参数,如果传递了字符串参数,那么:
        if($.isString(classT))
        {
            //① 把字符串传参数切割成数组
            var classArray = classT.indexOf(" ") != -1 ? classT : classT.split(" ");
            //② 遍历数组,判断每个标签
            for(var i = 0;i<classArray.length;i++)
            {
                var classStr = classArray[i];
                //③ 遍历实例对象,检查每一个标签
                this.each(function () {
                    if (!$(this).hasClass(classStr)){
                        this.className = $.trim(this.className + " " + classStr);
                    }
                })
            }
        }
        //(2) 如果没有传递参数或者是传递的参数不是字符串,返回实例对象
        return this;
    },
    removeClass : function (str){
        if (arguments.length == 0){
            this.each(function (){
                this.className = "";
            })
        }else {
            if (this.isString(str)){
                str = " " + str + " ";
                if (this.hasClass(str)){
                    this.className.replace("str"," ");
                }
            }
        }
        return this;
    },
    toggleClass : function (str){
        if (arguments.length == 0){
            this.removeClass();
        }else {
            // 由于hasClass不支持多个类名的情况
            // 现将str转化为字符串
            str = str.split(" ");
            this.each(function () {
                // 遍历字符串->分别判断即可
                for (var i=0;i<str.length;i++){
                    if (!$(this).hasClass(str[i])){
                        $(this).addClass(str[i]);
                    }else {
                        $(this).removeClass(str[i]);
                    }
                }
            });
        }
    }
});