import testActionType from './testActionType'


export default {
    getData: () => {
        return async dispatch => {
            dispatch({
                type: testActionType.TESTDATA,
                data: {
                    string: 'test'
                }
            });
        }
    }
}
