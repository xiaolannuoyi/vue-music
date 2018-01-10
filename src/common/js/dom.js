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
  