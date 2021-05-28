const specialChars = /[\s~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

function unescape(str) {
  return str.replace(/~1/g, '/').replace(/~0/g, '~');
}

function parse(jsonPointer) {
  if (jsonPointer.charAt(0) !== '/') {
    throw new Error(`Invalid JSON pointer: ${jsonPointer}`);
  }
  return jsonPointer.substring(1).split('/').map(unescape);
}

function jpoJpa(jsonPointer) {
  if (jsonPointer === '') {
    return '$';
  }

  if (jsonPointer === '/') {
    return `$['']`;
  }

  const tokens = parse(jsonPointer);
  let jsonPath = '$';

  for (let i = 0; i < tokens.length; i += 1) {
    if (specialChars.test(tokens[i])) {
      jsonPath += `['${tokens[i]}']`;
    } else {
      jsonPath += `.${tokens[i]}`;
    }
  }

  return jsonPath;
}

module.exports = jpoJpa;
