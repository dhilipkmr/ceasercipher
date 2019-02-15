import React, {Component} from 'react';
import Plaintext from './components/Plaintext';
import Ciphertext from './components/Ciphertext';
import Shift from './components/Shift';
import Paper from '@material-ui/core/Paper';

class Main extends Component {
  constructor(props) {
    super(props);
    this.alphabets = 'abcdefghijklmnopqrstuvwxyz';
    this.state = {
      shift: -1,
      plainText: '',
      cipherText: ''
    }
  }

  updateShiftValue = (e) => {
    if (e.target.value) {
      this.setState({ shift: e.target.value, plainText: '', cipherText: '' });
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
    /*If the value is deleted */
    if (val && val.length < this.state[textType].length) {
      let newPlain = val, newCipher = val;
      if (isPlainText) {                                                // Updating Plain text
        newCipher = cipherText.substring(0, cipherText.length - 1);
      } else if (isCipherText) {                                        // Updating Cipher text
        newPlain = plainText.substring(0, plainText.length - 1);
      }
      this.setState({ plainText: newPlain, cipherText: newCipher });
      return;
    }
  
    /* Condition to check if the current change is a new character */
    if (val && val.length > this.state[textType].length) {
      let newPlain = val, newCipher = val;
      if (isPlainText) {                                                // Updating Plain text
        const prevCipherText = cipherText;
        const newTextKey = val.length === 1 ? val : val.substring(val.length - 1);
        const keyIndex = this.alphabets.indexOf(newTextKey);
        const caseKeyIndex = this.alphabets.indexOf(newTextKey.toLowerCase());
        if (newTextKey === ' ' || keyIndex !== -1 || caseKeyIndex !== -1) {
          const cipheredIndex = (caseKeyIndex + shift) % 26;
          if (keyIndex === -1 && caseKeyIndex !== -1) {
            newCipher = prevCipherText + this.alphabets[cipheredIndex].toUpperCase();
          } else {
            newCipher = prevCipherText + (newTextKey === ' ' ? ' ' : this.alphabets[cipheredIndex]);
          }
          this.setState({ plainText: newPlain, cipherText: newCipher });
        }
      } else if (isCipherText) {                                        // Updating Cipher text
        const prevPlainText = plainText;
        const newCipherKey = val.length === 1 ? val : val.substring(val.length - 1);
        const keyIndex = this.alphabets.indexOf(newCipherKey);
        const caseKeyIndex = this.alphabets.indexOf(newCipherKey.toLowerCase());
        if (newCipherKey === ' ' || keyIndex !== -1 || caseKeyIndex !== -1) {      
          const newIndex = (caseKeyIndex - shift);
          const plainIndex = (newIndex < 0 ? 26 - Math.abs(newIndex) :  newIndex % 26);
          if (keyIndex === -1 && caseKeyIndex !== -1) {
            newPlain = prevPlainText + this.alphabets[plainIndex].toUpperCase();
          } else {
            newPlain = prevPlainText + (newCipherKey === ' ' ? ' ' : this.alphabets[plainIndex]);
          }
          this.setState({ plainText: newPlain, cipherText: newCipher });
        }
      }
      return;
    }
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