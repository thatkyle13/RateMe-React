import React from 'react'
import Card from '../component/shared/Card'
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this proj</h1>
            <p>react app to leave a rating</p>
        </div>
        <Link to='/'> go back</Link>
    </Card>
  )
}

export default AboutPage