# Development

```sh
$ npm run build
$ node
```

then:

```javascript
let { parse } = await import("./dist/index.js")

console.dir(parse("カイリュー @ あおぞらプレート\nテラスタイプ: ステラ\n特性: マルチスケイル\n性格: さみしがり\n166-204(252)-132(252)-105-105-101(4) *C0,D0\nじしん / りゅうのまい / テラバースト / けたぐり"), { depth: null })

{
  pokemonName: 'カイリュー',
  itemName: 'あおぞらプレート',
  abilityName: 'マルチスケイル',
  terastalName: 'ステラ',
  natureName: 'さみしがり',
  ivs: {
    hp: 31,
    attack: 31,
    defense: 31,
    specialAttack: 0,
    specialDefense: 0,
    speed: 31
  },
  evs: {
    hp: 0,
    attack: 252,
    defense: 252,
    specialAttack: 0,
    specialDefense: 0,
    speed: 4
  },
  actualValue: {
    hp: 166,
    attack: 204,
    defense: 132,
    specialAttack: 105,
    specialDefense: 105,
    speed: 101
  },
  moveNames: [ 'じしん', 'りゅうのまい', 'テラバースト', 'けたぐり' ]
}
```
