import testActionType from './testActionType';

let test = {
    string: ''
};

export default function counter(state = test, action) {
    switch (action.type) {
        case testActionType.TESTDATA:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}