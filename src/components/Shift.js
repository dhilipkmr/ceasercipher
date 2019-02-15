import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Shift extends Component {
  constructor(props){
    super(props);
    this.MAX_SHIFT_SIZE = 100;
  }
  generateShiftValues = () => {
    const options = [];
    for(let i = 1; i <= this.MAX_SHIFT_SIZE; i++) {
      options.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return options;
  }

  render() {
    const {updateShiftValue, shift} = this.props;
    return (
      <div className="shift">
        <center>
          <Select
            autoWidth={true}
            displayEmpty onClick={updateShiftValue} value={shift}>
            <MenuItem value="">Enter shift amount</MenuItem>
            {this.generateShiftValues()}
          </Select>
        </center>
      </div>
    );
  }
  
};

Shift.propTypes = {
  updateShiftValue: PropTypes.func.isRequired,
  shift: PropTypes.number
};

export default Shift;
