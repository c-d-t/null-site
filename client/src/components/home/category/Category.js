import React from 'react'
import { Link } from 'react-router-dom'

import './Category.css'

class Category extends React.Component {


    render() {
        let { name, description, icon, url, disabled } = this.props

        return (
            <Link to={url} className={`category ${disabled ? 'category-disabled' : ''}`}>
                {icon}
                <h2 className="category-name">{name}</h2>
                <p className="category-desc">{description}</p>
            </Link>
        )
    }
}

export default Category