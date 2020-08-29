import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import modals from '../../modals';

class Tags extends Component {
    
    handleClick = () => {
        let tag_names = this.props.reading.tags
                        ? this.props.reading.tags.map(tag_id => `#${this.props.tags[tag_id].tag_name}`)
                        : []
        this.props.addModal('form', {'reading': this.props.reading, 'tag_names': tag_names})
    }

    render() {
        const { currentUser, reading, tags, list } = this.props;

        let tag_links;
        if (reading.tags && tags) {
            tag_links = reading.tags.map(tag_id => {
                if (tags[tag_id]) {
                    return <Link to={`/tag/${tags[tag_id].id}`} key={tag_id}>
                            {`#${tags[tag_id].tag_name} `}
                        </Link>
                }
            });
        }

        return (
            <>
                <p className='btn text-primary m-2 text-nowrap overflow-auto-horizontal'>
                    {currentUser.id === reading.reader && (list !== 'global' && list !== 'subscriptions')&& 
                        <FontAwesomeIcon onClick={this.handleClick} icon='plus' size='sm' data-toggle='modal' data-target='#exampleModal'/>
                    }  
                    <small> {tag_links}</small>
                </p>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { ...modals.actions })(Tags);