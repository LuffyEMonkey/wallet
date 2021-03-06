import React from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import icEye from '../../resources/images/eye.png';
import icEyeOff from '../../resources/images/eye_off.png';
import { colors } from '../../resources';

const NotiType = {
  ERROR: 'noti/error',
  NORMAL: 'noti/normal',
};

class InputPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isSecure: true,
      isIconVisible: false,
    };

    this.setIconVisible = this.setIconVisible.bind(this);
    this.drawIcon = this.drawIcon.bind(this);
    this.getText = this.getText.bind(this);
  }

  setIconVisible(value) {
    this.setState({
      isIconVisible: value,
    });
  }

  getText() {
    const { text } = this.state;
    return text;
  }

  drawIcon() {
    const { isSecure, isIconVisible } = this.state;

    if (isIconVisible) {
      return (
        <TouchableOpacity
          style={[
            styles.inputSupport,
          ]}
          onPressIn={() => {
            this.setState({
              isSecure: false,
            });
          }}
          onPressOut={() => {
            this.setState({
              isSecure: true,
            });
          }}
        >
          <Image style={styles.eyeButton} source={isSecure ? icEye : icEyeOff} />
        </TouchableOpacity>
      );
    }

    return null;
  }


  render() {
    const {
      label,
      onChangeText,
    } = this.props;
    const { isSecure } = this.state;
    return (
      <View style={styles.input}>
        <View style={styles.inputHead}>
          <Text style={styles.inputTitle}>{label}</Text>
        </View>
        <View style={styles.inputArea}>
          <TextInput
            {...this.props}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor={colors.inputPlaceholderGray}
            secureTextEntry={isSecure}
            keyboardType={isSecure ? 'default' : 'email-address'}
            editable={isSecure}
            style={styles.inputText}
            onChangeText={(text) => {
              this.setState({ text });
              this.setIconVisible(text.length > 0);
              if (onChangeText) onChangeText(text);
            }}
          />
          {this.drawIcon()}
        </View>
      </View>
    );
  }
}

InputPassword.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onEndEditing: PropTypes.func,
};

InputPassword.defaultProps = {
  label: null,
  placeholder: null,
  onChangeText: null,
  onFocus: null,
  onEndEditing: null,
};

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(null, mapDispatchToProps, null, { withRef: true })(InputPassword);
