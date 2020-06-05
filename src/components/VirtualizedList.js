import React from 'react';
import ListItem from './ListItem';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';

const VirtualizedList = props => {
    const {
        readings,
        summary,
        fetchSummary,
        removeSummary,
        postNewSubscription,
        loading,
        removeUserReading,
        currentUser,
        markFavorite,
        unfavorite
    } = props;

    let r;
    if (readings.data) r = readings.data;
    else r = readings;

    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 187
    });

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
                    id={r[index].id}
                    title={r[index].title}
                    domain={r[index].domain}
                    url={r[index].url}
                    word_count={r[index].word_count}
                    user_id={r[index].user_id}
                    date={r[index].created_at}
                    username={r[index].username}
                    image={r[index].image}
                    summary={summary.summary}
                    viewSummary={fetchSummary.bind(this, r[index].id, r[index].article_url)}
                    removeSummary={removeSummary}
                    loading={loading}
                    style={style}
                    favorite={r[index].favorite === currentUser}
                    newSubscription={postNewSubscription ? postNewSubscription.bind(this, r[index].user_id) : undefined}
                    removeReading={removeUserReading ? removeUserReading.bind(this, r[index].user_id, r[index].id) : undefined}
                    markFavorite={markFavorite ? markFavorite.bind(this, r[index].id) : undefined}
                    unfavorite={unfavorite ? unfavorite.bind(this, r[index].id) : undefined}
                    isCorrectUser={currentUser ? currentUser.user.id === r[index].user_id : false}
                    isAuthenticated={currentUser.isAuthenticated}
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
                                    rowCount={r.length}
                                    autoHeight
                                    scrollTop={scrollTop}
                                    isScrolling={isScrolling}
                                    onScroll={onChildScroll}
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

export default VirtualizedList;