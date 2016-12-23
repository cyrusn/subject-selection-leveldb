# F4 Subject Selection System (Server Side)
[hapi.js](http://hapijs.com/)
[Level/levelup](https://github.com/Level/levelup)
[hapijs/hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie)

# LevelDB schema = User Object
// leesei: why need `info` substructure?
// optional field in `info` means this abstraction is not good enough
// set LevelDb to use `name` as key

``` js
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

# format of student.json
``` json
[{
  "classNo": "",
  "username": "",
  "password": "",
  "name": "",
  "cname": ""
}]
```

# format of teacher.json
``` json
[{
  "username": "",
  "password": "",
  "name": "",
  "cname": ""
}]
```


# How to use

## create leveldb database
superAdmin have to prepare `student.json` and `teacher.json` in `/batchImport/data` then run `npm run import`.

## Setting for bundle.js
if using CORS, please set `serverBase` in the `config.json` in client/src, otherwise, just leave it as a empty string.

then in set `isServePublic` to `false` in `config.json` in `server/config.json`.

## Prepare bundle.js
``` sh
cd client

# build bundle.js in public folder
npm run build
```

## Serving public folder
set `serverBase` in the `client/src/config.json` to an empty string.

if serve the public folder by this server , please set `isServePublic` to `true` in `server/config.json`, please see below for the public folder location.

``` text
.
├── db
├── json
├── public
└── server
```


