# Installation

```sh
pnpm add @pokesol/pokesol-text-parser-ts
```

# Usage

```javascript
import { parse } from "@pokesol/pokesol-text-parser-ts"

const pokesolText = `
メガガブリアス @ ガブリアスナイト
テラスタイプ:
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック
`

console.dir(parse(pokesolText), { depth: null })

{
  pokemonName: 'メガガブリアス',
  itemName: 'ガブリアスナイト',
  abilityName: 'すなのちから',
  preMegaAbilityName: 'さめはだ',
  terastalName: null,
  natureName: 'ようき',
  evs: {
    hp: 10,
    attack: 10,
    defense: 10,
    specialAttack: 10,
    specialDefense: 10,
    speed: 16
  },
  actualValue: {
    hp: 193,
    attack: 200,
    defense: 145,
    specialAttack: 135,
    specialDefense: 125,
    speed: 140
  },
  moveNames: [ 'スケイルショット', 'だいちのちから', 'がんせきふうじ', 'ステルスロック' ]
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
