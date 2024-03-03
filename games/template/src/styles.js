import * as Sqrl from 'squirrelly'

const BaseStyles = {
  BACKGROUND_COLOR: '#000000',
}

const Styles = `{
  "BACKGROUND_COLOR": "${BaseStyles.BACKGROUND_COLOR}",
  "MAIN_FONT": "Arial",
  "BODY_TEXT_FONT": "Arial",
  "BODY_TEXT_COLOR": "#ffffff",
  "BODY_TEXT_SIZE": 24,
  "BODY_TEXT": {
    "fontfamily": "Arial",
    "fontSize": 24,
    "color": "#ffffff"
  }
}`

function doit() {
  console.log('styles.js doit()');

  const styles = JSON.parse(Styles);
  console.log(styles);

  var myTemplate = 'My favorite template engine is {{it.favorite}}.'
  var data = {
    favorite: 'Squirrelly'
  }
  var result = Sqrl.Render(myTemplate, data)
  console.log(result);
}

export {
  doit
}
