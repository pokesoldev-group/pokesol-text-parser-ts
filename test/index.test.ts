import { parse } from "../src/index.js";

describe("parse", () => {
  const expected = {
    pokemonName: "カイリュー",
    itemName: "あおぞらプレート",
    abilityName: "マルチスケイル",
    terastalName: "ステラ",
    natureName: "さみしがり",
    ivs: {
      hp: 31,
      attack: 31,
      defense: 31,
      specialAttack: 0,
      specialDefense: 0,
      speed: 31,
    },
    evs: {
      hp: 0,
      attack: 252,
      defense: 252,
      specialAttack: 0,
      specialDefense: 0,
      speed: 4,
    },
    actualValue: {
      hp: 166,
      attack: 204,
      defense: 132,
      specialAttack: 105,
      specialDefense: 105,
      speed: 101,
    },
    moveNames: ["じしん", "りゅうのまい", "テラバースト", "けたぐり"],
  };

  test("with full values", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("with whitespace", () => {
    const pokesolText = `カイリュー   @   あおぞらプレート
テラスタイプ  :   ステラ
特性  :   マルチスケイル
性格  :   さみしがり
166-204(252)-132(252)-105-105-101(4)   *C0  ,  D0
じしん   /   りゅうのまい   /   テラバースト   /   けたぐり`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("without whitespace", () => {
    const pokesolText = `カイリュー@あおぞらプレート
テラスタイプ:ステラ
特性:マルチスケイル
性格:さみしがり
166-204(252)-132(252)-105-105-101(4)*C0,D0
じしん/りゅうのまい/テラバースト/けたぐり`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("with linebreaks", () => {
    const pokesolText = `カイリュー @ あおぞらプレート

テラスタイプ: ステラ

特性: マルチスケイル

性格: さみしがり

166-204(252)-132(252)-105-105-101(4) *C0,D0

じしん / りゅうのまい / テラバースト / けたぐり`;

    expect(parse(pokesolText)).toEqual(expected);
  });

  test("without item", () => {
    const pokesolText = `カイリュー
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, itemName: null });
  });

  test("without teratype", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ:
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, terastalName: null });
  });

  test("without ability", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性:
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, abilityName: null });
  });

  test("without nature", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格:
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, natureName: null });
  });

  test("without EV", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204-132-105-105-101 *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      evs: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
    });
  });

  test("without IV", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      ivs: {
        hp: 31,
        attack: 31,
        defense: 31,
        specialAttack: 31,
        specialDefense: 31,
        speed: 31,
      },
    });
  });

  test("with single IV", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      ivs: {
        hp: 31,
        attack: 31,
        defense: 31,
        specialAttack: 0,
        specialDefense: 31,
        speed: 31,
      },
    });
  });

  test("with arbitrary-ordered IV", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,H0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      ivs: {
        hp: 0,
        attack: 31,
        defense: 31,
        specialAttack: 0,
        specialDefense: 31,
        speed: 31,
      },
    });
  });

  test("with partial moves", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん`;
    expect(parse(pokesolText)).toEqual({ ...expected, moveNames: ["じしん"] });
  });

  test("with moves with alphabet", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
ＤＤラリアット`;
    expect(parse(pokesolText)).toEqual({ ...expected, moveNames: ["ＤＤラリアット"] });
  });

  test("with pokemon name with kanji", () => {
    const pokesolText = `バドレックス(黒) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "バドレックス(黒)",
    });
  });

  test("with pokemon name with symbol (♂)", () => {
    const pokesolText = `パフュートン(♂) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "パフュートン(♂)",
    });
  });

  test("with pokemon name with symbol (・)", () => {
    const pokesolText = `カプ・コケコ @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "カプ・コケコ",
    });
  });

  test("with pokemon name with symbol (%)", () => {
    const pokesolText = `ジガルデ(50%) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ジガルデ(50%)",
    });
  });

  test("with pokemon name with number", () => {
    const pokesolText = `ジガルデ(10%) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ジガルデ(10%)",
    });
  });

  test("with pokemon name with full-width number", () => {
    const pokesolText = `ポリゴン２@ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ポリゴン２",
    });
  });

  test("with pokemon name with alphabet", () => {
    const pokesolText = `ミュウツー(メガX) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ミュウツー(メガX)",
    });
  });

  test("with pokemon name with full-width alphabet", () => {
    const pokesolText = `ポリゴンＺ @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ポリゴンＺ",
    });
  });

  test("without stats and moves", () => {
    const pokesolText = `カイリュー
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      itemName: null,
      ivs: {
        hp: 31,
        attack: 31,
        defense: 31,
        specialAttack: 31,
        specialDefense: 31,
        speed: 31,
      },
      evs: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
      actualValue: {
        hp: null,
        attack: null,
        defense: null,
        specialAttack: null,
        specialDefense: null,
        speed: null,
      },
      moveNames: [],
    });
  });

  test("without stats", () => {
    const pokesolText = `カイリュー
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      itemName: null,
      ivs: {
        hp: 31,
        attack: 31,
        defense: 31,
        specialAttack: 31,
        specialDefense: 31,
        speed: 31,
      },
      evs: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
      actualValue: {
        hp: null,
        attack: null,
        defense: null,
        specialAttack: null,
        specialDefense: null,
        speed: null,
      },
    });
  });

  test("without moves", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-105-105-101(4) *C0,D0`;
    expect(parse(pokesolText)).toEqual({ ...expected, moveNames: [] });
  });

  test("with comments", () => {
    const pokesolText = `
// comment
カイリュー @ あおぞらプレート // comment
テラスタイプ: ステラ          // comment
特性: マルチスケイル          // comment
性格: さみしがり              // comment
// comment
166-204(252)-132(252)-105-105-101(4) *C0,D0    // comment
じしん / りゅうのまい / テラバースト / けたぐり// comment
// comment
`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("without some actual values", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
性格: さみしがり
166-204(252)-132(252)-x-105-101(4) *D0
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toMatchObject({...expected,
      ivs: {
        hp: 31,
        attack: 31,
        defense: 31,
        specialAttack: 31,
        specialDefense: 0,
        speed: 31,
      },
      actualValue: {
        hp: 166,
        attack: 204,
        defense: 132,
        specialAttack: null,
        specialDefense: 105,
        speed: 101,
      },
      evs: {
        hp: 0,
        attack: 252,
        defense: 252,
        specialAttack: 0,
        specialDefense: 0,
        speed: 4,
      },
    });
  });

});
