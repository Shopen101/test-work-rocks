const initialState = {
    posts: [],
    users: [],
    correctPosts: [],
}

const main = (state = initialState, action) => {
    switch (action.type) {
        case 'SETPOSTS':
            return {
                ...state,
                posts: action.payload,
            }
        case 'SETUSERS':
            return {
                ...state,
                users: action.payload,
            }
        case 'SETPOSTSWITHNAME':
            return {
                ...state,
                correctPosts: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}

export default main
