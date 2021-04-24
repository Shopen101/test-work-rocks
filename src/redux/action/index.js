export const setPosts = posts => ({
    type: 'SETPOSTS',
    payload: posts,
})

export const setUsers = users => ({
    type: 'SETUSERS',
    payload: users,
})

export const setPostsWithName = posts => ({
    type: 'SETPOSTSWITHNAME',
    payload: posts
})