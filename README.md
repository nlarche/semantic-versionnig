# SEMANTIC VERSIONING

Helper to maker easier node module [semantic versioning](http://semver.org/)

***

this is a shortcut to run those commands : 
    - npm version (patch|minor|major)
    - git push origin master --tags
    - npm publish  

***
# Install   

```
npm install --save-dev semantic-versioning
```

### Patch (default)

```
node node_modules/.bin/semver patch
```

### Minor

```
node node_modules/.bin/semver minor
```

### Major 

```
node node_modules/.bin/semver minor
```

# TODOS
 - [ ] add options pre and post actions 
 - [ ] add test
 - [ ] continuous integration