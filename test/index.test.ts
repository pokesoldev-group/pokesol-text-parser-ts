import { parse } from "../src/index.js"

describe("index", () => {
  test("with full values", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`

    expect(parse(pokesolText)).toEqual({
      pokemonName: "サンダー",
      itemName: "こだわりメガネ",
      abilityName: "せいでんき",
      terastalName: "でんき",
      natureName: "ひかえめ",
      ivs: {
        hp: 26,
        attack: 27,
        defense: 28,
        specialAttack: 29,
        specialDefense: 30,
        speed: 25,
      },
      evs: {
        hp: 12,
        attack: 12,
        defense: 4,
        specialAttack: 236,
        specialDefense: 4,
        speed: 236,
      },
      actualValue: {
        hp: 164,
        attack: 99,
        defense: 104,
        specialAttack: 191,
        specialDefense: 110,
        speed: 147,
      },
      moveNames: ["１０まんボルト", "ねっぷう", "ぼうふう", "ボルトチェンジ"],
    })
  })
})
