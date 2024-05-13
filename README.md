# Development

```sh
$ npm run build
$ node
```

then:

```javascript
let { parse } = await import("./dist/index.js")

console.dir(parse("サンダー@こだわりメガネ\n特性:せいでんき テラスタル:でんき\n性格:ひかえめ 個体値:A31 S0\n154-170-100(100)-72-120-105\n１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ"), { depth: null })

{
  ast: {
    kind: 'POKESOL_TEXT',
    line1: { kind: 'POKEMON_AND_ITEM_LINE', pokemon: 'サンダー', item: 'こだわりメガネ' },
    line2: {
      kind: 'ABILITY_AND_TERATYPE_LINE',
      ability: { kind: 'ABILITY', value: 'せいでんき' },
      teratype: { kind: 'TERATYPE', value: 'でんき' }
    },
    line3: {
      kind: 'NATURE_AND_IV_LINE',
      nature: { kind: 'NATURE', value: 'ひかえめ' },
      iv: {
        kind: 'IV',
        h: null,
        a: { kind: 'IV_A', value: '31' },
        b: null,
        c: null,
        d: null,
        s: { kind: 'IV_S', value: '0' }
      }
    },
    line4: {
      kind: 'STATS',
      h: { kind: 'ACTUAL', value: '154' },
      a: { kind: 'ACTUAL', value: '170' },
      b: { kind: 'ACTUAL_AND_EV', value: '100', ev: '100' },
      c: { kind: 'ACTUAL', value: '72' },
      d: { kind: 'ACTUAL', value: '120' },
      s: { kind: 'ACTUAL', value: '105' }
    },
    line5: {
      kind: 'FOUR_MOVES',
      move1: '１０まんボルト',
      move2: 'ねっぷう',
      move3: 'ぼうふう',
      move4: 'ボルトチェンジ'
    }
  },
  errs: []
}
```
