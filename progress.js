/*
* author: https://github.com/biaochenxuying
* 使用方法：
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
*/

(function() {
  function Progress() {
    this.mountedId = null;
    this.target = 100;
    this.step = 1;
    this.color = "#333";
    this.fontSize = "18px";
    this.borderRadius = 0;
    this.backgroundColor = "#eee";
    this.barBackgroundColor = "#26a2ff";
  }

  Progress.prototype = {
    init: function(config) {
      if (!config.mountedId) {
        alert("请输入挂载节点的 id");
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
      var progress = document.createElement("div");
      progress.style.position = "absolute";
      progress.style.height = height + "px";
      progress.style.width = width + "px";
      progress.style.borderRadius = this.borderRadius;
      progress.style.backgroundColor = this.backgroundColor;

      var bar = document.createElement("div");
      bar.style.float = "left";
      bar.style.height = "100%";
      bar.style.width = "0";
      bar.style.lineHeight = height + "px";
      bar.style.textAlign = "center";
      bar.style.borderRadius = this.borderRadius;
      bar.style.backgroundColor = this.barBackgroundColor;

      var total = document.createElement("span");
      total.style.position = "absolute";
      total.style.top = "0";
      total.style.left = "0";
      total.style.height = height + "px";
      total.style.lineHeight = height + "px";
      total.style.fontSize = this.fontSize;
      total.style.color = this.color;

      progress.appendChild(bar);
      progress.appendChild(total);
      box.appendChild(progress);

      this.run(progress, bar, total, this.target, this.step);
    },
    /**
     * @name 执行动画
     * @param progress 底部的 dom 对象
     * @param bar 占比的 dom 对象
     * @param total 文字的 dom 对象
     * @param target 目标值（ Number ）
     * @param step 动画步长（ Number ）
     */
    run: function(progress, bar, total, target, step) {
      var self = this
      ++step;
      var endRate = parseInt(target) - parseInt(bar.style.width);
      if (endRate <= step) {
        step = endRate;
      }
      var width = parseInt(bar.style.width);
      var endWidth = width + step + "%";
      bar.style.width = endWidth;
      total.innerHTML = endWidth;

      if (width >= 94) {
        total.style.left = "94%";
      } else {
        total.style.left = width + 1 + "%";
      }

      if (width === target) {
        clearTimeout(timeout);
        return;
      }
      var timeout = setTimeout(function() {
        self.run(progress, bar, total, target, step);
      }, 30);
    }
  };

  // 注册到 window 全局
  window.Progress = Progress;
})();
