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
import {
  OpenWith,
  Create,
  Clear,
  Photo,
  VideoLabel,
  Audiotrack,
} from '@material-ui/icons';
import {getFilters} from '../util/MediaAPI';
import {StateContext} from '../contexts/StateContext';

const getFiltersToGrid = (tile, standardFilters) => {
  const {brightness, contrast, saturation, warmth} = getFilters(
      tile.description, standardFilters);
  const f = {filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${warmth}%) saturate(${saturation}%)`};
  return f;
};

const ImageGrid = (props) => {
  return (
      <StateContext.Consumer>
        {context => (
            <GridList>
              <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                <ListSubheader component="div">Files</ListSubheader>
              </GridListTile>
              {context.picArray.map(tile => (
                  <GridListTile key={tile.file_id}>
                    {tile.media_type === 'image' &&
                    <img src={context.uploadsUrl + tile.thumbnails.w160}
                         alt={tile.title}
                         style={getFiltersToGrid(tile, context.standardFilters)}/>
                    }
                    {tile.media_type === 'video' &&
                    <img src={context.uploadsUrl + tile.screenshot}
                         alt={tile.title}/>
                    }
                    {tile.media_type === 'audio' &&
                    <img src="http://placekitten.com/400/400" alt={tile.title}/>
                    }
                    <GridListTileBar
                        title={tile.title}
                        actionIcon={
                          <React.Fragment>
                            <IconButton>
                              {tile.media_type === 'image' &&
                              <Photo color="secondary"/>
                              }
                              {tile.media_type === 'video' &&
                              <VideoLabel color="secondary"/>
                              }
                              {tile.media_type === 'audio' &&
                              <Audiotrack color="secondary"/>
                              }
                            </IconButton>
                            <IconButton component={Link}
                                        to={'single/' + tile.file_id}>
                              <OpenWith color="secondary"/>
                            </IconButton>
                            {props.edit &&
                            <React.Fragment>
                              <IconButton component={Link}
                                          to={'modify/' + tile.file_id} onClick={() => {
                                context.resetFile();
                              }}>
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
        )}
      </StateContext.Consumer>
  );
};

ImageGrid.propTypes = {
  edit: PropTypes.bool,
  deleteFile: PropTypes.func,
};

export default ImageGrid;