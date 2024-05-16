import { parse } from "../src/index.js"

describe("parse", () => {
  const expected = {
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
  }

  test("with full values", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual(expected)
  })

  test("without item", () => {
    const pokesolText = `サンダー
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, itemName: null })
  })

  test("without ability", () => {
    const pokesolText = `サンダー@こだわりメガネ
テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, abilityName: null })
  })

  test("without teratype", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, terastalName: null })
  })

  test("without nature", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, natureName: null })
  })

  test("with 6V", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, ivs: { hp: 31, attack: 31, defense: 31, specialAttack: 31, specialDefense: 31, speed: 31 }})
  })

  test("with S0", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:S0
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, ivs: { hp: 31, attack: 31, defense: 31, specialAttack: 31, specialDefense: 31, speed: 0 }})
  })

  test("with A0 S0", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:A0 S0
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, ivs: { hp: 31, attack: 0, defense: 31, specialAttack: 31, specialDefense: 31, speed: 0 }})
  })

  test("without EVs", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164-99-104-191-110-147
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, evs: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 }})
  })

  test("with C252 S252 H4", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(4)-99-104-191(252)-110-147(252)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, evs: { hp: 4, attack: 0, defense: 0, specialAttack: 252, specialDefense: 0, speed: 252 }})
  })

  test("with only two moves", () => {
    const pokesolText = `サンダー@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
ねっぷう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, moveNames: ["ねっぷう", "ボルトチェンジ"]})
  })

  test("with pokemon name with kanji", () => {
    const pokesolText = `バドレックス(黒)@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, pokemonName: "バドレックス(黒)"})
  })

  test("with pokemon name with symbol (♂)", () => {
    const pokesolText = `パフュートン(♂)@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, pokemonName: "パフュートン(♂)"})
  })

  test("with pokemon name with symbol (・)", () => {
    const pokesolText = `カプ・コケコ@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, pokemonName: "カプ・コケコ"})
  })

  test("with pokemon name with symbol (%)", () => {
    const pokesolText = `ジガルデ(50%)@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, pokemonName: "ジガルデ(50%)"})
  })

  test("with pokemon name with number", () => {
    const pokesolText = `ジガルデ(10%)@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, pokemonName: "ジガルデ(10%)"})
  })

  test("with pokemon name with alphabet", () => {
    const pokesolText = `ミュウツー(メガX)@こだわりメガネ
特性:せいでんき テラスタル:でんき
性格:ひかえめ 個体値:H26 A27 B28 C29 D30 S25
164(12)-99(12)-104(4)-191(236)-110(4)-147(236)
１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ`
    expect(parse(pokesolText)).toEqual({ ...expected, pokemonName: "ミュウツー(メガX)"})
  })
})
