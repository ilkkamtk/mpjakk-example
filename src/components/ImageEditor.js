import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {Slider} from '@material-ui/lab';
import {StateContext} from '../contexts/StateContext';

class ImageEditor extends Component {

  rangeReducer = (rawValue, props) => {
    console.log(rawValue);
    const {name} = props;
    const value = Math.round(rawValue);
    this.context.reduceFilters(name, value);
  };

  render() {
    console.log('imageEditor', this.context.file)
    let imageData = '';
    if (this.context.file.imageData === undefined || this.context.file.imageData === null) {
      console.log('if', this.context.file.imageData);
      imageData = this.context.uploadsUrl + this.context.file.filename;
    } else {
      console.log('else');
      imageData = this.context.file.imageData;
    }

    return (
        <StateContext.Consumer>
          {context => (
              <React.Fragment>
                <img src={imageData} alt="preview"
                     className={'image'}
                     style={{filter: `brightness(${context.filters.brightness}%) contrast(${context.filters.contrast}%) sepia(${context.filters.warmth}%) saturate(${context.filters.saturation}%)`}}/>
                <div>
                  <Typography
                      id="brightness-label">Brightness: {context.filters.brightness}%</Typography>
                  <Slider name="brightness"
                          value={context.filters.brightness}
                          valueReducer={this.rangeReducer}
                          min={0}
                          max={200}
                          step={1}
                          aria-labelledby="brightness-label"/>
                </div>
                <div>
                  <Typography
                      id="contrast-label">Contrast: {context.filters.contrast}%</Typography>
                  <Slider name="contrast" value={context.filters.contrast}
                          valueReducer={this.rangeReducer}
                          min={0}
                          max={200}
                          step={1}
                          aria-labelledby="contrast-label"/>
                </div>
                <div>
                  <Typography
                      id="saturation-label">Saturation: {context.filters.saturation}%</Typography>
                  <Slider name="saturation"
                          value={context.filters.saturation}
                          valueReducer={this.rangeReducer}
                          min={0}
                          max={200}
                          step={1}
                          aria-labelledby="saturation-label"/>
                </div>
                <div>
                  <Typography
                      id="warmth-label">Warmth: {context.filters.warmth}%</Typography>
                  <Slider name="warmth" value={context.filters.warmth}
                          valueReducer={this.rangeReducer}
                          min={0}
                          max={100}
                          step={1}
                          aria-labelledby="warmth-label"/>
                </div>
              </React.Fragment>
          )}
        </StateContext.Consumer>
    );
  }
}

ImageEditor.contextType = StateContext;

export default ImageEditor;