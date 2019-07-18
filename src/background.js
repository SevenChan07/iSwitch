const rulesService = new LocalRules()

function getSwitchPattens() {
  const rules = rulesService.get()

  const lineValues = rules.split('\n') // 每行数据
  const switchPattens = [] // 要转换的数据
  const reg = /\s{2,}/g // 正则匹配多个连续空格

  lineValues.forEach(function (e) {
    e = trimStr(e).replace(reg, ' ')
    if (e.indexOf('#') !== 0 && e !== '' && e.indexOf(' ') > -1) {
      switchPattens.push({
        from: e.split(' ')[0],
        to: e.split(' ')[1]
      })
    }
  })

  return switchPattens
}


chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const switchPattens = getSwitchPattens()
    let switchRule
    switchPattens.forEach(item => {
      if (details.url.indexOf(item.from) > -1) {
        switchRule = {
          redirectUrl: details.url.replace(item.from, item.to)
        }
      }
    })

    if (switchRule) {
      return switchRule
    }
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
);