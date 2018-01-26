//判断元素是否有类名
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)//返回值为true/false
  }
//给元素添加类名  
export function addClass(el, className) {
    if (hasClass(el, className)) {
      return
    }
    console.log(el.className);
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
//获取元素的自定义属性,或者设置元素自定义属性的值 
export function getData(el,name,val){
  const prefix = "data-"
  name = prefix + name;
  if(val){
    return el.setAttribute(name,val)
  }else{
    return el.getAttribute(name);
  }
}