title: AbortController👀
date: 2020-10-22 15:15:06
tags:
- JavaScript
- Network Request
categories:
- Front
language: zh-CN
toc: true
providers:
    cdn: loli
    fontcdn: loli
    iconcdn: loli
cover: /gallery/covers/wallhaven-xlq1rv.jpg
thumbnail: /gallery/covers/wallhaven-xlq1rv.jpg
---

`AbortController`接口表示一个控制器对象，允许你根据需要中止一个或多个 Web请求。你可以使用 [AbortController.AbortController()](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController) 构造函数创建一个新的 `AbortController` 。使用[AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 对象可以完成与与DOM请求的通信。

<!-- more -->

## 构造函数

AbortController.AbortController() 创建一个新的AbortController 对象实例。

## 属性

AbortController.signal **只读**
返回一个[AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal)对象实例，它可以用来 with/abort 一个Web(网络)请求。

## 方法

AbortController.abort()
中止一个尚未完成的Web(网络)请求。这能够中止[fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) 请求，任何响应[Body](https://developer.mozilla.org/zh-CN/docs/Web/API/Body)的消费者和流。

## example 

[AbortController example](https://github.com/blacklisten/learning/tree/master/abortController)

{% codeblock "示例代码" lang:html %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <p>Web AbortController</p>

    <div class="controller">
      <button class="download">download video</button>
      <button class="abort">stop download network</button>
    </div>
    <script>
      const url = './sintel.mp4'
      const downloadBtn = document.querySelector('.download')
      const abortBtn = document.querySelector('.abort')

      let controller

      downloadBtn.addEventListener('click', fetchVideo)
      abortBtn.addEventListener('click', () => {
        controller.abort()
        console.log('stop download')
      })

      function fetchVideo() {
        controller = new AbortController()
        const signal = controller.signal
        fetch(url, { signal }).then((response) => {
          if (response.status === 200) {
            return response.blob()
          } else {
            throw new Error('Failed to fetch')
          }
        }).then((vBlob) => {
          console.log('----download success----')
          console.log(vBlob)
        })
      }
    </script>
  </body>
</html>
{% endcodeblock %}

## 参考

[MDN AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController)

<article class="message message-immersive is-warning">
<div class="message-body">
<i class="fas fa-question-circle mr-2"></i>Something wrong with this article? 
Click <a href="https://github.com/blacklisten/nblogs/edit/site/source/_posts/2020/AbortController.md">here</a> 
to submit your revision.
</div>
</article>

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-size:12px;line-height:1.2;display:inline-block;border-radius:3px" href="https://wallhaven.cc" target="_blank" rel="noopener noreferrer" title="Vector Landscape Vectors by Vecteezy"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Vector Landscape Vectors by Vecteezy</span></a>
