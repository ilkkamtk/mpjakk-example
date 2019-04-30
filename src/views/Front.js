import React from 'react';
// import Table from '../components/Table';
import ImageGrid from '../components/ImageGrid';

const Front = () => {
  return (
      <React.Fragment>
        {/* <Table picArray={picArray}/> */}
        <ImageGrid edit={false}/>
      </React.Fragment>
  );
};

export default Front;