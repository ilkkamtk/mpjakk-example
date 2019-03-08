import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
        <div className="container">
          <table>
            <tbody>
            <tr>
              <td><img src="http://placekitten.com/130/130" alt="cat"/></td>
              <td>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  ac tellus volutpat, tempus felis a, efficitur dolor. Cras
                  tempor pulvinar augue, ac aliquam urna tincidunt et.
                  Vestibulum id tempus augue. Cras iaculis eget dolor in
                  maximus. Nulla quis iaculis justo, id porta nulla. Sed mi mi,
                  eleifend ut tempor non, varius non lacus.
                </p>
              </td>
              <td><a href="#">View</a></td>
            </tr>
            <tr>
              <td><img src="http://placekitten.com/131/130" alt="cat"/></td>
              <td>
                <h3>Title</h3>
                <p>
                  Pellentesque aliquam, quam in scelerisque vehicula, diam felis
                  congue leo, sed pulvinar leo dui ut dui. Donec convallis dui
                  non urna scelerisque, a condimentum massa imperdiet. Integer
                  sollicitudin lacus magna, commodo tempor massa efficitur sed.
                  Aliquam erat volutpat.
                </p>
              </td>
              <td><a href="#">View</a></td>
            </tr>
            <tr>
              <td><img src="http://placekitten.com/130/132" alt="cat"/></td>
              <td>
                <h3>Title</h3>
                <p>
                  Vivamus id cursus lectus. Fusce dignissim aliquet justo sit
                  amet semper. In eu nulla id risus sodales dignissim sit amet
                  eget odio. Maecenas vulputate leo at tortor commodo interdum.
                  Mauris scelerisque felis eu leo bibendum, ut lacinia enim
                  feugiat. Nullam quis lorem non erat interdum tincidunt a in
                  nisi.
                </p>
              </td>
              <td><a href="#">View</a></td>
            </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

export default App;
