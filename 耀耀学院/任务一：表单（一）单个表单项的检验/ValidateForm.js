/*
 * ComponentName :ValidateForm
 * Author: 刘文博
 * StartTime : 2017/2/24
 * Version: 1.0.0
 */

 ;(function(window){
  'use strict';
  //中文正则对象
  var chinnesechar_str = new RegExp('[ \u4e00-\u9fa5]');

  /**
   *
   *@class validateForm
   *@constructor
   *
   **/
  var validateForm = function(parentid) {
    //头部变量声明
    var parentele,
        vname,
        vform,
        vmsg,
        vbutton;
    vname =document.createElement('p');
    vform = document.createElement('input');
    vmsg = document.createElement('p');
    vbutton = document.createElement('input');

    _init(parentid, vform, vbutton, vmsg, vname);
  }
  /**
  * Init component
  *
  * @method _init
  * @param {string} parentid parent element id
  * @param {object} vform  input element object
  * @param {object} vbutton
  * @param {string} vmsg validate message
  */
 function _init(parentid, vform, vbutton, vmsg, vname) {
   _render(parentid, vform, vbutton, vmsg, vname);
   _on(vbutton, function(){
    var strlength = _strlengthTest(vform);
    var val_obj = _validate(strlength);
    vform.className = val_obj.className;
    vmsg.innerText = val_obj.msg;
    vmsg.className = val_obj.className;
   })
 }
 /**
 * render component
 *
 * @method _render
 * @param {string} parentid parent element id
 * @param {object} vform  input element object
 * @param {object} vbutton
 * @param {string} vmsg validate message
 */
 function _render(parentid, vform, vbutton, vmsg, vname) {
   var pre_ele;
   pre_ele = document.getElementById(parentid);

   if(pre_ele != undefined) {
     vname.innerText = '名称';
     vform.type = 'text';
     vform.id = "vinput";
     vbutton.type = 'button';
     vbutton.value = '验证';
     vmsg.innerText = "必填, 长度为4~16字符";
     pre_ele.appendChild(vname);
     pre_ele.appendChild(vform);
     pre_ele.appendChild(vmsg);
     pre_ele.appendChild(vbutton);
   }else {
     console.log("元素不存在");
   }
 }
 /**
 * Event bind
 *
 * @method _on
 * @param {object} vbutton
 * @param {function} valmethod
 */
 function _on(vbutton, valmethod) {
   vbutton.addEventListener('click', valmethod);
 }

 /**
  * test string length
  *
  * @method _init
  * @param {object}  inputele
  * @return {string} input text length
  */
  function _strlengthTest(inputele) {
    var str = inputele.value;
    var str_length = 0;
    if(str !== null){
      for (var i = 0; str[i]; i++) {
        //判断字符是汉字还是其他字符
        if (chinnesechar_str.test(str[i])) {
          str_length += 2;
        } else {
          str_length += 1;
        }
      }
    }else {
      str_length = 0;
    }
    return str_length;
  }
  /**
  * validate method
  *
  * @method _init
  * @param {number} str_length
  * @return {object}
  */
  function _validate(str_length) {
    var validate_msg, validate_isright;
    validate_msg = "必填, 长度为4~16字符";
    if(str_length===0) {
      validate_msg = "姓名不能为空";
      validate_isright = "wrong";
    } else if(str_length<4||str_length>16) {
      validate_msg = "长度不符,长度为4~16字符";
      validate_isright = "wrong";
    } else {
      validate_msg = "名称格式正确";
      validate_isright = "right";
    }

    return {
      'msg' : validate_msg,
      'className' : validate_isright
    }


  }

  window.ValidateForm = validateForm;

 })(window)