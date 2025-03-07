import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Gamemember } from "../generated/schema"
import { Gamemember as GamememberEvent } from "../generated/InvestmentClub/InvestmentClub"
import { handleGamemember } from "../src/investment-club"
import { createGamememberEvent } from "./investment-club-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let clubId = BigInt.fromI32(234)
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let priceFeed = BigInt.fromI32(234)
    let predictedPrice = BigInt.fromI32(234)
    let newGamememberEvent = createGamememberEvent(
      clubId,
      creator,
      priceFeed,
      predictedPrice
    )
    handleGamemember(newGamememberEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Gamemember created and stored", () => {
    assert.entityCount("Gamemember", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Gamemember",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "clubId",
      "234"
    )
    assert.fieldEquals(
      "Gamemember",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Gamemember",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "priceFeed",
      "234"
    )
    assert.fieldEquals(
      "Gamemember",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "predictedPrice",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
