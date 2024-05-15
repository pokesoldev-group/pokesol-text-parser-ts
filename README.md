# Development

```sh
$ npm run build
$ node
```

then:

```javascript
let { parse } = await import("./dist/index.js")

parse("サンダー@こだわりメガネ\n特性:せいでんき テラスタル:でんき\n性格:ひかえめ 個体値:A31 S0\n154-170-100(100)-72-120-105\n１０まんボルト/ねっぷう/ぼうふう/ボルトチェ ンジ")
{
  pokemonName: 'サンダー',
  itemName: 'こだわりメガネ',
  abilityName: 'せいでんき',
  terastalName: 'でんき',
  natureName: 'ひかえめ',
  ivs: {
    hp: 31,
    attack: 31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 0
  },
  evs: {
    hp: 0,
    attack: 0,
    defense: 100,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  },
  actualValue: {
    hp: 154,
    attack: 170,
    defense: 100,
    specialAttack: 72,
    specialDefense: 120,
    speed: 105
  },
  moveNames: [ '１０まんボルト', 'ねっぷう', 'ぼうふう', 'ボルトチェンジ' ]
}
```
