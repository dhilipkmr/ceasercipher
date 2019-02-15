import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class Plaintext extends Component {
  render() {
    const { updatePlainText = () => null, plainText=''} = this.props;
    return (
      <div className="left">
        <center>
          <h2>Plaintext</h2>
          <TextField
            multiline
            rowsMax="10"
            margin="normal"
            placeholder="Enter plaintext"
            onChange={updatePlainText}
            value={plainText}
          />
        </center>
      </div>
    );
  }
}

Plaintext.propTypes = {
  updatePlainText: PropTypes.func,
  plainText: PropTypes.string
};

export default Plaintext;
