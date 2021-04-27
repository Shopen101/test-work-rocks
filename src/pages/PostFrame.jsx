import React, { useState, useEffect } from 'react'
import { CircLoader, FindButton, FindInput, Post, Resetbtn } from '../components'

import { useSnackbar } from 'notistack'

import { useDispatch, useSelector } from 'react-redux'
import { setPostsWithName } from '../redux/action'

const arrOfPosts = []

function PostFrame() {
    const { enqueueSnackbar } = useSnackbar()

    const dispatch = useDispatch()
    const [userFindText, setUserFindText] = useState('')
    const [postsWithOutSort, setPostsWithoutSort] = useState([])

    const { posts, users, correctPosts } = useSelector(state => state.all)

    useEffect(() => {
        posts.forEach(post => {
            users.forEach(user => {
                if (post.userId === user.id) {
                    let postWithUsername = {
                        ...post,
                        firstName: user.name,
                        lastName: user.username,
                    }
                    arrOfPosts.push(postWithUsername)
                }
            })
        })

        dispatch(setPostsWithName(arrOfPosts))
        setPostsWithoutSort(arrOfPosts)
    }, [posts, users, dispatch])

    const changeHandler = event => {
        setUserFindText(event.target.value)
    }

    const handleFindClick = () => {
        if (!userFindText) {
            enqueueSnackbar('Для поиска необходимо ввести текст!', { variant: 'error' })
        } else {
            if (userFindText.split(' ').length > 1) {
                let userTxt = userFindText.split(' ')

                let sortedArrOfPost = []
                userTxt.forEach(userWord => {
                    const regexp = new RegExp(userWord.trim(), 'gmiu')

                    postsWithOutSort.forEach(post => {
                        post.firstName.split(' ').forEach(name => name.match(regexp) && sortedArrOfPost.push(post))
                        post.lastName.split(' ').forEach(name => name.match(regexp) && sortedArrOfPost.push(post))
                    })

                    sortedArrOfPost = Array.from(new Set(sortedArrOfPost))
                })

                if (sortedArrOfPost.length) {
                    dispatch(setPostsWithName(sortedArrOfPost))
                    enqueueSnackbar('Поиск дал результат!', { variant: 'success' })
                } else {
                    enqueueSnackbar('Ничего не найдено по вашему запросу!', { variant: 'warning' })
                }
            } else {
                const regexp = new RegExp(userFindText.trim(), 'gmiu')
                let sortedArrOfPost = []

                postsWithOutSort.forEach(post => {
                    post.firstName.split(' ').forEach(name => name.match(regexp) && sortedArrOfPost.push(post))
                    post.lastName.split(' ').forEach(name => name.match(regexp) && sortedArrOfPost.push(post))
                })

                sortedArrOfPost = Array.from(new Set(sortedArrOfPost))
                if (sortedArrOfPost.length) {
                    dispatch(setPostsWithName(sortedArrOfPost))
                    enqueueSnackbar('Поиск дал результат!', { variant: 'success' })
                } else {
                    enqueueSnackbar('Ничего не найдено по вашему запросу!', { variant: 'warning' })
                }
            }
        }
    }

    const handleResetButtonClick = () => {
        posts.forEach(post => {
            users.forEach(user => {
                if (post.userId === user.id) {
                    let postWithUsername = {
                        ...post,
                        firstName: user.name,
                        lastName: user.username,
                    }
                    arrOfPosts.push(postWithUsername)
                }
            })
        })

        dispatch(setPostsWithName(arrOfPosts))
        setUserFindText('')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleFindClick()
        }
    }

    return (
        <div className="container">
            <div className="wrap">
                <div className="find__block">
                    <div className="find__block--btns">
                        <FindButton onClick={handleFindClick} />
                        <FindInput onChange={changeHandler} userFindText={userFindText} onKeyPress={handleKeyPress} />
                    </div>
                    <Resetbtn onClick={handleResetButtonClick} />
                </div>
                <div className="posts__block">
                    {
                        correctPosts.length
                            ?
                            correctPosts.map((post, index) => {
                                return (
                                    <Post
                                        firstName={post.firstName}
                                        lastName={post.lastName}
                                        title={post.title}
                                        text={post.body}
                                        key={`${post.body}__${index}`}
                                    />
                                )
                            })
                            : <CircLoader />
                    }
                </div>
            </div>
        </div>
    )
}

export default PostFrame
