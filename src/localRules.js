let LocalRules = function () {
  this.get = function () {
    return localStorage['switchRules'] ? JSON.parse(localStorage['switchRules']) : '';
  };
  this.set = function (data) {
    localStorage['switchRules'] = JSON.stringify(data);
  };
}