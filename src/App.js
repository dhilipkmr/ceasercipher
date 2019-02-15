import React, {Component} from 'react';
import Plaintext from './components/Plaintext';
import Ciphertext from './components/Ciphertext';
import Shift from './components/Shift';
import Paper from '@material-ui/core/Paper';

class Main extends Component {
  constructor(props) {
    super(props);
    this.updateShiftValue = this.updateShiftValue.bind(this);
    this.alphabets = 'abcdefghijklmnopqrstuvwxyz';
    this.state = {
      shift: -1,
      plainText: '',
      cipherText: ''
    }
  }

  updateShiftValue(e) {
    const val = parseInt(e.target.value, 10);
    if (val && typeof(val) === 'number') {
      this.setState({ shift: val, plainText: '', cipherText: '' });
    }
  }

  composeCipherAndPlainText = (textType, val) => {
    let { plainText, cipherText, shift } = this.state;
    const isPlainText = textType === 'plainText';
    const isCipherText = textType === 'cipherText';
    /* Condition to check if the current change is making the field empty */
    if (val === '') {
      this.setState({ plainText: '', cipherText: '' });
      return;
    }
    let result = '', newVal = '';
    for(let i = 0; i < val.length; i++) {
      const keyIndex = this.alphabets.indexOf(val[i]);
      const caseKeyIndex = this.alphabets.indexOf(val[i].toLowerCase());
      if (val[i] === ' ' || keyIndex !== -1 || caseKeyIndex !== -1) {
        let newIndex = isPlainText ? (caseKeyIndex + shift) % 26 : (caseKeyIndex - shift) % 26;
        if (newIndex < 0) {
          newIndex = 26 - (Math.abs(newIndex));
        }
        const modifiedIndex = newIndex;
        if (keyIndex === -1 && caseKeyIndex !== -1) {
          newVal = this.alphabets[modifiedIndex].toUpperCase();
        } else {
          newVal = (val[i] === ' ' ? ' ' : this.alphabets[modifiedIndex]);
        }
        result = result + newVal;
      }
    }
    if (isPlainText) {                                                // Updating Plain text
      this.setState({ plainText: val, cipherText: result });
    } else {
      this.setState({ plainText: result, cipherText: val });
    }
    return;
  }

  updatePlainText = (e) => {
    this.composeCipherAndPlainText('plainText', e.target.value);
  }

  updateCipherText = (e) => {
    this.composeCipherAndPlainText('cipherText', e.target.value);
  }

  render() {
    const { shift, cipherText, plainText } = this.state;
    return (
      <div className="container">
        <center><h1>Caesar's Cipher</h1></center>
        <Shift updateShiftValue={this.updateShiftValue} shift={shift}></Shift>
        <Paper elevation={10} className="child-container">
          <Plaintext shift={shift} plainText={plainText} updatePlainText={this.updatePlainText}></Plaintext>
          <Ciphertext shift={shift} cipherText={cipherText} updateCipherText={this.updateCipherText}></Ciphertext>
        </Paper>
    </div>);
  }
}

export default Main;