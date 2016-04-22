import fs from 'fs';
import log from 'npmlog'
import actions from './actions/actions';

const userArgs = process.argv.slice(2);
const pkg = JSON.parse(fs.readFileSync('./package.json'))

// major, minor and patch, default patch
const semverType = userArgs[0] === undefined ? 'patch' : userArgs[0];

const actions = actions(semverType, pkg);

// Cancel Actions in case of Error
const cancel = [
    // delete last tag
    'git tag -d $(git describe --abbrev=0)',
    // delete last commit
    'git reset --soft HEAD~1',
    // Reset package.json
    'git reset HEAD package.json',
    'git checkout package.json',
];

log.heading = 'semantic-versioning'

process_action(actions, cancel);


