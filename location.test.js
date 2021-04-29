import location from './location'
import { test_data } from './test/testData'

const loc = new location(test_data)

//Test 1
test('Get block', () => {
  expect(loc.getBlockInfo()).toBe("044XX W BARRY AVE")
})

//Test 2
test('Get x coordinate', () => {
  expect(loc.getX()).toBe("1146388")
})

//Test 3
test('Get location descripe', () => {
  expect(loc.getLocationDescrip()).toBe("APARTMENT")
})

//Test 4
test('Get latitude', () => {
  expect(loc.getLatitude()).toBe("41.937133969")
})

//Test 5
test('Get longitude', () => {
  expect(loc.getLongitude()).toBe("-87.737414446")
})

//Test 6
test('Get y coordinate', () => {
  expect(loc.getY()).toBe("1920245")
})