import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class Plaintext extends Component {
  constructor(props){
    super(props);
    this.MAX_SHIFT_SIZE = 100;
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if(this.props.updatePlainText) {
      this.props.updatePlainText(e);
    }
  }

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
            onChange={this.onChange}
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
