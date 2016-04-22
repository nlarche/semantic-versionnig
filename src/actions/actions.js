import getOptions from '../options/options'

export default function getActions(semverType, pkg) {

    const actions = [
        // set new version
        // git commit version
        // git create tag
        'npm version ' + semverType,
        // git push
        'git push origin master --tags',
        // publish to npm
        'npm publish'
    ];

    if (pkg && pkg.semver) {

        const pre = getOptions(pkg.semver.pre);
        const post = getOptions(pkg.semver.post);

        actions.unshift(...pre);
        actions.push(...post);
    }
    
    return actions;
}