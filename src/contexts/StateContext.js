import React from 'react';
import {getAllMedia, getFilesByTag, getFilters} from '../util/MediaAPI';

export const StateContext = React.createContext();

export class StateProvider extends React.Component {
  state = {
    picArray: [],
    login: {
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
      full_name: '',
    },
    user: {},
    mediaUrl: 'http://media.mw.metropolia.fi/wbma/',
    uploadsUrl: 'http://media.mw.metropolia.fi/wbma/uploads/',
    message: '',
    formToggler: true,
    validUser: true,
    file: {},
    standardFile: {
      title: '',
      description: '',
      imageData: null,
      filename: null,
      file_id: 0,
      media_type: '',
    },
    loading: false,
    filters: {},
    standardFilters: {
      brightness: 100,
      contrast: 100,
      warmth: 0,
      saturation: 100,
    },
    type: '',
  };

  addProfilePic = (profilePic) => {
    this.setState((prevState) => {
      return {
        user: {
          ...prevState.user,
          profilePic: profilePic,
        },
      };
    });
  };

  checkLogin = () => {
    return this.state.user.user_id !== undefined;
  };

  setPicArray = (pics) => {
    this.setState({picArray: pics});
  };

  setMessage = (message) => {
    this.setState({message: message});
  };

  userFromInput = (name, value) => {
    this.setState((prevState) => ({
      login: {
        ...prevState.login,
        [name]: value,

      },
    }));
  };

  setValidUser = (available) => {
    this.setState({validUser: available});
  };

  toggleForm = () => {
    this.setState({formToggler: !this.state.formToggler});
  };

  setUser = (user) => {
    // hae profiilikuva ja liitä se user-objektiin
    if (user !== null) {
      getFilesByTag('profile').then((files) => {
        const profilePic = files.filter((file) => {
          let outputFile = null;
          if (file.user_id === this.state.user.user_id) {
            outputFile = file;
          }
          return outputFile;
        });
        this.addProfilePic(profilePic[0]);
      });
    }
    this.setState({user});
  };

  updateImages = () => {
    getAllMedia().then((pics) => {
      console.log(pics);
      this.setPicArray(pics);
    });
  };

  setFile = (pic) => {
    console.log('pic', pic);
    console.log('filters',
        getFilters(pic.description, this.state.standardFilters));
    this.setState({
      file: pic,
      'filters': getFilters(pic.description, this.state.standardFilters),
    }, () => {
      console.log('state', this.state);
    });
  };

  fileChange = (evt) => {
    this.setState((prevState) => ({
      ...prevState,
      type: evt.target.files[0].type,
      file: {
        ...prevState.file,
        filedata: evt.target.files[0],
      },
    }));
  };

  fileFromInput = (name, value) => {
    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        [name]: value,
      },
    }));
  };

  setLoading = (bool) => {
    this.setState({loading: bool});
  };

  updateFilters = (newFilters) => {
    this.setState((prevState) => ({
      filters: newFilters,
    }));
  };

  reduceFilters = (name, value) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }), () => {
      // this.updateFilters(this.state.filters);
    });
  };

  setFileData = (result) => {
    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        imageData: result,
      },
    }));
  };

  resetFile = () => {
    this.setState(
        {
          file: this.state.standardFile,
          filters: this.state.standardFilters,
        },
        () => {
          console.log('resetFile', this.state);
        });
  };

  componentDidMount() {
    this.resetFile();
    this.updateImages();
  }

  render() {
    return (
        <StateContext.Provider
            value={{
              ...this.state,
              addProfilePic: this.addProfilePic,
              setUser: this.setUser,
              checkLogin: this.checkLogin,
              setPicArray: this.setPicArray,
              setMessage: this.setMessage,
              userFromInput: this.userFromInput,
              setValidUser: this.setValidUser,
              toggleForm: this.toggleForm,
              updateImages: this.updateImages,
              setFile: this.setFile,
              fileChange: this.fileChange,
              fileFromInput: this.fileFromInput,
              setLoading: this.setLoading,
              updateFilters: this.updateFilters,
              reduceFilters: this.reduceFilters,
              setFileData: this.setFileData,
              resetFile: this.resetFile,
            }}>
          {this.props.children}
        </StateContext.Provider>
    );
  }
}