const { dodgyUrlWords } = require("./data.js");

const createDodgeyString = () => {
  const urlLength = 3;
  const urlSections = [];
  for (let i = 0; i < urlLength; i++) {
    urlSections.push(
      dodgyUrlWords[Math.floor(Math.random() * dodgyUrlWords.length)]
    );
  }
  urlSections.join("-");
  return {
    dodgeyUrl: urlSections,
  };
};
// take a url as an argument
// generate a new dodgey looking url
// when the dodgey url is visited, it looks up to see if there's a normal url to redirect to
// returns a 301 redirect to that url

// select 3 random words from the dodgeyURLWords array
// stick them together separated by '-'
// need to check that it doesn't exist already

// store the url as { dodgeyUrl: 'foo-bar-foo', originalUrl: '' }
// when a new url is created, check that it doesn't already exist.

module.exports = {
  createDodgeyString,
};
