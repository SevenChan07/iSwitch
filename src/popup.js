CodeMirror.defineMode('switch', function () {
  function tokenBase(stream) {
    if (stream.eatSpace()) return null
    let ch = stream.next()

    if (ch === '#') {
      stream.skipToEnd()
      return 'comment'
    }

    return null
  }

  function tokenize(stream, state) {
    return (state.tokens[0] || tokenBase)(stream, state)
  }

  return {
    startState: function () {
      return {tokens: []}
    },
    token: function (stream, state) {
      return tokenize(stream, state)
    },
    lineComment: '#'
  }
})

// 获取本地存储
let rulesService = new LocalRules()

// 编辑器
const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: 'switch'
})

// 设置编辑器内容
editor.setValue(rulesService.get())

document.getElementById('ok').addEventListener('click', function () {
  // 设置本地存储
  rulesService.set(editor.getValue())
  window.close()
})