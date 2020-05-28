import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUserReading } from '../store/actions/userReadings';
import { fetchFavoriteReadings, markFavorite, unfavorite } from '../store/actions/favoriteReadings';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import ListItem from '../components/ListItem';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';

class FavoriteReadingsList extends Component {
    componentDidMount() {
        this.props.fetchFavoriteReadings(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchFavoriteReadings(this.props.match.params.id);
        }
    }

    render() {
        const { readings, removeUserReading, summary, fetchSummary, removeSummary, currentUser, markFavorite, unfavorite, loading } = this.props;

        const cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 187
        });

        let x = [];
        if (readings) x = readings;
        
        const renderRow = ({ index, key, parent, style }) => {
            return (
                <CellMeasurer
                    rowIndex={index}
                    columnIndex={0}
                    key={key}
                    cache={cache}
                    parent={parent}
                    enableMargins
                >
                    <ListItem 
                        key={key}
                        id={x[index].id}
                        title={x[index].title}
                        domain={x[index].domain}
                        url={x[index].url}
                        word_count={x[index].word_count}
                        user_id={x[index].user_id}
                        date={x[index].created_at}
                        username={x[index].username}
                        image={x[index].image}
                        summary={summary.summary}
                        viewSummary={fetchSummary.bind(this, x[index].id, x[index].article_url)}
                        removeSummary={removeSummary}
                        removeReading={removeUserReading.bind(this, x[index].user_id, x[index].id)}
                        favorite={x[index].favorite === currentUser}
                        markFavorite={markFavorite.bind(this, x[index].id)}
                        unfavorite={unfavorite.bind(this, x[index].id)}
                        isCorrectUser={currentUser === x[index].user_id}
                        loading={loading}
                        style={style}
                    />
                </CellMeasurer>
            );
        };
        return (
            <div className='col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0'>
                <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <div className='list-group' id='list_data'>
                            <AutoSizer disableHeight>
                                {({ width }) => (
                                    <List 
                                        width={width}
                                        height={height}
                                        deferredMeasurementCache={cache}
                                        rowHeight={cache.rowHeight}
                                        rowRenderer={renderRow}
                                        rowCount={x.length}
                                        autoHeight
                                        scrollTop={scrollTop}
                                        isScrolling={isScrolling}
                                        onChildScroll={onChildScroll}
                                        style={{ outline: 'none' }}
                                    />
                                )}
                            </AutoSizer> 
                        </div>
                    )}
                </WindowScroller>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.favoriteReadings,
        summary: state.summary,
        currentUser: state.currentUser.user.id,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { 
    fetchFavoriteReadings,
    fetchSummary,
    removeUserReading,
    removeSummary,
    markFavorite,
    unfavorite
})(FavoriteReadingsList);