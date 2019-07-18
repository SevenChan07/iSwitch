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

// the local rules
let rulesService = new LocalRules()

// the editor
const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: 'switch'
})

// set the value
editor.setValue(rulesService.get())

document.getElementById('ok').addEventListener('click', function () {
  // set local rules
  rulesService.set(editor.getValue())
  window.close()
})