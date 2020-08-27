import React from 'react';
import ListItem from './ListItem';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';

const VirtualizedList = props => {
    const { readings, list, outdated } = props;

    // NEED TO DECOUPLE FROM STATE SHAPE - removing this from virtualized list, remember to fix rowrenderer
    let r = {};
    if (readings && readings.length > 0) r = readings;

    const cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 225,
        defaultHeight: 225,
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
                    list={list}
                    outdated={outdated}
                    style={style}
                />
            </CellMeasurer>
        );
    };
    
    return (
        <div className='col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0'>
            {readings && readings.length > 0 && 
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
            }
            {/* Modal placed here for visibility. It doesn't display properly when placed inside Listitem */}
            <div className='modal fade' id='exampleModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>Modal title</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                        ...
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            <button type='button' className='btn btn-primary'>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VirtualizedList;