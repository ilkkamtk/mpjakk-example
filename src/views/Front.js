import React from 'react';
import Table from '../components/Table';
import PropTypes from 'prop-types';

const Front = (props) => {
  const {picArray} = props;
  return (
      <div className="container">
        <Table picArray={picArray}/>
      </div>
  );
};

Front.propTypes = {
  picArray: PropTypes.array,
};

export default Front;