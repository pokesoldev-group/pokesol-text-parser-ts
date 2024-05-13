import { parse as pegParse } from "./parser.js"

export const parse = (pokesolText: string) => {
  return pegParse(pokesolText)
}

export const test = () => {
  const pokesolText = "サンダー@こだわりメガネ\n特性:せいでんき テラスタル:でんき\n性格:ひかえめ 個体値:A31 S0\n154-170-100(100)-72-120-105\n１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ"
  return pegParse(pokesolText)
}

export const test2 = () => {
  const pokesolText = "サンダー@こだわりメガネ\n特性:せいでんき テラスタル:でんき\n性格:ひかえめ\n154-170-100(100)-72-120-105\n１０まんボルト/ねっぷう/ぼうふう/ボルトチェンジ"
  return pegParse(pokesolText)
}

export const test3 = () => {
  const pokesolText = "サンダー@こだわりメガネ\nテラスタル:でんき\n性格:ひかえめ\n154-170-100(100)-72-120-105\n１０まんボルト/ねっぷう/ぼうふう"
  return pegParse(pokesolText)
}

export const test4 = () => {
  const pokesolText = "サンダー@こだわりメガネ\n特性:せいでんき\n性格:ひかえめ\n154-170-100(100)-72-120-105\n１０まんボルト/ねっぷう/ぼうふう"
  return pegParse(pokesolText)
}
