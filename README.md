效果图：

![progress.gif](https://upload-images.jianshu.io/upload_images/12890819-a7e03e6afac93c2e.gif?imageMogr2/auto-orient/strip)

项目地址：[https://github.com/biaochenxuying/progress](https://github.com/biaochenxuying/progress)

效果体验地址：[ https://biaochenxuying.github.io/progress/index.html](https://biaochenxuying.github.io/progress/index.html)

# 1. 原理

- 一个用于装载进度条内容的 div （且叫做 container）。
- 然后在 container 里面动态生成三个元素，一个是做为背景的 div (且叫做 progress)，一个是做为显示进度的 div (且叫做 bar)，还有一个是显示文字的 span (且叫做 text)。
- progress 的宽为 100%，bar 的宽根据传入数值 target 的值来定（ 默认为 0 ，全部占满的值为 100 ），text 展示的文字为 bar 的宽占 progress 宽的百分比。
- bar 的宽从 0 逐渐增加到的 target 值的过程（ 比如： 0 > 80 ），给这个过程添加一个逐渐加快的动画。

# 2. 代码实现

具体的过程请看代码：

```
/*
* author: https://github.com/biaochenxuying
*/

(function() {
  function Progress() {
    this.mountedId = null;
    this.target = 100;
    this.step = 1;
    this.color = '#333';
    this.fontSize = '18px';
    this.borderRadius = 0;
    this.backgroundColor = '#eee';
    this.barBackgroundColor = '#26a2ff';
  }

  Progress.prototype = {
    init: function(config) {
      if (!config.mountedId) {
        alert('请输入挂载节点的 id');
        return;
      }

      this.mountedId = config.mountedId;
      this.target = config.target || this.target;
      this.step = config.step || this.step;
      this.fontSize = config.fontSize || this.fontSize;
      this.color = config.color || this.color;
      this.borderRadius = config.borderRadius || this.borderRadius;
      this.backgroundColor = config.backgroundColor || this.backgroundColor;
      this.barBackgroundColor =
        config.barBackgroundColor || this.barBackgroundColor;

      var box = document.querySelector(this.mountedId);
      var width = box.offsetWidth;
      var height = box.offsetHeight;
      var progress = document.createElement('div');
      progress.style.position = 'absolute';
      progress.style.height = height + 'px';
      progress.style.width = width + 'px';
      progress.style.borderRadius = this.borderRadius;
      progress.style.backgroundColor = this.backgroundColor;

      var bar = document.createElement('div');
      bar.style.float = 'left';
      bar.style.height = '100%';
      bar.style.width = '0';
      bar.style.lineHeight = height + 'px';
      bar.style.textAlign = 'center';
      bar.style.borderRadius = this.borderRadius;
      bar.style.backgroundColor = this.barBackgroundColor;

      var text = document.createElement('span');
      text.style.position = 'absolute';
      text.style.top = '0';
      text.style.left = '0';
      text.style.height = height + 'px';
      text.style.lineHeight = height + 'px';
      text.style.fontSize = this.fontSize;
      text.style.color = this.color;

      progress.appendChild(bar);
      progress.appendChild(text);
      box.appendChild(progress);

      this.run(progress, bar, text, this.target, this.step);
    },
    /**
     * @name 执行动画
     * @param progress 底部的 dom 对象
     * @param bar 占比的 dom 对象
     * @param text 文字的 dom 对象
     * @param target 目标值（ Number ）
     * @param step 动画步长（ Number ）
     */
    run: function(progress, bar, text, target, step) {
      var self = this;
      ++step;
      var endRate = parseInt(target) - parseInt(bar.style.width);
      if (endRate <= step) {
        step = endRate;
      }
      var width = parseInt(bar.style.width);
      var endWidth = width + step + '%';
      bar.style.width = endWidth;
      text.innerHTML = endWidth;

      if (width >= 94) {
        text.style.left = '94%';
      } else {
        text.style.left = width + 1 + '%';
      }

      if (width === target) {
        clearTimeout(timeout);
        return;
      }
      var timeout = setTimeout(function() {
        self.run(progress, bar, text, target, step);
      }, 30);
    },
  };

  // 注册到 window 全局
  window.Progress = Progress;
})();

```


# 3. 使用方法

```
  var config = {
    mountedId: '#bar',
    target: 8,
    step: 1,
    color: 'green',
    fontSize: "20px",
    borderRadius: "5px",
    backgroundColor: '#eee',
    barBackgroundColor: 'red',
  };
  var p = new Progress();
  p.init(config);
```

# 4. 最后 

- 笔者的博客后花圆地址如下：

github ：[https://github.com/biaochenxuying/blog](https://github.com/biaochenxuying/blog)
个人网站 ：[http://biaochenxuying.cn/main.html](http://biaochenxuying.cn/main.html)

如果您觉得这篇文章不错或者对你有所帮助，请给个赞呗，你的点赞就是对我最大的鼓励，谢谢。

> 微信公众号：**BiaoChenXuYing**
> 分享 前端、后端开发等相关的技术文章，热点资源，随想随感，全栈程序员的成长之路。
关注公众号并回复 **福利** 便免费送你视频资源，绝对干货。
福利详情请点击：  [免费资源分享--Python、Java、Linux、Go、node、vue、react、javaScript](https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&mid=2247483711&idx=1&sn=1ffb576159805e92fc57f5f1120fce3a&chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&token=1560489745&lang=zh_CN#rd)

![BiaoChenXuYing](https://upload-images.jianshu.io/upload_images/12890819-091ccce387e2ea34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






















