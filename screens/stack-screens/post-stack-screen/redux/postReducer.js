import {ADD_POST_TRIGGER, VIEW_ALL_POSTS_TRIGGER, VIEW_USER_POSTS_TRIGGER} from "./postActionType";

// initial state
const initialState = {
    userPosts: [],
    allPosts: [],
}

// reducer
export default function postReducer(state = initialState, actions) {
    switch (actions.type) {
        case ADD_POST_TRIGGER:
            return {
                ...state,
                userPosts: actions.userPosts
            };
        case VIEW_USER_POSTS_TRIGGER:
            return {
                ...state,
                userPosts: actions.userPosts
            };
        case VIEW_ALL_POSTS_TRIGGER:
            return {
                ...state,
                allPosts: actions.allPosts
            };
        default:
            return initialState;
    }
}
