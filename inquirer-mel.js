var inquirer = require('inquirer');
var functions = require('./Mel-reddit');

var menuChoices = [
  {name: 'Show homepage', value: functions.getHomepage},
  {name: 'Show subreddit', value: functions.getSortedHomepage},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];


//================RUNNING IT===========================================
inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'What do you want to do?',
  choices: menuChoices
}).then(
  function(answers) {
    //need to add dot notation to EXECUTE functions
    answers.menu()
  }
);
