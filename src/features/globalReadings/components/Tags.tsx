import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import modals from '../../modals';
import { RootState } from '../../rootReducer';

type TagsProps = PropsFromRedux & {
    reading: any
    tags: any
    list: any
}

class Tags extends Component<TagsProps> {
    
    handleClick = () => {
        let tag_names = this.props.reading.tags
                        ? this.props.reading.tags.map((tag_id: number): string => `#${this.props.tags[tag_id].tag_name}`)
                        : []
        this.props.addModal('form', {'reading': this.props.reading, 'tag_names': tag_names})
    }

    render() {
        const { currentUser, reading, tags, list } = this.props;

        let tag_links;
        if (reading.tags && tags) {
            tag_links = reading.tags.map((tag_id: number): React.ReactNode | string => {
                if (tags[tag_id]) {
                    return <Link to={`/tag/${tags[tag_id].id}`} key={tag_id}>
                            {`#${tags[tag_id].tag_name} `}
                        </Link>
                } else {
                    return '';
                }
            });
        }

        return (
            <>
                <p className='btn text-primary mt-2 ml-3 pr-0 text-nowrap overflow-auto-horizontal'>
                    {currentUser?.id === reading.reader && (list !== 'global' && list !== 'subscriptions')&& 
                        <FontAwesomeIcon onClick={this.handleClick} icon='plus' size='sm' data-toggle='modal' data-target='#exampleModal'/>
                    }  
                    <small> {tag_links}</small>
                </p>
            </>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser.user
    }
}

const connector = connect(mapStateToProps, { ...modals.actions });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Tags);