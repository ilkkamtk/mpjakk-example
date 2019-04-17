import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
} from '@material-ui/core';
import {OpenWith, Create, Clear} from '@material-ui/icons';
import {getFilters} from '../util/MediaAPI';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const getFiltersToGrid = (tile) => {
  const filters = {
    brightness: 100,
    contrast: 100,
    warmth: 0,
    saturation: 100,
  };
  const {brightness, contrast, saturation, warmth} = getFilters(
      tile.description, filters);
  const f = {filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${warmth}%) saturate(${saturation}%)`};
  return f;
};

const ImageGrid = (props) => {
  return (
      <GridList>
        <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
          <ListSubheader component="div">Files</ListSubheader>
        </GridListTile>
        {props.picArray.map(tile => (
            <GridListTile key={tile.file_id}>
              {tile.thumbnails !== undefined &&
              (<img src={mediaUrl + tile.thumbnails.w160} alt={tile.title}
                    style={getFiltersToGrid(tile)}/>
                  ||
                  <img src="http://placekitten.com/400/400" alt={tile.title}/>)}
              <GridListTileBar
                  title={tile.title}
                  actionIcon={
                    <React.Fragment>
                      <IconButton component={Link}
                                  to={'single/' + tile.file_id}>
                        <OpenWith color="secondary"/>
                      </IconButton>
                      {props.edit &&
                      <React.Fragment>
                        <IconButton component={Link}
                                    to={'modify/' + tile.file_id}>
                          <Create color="secondary"/>
                        </IconButton>
                        <IconButton onClick={() => {
                          props.deleteFile(tile.file_id);
                        }}>
                          <Clear color="secondary"/>
                        </IconButton>
                      </React.Fragment>}
                    </React.Fragment>
                  }
              />
            </GridListTile>
        ))}
      </GridList>
  );
};

ImageGrid.propTypes = {
  picArray: PropTypes.array,
  edit: PropTypes.bool,
  deleteFile: PropTypes.func,
};

export default ImageGrid;