# F4 Subject Selection System
*****

  改咗你npm start, DRY
  import okay 喎
  你試吓：
  `npm run import -- parm` to batchImport
  executable `chmod +x`, 加shebang, 唔洗.js
  我改ed
  改咗L4-6 俾你試：
  `npm run -s import -- parm` to `batchImport`
  `--` 係分開啲argument
  前面係俾npm, 後面俾人地 (app1 wrap app2 時用)

*****

   leesei: move each route config in its own file
   we can then look at each file's handler function and write a test for it
   you are managing lots of files each with dozens of lines, that is a different world
   handlers.js can also be deleted (require() in route.js)

```
   module.exports = {
     login: require('./handlers/login'),
     logout: require('./handlers/logout'),
     check: require('./handlers/check'),
     update: require('./handlers/update')
     ...
   }
```

***
leesei: use [gaearon/react-pure-render](https://github.com/gaearon/react-pure-render)
it implements shouldRenderComponent() and only re-render when this.props or this.states changes
should be used whenever:
- the store is immutable (so shallow compare is indicative of whether data changed); and
- the component is pure (it only depends on state and props)

cyrusn: new stuff issued
[Shallow Compare | React](https://facebook.github.io/react/docs/shallow-compare.html)


***
[React Drag and Drop](http://gaearon.github.io/react-dnd/docs-tutorial.html)


***

[subjectselection TODO - Google Sheets](https://docs.google.com/spreadsheets/d/1w4NaSL4RigeSjUF6jJX7wFmEljnEx1AmILFRf8sXGDk/edit?ts=568ca011#gid=0)

# Learn
[Best Practices for Designing a Pragmatic RESTful API | Vinay Sahni](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)

## Comment from leesei

  do you know we can validate response with `config.response.schema`?
  http://hapijs.com/api#route-options
  put the comment of endpoint to `config.description`

  the most important thing for API doc:
  - what goes in and what goes out
  - a brief description of what's done
  - pre-condition (what should be true before the call, documentation of what error will be returned)
  - post-condition (side effect, how the state besides response will be changed)

# using digitocean
  [Deploying a Git repository to a remote server | Wildly Inaccurate](http://wildlyinaccurate.com/deploying-a-git-repository-to-a-remote-server/)
  Archive 會出zip, scp去server
  Learn vi
  或local 改完scp


# TODO Next Year
## Do not use `info` substructure

``` js
  // leesei: why need `info` substructure?
  // optional field in `info` means this abstraction is not good enough
  // set LevelDb to use `name` as key
  // cyrusn: 我仲以為咁樣清楚D添，但係要下年先改得，因為用左黎左mock1516 db
  key: 'username',
  value: {
    info: {
      name: '',
      cname: '',
      password: '',
      isAdmin: false,
      classNo: '', // only for student user
    },
    // only for student user
    subjectPriority: {
      combos: [],
      oles: []
      isConfirmed: false
    }
  }
```
