import {
    ADD_POST,
    ADD_POST_TRIGGER,
    VIEW_ALL_POSTS,
    VIEW_ALL_POSTS_TRIGGER,
    VIEW_USER_POSTS,
    VIEW_USER_POSTS_TRIGGER
} from "./postActionType";

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function addPostTrigger(post) {
    return {
        type: ADD_POST_TRIGGER,
        post
    }
}

export function viewUserPost(userPosts) {
    return {
        type: VIEW_USER_POSTS,
        userPosts
    }
}

export function viewUserPostTrigger(userPosts) {
    return {
        type: VIEW_USER_POSTS_TRIGGER,
        userPosts
    }
}

export function viewAllPost() {
    return {
        type: VIEW_ALL_POSTS
    }
}

export function viewAllPostTrigger(allPosts) {
    return {
        type: VIEW_ALL_POSTS_TRIGGER,
        allPosts
    }
}
