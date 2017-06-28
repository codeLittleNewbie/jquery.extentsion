/**
 * Created by W-Q on 2017/6/22.
 */

(function (window, undefined) {
    // 1.声明LWQQuery工厂函数
    var LWQQuery = function (selector) {
        return new LWQQuery.prototype.init(selector);
    };

    // 2.设置query的原型对象
    LWQQuery.prototype = {
        constructor: LWQQuery,
        ready: function (fn) {
            // 判断当前环境是否可以使用addEventListener
            if (document.addEventListener) {
                // 添加事件监听者
                // 参数一 : 需要监听的事件
                // 参数二 : 监听到事件后需要执行的操作
                document.addEventListener("DOMContentLoaded", fn);
            } else if (document.attachEvent) {
                // 状态没变化一次就会来到这个方法,总共会来四次

                document.attachEvent(onreadystatechange, function () {

                    // 只有是DOM加载完成的时候才要调用回调
                    if (document.readyState == "complete") {
                        fn();

                    }
                })

            }
        },
        init: function (selector) {
            // 1.条件判断为假,返回自己
            if (!selector) {
                return this;
            }
            else if (typeof selector == "function") {
                this.ready(selector);
            }
            // 2.字符串 -> 代码片段
            else if ($.isString(selector)) {
                // 2.1删除字符串前后空-格 -> 使用正则表达式
                // 只会替换一次
                // selector = selector.replace(" ","");
                selector = $.trim(selector);


                // 2.2判断是否为代码片段
                if ($.isHTML(selector)) {
                    // 2.1.获取内部第一级标签
                    var div = document.createElement("div");
                    div.innerHTML = selector;

                    // 2.2.给this添加这个标签
                    Array.prototype.push.apply(this, div.children);
                }

                // 3.字符串 -> 选择器
                else {
                    // 获取选中的元素
                    // var elements = document.querySelectorAll(selector);
                    Array.prototype.push.apply(this, document.querySelectorAll(selector));
                }
            }
            // 4.数组处理
            else if ($.isArray(selector)) {
                Array.prototype.push.apply(this, selector);
            }
            // 5.伪数组处理
            else if ($.isLikeArray(selector)) {
                selector = [].slice.apply(selector);
                Array.prototype.push.apply(this, selector);
            }
            // 6.非0数,对象,DOM元素,true
            else {
                this[0] = selector;
                this.length = 1;
            }
        },

        // 原型对象上的核心属性和方法
        constructor: LWQQuery,
        length: 0,
        LWQQuery: "1.1.1",
        selector: "",
        // 伪数组 -> 数组
        // [].slice.apply(this);
        toArray: function () {
            return Array.prototype.slice.apply(this);
        },
        // index可正可负
        // 不传值 -> 数组
        // 正值 ->  this[index]
        // 负值 -> this[this.length - index]
        get: function (index) {
            if (arguments.length == 0) {
                return Array.prototype.slice.apply(this);
            }

            /*if (index > 0){
             return this[index];
             }

             if (index < 0){
             console.log(this.length + index);
             return this[this.length + index];
             }*/
            // 用三目运算符来解决
            return index < 0 ? this[this.length + index] : this[index];

        },
        // 正值 -> $(this[index])
        // 负值 -> $(this[this.length + index])
        eq: function (index) {
            if (arguments.length == 0) {
                return $();
            } else {
                return $(this.get(index));
            }
            // return index > 0 ? $(this[index]) : $(this[this.length + index]);
        },
        last: function () {
            return this.eq(-1);
        },
        first: function () {
            return this.eq(0);
        },

        // 伪数组可以直接使用数组的方法
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        each: function (fn) {
            // console.log(this);
            $.each(this, fn);
        },
        map: function (fn) {

        },
        empty: function () {
            this.get(0).innerHTML = "";
        },
        remove: function () {
            // 0.LWQQuery对象 -> DOM对象
            var childNode = this.get(0);

            // 1.获取父节点
            var parentNode = childNode.parentNode;

            // 2.父节点删除子节点
            parentNode.removeChild(childNode);

            return this;
        },
        text: function (str) {
            var des = "";
            // 获取值
            if (arguments.length == 0) {
                // 不知如何获取内部的值
                // 只能草草了事了

                // this.each(function () {
                //     console.log(this);
                //     console.log(this.innerText);
                //     des = this.innerText;
                // });
                des = this.get(0).innerText
                return des;
            } else {
                this.get(0).innerText = str;
            }
        },
        html: function (str) {
            var des = "";
            // 获取值
            if (arguments.length == 0) {
                des = this.get(0).innerHTML;
                return des;
            }
            // 设置值
            else {
                this.get(0).innerHTML = str;
            }
        }
        /*appendTo: function (obj) {
            // 1.将obj转换为jQuery对象,让外界可以传递各种参数
            obj = $(obj);

            // 2.获取this中所有元素
            this.each(function (index1, value1) {
                // 3.获取到obj所有元素
                obj.each(function (index2, value2) {
                    // 3.1.如果是obj中第一个元素,那么将this中元素直接放入
                    if (index2 == 0){
                        value2.appendChild(value1);
                    }
                    // 3.2.如果不是第一个元素,那么将this中元素克隆一份放入
                    else {
                        value2.appendChild(value1.cloneNode(true));
                    }
                })
            });
        }*/


    };

    // 3.原型对象的赋值操作
    LWQQuery.prototype.init.prototype = LWQQuery.prototype;

    // 4.将LWQQuery绑定给window
    window.$ = window.LWQQuery = LWQQuery;

    // 5.动态的添加fn方法
    LWQQuery.fn = LWQQuery.prototype;


    // 工具类的处理
    LWQQuery.extent = LWQQuery.fn.extent = function (obj) {
        for (var attr in obj) {
            this[attr] = obj[attr];
        }
    };

    LWQQuery.extent({
        isWindow: function (obj) {
            return obj == window.window;
        },
        isObject: function (obj) {
            return typeof obj == "object";
        },
        isString: function (str) {
            return typeof str == "string"
        },
        isHTML: function (str) {
            return str.charAt(0) == "<" && str.charAt(str.length - 1) == ">" && str.length >= 3

        },
        trim: function (str) {
            if (str.trim) {
                return str.trim();
            } else {
                return str.replace(/^\s+|\s+$/g, "");
            }
        },
        isArray: function (arr) {
            if (Array.isArray) {
                return Array.isArray(arr);
            } else {
                return Object.prototype.toString.call(arr) == "[object Array]";
            }
        },
        isLikeArray: function (arr) {
            return this.isObject(arr) && "length" in arr && (arr.length - 1) in arr && !this.isWindow(arr);
        }
    });
    LWQQuery.fn.extent({
        isWindow: function (obj) {
            return obj == window.window;
        },
        isObject: function (obj) {
            return typeof obj == "object";
        },
        isString: function (str) {
            return typeof str == "string"
        },
        isHTML: function (str) {
            return str.charAt(0) == "<" && str.charAt(str.length - 1) == ">" && str.length >= 3

        },
        trim: function (str) {
            if (str.trim) {
                return str.trim();
            } else {
                return str.replace(/^\s+|\s+$/g, "");
            }
        },
        isArray: function (arr) {
            if (Array.isArray) {
                return Array.isArray(arr);
            } else {
                return Object.prototype.toString.call(arr) == "[object Array]";
            }
        },
        isLikeArray: function (arr) {
            return this.isObject(arr) && "length" in arr && (arr.length - 1) in arr && !this.isWindow(arr);
        }
    });
    LWQQuery.extent({
        each: function (obj, fn) {
            // 数组 | 伪数组
            if ($.isArray(obj) || $.isLikeArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    if (fn.call(obj[i], i, obj[i]) === false) break;
                }
            }
            // 对象
            else if ($.isObject(obj)) {
                for (var attr in obj) {
                    if (fn.call(obj[attr], attr, obj[attr]) === false) break;
                }
            }
        },
        map: function (obj, fn) {
            // 定义空数组接受返回值
            var arr = [];
            // 数组 | 伪数组
            if ($.isArray(obj) || $.isLikeArray(obj)) {
                for (var i = 0; i < obj.length; i++) {

                    var res = fn(obj[i], i);
                    if (res != null) {
                        arr.push(res);
                    }
                }
            }
            // 对象
            else if ($.isObject(obj)) {

                for (var attr in obj) {
                    var res = fn(obj[attr], attr);

                    if (res != null) {
                        arr.push(res);
                    }

                }
            }
            return arr;
        }

    });
    LWQQuery.fn.extent({
        remove : function () {
            var removeArr = [];
            this.each(function (index,value) {
                // this.remove();
                removeArr.push(this);
                var parentNode = this.parentNode;

                parentNode.removeChild(this);
            });

            return $(removeArr);
        },
        html : function (param) {
            if (arguments.length == 0){
                return this.get(0).innerHTML;
            }
            else {
                this.each(function (_, value) {
                    value.innerHTML = param;
                });
                return this;
            }
        },
        text : function (param) {
            if (arguments.length == 0){
                var des = "";
                this.each(function () {
                    // 待会回来用节点来实现它
                    des += this.innerText + "\n";
                });
                return des;
            }
            else{
                this.each(function () {
                    this.innerText = param;
                })
            }
            return this;
        },
        appendTo : function (obj) {
            // 追加到后面的对象的内容后面
            // 这个返回值,可以一开始用数组先装,最后用$来包装一下
            // 也可以直接使用jQuery对象,因为我们也有push方法
            // 但是还是推荐是用数组的形式!
            obj = $(obj);
            var arr = $();
            if (arguments.length == 0){
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
        }
    });


    /**
     * - 什么是伪数组
     *   - 1.本身是对象,并非是真正的数组
     *   - 2.拥有length属性
     *   - 3.拥有length-1这个属性
     *   - 4.这个对象不是window
     */

    /**
     * 判断数组是是否存在某元素
     *  - 可以使用 元素 in array
     */

})(window);