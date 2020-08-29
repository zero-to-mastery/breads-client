import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTagById } from '../selectors';

class TagItem extends Component {
    // handleClick = e => {
    //     // property 'name' is not valid for li element, so I must use getAttribute()
    //     console.log(e.target.getAttribute('name'));
    // }

    render() {
        const { tag, key } = this.props;

        return (
            <NavLink exact to={`/tag/${tag.id}`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm'>
                <li className='list-group-item d-flex justify-content-between align-items-center' name={tag.id} key={key}>
                    #{tag.tag_name}
                    {tag.count > 1 && 
                        <span className='badge badge-primary badge-pill'>{tag.count}</span>
                    }
                </li>
            </NavLink>
            
        )
    }
    
}

function mapStateToProps(state, ownProps) {
    return {
        tag: getTagById(state, ownProps.id)
    }
}

export default connect(mapStateToProps)(TagItem);