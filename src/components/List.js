import React from 'react';
import ListItem from '../components/ListItem';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';


const List1 = (props) => {
    console.log(props);
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 187
    });

    let x = [];
    if (props.readings[0]) x = props.readings[0].data;

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
                    username={x[index].username}
                    image={x[index].image}
                    summary={props.summary.summary}
                    viewSummary={props.fetchSummary.bind(this, x[index].id, x[index].article_url)}
                    removeSummary={props.removeSummary}
                    newSubscription={props.postNewSubscription.bind(this, x[index].user_id)}
                    removeReading={props.removeReading.bind(this, x.user_id, x.id)}
                    isCorrectUser={props.currentUser === x.user_id}
                    style={style}
                />
            </CellMeasurer>
        );
    };

    return (
        <div className='col-lg-6 col-sm-10 offset-sm-1 offset-lg-0'>
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
                                />
                            )}
                        </AutoSizer> 
                    </div>
                )}
            </WindowScroller>
        </div>
        // <div className='col-lg-6 col-sm-10 offset-sm-1 offset-lg-0'>
        //     {props.list_data ? (//.length
        //         <div className={props.display} id='list_data'>
        //             {props.list_data}
        //         </div>
        //     ) : (
        //         <div className='d-flex justify-content-center'>
        //             <div className='spinner-grow text-primary' role='status'>
        //                 <span className='sr-only'>Loading...</span>
        //             </div>
        //         </div>
        //     )}
        // </div>
    )
}

export default List1;