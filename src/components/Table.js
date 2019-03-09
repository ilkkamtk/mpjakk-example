import React from 'react';
import Tbody from './Tbody';
import PropTypes from 'prop-types';

const Table = (props) => {
  return (
      <table>
        <Tbody picArray={props.picArray}/>
      </table>
  );
};

Table.propTypes = {
  picArray: PropTypes.array,
};

export default Table;