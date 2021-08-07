import React from "react";

interface ListProps {
  list_data: any;
  display: any;
}

const List: React.FunctionComponent<ListProps> = ({ list_data, display }) => {
  return (
    <div className="col col--6-lg col--4-md">
      {list_data ? ( //.length
        <div className={display} id="list_data">
          {list_data}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
