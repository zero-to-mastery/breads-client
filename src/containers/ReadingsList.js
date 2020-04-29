import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadings } from '../store/actions/readings';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import { fetchUsers } from '../store/actions/users';
import { postNewSubscription } from '../store/actions/subscriptions';
// import List from '../components/List';
import ListItem from '../components/ListItem';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';

class ReadingsList extends Component {
    componentDidMount() {
        this.props.fetchReadings();
    }

    render() {
        const { readings, summary, fetchSummary, removeSummary, postNewSubscription } = this.props;
        // let readingsList;
        // if (readings[0]) console.log(readings[0])
        // if (readings[0]) {
        //     readingsList = readings[0].data.map(r => (  
        //         <ListItem
        //             key={r.id}
        //             id={r.id}
        //             title={r.title}
        //             domain={r.domain}
        //             url={r.url}
        //             word_count={r.word_count}
        //             user_id={r.user_id}
        //             username={r.username}
        //             image={r.image}
        //             summary={summary.summary}
        //             viewSummary={fetchSummary.bind(this, r.id, r.article_url)}
        //             removeSummary={removeSummary}
        //             newSubscription={postNewSubscription.bind(this, r.user_id)}
        //         />              
        //     ));
        // }
        
        const cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 187
        });

        let x = [];
        if (readings[0]) x = readings[0].data;
        
        const renderRow = ({ index, key, parent, style }) => {
            console.log(x.length);
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
                        summary={summary.summary}
                        viewSummary={fetchSummary.bind(this, x[index].id, x[index].article_url)}
                        removeSummary={removeSummary}
                        newSubscription={postNewSubscription.bind(this, x[index].user_id)}
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
            // <List list_data={readingsList} display='list-group' />
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.readings,
        summary: state.summary
    }
}

export default connect(mapStateToProps, { fetchReadings, fetchSummary, removeSummary, fetchUsers, postNewSubscription })(ReadingsList);