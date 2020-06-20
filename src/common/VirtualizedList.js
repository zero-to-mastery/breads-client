import React from 'react';
import ListItem from './ListItem';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';

const VirtualizedList = props => {
    const {
        readings,
        summary,
        fetchSummary,
        removeSummary,
        loading,
        removeUserReading,
        currentUser,
        markFavorite,
        unfavorite,
        isAuthenticated
    } = props;

    // NEED TO DECOUPLE FROM STATE SHAPE
    let r = {};
    if (readings && readings.length > 0) r = readings;
    // r = readings.data;
    // else 

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
                    word_count={r[index].word_count}
                    url={r[index].url}
                    date={r[index].created_at}
                    favorite={currentUser ? r[index].favorite === currentUser.user.id : false}
                    reader={r[index].reader}
                    // user_id={r[index].reader.id}
                    // username={r[index].reader.username}
                    // image={r[index].reader.image}
                    summary={summary.summary}
                    viewSummary={fetchSummary.bind(this, r[index].id, r[index].article_url)}
                    removeSummary={removeSummary}
                    loading={loading}
                    style={style}
                    removeReading={removeUserReading ? removeUserReading.bind(this, r[index].reader, r[index].id) : undefined}
                    markFavorite={markFavorite ? markFavorite.bind(this, r[index].id) : undefined}
                    unfavorite={unfavorite ? unfavorite.bind(this, r[index].id) : undefined}
                    isCorrectUser={currentUser ? currentUser.user.id === r[index].reader : false}
                    isAuthenticated={isAuthenticated}
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
                                    rowCount={Object.keys(r).length}
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