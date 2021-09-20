# Changelog

          All notable changes to this project will be documented in this file.
          See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v2.0.0...v2.0.1) (2021-09-20)


### Bug Fixes

* **deps:** update dependency fast-xml-parser to v3.20.0 ([ddf1c5d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ddf1c5d53aac12ea64557d2c69a8e715cb218506))

# [2.0.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.59...v2.0.0) (2021-09-20)


### Bug Fixes

* moves parsing to codec level ([#422](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/422)) ([c56b7ce](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c56b7ce26482e5290caca7e77ce8ad27e9e81838)), closes [#421](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/421)


### BREAKING CHANGES

* Resolves values being parsed as booleans or numbers aggressively by `fast-xml-parser` by moving all parsing to the codec level through three new helpers (`ensureBool`, `ensureFloat`, and `ensureInt`) and disabling parsing at the attribute and node level of the XML parser. The breaking change affects a minor number of returned types. You can inspect the [list of updated snapshots](https://github.com/ScaleLeap/amazon-mws-api-sdk/pull/422/commits/5ffaa6cbdf33d6bc8c04717eb6ff55d5dd1111a8?file-filters%5B%5D=.snap) to see which ones have been affected.

## [1.9.59](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.58...v1.9.59) (2021-09-18)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v11.1.0 ([21911ea](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/21911ea56d327f2beeb0f7d48d68331466a9724e))

## [1.9.58](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.57...v1.9.58) (2021-09-18)


### Bug Fixes

* **deps:** update dependency purify-ts to v1 ([5f7eee6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5f7eee6afe4f587a9722521a407d483684594b36))

## [1.9.57](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.56...v1.9.57) (2021-09-18)


### Bug Fixes

* **deps:** update dependency axios to v0.21.2 [security] ([#416](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/416)) ([1adc8e8](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1adc8e8060a6135130df3b121ba21dfaf4da8cf8))

## [1.9.56](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.55...v1.9.56) (2021-09-14)


### Bug Fixes

* add checks for offline scenarios [#417](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/417) ([#418](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/418)) ([b4a8cc9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b4a8cc9c084a1d640de7a71bb23981145dbda82c))

## [1.9.55](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.54...v1.9.55) (2021-05-11)


### Bug Fixes

* the FNSKU prop is optional when SKU does not exist ([d093ff9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d093ff9b241927beae2f92944710a598a2c17785))
* typo in the parameter transformation ([358cfb9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/358cfb970b858f9d805e5e1232de9a63454d3286)), closes [#368](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/368)

## [1.9.54](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.53...v1.9.54) (2021-05-10)


### Bug Fixes

* **deps:** update dependency purify-ts to v0.16.3 ([a5615b9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a5615b9ad6b6a8675435d8694345741403cbcdc8))
* **get-lowest-priced-offers-for-asin:** `OfferCount` type ([a1c7ec9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a1c7ec980641f4dfab088e6ec95cb0c1ad527892))

## [1.9.53](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.52...v1.9.53) (2021-05-10)


### Bug Fixes

* **orders:** force string `PurchaseOrderNumber` ([0299aff](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0299affcb6fa7b43e5cb8894e00340a729835835))

## [1.9.52](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.51...v1.9.52) (2021-05-07)


### Bug Fixes

* **offer_count:** type obj to array ([7124f92](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7124f92dcb335d0f5d0da7abd69fb3df5a71ef7b))

## [1.9.51](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.50...v1.9.51) (2021-05-05)


### Bug Fixes

* listInventorySupply to use GET method instead of POST ([d0176f9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d0176f992a74041f91747120889deb3144ff7990)), closes [#368](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/368)

## [1.9.50](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.49...v1.9.50) (2021-05-04)


### Bug Fixes

* **orders:** `BuyerName` as string ([aafb154](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/aafb154ab46ae0615767075ebdb4041f2cf0d4ca))

## [1.9.49](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.48...v1.9.49) (2021-05-04)


### Bug Fixes

* **orders:** parse `ShippingAddress` as string ([#367](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/367)) ([7909ef4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7909ef4c416b4dbf2d4f27075d1f78b1bf4a32b7))

## [1.9.48](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.47...v1.9.48) (2021-05-03)


### Bug Fixes

* parse phone as string ([fcc83cd](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/fcc83cd5ea4e661988980f89e77fe4978291eb99)), closes [#365](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/365)

## [1.9.47](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.46...v1.9.47) (2021-04-29)


### Bug Fixes

* ensureString parser ([4483f22](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4483f22e50d0681291c6fd86b139aba3c2a5dc1e))
* **deps:** update dependency purify-ts to v0.16.2 ([e8fccd6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e8fccd6f22701ff3ae8c7ee375353772e8b0c338))

## [1.9.46](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.45...v1.9.46) (2021-04-29)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v11.0.1 ([9e379f4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/9e379f4cb42cccfa386e1d66b0d00959ca918b21))

## [1.9.45](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.44...v1.9.45) (2021-04-07)


### Bug Fixes

* markdown lint in README.md ([0368630](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/03686307ccde0ba3843781052decdc8cddc7bc14))
* release to mws package ([17df996](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/17df996e68b2f306a270fafdac6d266b5ac5916e))

## [1.9.44](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.43...v1.9.44) (2021-04-06)


### Bug Fixes

* markdown lint in README.md ([94501d1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/94501d1bfc655939271405b5d4b92d5095e6fc4e))

## [1.9.43](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.42...v1.9.43) (2021-03-30)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v11 ([49bb53e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/49bb53ef037017cdb5cf61726fe6aa0375d77883))

## [1.9.42](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.41...v1.9.42) (2021-03-29)


### Bug Fixes

* **deps:** update dependency html-entities to v2.3.2 ([3161841](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/31618410b7ff0e6c4cfc0e11d62e4905ec911075))

## [1.9.41](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.40...v1.9.41) (2021-03-29)


### Bug Fixes

* **deps:** update dependency html-entities to v2.3.1 ([def36e1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/def36e16de56c33e5608f016f66661f13255d155))

## [1.9.40](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.39...v1.9.40) (2021-03-19)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v10.3.0 ([be55ac2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/be55ac2f1a941c1a7734a9b1e012471c79ff2694))

## [1.9.39](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.38...v1.9.39) (2021-03-19)


### Bug Fixes

* report ID parsing ([21965bc](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/21965bc37b3406f7f40ea2acb369c9e5f7776958)), closes [#327](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/327)

## [1.9.38](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.37...v1.9.38) (2021-03-15)


### Bug Fixes

* **deps:** update dependency html-entities to v2.1.1 ([ac8457a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ac8457ab044aee27438076191aa3d4c2ff2d8bee))

## [1.9.37](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.36...v1.9.37) (2021-03-15)


### Bug Fixes

* **deps:** update dependency fast-xml-parser to v3.19.0 ([a343b9c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a343b9c4fe7eb1a6e9e972d9f7967f623bc28619))

## [1.9.36](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.35...v1.9.36) (2021-02-19)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v10.2.0 ([3421198](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/34211981847fa87021d997363e17b31783b027a5))

## [1.9.35](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.34...v1.9.35) (2021-02-17)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v10.1.0 ([cd71019](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cd710190d0f046dda572e662ac60686a1916391b))

## [1.9.34](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.33...v1.9.34) (2021-02-05)


### Bug Fixes

* **deps:** update dependency fast-xml-parser to v3.18.0 ([1e3e25d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1e3e25ddad5659d4f948208f63749928d8f8ff07))

## [1.9.33](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.32...v1.9.33) (2021-02-01)


### Bug Fixes

* package lock ([9619891](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/9619891aabb1087cd45c9d0f5f90019a4d1ae176))

## [1.9.32](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.31...v1.9.32) (2021-02-01)


### Bug Fixes

* marks PaymentMethodDetails as optional ([eaeb00d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/eaeb00d2dd87e66ccf9801b1a47d6cb15aec2600)), closes [#293](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/293)

## [1.9.31](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.30...v1.9.31) (2021-01-28)


### Bug Fixes

* **deps:** update dependency html-entities to v2.1.0 ([b7552ef](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b7552ef54af3a13a4a1efbdd1a9bedbc83d28e64))

## [1.9.30](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.29...v1.9.30) (2021-01-25)


### Bug Fixes

* **deps:** update dependency html-entities to v2.0.6 ([3d0630e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3d0630eea9c7e350b98fa25f6a3c8dabe473e111))

## [1.9.29](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.28...v1.9.29) (2021-01-22)


### Bug Fixes

* **deps:** update dependency html-entities to v2.0.4 ([cf872d9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cf872d9c591107c5a1497b7f2eea3b6e46d40fed))

## [1.9.28](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.27...v1.9.28) (2021-01-22)


### Bug Fixes

* **deps:** update dependency html-entities to v2 ([c18aa6b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c18aa6b0bd1f7a859b0e04cafd9b84333b1f4fd6))

## [1.9.27](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.26...v1.9.27) (2021-01-08)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v10 ([4aabf5a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4aabf5af4fd5a6b37406d51a7fbbb5c9fa7d4429))

## [1.9.26](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.25...v1.9.26) (2020-12-28)


### Bug Fixes

* **deps:** update dependency fast-xml-parser to v3.17.6 ([cd1cafa](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cd1cafacc98996239d216a141dc025e7be34f091))

## [1.9.25](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.24...v1.9.25) (2020-12-23)


### Bug Fixes

* adds WAREHOUSE_DAMAGE adjustment type ([677e367](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/677e3679e79ab197005ddd9922cbc8286cb82695))

## [1.9.24](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.23...v1.9.24) (2020-12-23)


### Bug Fixes

* all ASINs are strings ([a30f2bd](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a30f2bd6bfa7246ed397cb7394be8e2328e9e908))

## [1.9.23](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.22...v1.9.23) (2020-12-23)


### Bug Fixes

* all SKUs are strings ([4f0b242](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4f0b2428a3408f879491fffdc12029acd37616c6))

## [1.9.22](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.21...v1.9.22) (2020-12-22)


### Bug Fixes

* **deps:** update dependency axios to v0.21.1 ([0d3c013](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0d3c013a812a8590e24cf841e5d272c0d1b96772))

## [1.9.21](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.20...v1.9.21) (2020-12-21)


### Bug Fixes

* **deps:** update dependency html-entities to v1.4.0 ([582e25c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/582e25cb7960c7a6f40d3c8d5270a101e0b94f57))

## [1.9.20](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.19...v1.9.20) (2020-12-21)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v9 ([9f4046f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/9f4046f9735b5916e396ae2e4486bc51a8ee2266))

## [1.9.19](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.18...v1.9.19) (2020-12-18)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v8 ([25e934f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/25e934f0712defe2388cf362925a08264ee1feb9))

## [1.9.18](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.17...v1.9.18) (2020-12-14)


### Bug Fixes

* **deps:** update dependency html-entities to v1.3.3 ([05bde37](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/05bde37184a50ae6fec2424ffcc4acb855bd80a9))

## [1.9.17](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.16...v1.9.17) (2020-12-03)


### Bug Fixes

* **deps:** update dependency fast-xml-parser to v3.17.5 ([09860f4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/09860f41366645de71ab1ce273334ebcfdb74697))

## [1.9.16](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.15...v1.9.16) (2020-11-23)


### Bug Fixes

* **deps:** update dependency purify-ts to v0.16.1 ([81075ac](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/81075ac904e3f9691151c2f47086315f25221c5c))

## [1.9.15](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.14...v1.9.15) (2020-11-21)


### Bug Fixes

* change GetInterface to GetType ([1c9c61a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1c9c61a0c3184f8665990cccad13a0fc78b3f91e))
* **deps:** update dependency purify-ts to v0.16.0 ([ae488b1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ae488b1d08e83c1cc639dbfb00daa390eec0b9e0))

## [1.9.14](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.13...v1.9.14) (2020-11-21)


### Bug Fixes

* add PostageBilling_DeliveryConfirmation adjustment type ([d078f0c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d078f0c303b54ac4c9e5905d20687c980fdc18c7))
* add PostageBilling_Insurance adjustment type ([5ae1989](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5ae1989e8cc7f2e93a1b63693ef7fb0411de836a))
* add PostageBilling_Postage adjustment type ([bdb8b06](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/bdb8b0612117aa0a92ac6bf6bb46ce32011392bd))
* add PostageBilling_TransactionFee adjustment type ([ef6fcf7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ef6fcf72f2d512c9cc43b8a7121385cab9e77389))
* add REVERSAL_REIMBURSEMENT adjustment type ([af112b7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/af112b76e9ffffa387d9be42fe5bdba6224d8af5))

## [1.9.13](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.12...v1.9.13) (2020-11-12)


### Bug Fixes

* case sensitivity on ChargeType enum ([223050d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/223050da2ebb2cd4b9a0b84d18a254d9d93828af)), closes [#243](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/243)

## [1.9.12](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.11...v1.9.12) (2020-11-07)


### Bug Fixes

* **deps:** update dependency purify-ts to v0.16.0-beta.6 ([43e3c68](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/43e3c6808d2afb69e8f188aa4b9ed01b61fae6e9))

## [1.9.11](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.10...v1.9.11) (2020-10-26)


### Bug Fixes

* runs mws publish step only if published a pkg ([b482850](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b482850abaf20487bb3d401a5d41b39c22c74fbc))

## [1.9.10](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.9...v1.9.10) (2020-10-23)


### Bug Fixes

* **deps:** update dependency axios to v0.21.0 ([0424a66](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0424a66810b158ca4ffb803c657701531a5548d6))

## [1.9.9](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.8...v1.9.9) (2020-09-29)


### Bug Fixes

* renames in README too ([c48d385](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c48d385a5eb9ea5aed098353dfee43d190271987))

## [1.9.8](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.7...v1.9.8) (2020-09-29)


### Bug Fixes

* adds repository field ([ff20f0c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ff20f0c2f06f17b8e4e853d45ac0ec0e8e8ae772))

## [1.9.7](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.6...v1.9.7) (2020-09-29)


### Bug Fixes

* path to ts-node ([d7fc410](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d7fc410d622801b64c53fbd62fd12f6e9dc2af90))

## [1.9.6](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.5...v1.9.6) (2020-09-29)


### Bug Fixes

* upgrades @scaleleap/amazon-marketplaces@7.0.0 ([80e1268](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/80e1268cd3208037fff663a21e8fd9717843a59f))

## [1.9.5](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.4...v1.9.5) (2020-09-19)


### Bug Fixes

* asin in codecs changed to account for pure number values ([e156906](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e156906bc587d9d59797ec961303230afa0fce31))

## [1.9.4](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.3...v1.9.4) (2020-09-13)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v6 ([ef94508](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ef94508bd355f2eb8432b332c47d627aa59c70d7))

## [1.9.3](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.2...v1.9.3) (2020-08-24)


### Bug Fixes

* change Name on address to be optional ([a3d9f3d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a3d9f3db6fe5abbd53c1b9ac2ebacafe16c00444))

## [1.9.2](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.1...v1.9.2) (2020-08-14)


### Bug Fixes

* remove volatile work around ([362937d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/362937dd07ad137cf2524ff7d78b7ea887dfd127))
* workaround to fix api-extractor issues ([42d3f6b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/42d3f6b56013331f32f87cd7f8553318e017e5f1))

## [1.9.1](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.9.0...v1.9.1) (2020-08-13)


### Bug Fixes

* fix api-extractor issues ([b825f6d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b825f6dd32c9fcbcef79057a103b29d5847f8242))
* return settings.json to previous state ([b011fb0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b011fb02c9b41d6675268bcad9475def1dd9c54f))

# [1.9.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.8.0...v1.9.0) (2020-08-11)


### Bug Fixes

* add parameters type to tests ([0011aab](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0011aab70990e6d6f61893643dbcfd7dff2a954a))
* fixes for integration tests and remove void from return ([044c161](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/044c161c191551312c653c27ff9662aa93d7d0b8))
* specify valid formats, make xml default if invalid format ([3c703da](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3c703da2501ed82d3d773fb4e6b1683529e5125f))


### Features

* add option for getFeedSubmissionResult to return json obj ([ff949e2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ff949e256334f723508241f63858110ec38340ca))

# [1.8.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.7.0...v1.8.0) (2020-08-08)


### Features

* complete products remaining sub attributes ([b2b5361](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b2b536136e51d958e6e73f713675b724f257d991))

# [1.7.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.6.2...v1.7.0) (2020-07-29)


### Features

* create createScheduledPackage ([b144b8a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b144b8a7d2186acaf2aa42197ed36e234421633d))
* fixed missing parameters from creaetScheduledPackage ([0d06b79](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0d06b79495ba3c116184e6d17f6860cad2c21fd6))
* init easyShip with getServiceStatus ([c5a97f1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c5a97f18bc5ac80b5712e6f49b76cfe195067d5d))
* made easyShip ([5162b9c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5162b9c8ce033c9d4d8ff6b9ee70cc54548f1be5))
* made getScheduledPackage ([e97ed56](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e97ed5664e38470c7207cd61837a8003a8713e50))

## [1.6.2](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.6.1...v1.6.2) (2020-07-29)


### Bug Fixes

* adds repo description and keywords and set up sync ([30365d9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/30365d93f6b1479a3a8e6323ddd9e48411aeba76))

## [1.6.1](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.6.0...v1.6.1) (2020-07-29)


### Bug Fixes

* fix a misnamed nested array in FeeDetail ([c34d739](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c34d7399384ee2a8a8c1d78bb7c8ccd2b8e74825))
* remove build changes ([cd39642](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cd39642fbddaaad6d8b08c0b3d606413decaf2d7))

# [1.6.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.5.1...v1.6.0) (2020-07-22)


### Features

* adjust getServiceStatus ([2527b05](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2527b05635ca1f3dd44c54ae3c104fe32c7c0ddd))
* init fulfillmentOutboundShipment ([3ca4f53](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3ca4f53d6ab3f8e699c023558219fe6a504e4170))
* init fulfillmentOutboundShipment ([e7325fa](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e7325fa5e93ef30033359b72807cbd188b28919b))
* made cancelFulfillmentOrder ([fec6424](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/fec6424118808e5b43865e2465b30065d1ab40bf))
* made createFulfillmenReturn ([712b362](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/712b36206e9e3ce5aefb06d13c5ba1a0e7426f9a))
* made createFulfillmentOrder ([49c0c02](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/49c0c02d92c57adfb23fe681f3a7ee2ef34f1e4f))
* made GetFulfillmentPreview ([506074c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/506074c98f887270cf891c3349d4f42dcbec9719))
* made getPackageTrackingDetails ([79f2b36](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/79f2b36f09adf5a12f708c873d13b539344b44e2))
* made listAllFulfillmentOrders NT ([752fbd5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/752fbd5440ab12b37d4900f0492e2509d4251c71))
* made listReturnReasonCodes ([56b552f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/56b552f7a42ca772d6882bfbd1565357aabbcb08))
* made updateFulfillmentOrder ([c37badc](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c37badc4882b591d88468c5a7fb98fb68d5a334d))
* made: listAllFulfillmentOrders ([7af30fb](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7af30fb545f31ae73b5885ba57a9b74ec8373ac6))
* make getFulfillmentOrder ([a5a4656](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a5a46567dc7024d871101c5142a7319768c302d3))

## [1.5.1](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.5.0...v1.5.1) (2020-07-21)


### Bug Fixes

* **deps:** update dependency purify-ts to v0.16.0-beta.5 ([617b172](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/617b172844df410cd0d65bf9beca7b59da6eb144))

# [1.5.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.4.2...v1.5.0) (2020-07-16)


### Bug Fixes

* api-extractor issues ([c02eebe](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c02eebea3944717bba56f5f8732fee72f23ecdc9))
* fix lint issues ([25330f5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/25330f50a424828a24674b1e48fbd8dfd243d291))
* fix minor lint issue ([d2c1a04](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d2c1a0414efc88640ab1baf6d99bc1da0e623705))
* fix minor lint issue ([f7c964e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f7c964eeebbdecd84218637dedf0a8bf5e646935))
* parameters fix for getPackageLabels ([477fd37](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/477fd37f6108307cebd810b240d1f8dbeea7c446))
* workaround for api-extractor not running ([a2a78f9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a2a78f9f63ca761fb7a9e386db89feae010ad0e8))


### Features

* create confirmPreorder ([a17ac2e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a17ac2e89657b40de36fb8c2bc7dab02587dd618))
* create createInboundShipment ([e7d650b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e7d650bcf110c84c161c6847e9688a387bbaa129))
* create createInboundShipmentPlan ([4e67963](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4e679633a4b061adfcb098fb3f9325b23a332316))
* create estimateTransportRequest ([ab8b492](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ab8b492b23fb118c64d8880a2a79618c3dfeba14))
* create getInboundGuidanceForAsin ([ffd38df](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ffd38df5c572b51a4131afcf1ab20975bdd13d05))
* create getPackageLabels ([ce1a01e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ce1a01e4810989b9b5153d88bc14d95958889021))
* create getPreorderInfo ([0be869d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0be869d80afa4a36f62e6202f46205dc9b5ba3c5))
* create getPrepInstructionsForAsin ([6eafbe4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6eafbe40712126cc4a0fc22549a948a673be9324))
* create getPrepInstructionsForSku ([9835206](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/9835206217c79c66050c7c30f3a34187dc56b347))
* create putTransportContent ([4f88d6a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4f88d6a0046da9e1746f9c400b14371a9d07b03e))
* create updateInboundShipment ([8719bf3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8719bf37ec056b81802e3164c47bde5cd7ba522f))
* finish confirmTransportRequest ([a75f674](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a75f6740a8b4d86fae06b8cf192ae55c426ba0c4))
* init fulfillmentInboundShipment ([112fb4a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/112fb4a3c7efbb0044b276adbb1ff4a3d0d0097a))
* init getTransportContent ([239739e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/239739e1839d7d33ec27fb2d6890add91c2c3c9c))
* made getBillOfLading ([16cfd9a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/16cfd9a64e9cc17b401086e4d412c5539562e851))
* made getInboundGuidanceForSku ([ea63761](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ea637614d82fe999a1725d4a995fd7f891bc2933))
* made getUniquePackageLabels ([8078e97](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8078e97875eaa2f66c69f451504e92d186f0bc48))
* made listInboundShipment by NT, fix codec address ([c323bc3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c323bc35a7b1095a4ffa1d1e1797df358465525d))
* made listInboundShipmentItems ([35155be](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/35155be96ebbe4c8f13894c9b7d5fccfaa6c96d9))
* made listInboundShipmentItemsByNextToken ([0de78b9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0de78b968b5fd4424b65c5808ed39b854366d177))
* made listInboundShipments ([71c366d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/71c366d1b0dec043c77335d0a78ca2ea6726645d))
* made voidTransportRequest ([2b3239c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2b3239ccb114cb9117c4bae2780846a5de5e8e74))
* make getPalletLabels ([6dffe69](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6dffe69c5cf20a6b3a650ff5503c68fc707ae1b2))
* update getTransportContent ([1e9f3b2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1e9f3b2281f63b993b5b31bd43194cac92060b90))

## [1.4.2](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.4.1...v1.4.2) (2020-07-16)


### Bug Fixes

* npm audit ([2847e2c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2847e2c3dc8f86fbdce05d6e7565de7e068f756c))

## [1.4.1](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.4.0...v1.4.1) (2020-07-15)


### Bug Fixes

* **deps:** update dependency purify-ts to v0.16.0-beta.3 ([2abf017](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2abf01722def647a6938f57c830a3df2ed9a5173))

# [1.4.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.3.0...v1.4.0) (2020-07-10)


### Bug Fixes

* fix api-extrator issues ([0db5be3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0db5be3c05fb62b31a153fb3fb09d6d4c85d0e59))
* fix GetLastUpdatedTimeForRecommendations sometimes return blank ([32ad730](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/32ad7303cd211079b27c5ff55ad5db7d9f72d7fb))


### Features

* create listRecommendations, add enum mock to unit test ([458df2a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/458df2ac7a3ac9cd3430f133531d46be6b09e070))
* init recommendations ([00cdc9a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/00cdc9afc83b7ed7649fb415862da0b23ee08138))
* init recommendations ([f7bd758](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f7bd7583157c9dac6a6b2dd82c1478784dea3aca))
* made getLastUpdatedTimeForRecommendations ([c33b71c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c33b71ced2dda3627fe31002d1ea5a7497ee56fe))
* made listRecommendationByNextToken ([f1f79a7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f1f79a7c79a086eed043fd7d80664436a7453088))

# [1.3.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.2.0...v1.3.0) (2020-07-08)


### Bug Fixes

* check both api vers ([2775650](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/27756500fe6e90a47415666bc46a46c8d2f8ccd2))
* fix api extractor issues ([167110a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/167110a20490414a044415456c7a39723cfc287a))
* fix api version ([edaf222](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/edaf22205bf61edb308a4ff325bd4e8a33326a7d))
* make comment clearer ([56029b1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/56029b1b194b406d0ef818267e16833a4517bf3a))
* make name of address different from MerchantFulfillment ([7e6afb9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7e6afb9e2e3656c35050c23de1ffd149d7b6a0a6))
* this is the correct API ver ([a455fbf](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a455fbfa3a759a69c03b8b8671cbbfe303c16aa1))


### Features

* create GetFbaOutboundShipmentDetail ([f259195](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f259195a53742ebbb619f2ec8858f3d5d2b5d651))
* init shipmentInvoicing ([c7f36ab](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c7f36ab1eb320cb4687f41c0a59d306c47891a9d))
* make submitFbaOutboundShipmentInvoice ([a5541be](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a5541bee71f733f5fe0e59db682b6668231bf5ef))

# [1.2.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.1.1...v1.2.0) (2020-07-08)


### Bug Fixes

* add definitions for CanonicalizedSellerInputs ([d0c8c9f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d0c8c9fbe2d15689ab2e2986befa67a3acde8612))
* add mark to where I last stopped ([9726bf9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/9726bf9020c1ac2dc824dec02f70111df70f3f3f))
* add temp fix to uniform TZ ([692af1b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/692af1bfea1b6a50e1352d8fa10727824cb704d7))
* add todo to mwsDate ([b0bb0ff](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b0bb0ff6f3e7ad32fc7273decb31374d942bca24))
* api-extractor issues ([85780de](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/85780dece43e4f7c48d22641aa4f7fcf650bf300))
* currency amount is different in merchant-fulfillment ([7df0580](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7df05802a32e5d182737bcc68975a968f262d67e))
* fix issues that popped up due to cleanParameters change ([5fe2987](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5fe2987811e034003108fa75e9c5f8cd1f4a1ad6))
* issue with updated mocks ([6710542](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6710542e0129dd2cd04d51151930f704ef5b6939))
* test structure ([16ba997](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/16ba997b74c9561f3354347b70f4a94646405b20))
* update version ([49c4859](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/49c4859f4cd43d43dd9b556c43ac41acd9a8d990))


### Features

* create cancelShipment ([a0c0942](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a0c094278c9e653239beb3bebbf876a10b864b12))
* create codec for getAdditionalSellerInputs ([c264821](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c264821cac62b80c5323eeaa59456641e4c52a4c))
* create createShipment method ([927d10a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/927d10a6141d926aee01cdd678ce31e252abfd3f))
* create getShipment ([5902f39](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5902f39f09154f6291da7e2dd654d9b76fad273f))
* in progress getEligibleShippingServices ([1cad3b3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1cad3b362ffa98ef6d5498b6cafddd5122a1b863))
* init create shipment ([a653451](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a6534519038b39ff8e22f416a13ee695d27658f1))
* init get additional seller inputs ([2223441](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2223441243090f1f1b90f626bfedd9157252dbe4))
* init merchant fulfillment ([6cc6dc5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6cc6dc51e9ac9fc88b64d4d9d41be3457b9b7027))
* init MerchantFulfillment ([bf7754f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/bf7754fd021f826cf9728385b55ac13d60269a21))
* made cancelShipment and tests ([18a1d97](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/18a1d97ba823169725c71e9b7615b79f97d16599))
* made getEligibleShippingServices codecs and added more tests ([d2b577a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d2b577aeee620a4df6bf874e84602a6acd8d8054))

## [1.1.1](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.1.0...v1.1.1) (2020-07-06)


### Bug Fixes

* **deps:** update dependency @scaleleap/amazon-marketplaces to v5.0.1 ([0c3d77a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0c3d77a6fd6ab7d9b68f1727236780898a73d56e))

# [1.1.0](https://github.com/ScaleLeap/amazon-mws-api-sdk/compare/v1.0.0...v1.1.0) (2020-06-30)


### Bug Fixes

* affected unit test ([e2ded78](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e2ded78aaaef1da1bd966784620ef1b0cc45e094))
* api extractor fix for feeds ([5174ff5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5174ff553e1efcbc0015a170686842a8f7bdb50c))
* cleaning up placeholder text, add Properties to 'Types used ...' ([13c4086](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/13c4086b834da1920d32995675ea9a513d9ad555))
* fix which parameter is required ([530118d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/530118d62d8a905b56c1152f1431e68807601037))
* make CurrencyCode optional ([6081b3f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6081b3f6b5e882f628587a89bf339aa671d1b685))
* minor nomenclature change ([bcb1767](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/bcb176745f1bbc7d5e588ec280dba5c06306b36d))
* missed an enum ([e56109d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e56109d5c682f19362342456ab29428aa8acb5e5))
* prob with incorrect type from codec, add sample args for test ([dcffdec](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/dcffdec4deb099436c0c96bea8680694fa5d8219))


### Features

* add docs for feeds ([de6b822](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/de6b822322400c90181f10017f0f5cb7c23c1e85))
* finish docs for finances and products ([ef10709](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ef10709a8ba26567b5bc86be0e35c8d4c3f0c75c))
* initial pass at documentation. Sellers, Orders, Reports ([dc86860](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/dc86860cc66b3a4743fdce07674e085fa3e73c81))
* table of contents update ([04b7d5c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/04b7d5c7c20c8ce670c4e6f8d103df3761a45aea))
* table of contents update and headers update ([6c851c4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6c851c49a16d74e29e45f73cedfc5fb1972ef022))
* update docs for reports api ([505de0a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/505de0a43e87c291e5129e5f10c620806b471337))
* update docs for subscriptions ([07847e1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/07847e1f1196ab0655a7c994decaef6f22acdece))
* update examples with links ([a4bd3ec](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a4bd3ec32dd3817a782479ee89504af929572ca9))
* update TOC ([b8ffaa9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b8ffaa912395ede17487e8eff693b0e6620bf07f))

# 1.0.0 (2020-06-30)


### Bug Fixes

* 'Report' -> 'Reports' caused InvalidAddress issue ([2db44d6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2db44d601becb01aa0328b2a1186fe705ba67eab))
* 'report' spelling ([daefef1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/daefef1da16304b0a9c3fe88cc572a86264aa480))
* action for get report schedule count ([5d67d38](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5d67d38d4377ec7574781f5d03bdd9ff79554b50))
* adapt cleanParameters for registerDestination parameters ([3368363](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3368363bbc0921168218fe5e114e24e46a9a77bf))
* add comment explaining change ([7b6a656](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7b6a6563360ac044c9fa43f47cea124bd43561d5))
* add types to orders api ([c569bee](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c569bee58660d0da51b37032e52a3f2e5e412b37))
* api extractor for feeds api ([e963f69](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e963f69f1b9567c6bb7f8f3aafd06e9108e74251))
* apis with optional params not required to pass in argument ([e9c24d6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e9c24d608f4defd1ba985d4838e4241d14050f67))
* apply http client factory to reports tests ([58b3c87](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/58b3c872b66244e7282a8f8fdcb18e1d9051f3be))
* apply to fulfillment inventory ([af7a57c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/af7a57c20dabfc675c1c599f83a70387430533b4))
* bring back failing for testing ([12536fb](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/12536fbeea254a953cea40d3aefbf5c1451c6820))
* change type and update snapshots ([dbe4ac1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/dbe4ac1b1dc9c10a79155196901ed6520fb0bd70))
* codec for cancel report requests ([8868d4c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8868d4c9e74d5333347c8e97c4e2a91b67f11d74))
* define possible id types ([c03b8c7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c03b8c7f027a203d7846156c76eb6e5edf5cc1a0))
* define variable for codec with only product as attr ([4997e5f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4997e5f98ae3f1b6d9fa1afbb8f9585348f8e8d2))
* expose finances parameter types ([9e7f802](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/9e7f802235d5c22dba9545e0e425eecf9b6335ed))
* expose parameters for orders ([8d216f2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8d216f227f7f23257c281206339a6ad207902bfb))
* expose parameters fulfillment inventory ([b269d84](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b269d84a3f0a6de77627637f40c48cc9eb1c1ea9))
* expose parameters reports ([474218f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/474218fe1f3203228d94864ffa7c39555857c1d6))
* expose products parameters ([641bb43](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/641bb4370aef5c87637c9fe7c5da8020709017c1))
* fixed issues found in review ([e639395](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e639395234629388998ee59d39d505a241ba0ad7))
* **deps:** update dependency @scaleleap/amazon-marketplaces to v5 ([22be939](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/22be939003249a016290a45cfbbaab040653e122))
* expose params for subscriptions ([ebe2f06](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ebe2f06f6265d2711edf1b71b7c56187cc2d01d0))
* feed submission info can be multiple ([a298671](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a298671948d33347575d696d5d4b7ee126333047))
* feed submission info is optional ([5ec7ade](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5ec7aded1009873f77a2083fe6b67513cbace019))
* fix codec to use ensure array ([3ac9906](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3ac9906ed93bbb6d149f6778d02113529d3befb3))
* fix codec to use ensure array ([cbc567a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cbc567aa9070377c8e30b8ed2096c10baf3671ef))
* fix issue with get matching product for id ([6d6bbe6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6d6bbe657a570911592ec203b3f2c0458ef2dadf))
* fix parameters get matching product for id ([2593a79](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2593a79be153d2e5e0f8baad3b387232cce3f14c))
* fix parameters get matching product for id ([f0ca1d0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f0ca1d0e509889ad1dc5638d2b55713a52451d36))
* fix parameters registerDestination ([908ecfd](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/908ecfd5f564f46045299b4b76623c545c98af8d))
* fix return for GetMatchingProduct to match similar API ([e4455f7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e4455f73d9b7416a2ec7f6c3e5cfae15c85aea20))
* fix type for general product ([d52262e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d52262e6d84d7f37821d75956da9075ac5a8c790))
* get lowest priced offer for sku and asin fi ([3b1e398](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3b1e3984bee4e637bdbf5bc20211e433f65bb2c3))
* id type used in tests ([222f26d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/222f26d5c8bc57f07acf6356c17c405c508722ad))
* import correct parameters ([48ab7c9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/48ab7c9299b0a3eaa044cb6870bc51a4151e373d))
* imports from * to enumerate each import to fix api-extractor ([ae6a71d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ae6a71d795dceca5cafe70a0eb204bd7d7bc5166))
* lint err ([cd9346e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cd9346e227ac0f39518b26686232dfded092381f))
* lint error in reports ([a51e92c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a51e92c6b6243dbfa3785a6d97c54acf251ad3c7))
* lint issue ([b61e3a2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b61e3a2979d22b56796cd18390a49fcf696a9b6d))
* missed an 'S' in http.ts ([427e49a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/427e49a295a529904bbbb77d520c2df10e2f7ae0))
* missed some parameters ([dca8930](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/dca8930620994d22239cbde2ecb3017eae2de5fa))
* misspelt "ScheduleDate" ([ddeb031](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ddeb031beda7d6d79ba9153c28fc01b1f80ceaef))
* misspelt finances ([c258f17](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c258f1745532a36e7d1ab390402df5eac2603f70))
* not included in amazon's docs but is possible error ([2b185d3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2b185d3d7a3083dd8702558a8fddad60164c79fc))
* problems caught by new test ([4688ca0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4688ca0a781c4952d068d8b3fc65e40c4985ae3c))
* refactor to fix api extractor warnings ([57e805b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/57e805b1c849daf79314b9feaba201e1b7881242))
* refactored oneOfEnum codec, moved enums from types to codecs ([2f8cc9e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2f8cc9ec0139f1307fe24fd1064bd7eb999b4f07))
* remove eslint ignore in http test ([e59f763](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e59f76388853b22eb0383c6a5022c92cec03f656))
* remove service status from reports ([dcdecf2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/dcdecf225861236def294d3fbd5af3a7abb27085))
* remove unneccesary comment ([1ef87aa](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1ef87aa939263bda70844aa8c1a6129e62cb078d))
* report info fix, for polly error ([c6cae6b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c6cae6bcdb09cad821d3c17770d2355e44700613))
* report schedule list might possibly return an array ([4888d12](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4888d121af7328441db490281f2bb1fbc033bb1c))
* report type ([6ae5c57](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6ae5c57c3f7a14c4417b8d4ef48bf400a990310b))
* reports report request list, ensureArray not working as expected ([df53573](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/df53573ddf785d736625ec13b2d5890248bdb871))
* revert accidental parameter change ([4514c00](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4514c00a031ea9d02964cbbc1bf88412164b15ee))
* sample data directory ([bbd82bb](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/bbd82bb995927988406f18a2bbf630e4e5ffca9d))
* tail from string to ensureString ([e83a226](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e83a226bb10e66b9db04cf7a39fa8c372d1cb30a))
* tests for products, reports, sellers, subscriptions ([14cd5a9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/14cd5a986075e6e17c516a3012bd27d35bc8b158))
* unit test utils, finances and fulfillment inv unit tests ([943bbc3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/943bbc33432730a746e9d392e68239209733b396))
* update api ver ([d273391](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d273391cf675e440736ed06901d6f9a9654ad64a))
* update codecs to match c# library. add comments to fixtures ([4a03e1f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4a03e1f0accf755d4fe811bd1bf286e3cea07175))
* update snapshot ([d325f7a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d325f7acf243bf7deb79916b58364c625388243e))
* **deps:** update dependency fast-xml-parser to v3.17.4 ([a4d27a3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a4d27a3e44e01a9dd05571ec04d4bb03265592eb))
* add error message to parsing error ([d57ed19](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d57ed19774ccbcc86f6edf03e40d3f6407d437bd))
* casts return value to MarketplaceParticipations ([57090b1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/57090b19e1f1d493bc5812d2a6c632423c9eecde))
* circular reference in products FeeDetail ([571e29b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/571e29b8922842fa4f0bec09ddc9714325c80bb4))
* circular reference in products FeeDetail ([8ccc7da](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8ccc7da5433a3c6814a9748456db9a58d34dae9b))
* circular reference in products FeeDetail ([0ed9e9f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0ed9e9f7db0fd16dc9d6a4abefd18bb8b50e1713))
* cleanParameters now works with array of objects ([27324d7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/27324d7d8952414a65e1f43e0119371275c872e2))
* cleanParameters now works with array of objects ([ffbd2a7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ffbd2a7370b490dcf0d4b677d3eec20e7e654d9f))
* define variable for codec with only product as attr ([d6e774f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d6e774f02e1a3cca3e250c7f540ca9ffc4254f96))
* ensureArray logic ([2489885](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/248988580bb45abe60a472e8bbd16ce4c8349a5c))
* error handling ([a2c0a6d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a2c0a6d57e64b04b2836d734615865167924abfe))
* fix codec to use ensure array ([b79b13a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b79b13a2a9fcb8c86ac0bca6c12509fa5e448bb2))
* fix codec to use ensure array ([d18b8bd](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d18b8bd00ac62db983ff8c37ddd8dba8eec76d79))
* fix parameters get matching product for id ([0c29949](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0c2994944a14a074f92fbc6cee1587f4bb882364))
* fix parameters get matching product for id ([1642b40](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1642b40e22310b2ac5c590c8fa63c6ef69b27e8f))
* fix return for GetMatchingProduct to match similar API ([91245bd](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/91245bdb0b6501c50295da8ed49e39dea564b09d))
* fix type for general product ([3b65799](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3b65799ad69f53e37a7a59c9212ad6584ea92d11))
* fix type for general product ([555fbda](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/555fbdad0a7ccd5e992e5b81c15195302fd9ea61))
* handle get and post differently ([fe2c1cd](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/fe2c1cd406e545ec2ca2ea62d275cf332c6cd452))
* handle non-xml errors ([5c59290](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5c59290ff18032b5e6fc33a44b86d41d9f368b90))
* homepage link ([146a65e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/146a65eefe20f0f20baccad08d6419bfcad8f312))
* include all response properties in sellers codec ([ebc508e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ebc508e1c89b14cfa8b23ab7ff9039b8e19b0d57))
* integration test ([5f00fba](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5f00fbad9cfddf688d2a11d576f2c5ae175bdfb5))
* made variable names more descriptive ([7d06fbc](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7d06fbc53e91a40b4b6a74b5bcc2fe070f482032))
* made variable names more descriptive ([f960f84](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f960f845e138e4eaa4cacfed287f12a128140fcd))
* move query string to the body of the request ([708ec18](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/708ec18522ca3bac72f13c5b3cb9d155ea57a712))
* naming for some members with incorrect name from updated fixture ([12cc824](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/12cc824ea7d56deecc0031ff1dc444bbc24a00be))
* npm audit ([41bc969](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/41bc9698e0f576109a95520872e97b6bf575e00e))
* orders integration test ([c77f731](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c77f731922cd8803beedcc5426e1f983f41bb94a))
* parameters argument now used ([7ae1f7a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7ae1f7af049386085aff5ff5292c739967857904))
* parameters argument now used ([1db6a84](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1db6a84dfe09f8b05a30c4c92e66898e25d6037c))
* product api FeeDetail property, temporary fix ([5f47e8c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5f47e8c7a86a4e3b2ccb78a3b0a0f64538b783c5))
* product api FeeDetail property, temporary fix ([f7f5453](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f7f545341ee3864ae339d678858ab39bb93f6005))
* remove extra param from tests ([b19f4b3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b19f4b3078b466036d8befdd9becc4828f583a94))
* updated fixture. changed some enums to string ([cbcf1e3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cbcf1e3cc853ebd53726f973e4fa3786371448e3))
* **deps:** update dependency fast-xml-parser to v3.17.0 ([e833a04](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e833a046234376fe09857df8e61ffea4f57eac15))
* **deps:** update dependency fast-xml-parser to v3.17.2 ([93aa98f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/93aa98fb6bb9a41301cba5a5a913ef2be017b6a1))
* **deps:** update dependency fast-xml-parser to v3.17.3 ([faa1976](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/faa19767584e5539df7308e07b3bcf7baa50817e))
* parsing of empty arrays ([c0ea38d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c0ea38d7a02b98db85fe71231016fd7408b89826))
* proper casing for signature query param ([acfbfd6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/acfbfd6c2f8ed63cd55b5ef3277d4b634bc9cbe3))
* remove extra params from listOrdersNT and listOrderItemsNT ([4412364](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4412364987d279267bbf38a54e57277ec3f30924))
* remove unneccesary comment ([b5346c5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b5346c519d156c18e9ae619f158575b009c0659a))
* **deps:** update dependency fast-xml-parser to v3.17.2 ([8c6d26b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8c6d26b139814766d0a63e16f7d78687c3f767e9))
* parameters argument now used ([e153121](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e15312188d5af71ae84da2a96c4bc693e7dde830))
* prevent MWSApiError from being exported ([4328a18](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4328a1812612eafabc175dc00144ea2d0e05e906))
* product api FeeDetail property, temporary fix ([ee978e0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ee978e0955a6b127d02e836d96b9a8f9a9f1c2dd))
* removes no-param-reassign ([4b840c0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4b840c0174a634873140a23beb0534aa293d6fb0))
* removes no-param-reassign ([1767e75](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1767e75ec7e746ac3ee8c0dafacf688dba52c9a0))
* removes no-unused-expressions ([15c7990](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/15c7990541405a2dc21d98807635baea2761f660))
* set proper prototype of BadParameterError ([ef0a38d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ef0a38d4518e37fe581e2e7d3e55d4da624e5777))
* stack trace fix attempt ([e880d5d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e880d5d7a51192386c102d87fdfc61d8f50f7502))
* support older versions of node ([7ee8c6b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7ee8c6b9598d5b03f06875c3388661af3929f219))
* updated fixture. changed some enums to string ([8313317](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/83133175d7130a138f481f8f229a9676840ed756))
* updated fixture. changed some enums to string ([2a4768e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2a4768e1f10dda1bd258451c83db7c53ef782d2c))
* **deps:** update dependency @scaleleap/amazon-marketplaces to v4.1.0 ([d0f4dd0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d0f4dd05a49eb2ad4227ff071b51b161a339fd2e))
* **deps:** update dependency fast-xml-parser to v3.17.1 ([e1fd605](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e1fd605b8ebd6d647ff32f61bf4c0e67aafdf62e))
* **deps:** update dependency ts-error to v1.0.6 ([24201d5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/24201d5e72b874d4fc0baa3237bf5d1bda54a886))
* sellers integration test ([be87cc7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/be87cc79f403052b69d1486113c4ba68efbcdeca))
* tests ([7767c62](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7767c62e9c922b8367505eca68b179445f6a9dfe))
* to use POST method ([b57426c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b57426cbec508d1fc07eea9e82640e010493af52))
* to use the correct uri ([5deb103](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5deb1039cf053e2618b7f6e8cd5c5cf5c2ce2de0))
* update snapshots ([1973dcb](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1973dcbdd6f2fc781639049e1a2a9ccde0b71e25))
* use compare by value in test ([f328ca2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f328ca2b02b4ed9c59355fc1d9d6f67ce156b6cd))
* use pascalcase properties in codec ([39cc968](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/39cc968a6ae88b36787f414e42815484cc32e5ab))


### Features

* add better fixture for listInventorySupply ([d22342c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d22342c7ac342f98329e0b484877883caaa3ce23))
* add custom error handling ([cb82f1f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cb82f1f97c78036b254cbb073809b0e78b6ae51c))
* add example for using received next tokens ([cc7b99e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cc7b99eacc0b95b8295cc92a7c3d9921bfad9f9b))
* add fixtures ([8ce8f15](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8ce8f154841bd66aeedd656d841db6b7b5b2065b))
* add fulfillment_inventory_list_inventory_supply fixture ([ecd6fef](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ecd6fef3feaffe0399977060679dc53cc92a8f6b))
* add full types for order ([98c25bf](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/98c25bff374e7069d3ae424513b02f789ac5efeb))
* add get matching product api ([cf9f581](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cf9f581dbc606b93b73e95200b4364870c23e590))
* add get matching product api ([c8a8941](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c8a8941215a259b290f45d7cbb13782459025fab))
* add get matching product api ([856991c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/856991c5b11c158c72c0d2d9c3d29c8d1f652119))
* add get service status ([5bd7533](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5bd753350404b3e37254ca458a61297c508e3482))
* add get service status for products api ([4af496b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4af496b73f2ae1bd0730b3aa5aee37e94b58a09a))
* add get-service-status example ([387b73c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/387b73cedb93f9edbf2eb25bf3649e7673b06fce))
* add list matching products api ([b667170](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b667170e99ca03205ab297dc42bb9d431238cad3))
* add list matching products api ([caa6eb3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/caa6eb323cdb95bacd58c081822a18dce9632e47))
* add list matching products api ([b6556fc](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b6556fcaa6f4a5d7440ccd6f35dd2eafcebf684e))
* add list matching products api ([2a3dd29](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2a3dd299943fac48c8fa2a738836a99e903c19a8))
* add list orders example ([52e0122](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/52e01227a15314edb1b7b41c34eb2c2c2c3dabd2))
* add products and get my fees estimate ([011e4a3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/011e4a35801f60a947c73b980210583e4719ba6d))
* add products and get my fees estimate ([cd10f20](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/cd10f2033bd9ad8a6c531786b0a70d3e1c0966fd))
* add products and get my fees estimate ([7dbdad3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7dbdad36b7f772ef65a3c26c43bdf1d649b35b64))
* add request report api ([fb57ecb](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/fb57ecb77650c433deca7adacf3e3cbbd64ccc9c))
* add require only one type ([bf57f3f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/bf57f3f9340afb2592b41d48f4efe7b0cc8e4c0b))
* add service status unit and integration test ([e291f07](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/e291f07ebf7f4680b9ed63abce6742ba5f8c39a3))
* add the rest of the sellers api ([8b10bc9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8b10bc9464a46adc17b1d291385041b03fd7da25))
* add using next tokens example ([980cab4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/980cab4ad65904ec1dc037a783ecf5e3335aaabd))
* added list inventory supply by next token ([c40a241](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c40a241afa8a0e472d81748efa6e816867f07f46))
* cancel report requests' ([d0c546b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d0c546b05283a1d4b20a7ad2898b117abca63e83))
* create getFeedSubmissionList ([9bf93b5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/9bf93b5fa645f1d7162c326d6e71853cf3877cfa))
* create ProductAdsPaymentEvent ([a33514d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a33514d95c39b620e9086e838d634c236d0b9f5c))
* create RentalTransactionEvent ([5455c7c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5455c7c5ab9d09f1be3e7cb475c23bc488b6ef80))
* create ServiceFeeEvent ([ddac653](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ddac6536a5066fa88f0b4c28ad05cab3d5a3b118))
* create subscription ([ccf7ef6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ccf7ef69eaf36dda95dc47a3dbb7d3af4df154e8))
* created submitFeeds, integ and unit tests, http update ([f919239](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f919239b881539a41e849c1b64974092d2882cb8))
* deregister destination ([f71d347](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f71d347ee6d6b9fc60757c827034fd36e159126c))
* error handling ([50dcdf1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/50dcdf19db1185412904ac5af00031380f90f1d8))
* error handling for other sections ([7c0bc21](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7c0bc2144df4859f5e472b891bc7333ea3ccf3a1))
* example for list inventory supply ([4977959](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/49779596bc42902b4447547928552cb3bc7ea12a))
* expose orders api ([9273157](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/927315758026fbaea5db09b47689271be36d3ab7))
* expound on using next tokens ([ea27f18](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ea27f1885c34009701623245c2e9577369ef2b89))
* finish listOrders implementation ([8d7e4c9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8d7e4c905fb136b4ff215d7032ece029acfead5f))
* fulfillmentInventory.listInventorySupply ([4bf5d61](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/4bf5d61b84bd597076e29d6a29624fd84fa2ab1a))
* fulfillmentInventory.listInventorySupply unit test ([2897331](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2897331a8ac461c63218645343210f01922af48d))
* get competitive pricing for ASIN response api ([b52ccc7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b52ccc77ec604c7316051ba211b0dfad5b56d289))
* get competitive pricing for ASIN response api ([c1bf300](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c1bf3006c8a3bd91d07417167e140c7816d89de7))
* get competitive pricing for ASIN response api ([af305b1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/af305b105a0f19d13a3f4786b69a5937eed24d41))
* get competitive pricing for sku response api ([00a68f4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/00a68f4a8bf50651e9e71d3ea970282d65ae79fd))
* get competitive pricing for sku response api ([d00e9bc](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d00e9bc15aa5d168cdacaf8c5903b9ae8f5ac155))
* get competitive pricing for sku response api ([ec31452](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ec3145255bcec0d63ec25ea865e2fd4691dd8d4c))
* get lowest offer listings for asin ([8981198](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/89811981c1e0a32b23eae4b95cc1b38700bca15d))
* get lowest offer listings for sku ([0b146d4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0b146d40984882e1eb099e060e1c1b1dc6dca7ea))
* get lowest priced offers for asin ([6b93f4c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6b93f4c2de425c717d1e1c8b78fa5587e0eab922))
* get lowest priced offers for asin, plus fix for FeeDetail ([282a269](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/282a269f5908123d261afc73845d659071c28294))
* get lowest priced offers for sku ([599197c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/599197c4834bddc87978fb65a0f2b8b4366269f5))
* get lowest priced offers for sku ([be46b5e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/be46b5ee7711a62772794a6fe57427bae212b020))
* get matching products for id api ([270cb59](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/270cb59f2d2f4575934eea488fe9ddc58289f4d7))
* get matching products for id api ([b81f6f1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b81f6f1e6c2c21b70adb8402394c387eaaa87849))
* get matching products for id api ([2a7e0da](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2a7e0daec0b70a0c01ff641ab7ea15b1c0067d08))
* get matching products for id api ([011bb67](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/011bb67827a72207cde41dbc1ffa80242d988790))
* get my price for asin ([3aaf854](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3aaf8544d0af9aa02c8c4975b66b4530fa772ce2))
* get my price for sku ([8875789](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8875789e16cc9c1a822c43e82f0f31ee01bd25f1))
* get product categories for sku, plus some minor misspelling fixes ([2fffd1c](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/2fffd1c1e9ca5e90e76b9114ae2e897ee2292a07))
* get report count ([6f5aeff](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6f5aeffed45c0721f4b3567f4bff2da4d422aa6c))
* get report list ([7ff06e8](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7ff06e8ad144026ecb873b25adbd1c0ea9bc4dfa))
* get report list nt ([b154318](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b154318b400674f33bb5e90b402c0fbe65a39073))
* get report request count ([ccc4369](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ccc4369f1abce6b4173323519d7d8d453992f64a))
* get report request list api ([db4d26d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/db4d26db713d00904ec3d32abc7ca6f9668d9178))
* get report request list by NT ([a0851e5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a0851e595919eb5c6713684540456f0b17af33e3))
* get report schedule count ([a1c07f7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a1c07f71a3fd0056ed0ec13dcf6081f44557a18a))
* get report schedule list ([da73f83](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/da73f8332c9eb2b255e7e7f7f7da1fd88f645c09))
* get report, adjust response data parsing for get report ([0c0c9d2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/0c0c9d214e3877df1828813ebe7abd25285f9994))
* get subscription ([54d8d20](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/54d8d2029f241c13c1946cb0609aea92a15147fd))
* getorder ([5d03ef2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5d03ef2f6eadaeb5a0a7291a1869030d8e9aab9c))
* handle edge cases, add listordersbynexttoken ([27800a8](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/27800a8a88740cbf42be1d85fbd640dd561eccec))
* have a special type for nexttoken ([458ab03](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/458ab0363acfa405c108464a6f9da4272331d5a7))
* http client factory ([8ee0dc9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8ee0dc9fd1cdaa1646a923af2a16dc9bae46dcc9))
* improve error message ([f279d8e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f279d8e655da5c5c4dcc51a9aa256e77791f836f))
* init feeds ([df44797](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/df44797fb77287e7ed87d5a2a33571c08bbdbbd5))
* init finances ([857c23a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/857c23a8b6f876e8db1485d0953cd0dc15f19854))
* init subscriptions ([00dff3b](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/00dff3b3c1c68ced57c3faab89330d8616a73946))
* list financial event groups by nt ([3782919](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3782919807e422759abaef9b6a6ec74d518b0a0c))
* list financial events group ([ea86bc9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ea86bc9b55b638df1026861842a146f33ee5c5d1))
* list registered destinations ([a3d99d0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a3d99d0b5eeb75515021084e5a561570a5b32f58))
* listorderitems ([892d0f4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/892d0f40227617735711805d5d7aaf822495c243))
* made AdjustmentEvent ([63ef1a1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/63ef1a1be22fbd7cad52abfa5a738297ac7dded4))
* made AffordabilityExpenseEvent ([86d61f4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/86d61f42ae58462056b9594ac264da83e9b944f2))
* made AffordabilityExpenseReversalEvent ([c087bc4](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/c087bc4871dc1394eb760c5a78a9280118d42f08))
* made cancelfeedsubmissions ([5bc64f0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5bc64f0ab5c0b425e11fb1f65527e411c9d2f1ea))
* made CouponPaymentEvent and SAFETReimbursementEvent ([78078d5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/78078d5c9a8178a4b6f596fa8e1369c39dfeedbd))
* made FBALiquidationEvent ([5f3379a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5f3379a557531a2cfca73d85d8b74643f05c83a7))
* made getFeedSubmissionCount ([b6fc7cb](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/b6fc7cb09eb06e4bec0b2e0b75d9167a4fcc714c))
* made getFeedSubmissionsList and fix tests ([895d664](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/895d66410e2172e37408a2395325c933e1d5516f))
* made getFeedSubmissionsListByNT and feedsubmissioninfo ([36777cf](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/36777cf6a028c1b87a99bd380de3c20bbbb4d12e))
* made listFinancialEventsByNextToken and fixes ([3cfc578](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3cfc578cb6321b3188d092f5026b6cafd29f4ad4))
* made NetworkComminglingTransactionEvent ([1601348](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1601348d03787f36be71a540db859c26c85dc598))
* made PayWithAmazonEvent ([5e533a1](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5e533a11bb5cf8513d24dde567434581a52c6ab4))
* made RetrochargeEvent ([de22e6d](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/de22e6dd5830c59711de99b4a3cff57d21df8a54))
* made SellerReviewEnrollmentPaymentEvent ([a0684b6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/a0684b69a41a1e3b1a2c11687e718950c1c22711))
* made ShipmentEvents codec ([dc3dc62](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/dc3dc6254c7d6ae60d2ad7b9226b37be98ca3eee))
* made SolutionProviderCreditEvent ([69f2509](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/69f2509babed05ab053d2afddea35686991c49d8))
* make DebtRecoveryEvent ([bd8eb20](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/bd8eb205bf80dd3c31d9220d590fe43c44401e3a))
* make LoanServicingEvent ([51f7a05](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/51f7a05f35e572f470c190437c01eb08f35c89e9))
* making requests mvp ([f6138f9](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f6138f94b51a6e21c4e0d2d72424729b6807c31e))
* manage report schedule ([7faa1ac](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7faa1acd5e1c2f3fe154a15dc71f78eccc70c963))
* manage report schedule change to array codec ([f0e74c7](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/f0e74c776921943be4f5a5e80c8ea0adf860f08d))
* move options into http module ([7dfbcc6](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/7dfbcc6f0201e6f2064dc14fe6fbfe00d488a46c))
* orders api ([d340e9e](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/d340e9ecccae721ec027500df8bb4435bb03d0cc))
* parse and return meta from headers ([774a1e8](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/774a1e883bf45e4c2dec2d2ec18fd587908ae911))
* parse xml response ([dd184cd](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/dd184cd4f156df62f63d0111ade047fc91a353db))
* parse, transform and validate response from sellers endpoint ([6b24657](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/6b24657c40a821f69fedf3a732c2c7e5cb5a964c))
* prepare codec for financial events ([8d50e4f](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/8d50e4fbb5ff88db72225c8a2e75fb4f8a8dd0f4))
* prepare separate codec file to hold list of financial events ([35c7559](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/35c75597b9606ec395c438ec1c45a7c527ae2141))
* register destination. prepare http for fix to clean params ([97989cd](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/97989cddb24bc52b9861aa2e5d8ed28ba9238c2c))
* require dates instead of iso strings in list orders ([9387465](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/9387465f2da6bdfcfe78caf66c613a500bdfe971))
* require whole marketplace object ([3eb28f2](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/3eb28f2d045ed173f27fd5d0789cce6fef9f154e))
* resource action typelevel validation ([425838a](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/425838a051b9953001ec51e4bc1930b7b79056d9))
* send test notification to destination ([087bf63](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/087bf63d1fc8fa8c82cc3070cbf7e7b825876648))
* try out showing the http error ([5f89df3](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/5f89df3bf520071b0f61a5d8dba8dea39a95868d))
* update reports acknowledgements ([ea96dc0](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/ea96dc0a2a8c4d1fbd4c5427703b04bf8beb385f))
* update subscription ([bcf8ad5](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/bcf8ad50e455d6ab9619da1a3cec0c8a13d17769))
* use marketplaces package ([fda2b02](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/fda2b02ea1bb76e996811279f5c0d05eefc751d5))
* use purify as a json schema generator ([1c91708](https://github.com/ScaleLeap/amazon-mws-api-sdk/commit/1c917080d5c56f6e967282aad83e64079e2c56a4))
