# Changelog

## 1.2.0

### Changed

- **BREAKING**: `abilityNames` is now `(string | null)[]`; empty ability slots are preserved as `null` instead of being dropped (#15)

### Added

- Support any number of previous abilities (e.g. `特性: すなのちから()(さめはだ)()(ふゆう)`) (#15)

### Fixed

- Empty ability slots (e.g. `特性: ()`) no longer cause a parse error (#15)

## 1.1.1

### Fixed

- Support items containing "XYZ" (e.g. `リザードナイトX`) (#14)

## 1.1.0

### Changed

- **BREAKING**: Consolidate ability fields into `abilityNames: string[]`

## 1.0.0

### Changed

- **BREAKING**: Rename `性格` to `性格補正` (#10)

### Removed

- **BREAKING**: IVs notation (e.g. `*C0,D0`) has been removed and now causes a parse error (#10)

## 0.5.0

### Fixed

- Fix a parsing error for Pokémon with double-byte alphanumeric characters in the name (e.g. Porygon2 and Porygon-Z)

## 0.4.0

### Added

- Support comments (#6)

## 0.3.0

### Added

- Support any number of line breaks (#5)

## 0.2.0

### Added

- Support Pokesol Text without stats line and/or moves line (#2)

### Fixed

- Support move names with alphabet (e.g. `ＤＤラリアット`) (#2)
