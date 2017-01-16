document every action triggered in `src/`
compare it with documented `@event`

```sh
# actions triggered
find src -name *js | xargs grep -r -e 'TriggerAction(' -e 'TriggerAction.functor(' | cut -d"'" -f 2 | sort -u

# actions listened
find src -name *js | xargs grep -r -e 'ListemAction(' | cut -d"'" -f 2 | sort -u

# documented
find src -name *js | xargs grep -r '@event' | cut -d" " -f 4 | sort -u

# diff them
diff  <(find src -name *js | xargs grep -r -e 'TriggerAction(' -e 'TriggerAction.functor(' | cut -d"'" -f 2 | sort -u) <(find src -name *js | xargs grep -r '@event' | cut -d" " -f 4 | sort -u)
```
