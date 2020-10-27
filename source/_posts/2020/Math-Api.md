title: Math basic api
date: 2020-10-27 16:15:06
tags:
- JavaScript
- Math
categories:
- Front
language: zh-CN
toc: true
providers:
    cdn: loli
    fontcdn: loli
    iconcdn: loli
cover: /gallery/covers/wallhaven-2em38y.jpg
thumbnail: /gallery/covers/wallhaven-2em38y.jpg
---

**Math** 是一个内置对象，它拥有一些数学常数属性和数学函数方法。**Math** 不是一个函数对象。**Math** 用于 **Number** 类型。它不支持 **BigInt**。

与其他全局对象不同的是，Math 不是一个构造器。Math 的所有属性与方法都是静态的。引用圆周率的写法是 Math.PI，调用正余弦函数的写法是 Math.sin(x)，x 是要传入的参数。Math 的常量是使用 JavaScript 中的全精度浮点数来定义的。

<!-- more -->

## 常用的Math函数

[Math basic api example](https://github.com/blacklisten/learning/tree/master/math)

{% codeblock "示例代码" lang:typescript %}
let mathArr = [5, 1, 10, 3, 6, 5]

// Math.min()是Js数学库中的函数没用于将所有传递的值中的最小值返回
const min = Math.min(...mathArr)
console.log(`最小值：Math.min(...mathArr) = ${min}`)

// Math.max()将所有传递值中的最大值返回
const max = Math.max(...mathArr)
console.log(`最大值：Math.max(...mathArr) = ${max}`)

// Math.round返回一个数字四舍五入后最接近的整数
const round = Math.round(4.5)
console.log(`四舍五入：Math.round(4.5) = ${round}`)

// Math.sqrt()返回一个数的平方根
const sqrt = Math.sqrt(4)
console.log(`平方根：Math.sqrt(4) = ${sqrt}`)

// Math.pow()函数返回基数(base)的指数(exponent)次幂
const pow = Math.pow(2, 3)
console.log(`基数的指数次幂：Math.pow(2, 3) = ${pow}`)

// Math.floor()返回小于或等于一个给定数字的最大整数
const floor = Math.floor(4.9)
console.log(`小于给定数字的最大整数：Math.floor(4.9) = ${floor}`)

// Math.random()函数返回一个浮点,  伪随机数在范围从0到小于1，也就是说，从0（包括0）往上，但是不包括1（排除1），然后你可以缩放到所需的范围。实现将初始种子选择到随机数生成算法;它不能被用户选择或重置。
const random = Math.random()
console.log(`随机数：Math.random() = ${random}`)

// Math.cos() 返回一个数值的余弦值
const cos = Math.cos(180)
console.log(`余弦值：Math.cos(180) = ${cos}`)

// Math.sin() 返回一个函数的正弦值
const sin = Math.sin(90)
console.log(`正弦值：Math.sin(90) = ${sin}`)

// Math.ceil() 返回大于或等于一个更定数字的最小整数
const ceil = Math.ceil(4.1)
console.log(`大于或等于一个给定数字的最小整数：Math.ceil(4.1) = ${ceil}`)
{% endcodeblock %}

## 更多

[MDN Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

<article class="message message-immersive is-warning">
<div class="message-body">
<i class="fas fa-question-circle mr-2"></i>Something wrong with this article? 
Click <a href="https://github.com/blacklisten/nblogs/edit/site/source/_posts/2020/Math-Api.md">here</a> 
to submit your revision.
</div>
</article>

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-size:12px;line-height:1.2;display:inline-block;border-radius:3px" href="https://wallhaven.cc" target="_blank" rel="noopener noreferrer" title="Vector Landscape Vectors by Vecteezy"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Vector Landscape Vectors by Vecteezy</span></a>
