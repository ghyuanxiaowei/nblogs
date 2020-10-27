title: JSON.stringify()
date: 2020-07-21 13:53:31
tags:
- JavaScript
categories:
- Front
language: zh-CN
toc: true
providers:
    cdn: loli
    fontcdn: loli
    iconcdn: loli
cover: /gallery/covers/wallhaven-nm1l1m.jpg
thumbnail: /gallery/covers/wallhaven-nm1l1m.jpg
---

`JSON.stringify()` 方法将一个 **JavaScript** 对象或值转换为 **JSON** 字符串，如果指定了一个 `replacer` 函数，则可以选择性地替换值，或者指定的 `replacer` 是数组，则可选择性地仅包含数组指定的属性。

<!-- more -->

## 语法

> JSON.stringify(value[, replacer [, space]])

### 参数

- value
  将要序列化成 一个 JSON 字符串的值。
- replacer | 可选
  如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
- space | 可选
  指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

### 返回值

一个表示给定值的JSON字符串。

## 特性

### 对于 undefined、任意的函数以及 symbol 三个特殊的值分别作为对象属性的值、数组元素、单独的值时的不同返回结果。

- undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 跳过（忽略）对它们进行序列化
  {% codeblock "示例代码" lang:javaScript %}
  const data = {
    a: "aaa",
    b: undefined,
    c: Symbol("dd"),
    fn: function() {
      return true;
    }
  };
  JSON.stringify(data); // 输出：？

  // "{"a":"aaa"}"
  {% endcodeblock %}
- undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null
  {% codeblock "示例代码" lang:javaScript %}
  JSON.stringify(["aaa", undefined, function aa() {
    return true
  }, Symbol('dd')])  // 输出：？

  // "["aaa",null,null,null]"
  {% endcodeblock %}
- undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时都会返回 undefined
  {% codeblock "示例代码" lang:javaScript %}
  JSON.stringify(function a (){console.log('a')})
  // undefined
  JSON.stringify(undefined)
  // undefined
  JSON.stringify(Symbol('dd'))
  // undefined
  {% endcodeblock %}

### 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中

*因为`null` `function` `symbol`都会被忽略掉，所以必然是没有特定的顺序的*

{% codeblock "示例代码" lang:javaScript %}
const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  },
  d: "ddd"
};
JSON.stringify(data); // 输出：？
// "{"a":"aaa","d":"ddd"}"

JSON.stringify(["aaa", undefined, function aa() {
  return true
}, Symbol('dd'),"eee"])  // 输出：？

// "["aaa",null,null,null,"eee"]"
{% endcodeblock %}

### 转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。

*拥有`toJSON`函数后进行序列化会默认走`toJSON`*

{% codeblock "示例代码" lang:javaScript %}
JSON.stringify({
  say: "hello JSON.stringify",
  toJSON: function() {
    return "today i learn";
  }
})
// "today i learn"
{% endcodeblock %}

### JSON.stringify() 将会正常序列化 Date 的值

*默认调用的是`toISOString()`会自动转化为国际化时间*

{% codeblock "示例代码" lang:javaScript %}
JSON.stringify({ now: new Date() });
// "{"now":"2020-07-21T06:07:14.864Z"}"
{% endcodeblock %}

### NaN 和 Infinity 格式的数值及 null 都会被当做 null。

{% codeblock "示例代码" lang:javaScript %}
JSON.stringify(NaN)
// "null"
JSON.stringify(null)
// "null"
JSON.stringify(Infinity)
// "null"
{% endcodeblock %}

### 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

{% codeblock "示例代码" lang:javaScript %}
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// "[1,"false",false]"
{% endcodeblock %}

### 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

**仅会序列化可枚举的属性**

{% codeblock "示例代码" lang:javaScript %}
// 不可枚举的属性默认会被忽略：
JSON.stringify( 
  Object.create(
    null, 
    { 
        x: { value: 'json', enumerable: false }, 
        y: { value: 'stringify', enumerable: true } 
    }
  )
);
// "{"y":"stringify"}"
{% endcodeblock %}

### 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

{% codeblock "示例代码" lang:javaScript %}
// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。 
const obj = {
  name: "loopObj"
};
const loopObj = {
  obj
};
// 对象之间形成循环引用，形成闭环
obj.loopObj = loopObj;

// 封装一个深拷贝的函数
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// 执行深拷贝，抛出错误
deepClone(obj)
/**
 VM44:9 Uncaught TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'loopObj' -> object with constructor 'Object'
    --- property 'obj' closes the circle
    at JSON.stringify (<anonymous>)
    at deepClone (<anonymous>:9:26)
    at <anonymous>:11:13
*/
{% endcodeblock %}

### 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。

{% codeblock "示例代码" lang:javaScript %}
JSON.stringify({ [Symbol.for("json")]: "stringify" }, function(k, v) {
  if (typeof k === "symbol") {
    return v;
  }
})

// undefined
{% endcodeblock %}

## 如何序列化`undefined` `function` `symbol`

{% codeblock "示例代码" lang:javaScript %}
const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  }
};
// 不用 replacer 参数时
JSON.stringify(data); 

// "{"a":"aaa"}"
// 使用 replacer 参数作为函数时
JSON.stringify(data, (key, value) => {
  switch (typeof value) {
    case "undefined":
      return "undefined";
    case "symbol":
      return value.toString();
    case "function":
      return value.toString();
  }
  return value;
})
// "{"a":"aaa","b":"undefined","c":"Symbol(dd)","fn":"function() {\n    return true;\n  }"}"
{% endcodeblock %}

或者

{% codeblock "示例代码" lang:javaScript %}
JSON.stringify(data, (key, value) => {
  switch (typeof value) {
    case "undefined":
      return "undefined";
    case "symbol":
      return value.toString();
    case "function":
      return value.toString();
  }
  return value;
})
{% endcodeblock %}

TO

{% codeblock "示例代码" lang:javaScript %}
JSON.stringify(data, (key, value) => (['undefined', 'symbol', 'function'].includes(typeof Value) ? String(value) : value));
{% endcodeblock %}

## 如何序列化某一项值

> replacer 作为数组时，结果非常简单，数组的值就代表了将被序列化成 JSON 字符串的属性名

{% codeblock "示例代码" lang:javaScript %}
const jsonObj = {
  name: "JSON.stringify",
  params: "obj,replacer,space"
};

// 只保留 params 属性的值
JSON.stringify(jsonObj, ["params"]);
// "{"params":"obj,replacer,space"}" 
{% endcodeblock %}

## 参考

[MDN JSON stringify](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

[你不知道的 JSON.stringify() 的威力](https://juejin.im/post/5decf09de51d45584d238319)

<article class="message message-immersive is-warning">
<div class="message-body">
<i class="fas fa-question-circle mr-2"></i>Something wrong with this article? 
Click <a href="https://github.com/blacklisten/nblogs/edit/site/source/_posts/2020/Chocolatey.md">here</a> 
to submit your revision.
</div>
</article>

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-size:12px;line-height:1.2;display:inline-block;border-radius:3px" href="https://wallhaven.cc" target="_blank" rel="noopener noreferrer" title="Vector Landscape Vectors by Vecteezy"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Vector Landscape Vectors by Vecteezy</span></a>