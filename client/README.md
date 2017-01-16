# f4 subject selection

rewrite f4 subject selection in leveldb, react and freezer

## links
- [leveldb](http://leveldb.org/)
- [react](https://facebook.github.io/react/)
- [freezer.js](https://github.com/arqex/freezer)
- [react-dnd](http://gaearon.github.io/react-dnd/)

# Setting

use config.json to mange the setting, especially for the

``` json
{
  // an empty string if server serve the public folder,
  // otherwise, if using CORS, set it to the server host address
  "serverBase": ""
}
```

# Subject Allocation

- upload studentRank.csv with following format

``` csv
username  rank
lp1423003 1
lp1432033 2
lp1313079 3
lp1312064 4
.
.
.
```
