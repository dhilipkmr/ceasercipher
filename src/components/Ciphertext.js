import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';


class Ciphertext extends Component {
  render() {
    const { updateCipherText = () => null, cipherText=''} = this.props;
    return (
      <div className="right">
        <center>
          <h2>Ciphertext</h2>
          <TextField
            multiline
            rowsMax="10"
            margin="normal"
            placeholder="Enter ciphertext"
            onChange={updateCipherText}
            value={cipherText}
          />
        </center>
      </div>
    );
  }
}

Ciphertext.propTypes = {
  updateCipherText: PropTypes.func,
  cipherText: PropTypes.string
};

export default Ciphertext;
