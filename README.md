# Installation

```sh
npm i @pokesol/pokesol-text-parser-ts
```

# Usage

```javascript
import { parse } from "@pokesol/pokesol-text-parser-ts"

const pokesolText = `
カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり
`

console.dir(parse(pokesolText), { depth: null })

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

# Release

- `npm run build`
- `npm link`
- Check the new behaviors
- Write CHANGELOG.md
- `git commit -m "add changelog for v*.*.*"`
- `npm version {major,minor,patch}`
- `npm publish`
