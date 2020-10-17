title: SameSite cookies报错
date: 2020-10-17
tags:
- Browser
categories:
- FAQ
language: zh-CN
toc: true
providers:
    cdn: loli
    fontcdn: loli
    iconcdn: loli
cover: /gallery/covers/wallhaven-md8o28.jpg
thumbnail: /gallery/covers/wallhaven-md8o28.jpg
---

error message：Because a cookie's SameSite attribute was not set or is invalid, it defaults to SameSite=Lax, which prevents the cookie from being set in a cross-site context. This behavior protects user data from accidentally leaking to third parties and cross-site request forgery.

Resolve this issue by updating the attributes of the cookie:
Specify SameSite=None and Secure if the cookie is intended to be set in cross-site contexts. Note that only cookies sent over HTTPS may use the Secure attribute.
Specify SameSite=Strict or SameSite=Lax if the cookie should not be set by cross-site requests

<!-- more -->

**SameSite** 是HTTP响应头 [Set-Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie) 的属性之一。它允许您声明该Cookie是否仅限于第一方或者同一站点上下文。

`SameSite`接受三个值：

**Lax**：Cookies允许与顶级导航一起发送，并将与第三方网站发起的GET请求一起发送。这是浏览器中的默认值。
**Strict**：Cookies只会在第一方上下文中发送，不会与第三方网站发起的请求一起发送。
**None**：Cookie将在所有上下文中发送，即允许跨域发送。以前 None 是默认值，但最近的浏览器版本将 Lax 作为默认值，以便对某些类型的跨站请求伪造 （CSRF） 攻击具有相当强的防御能力。使用 None 时，需在最新的浏览器版本中使用 Secure 属性。更多信息见下文。

**针对常见警告的解决方法**

*SameSite=None 需要 Secure*

如果没有设置 Secure 属性，控制台中可能会出现以下警告：

Some cookies are misusing the “sameSite“ attribute, so it won’t work as expected.
Cookie “myCookie” rejected because it has the “sameSite=none” attribute but is missing the “secure” attribute.

出现此警告是因为需要 SameSite=None 但未标记 Secure 的任何cookie都将被拒绝。

{% raw %}<article class="message is-danger"><div class="message-body">{% endraw %}
Set-Cookie: flavor=choco; SameSite=None
{% raw %}</div></article>{% endraw %}
要解决此问题，必须将 Secure 属性添加到 SameSite=None cookies中。
{% raw %}<article class="message is-success"><div class="message-body">{% endraw %}
Set-Cookie: flavor=choco; SameSite=None; Secure
{% raw %}</div></article>{% endraw %}

[Secure](https://wiki.developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie) cookie仅通过HTTPS协议加密发送到服务器。请注意，不安全站点（http:）无法使用 Secure 指令设置cookies。

**没有 SameSite 属性的Cookies默认为 SameSite=Lax**

最新版本的现代浏览器为cookies的 SameSite 提供了更安全的默认值，因此控制台中可能会显示以下消息：

Some cookies are misusing the “sameSite“ attribute, so it won’t work as expected.
Cookie “myCookie” has “sameSite” policy set to “lax” because it is missing a “sameSite” attribute, and “sameSite=lax” is the default value for this attribute.

出现警告是因为未显式指定cookie的 SameSite 属性：

{% raw %}<article class="message is-danger"><div class="message-body">{% endraw %}
Set-Cookie: flavor=choco
{% raw %}</div></article>{% endraw %}
虽然您可以依赖现代浏览器自动应用 SameSite=Lax，但您应该显式地指定它，以便清楚地传达您的意图，即要如何将 SameSite 属性应用到您的cookie。这也将改善跨浏览器的体验，因为并不是所有浏览器都默认为 Lax。
{% raw %}<article class="message is-success"><div class="message-body">{% endraw %}
Set-Cookie: flavor=choco; SameSite=Lax
{% raw %}</div></article>{% endraw %}

**实例**

{% codeblock 点击展开代码 lang:html >folded %}
RewriteEngine on
RewriteBase "/"
RewriteCond "%{HTTP_HOST}"       "^example\.org$" [NC]
RewriteRule "^(.*)"              "https://www.example.org/index.html" [R=301,L,QSA]
RewriteRule "^(.*)\.ht$"         "index.php?nav=$1 [NC,L,QSA,CO=RewriteRule;01;https://www.example.org;30/;SameSite=None;Secure]
RewriteRule "^(.*)\.htm$"        "index.php?nav=$1 [NC,L,QSA,CO=RewriteRule;02;https://www.example.org;30/;SameSite=None;Secure]
RewriteRule "^(.*)\.html$"       "index.php?nav=$1 [NC,L,QSA,CO=RewriteRule;03;https://www.example.org;30/;SameSite=None;Secure]
[...]
RewriteRule "^admin/(.*)\.html$" "admin/index.php?nav=$1 [NC,L,QSA,CO=RewriteRule;09;https://www.example.org:30/;SameSite=Strict;Secure]
{% endcodeblock %}

**参考**
[MDN SameSite](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
[web.dev SameSite](https://web.dev/samesite-cookies-explained/?utm_source=devtools)

**浏览器显示关闭**(不推荐)
地址栏输入：chrome://flags/
找到SameSite by default cookies和Cookies without SameSite must be secure
将上面两项设置为 Disable

<hr>

<article class="message message-immersive is-warning">
<div class="message-body">
<i class="fas fa-question-circle mr-2"></i>Something wrong with this article? 
Click <a href="https://github.com/blacklisten/nblogs/edit/site/source/_posts/2020/Cookie-SameSite-FAQ.md">here</a> 
to submit your revision.
</div>
</article>

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-size:12px;line-height:1.2;display:inline-block;border-radius:3px" href="https://wallhaven.cc" target="_blank" rel="noopener noreferrer" title="Vector Landscape Vectors by Vecteezy"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Vector Landscape Vectors by Vecteezy</span></a>
