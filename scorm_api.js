(function () {
  "use strict";

  var api = null;
  var initialized = false;

  function findApi(win) {
    var depth = 0;
    while (win && depth < 10) {
      if (win.API) {
        return win.API;
      }
      if (win.parent && win.parent !== win) {
        win = win.parent;
        depth += 1;
      } else {
        break;
      }
    }
    return null;
  }

  function getApi() {
    if (api) {
      return api;
    }
    api = findApi(window);
    if (!api && window.opener) {
      api = findApi(window.opener);
    }
    return api;
  }

  function call(method, arg1, arg2) {
    var scormApi = getApi();
    if (!scormApi || typeof scormApi[method] !== "function") {
      return false;
    }
    try {
      if (typeof arg2 !== "undefined") {
        return scormApi[method](arg1, arg2);
      }
      if (typeof arg1 !== "undefined") {
        return scormApi[method](arg1);
      }
      return scormApi[method]("");
    } catch (error) {
      return false;
    }
  }

  window.CrosswalkScorm = {
    init: function () {
      if (initialized) {
        return true;
      }
      initialized = call("LMSInitialize");
      if (initialized) {
        call("LMSSetValue", "cmi.core.lesson_status", "incomplete");
        call("LMSCommit");
      }
      return initialized;
    },
    setProgress: function (percent, completed) {
      if (!initialized) {
        this.init();
      }
      if (!initialized) {
        return false;
      }
      var score = String(Math.max(0, Math.min(100, Math.round(percent))));
      call("LMSSetValue", "cmi.core.score.raw", score);
      call("LMSSetValue", "cmi.core.lesson_status", completed ? "completed" : "incomplete");
      call("LMSCommit");
      return true;
    },
    finish: function () {
      if (initialized) {
        call("LMSCommit");
        call("LMSFinish");
      }
    }
  };

  window.addEventListener("beforeunload", function () {
    window.CrosswalkScorm.finish();
  });
}());
