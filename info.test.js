import Info from './info'
import {test_data } from './test/testData'
import {risk_test_data1, risk_test_data2,risk_test_data3, risk_test_data4, risk_test_data5, risk_test_data6} from './test/testData'
const info = new Info(test_data)
const r1 = new Info(risk_test_data1)
const r2 = new Info(risk_test_data2)
const r3 = new Info(risk_test_data3)
const r4 = new Info(risk_test_data4)
const r5 = new Info(risk_test_data5)
const r6 = new Info(risk_test_data6)
test('Get caseID', () => {
  expect(info.getCaseID()).toBe('JD196620')
})

test('Get Arrest', () => {
  expect(info.getArrest()).toBe("N")
})

test('Get iucr', () => {
  expect(info.getIucr()).toBe("0486")
})

test('Get category', () => {
  expect(info.getCategory()).toBe("BATTERY")
})

test('Get description', () => {
  expect(info.getDescription()).toBe("DOMESTIC BATTERY SIMPLE")
})

test('Get domestic', () => {
  expect(info.getDomestic()).toBe("Y")
})

test('Get beat', () => {
  expect(info.getBeat()).toBe("2523")
})

test('Get fbi', () => {
  expect(info.getFbiCd()).toBe("08B")
})

test('Get ward', () => {
  expect(info.getWard()).toBe("31")
})

test('Get block street', () => {
  expect(info.getBlockStreet()).toBe("W BARRY AVE")
})

test('Get block code', () => {
  expect(info.getBlockCode()).toBe("044XX")
})

test('Get x coordinate', () => {
  expect(info.getX()).toBe("1146388")
})

test('Get location description', () => {
  expect(info.getLocationDescription()).toBe("APARTMENT")
})

test('Get latitude', () => {
  expect(info.getLatitude()).toBe(41.937133969)
})

test('Get longitude', () => {
  expect(info.getLongitude()).toBe(-87.737414446)
})

test('Get y coordinate', () => {
  expect(info.getY()).toBe("1920245")
})
// The test for the risk1
test('Get risk', () => {
  expect(r1.getRisk()).toBe(4)
})
// The test for the risk
test('Get risk', () => {
  expect(r2.getRisk()).toBe(4)
})
// The test for the risk
test('Get risk', () => {
  expect(r3.getRisk()).toBe(5)
})
// The test for the risk
test('Get risk', () => {
  expect(r4.getRisk()).toBe(5)
})
// The test for the risk
test('Get risk', () => {
  expect(r5.getRisk()).toBe(5)
})
// The test for the risk
test('Get risk', () => {
  expect(r6.getRisk()).toBe(4)
})