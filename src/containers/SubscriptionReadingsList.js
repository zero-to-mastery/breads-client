import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionReadings } from '../store/actions/subscriptions';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import ListItem from '../components/ListItem';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';


class SubscriptionsList extends Component {
    componentDidMount() {
        this.props.fetchSubscriptionReadings();
    }
    render() {
        const { subscriptions, summary, fetchSummary, removeSummary } = this.props;
        const cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 187
        });

        let x = [];
        if (subscriptions) x = subscriptions;
        
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
                        summary={summary.summary}
                        viewSummary={fetchSummary.bind(this, x[index].id, x[index].article_url)}
                        removeSummary={removeSummary}
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
        )
    }
}

function mapStateToProps(state) {
    return {
        subscriptions: state.subscriptions,
        summary: state.summary
    }
}

export default connect(mapStateToProps, {
    fetchSubscriptionReadings,
    fetchSummary,
    removeSummary
})(SubscriptionsList);