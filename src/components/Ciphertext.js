import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';


class Ciphertext extends Component {
  constructor(props){
    super(props);
    this.MAX_SHIFT_SIZE = 100;
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if(this.props.updateCipherText) {
      this.props.updateCipherText(e);
    }
  }

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
            onChange={this.onChange}
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
