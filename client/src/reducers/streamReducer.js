import {
    FETCH_STREAM,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAMS,
    FRIST_FETCH_STREAM
} from '../actions/types';
import _ from 'lodash';

export default (state ={}, action) => {
    switch(action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        case FRIST_FETCH_STREAM:
            return { ...state, ..._.mapKeys(action.payload, 'id')}
        default:
            return state;
    }
}