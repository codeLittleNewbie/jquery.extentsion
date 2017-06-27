# jquery.extentsion
overwrite something jQuery
### jQuery操作CSS相关方法处理
#### 0.属性节点和属性的区别
- 属性节点:
	- 只有DOM标签才有属性节点,属性节点保存在attributes属性里面
	- 只要对象都可以拥有属性,属性保存在对象身上
	- DOM标签也可以拥有属性或者操作属性
- 属性节点的基本的操作(增删改查)
	- 增加 | 修改(设置)
	- setAttribute()
	- getAttribute()
	- removeAttribute()

#### 1.attr | removeAttr

```js
attr : function (param1,param2){
	if (arguments.length == 0 || (!this.isObject(param1) && !this.isString(param))){
		return $();
	}else if (arguments.length == 1){
		// 如果是一个字符串,那么会犯第一个元素的属性节点值
		if (this.isString(param)){
			return this[0].getAttribute(param1);
		}
		// 如果是一个对象,那么为设置值
		else if (this.isObject(param)){
			this.each(function (){
				for(var attr in param){
					this.setAttribute(param,param[attr]);
				}
			})
		}
	}else if (arguments.length == 2){
		this[0].setAttribute(param1, param2);
	}
},
removeAttr : function (param){
	if (param.indexof(" ") != -1){
		param = param.indexof(" ");
		for(var i=0;i<param.length;i++){
			this[0].removeAttribute(param[i]);
		}
	}else{
		this.get(0).removeAttribute(param);
	}
}
```

#### 2.prop | removeProp

```js
prop : function (param){
	if (arguments.length == 0){
		throw "请输入参数";
	}else if(arguments.length == 1){
		if (this.isString(param)){
			this[0][param] = param;
		}else if(this.isObject(param)){
			for (var attr in param){
				this[0][attr] = param[attr];
			}
		}
	}
	return this;
}
```

#### 3.getStyle
- 注意点:`window.getComputerStyle(dom)`
	- 获取元素所有的CSS样式
	
```js
getStyle : functiono (dom,name){
	if (window.getComputerStyle){
		// window.getComputerStyle(dom)
		// 获取元素所有的CSS样式
		return window.getComputerStyle(dom)[name];
	}else if (dom.currentStyle){
		return dom.currentStyle(name);
	}
}
```

#### 4.css | val

```js

```

#### 5.hasClass | addClass | removeClass | toggleClass