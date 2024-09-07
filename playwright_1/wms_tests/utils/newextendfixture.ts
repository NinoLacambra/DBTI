import { test1 } from '../utils/extendfixture1';  // First fixture with logIn and goodRec
import { test3 as baseTest } from '../utils/extendfixture2';  // Second fixture with goodRecAdd

// Combine the fixtures
type pages = {};

const combinedTest = test1.extend<pages>(baseTest);  // Combine the fixtures

// Export the combined test and expect
export const test = combinedTest;
export const expect = combinedTest.expect;
