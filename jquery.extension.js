/*!
 * jQuery Extension v@VERSION
 * https://github.com/codeLittleNewbie/jquery.extentsion.git
 *
 * Created by W-Q on 2017/6/29.
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the Apache2.0 license.
 * http://www.apache.org/licenses/
 *
 * Date: @DATE
 */
(function (jQuery, undefined) {
    // 1.给jquery添加一个静态方法,作为构造函数
    extension = jQuery.extension = function (param) {
        return new jQuery.extension.fn.parse(param);
    };

    // 2.设置extension的原型对象
    extension.fn = extension.prototype = {
        parse : function (param) {
            console.log(param);
        }
    };

    // 3.修改原型
    jQuery.extension.fn.parse.prototype = extension.fn;

    // 4.接口函数
    extension.extend = extension.fn.extend = function (obj) {
        for(var attr in obj){
            this[attr] = obj[attr];
        }
    }

})(jQuery);