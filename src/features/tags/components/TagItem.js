import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTagById } from '../selectors';

class TagItem extends Component {
    render() {
        const { tag, key } = this.props;

        return (
                <li className='menu__list-item' name={tag.id} key={key}>
                    <NavLink exact to={`/tag/${tag.id}`} activeClassName='menu__link menu__link--active active' className='menu__link'>
                        #{tag.tag_name}
                        {tag.count > 1 && 
                            <span>{tag.count}</span>
                        }
                    </NavLink>
                </li>
            
        )
    }
    
}

function mapStateToProps(state, ownProps) {
    return {
        tag: getTagById(state, ownProps.id)
    }
}

export default connect(mapStateToProps)(TagItem);