import React, { Component } from 'react'

import './Feed.css'
import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'
import api from '../services/api'
import io from 'socket.io-client'

class Feed extends Component {
  state = {
    feed: []
  }

  async componentDidMount() {
    this.registerToSocket()
    const response = await api.get('posts')
    console.log(response.data)
    this.setState({ feed: response.data })
  }

  registerToSocket = () => {
    const socket = io('http://localhost:5000')

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] })
    })

    socket.on('like', likedPost => {
      const newBagulhos = this.state.feed.map(post => 
        likedPost._id === post._id ? likedPost : post
      )

      this.setState({ feed: newBagulhos })
    })
  }

  handleLike = postId => {
    api.post(`posts/${postId}/like`)
  }

  renderPosts() {
    return (
      <section id="post-list">
        { this.state.feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={more} alt="Mais"></img>
            </header>

            <img src={`http://localhost:5000/${post.image}`} alt="Xsde"></img>

            <footer>
              <div className="actions">
                <button onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="Like"></img>
                </button>                
                <img src={comment} alt="Comment"></img>
                <img src={send} alt="Direct"></img>
              </div>

              <strong>{post.likes} curtidas</strong>

              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        )) }
      </section>
    )
  }

  render() {
    return this.renderPosts()
  }
}

export default Feed