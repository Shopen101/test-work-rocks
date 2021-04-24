import React, { useState, useEffect } from 'react'
import { FindButton, FindInput, Post } from '../components'

import { useDispatch, useSelector } from 'react-redux'
import { setPostsWithName } from '../redux/action'

const arrOfPosts = []

function PostFrame() {
    const dispatch = useDispatch()
    const [userFindText, setUserFindText] = useState('')
    const [postsWithOutSort, setPostsWithoutSort] = useState([])

    const { posts, users, correctPosts } = useSelector(state => state.all)

    useEffect(() => {
        posts?.forEach(post => {
            users?.forEach(user => {
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
            alert('Вы не ввели ничего в окно поиска!')
        } else {
            if (userFindText.split(' ').length > 1) {
                let userTxt = userFindText.split(' ')

                userTxt.forEach(userWord => {
                    const regexp = new RegExp(userWord.trim(), 'gmiu')
                    let sortedArrOfPost = []

                    postsWithOutSort.forEach(post => {
                        post.firstName.split(' ').forEach(name => name.match(regexp) && sortedArrOfPost.push(post))
                        post.lastName.split(' ').forEach(name => name.match(regexp) && sortedArrOfPost.push(post))
                    })

                    sortedArrOfPost = Array.from(new Set(sortedArrOfPost))
                    sortedArrOfPost.length ? dispatch(setPostsWithName(sortedArrOfPost)) : alert('По вашему запросу ничего не было найдено!')
                })
            } else {
                const regexp = new RegExp(userFindText.trim(), 'gmiu')
                let sortedArrOfPost = []

                postsWithOutSort.forEach(post => {
                    post.firstName.split(' ').forEach(name => name.match(regexp) && sortedArrOfPost.push(post))
                    post.lastName.split(' ').forEach(name => name.match(regexp) && sortedArrOfPost.push(post))
                })

                sortedArrOfPost = Array.from(new Set(sortedArrOfPost))
                sortedArrOfPost.length ? dispatch(setPostsWithName(sortedArrOfPost)) : alert('По вашему запросу ничего не было найдено!')
            }
        }
    }

    return (
        <div className="container">
            <div className="wrap">
                <div className="find__block">
                    <FindButton onClick={handleFindClick} />
                    <FindInput onChange={changeHandler} userFindText={userFindText} />
                </div>
                <div className="posts__block">
                    {
                        correctPosts.length
                            ?
                            correctPosts?.map((post, index) => {
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
                            : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PostFrame
