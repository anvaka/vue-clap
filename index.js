/*global Vue module define */
(function () {
  var vueClap = {}

  vueClap.config = {
    maxSingleTouchTime: 300, // ms
    singleTapDistanceSquared: 25 // within 5px we consider it as a single tap
  }

  vueClap.install = install

  function install(Vue) {
    Vue.directive('clap', {

      acceptStatement: true,

      priority: Vue.directive('on').priority,

      bind: function () { },

      update: function (fn) {
        var el = this.el

        var touchStartTime
        var startPos
        var shouldPrevent = this.modifiers.prevent

        if (this.disposePrevHandler) {
          this.disposePrevHandler()
          this.disposePrevHandler = null
        }

        if (typeof fn === 'function') {
          el.addEventListener('click', invokeHandler)

          el.addEventListener('touchend', handleTouchEnd)
          el.addEventListener('touchstart', handleTouchStart)
          this.disposePrevHandler = disposePrevHandler
        }

        function handleTouchStart(e) {
          var touches = e.touches

          if (touches.length === 1) {
            touchStartTime = new Date()
            startPos = {
              x: e.touches[0].pageX,
              y: e.touches[0].pageY
            }
          }
        }

        function handleTouchEnd(e) {
          // multitouch - ignore
          if (e.touches.length > 1) return

          // single touch - use time diference to determine if it was a touch or
          // a swipe
          var dt = new Date() - touchStartTime

          // To long - ignore
          if (dt > vueClap.config.maxSingleTouchTime) return

          var dx = e.pageX - startPos.x
          var dy = e.pageY - startPos.y

          if (dx * dx + dy * dy < vueClap.config.singleTapDistanceSquared) {
            invokeHandler(e)
          }
        }

        function disposePrevHandler() {
          el.removeEventListener('click', invokeHandler)
          el.removeEventListener('touchend', handleTouchEnd)
          el.removeEventListener('touchstart', handleTouchStart)
        }

        function invokeHandler(e) {
          fn(e)

          if (shouldPrevent) e.preventDefault()
        }
      },

      unbind: function () {
        if (this.disposePrevHandler) {
          this.disposePrevHandler()
          this.disposePrevHandler = null
        }
      }
    })
  }

  if (typeof exports === 'object') {
    module.exports = vueClap
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return vueClap
    })
  } else if (window.Vue) {
    window.VueClap = vueClap
    Vue.use(vueClap)
  }
})()
