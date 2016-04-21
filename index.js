#! /usr/bin/env node
'use strict'

var fs = require('fs')
var log = require('npmlog');
var Rx = require('rx');
var child_process = require('child_process');

var userArgs = process.argv.slice(2);

// major, minor and patch, default patch
var semverType = userArgs[0] === undefined ? 'patch' : userArgs[0];

var actions = [
    // set new version
    // git commit version
    // git create tag
    'npm version ' + semverType,
    // git push
   'git push origin master --tags',
    // publish to npm
   'npm publish'
];

// Cancel Actions in case of Error
var cancel =[    
    // delete last tag
    'git tag -d $(git describe --abbrev=0)',
    // delete last commit
    'git reset --soft HEAD~1',
    // Reset package.json
    'git reset HEAD package.json',
    'git checkout package.json',
] 

var exec = Rx.Observable.fromNodeCallback(child_process.exec);

log.heading = 'semantic-versionning'
log.info('Semantic versionning');

process_action(actions, logError);

// onError
function logError(err) {
    log.error(err);
    // execute delete actions
    process_action(cancel, function err(){
        log.error(err)
    });
}

// onNext
function onNext(action) {  
     if (action){
        log.info(action);         
     }
}

// onComplete
function completed() {
    log.info('info Semantic versionning completed')
}

// run actions
function process_action(actions, errorFn){
    return Rx.Observable.for(actions, function(action) {
        log.info(action)
        return exec(action, {})
    })
    .subscribe(onNext, errorFn, completed);
}