import environmentReducer, { initialState } from '../environmentSlice';
import expect from 'expect';

describe('environment reducer', () => {

  let originalEnvironment: any

  beforeEach(() => {
    originalEnvironment = { ...process.env };
  });

  afterEach(() => {
    process.env = { ...originalEnvironment };
  });

  test('should handle initial state', () => {

    const environment = 'env.test.local.1';


    // write expected environment to .env.test.local
    // remove after test

    const initialStateObj = initialState();

    expect(environmentReducer(undefined, { type: 'unknown' })).toEqual(initialStateObj);
  });

  test.skip('should fail if ff function key required but not found', () => {

    process.env.REACT_APP_FF_FUNCTION_APP_KEY = "asdfasdfasd";
    process.env.REACT_APP_FUNCTION_APP_KEY = "";

    const sut = () => environmentReducer(undefined, { type: 'unknown' });

    const expectedErrorString = 'State: expect function host key but not find one';

    expect(sut).toThrow(expectedErrorString);

  });
});
