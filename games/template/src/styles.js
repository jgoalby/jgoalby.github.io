/*function deferWithDefaults([first, ...rest], ...defaults) {
  return (...values) => rest.reduce((acc, curr, i) => {
    return acc + (i < values.length ? values[i] : defaults[i]) + curr;
  }, first);
}*/

/*
function deferWithDefaults(strs, ...defaults) {
  var [first, ...rest] = strs;
  return (...values) => rest.reduce((acc, curr, i) => {
    return acc + (i < values.length ? values[i] : defaults[i]) + curr;
  }, first);
}

let t = deferWithDefaults`My template is: ${'extendable'} and ${'versatile'}`;
let a = t('awesome');

console.log(a);

*/

// 'My template is: awesome and versatile' 


/*function defer(strs, ...defaults) {
  var [first, ...rest] = strs;
  return (...vals) => rest.reduce((acc, str, i) => acc + vals[i] + str, first);
}*/

function defer(strs, ...defaults) {
  var [first, ...rest] = strs;
  return (...values) => rest.reduce((acc, curr, i) => {
    return acc + (i < values.length ? values[i] : defaults[i]) + curr;
  }, first);
}

let t = defer`My template is: ${'extendable'} and ${'versatile'}`;
let a = t('simple', 'reusable');
// 'My template is: simple and reusable'
let b = t('obvious', 'late to the party');
// 'My template is: obvious and late to the party'
let c = t(null);
// 'My template is: null and undefined'
let d = defer`Choose: ${'ignore'} / ${undefined}`(true, false);
// 'Choose: true / false'

console.log(a + "\n" + b + "\n" + c + "\n" + d + "\n");


const isUndefined = o => typeof o === 'undefined'

const nvl = (o, valueIfUndefined) => isUndefined(o) ? valueIfUndefined : o

// gets a deep value from an object, given a 'path'.
const getDeepValue = (obj, path) =>
  path
    .replace(/\[|\]\.?/g, '.')
    .split('.')
    .filter(s => s)
    .reduce((acc, val) => acc && acc[val], obj)

// given a string, resolves all template variables.
const resolveTemplate = (str, variables) => {
  return str.replace(/\$\{([^\}]+)\}/g, (m, g1) => nvl(getDeepValue(variables, g1), m))
}

// evalutes with a provided 'this' context.
const evalWithContext = (string, context) => function(s){
  return eval(s);
}.call(context, string)

// given a string, resolves all template variables.
const resolveTemplate2 = function(str, variables) {
  return str.replace(/\$\{([^\}]+)\}/g, (m, g1) => evalWithContext(g1, variables))
}

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

  // setup variables for resolution...
  var variables = {}
  variables['top level'] = 'Foo'
  variables['deep object'] = {text:'Bar'}
  
  // ==> Foo Bar <==
  console.log(resolveTemplate('==> ${top level} ${deep object.text} <==', variables))

  // ==> Dog Dog <==
  console.log(resolveTemplate('==> ${aGlobalVariable} ${aGlobalVariable} <==', { aGlobalVariable: 'Dog' }))

  // ==> ${not an object.text} <==
  console.log(resolveTemplate('==> ${not an object.text} <==', variables))

  // ==> 5Foobar <==
  console.log(resolveTemplate2('==> ${1 + 4 + this.someVal} <==', {someVal: 'Foobar'}))
}

export {
  doit
}
