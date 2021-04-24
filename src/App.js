import React, { useCallback, useEffect } from 'react'

import { useRoutes } from './hooks/routes.hook'
import { useDispatch } from 'react-redux'
import { setPosts, setUsers } from './redux/action'

function App() {
    const routes = useRoutes()
    const dispatch = useDispatch()

    const loadAllPosts = useCallback(async () => {
        await fetch('https://jsonplaceholder.cypress.io/posts')
            .then(response => response.json())
            .then(jsonAnswer => dispatch(setPosts(jsonAnswer)))
        await fetch('https://jsonplaceholder.cypress.io/users')
            .then(response => response.json())
            .then(jsonAnswer => dispatch(setUsers(jsonAnswer)))
    }, [])

    useEffect(() => {
        loadAllPosts()
    }, [loadAllPosts])

    return <div>{routes}</div>
}

export default App
