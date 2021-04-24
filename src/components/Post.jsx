import React from 'react'

function Post({ firstName, lastName, title, text }) {
    return (
        <div className="post">
            <div className="post__header">
                <a href="# " className="post__header--text" >{title}</a>
            </div>
            <div className="post__description">
                <p className="post__description--text">{text}</p>
            </div>
            <div className="post__author">
                <p className="post__author--name">{`${firstName} ${lastName}`}</p>
            </div>
        </div>
    )
}

export default Post
