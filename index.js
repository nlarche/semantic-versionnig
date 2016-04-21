#! /usr/bin/env node

var fs = require('fs')
var log = require('npmlog');
var Rx = require('rx');
var child_process = require('child_process');

var userArgs = process.argv.slice(2);

// major, minor and patch, default patch
var semverType = userArgs[0] === undefined ? 'patch' : userArgs[0];

var actions = [
    // get new version
    // git commit version
    'npm version ' + semverType,
    // git push
   'git push origin master --tags',
    // publish to npm
   'npm publish'
];

var cancel =[    
    'git tag -d $(git describe --abbrev=0)',
    'git reset --soft HEAD~1',
    'git reset HEAD package.json',
    'git checkout package.json',
] 

var exec = Rx.Observable.fromNodeCallback(child_process.exec);

// var subscription = source.subscribe(
//   x => console.log('onNext: %s', x),
//   e => console.log('onError: %s', e),
//   () => console.log('onCompleted'));

log.heading = 'semantic-versionning'
log.info('Semantic versionning');

process_action(actions, logError);

// function
function logError(err) {
    log.error(err);
    process_action(cancel, function err(){
        log.error(err)
    });
}

function onNext(action) {  
     if (action){
        log.info(action);         
     }
}

function completed() {
    log.info('info Semantic versionning completed')
}

function process_action(actions, errorFn){
    return Rx.Observable.for(actions, function(action) {
        log.info(action)
        return exec(action, {})
    })
    .subscribe(onNext, errorFn, completed);
}







