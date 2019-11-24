import React, { Component } from 'react'

import './Feed.css'
import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'
import api from '../services/api'

class Feed extends Component {
  state = {
    feed: []
  }

  async componentDidMount() {
    const response = await api.get('posts')
    console.log(response.data)
    this.setState({ feed: response.data })
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
                <img src={like} alt="Like"></img>
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