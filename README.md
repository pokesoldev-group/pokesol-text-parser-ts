# Installation

```sh
pnpm add @pokesol/pokesol-text-parser-ts
```

# Usage

```javascript
import { parse } from "@pokesol/pokesol-text-parser-ts"

const pokesolText = `
カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり
`

console.dir(parse(pokesolText), { depth: null })

{
  pokemonName: 'カイリュー',
  itemName: 'あおぞらプレート',
  abilityName: 'マルチスケイル',
  preMegaAbilityName: null,
  terastalName: 'ステラ',
  natureName: 'さみしがり',
  evs: {
    hp: 0,
    attack: 32,
    defense: 32,
    specialAttack: 0,
    specialDefense: 0,
    speed: 2
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

- `pnpm run build`
- `pnpm link`
- Check the new behaviors
- Write CHANGELOG.md
- `git commit -m "add changelog for v*.*.*"`
- `pnpm version {major,minor,patch}`
- `pnpm publish`
