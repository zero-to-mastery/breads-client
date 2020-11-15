import React from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller, ListRowRenderer } from 'react-virtualized';
import ListItem from './ListItem';
import Modal from '../../modals/Modal';

type VirtualizedListProps = {
    readings: any
    list: any
    outdated: any
}

const VirtualizedList: React.FunctionComponent<VirtualizedListProps> = ({ readings, list, outdated }) => {
    // NEED TO DECOUPLE FROM STATE SHAPE - removing this from virtualized list, remember to fix rowrenderer
    let r: {[k: string]: any} = {};
    if (readings && readings.length > 0) r = readings;

    const cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 225,
        defaultHeight: 225,
    });

    const renderRow: ListRowRenderer = ({ index, key, parent, style }) => {
        return (
            <CellMeasurer
                rowIndex={index}
                columnIndex={0}
                key={key}
                cache={cache}
                parent={parent}
                enableMargins
            >
                {({ measure }) => (
                    <ListItem 
                        key={key}
                        id={r[index].id}
                        list={list}
                        outdated={outdated}
                        style={style}
                        measure={measure}
                    />
                )}
            </CellMeasurer>
        );
    };
    
    return (
        <div className='col col--6-lg col--4-md'>
            {readings && readings.length > 0 && 
                <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        // <div className='list-group' id='list_data'>
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
                        // </div>
                    )}
                </WindowScroller>
            }
            {/* Modal placed here for visibility. It doesn't display properly when placed inside Listitem */}
            {/* need modal container and presentational modal */}
            <Modal title='Update tags'/>
        </div>
    )
}

export default VirtualizedList;