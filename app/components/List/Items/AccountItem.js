import React from 'react';
import { connect } from 'react-redux';
import {
  Text, Image, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import styles from '../styles';
import { colors } from '../../../resources';
import { Navigation as NavAction } from '../../../actions';

import icVoting from '../../../resources/images/voting_orange.png';
import strings from '../../../resources/strings';

const createIcon = (icon) => {
  let result = null;

  switch (icon) {
    case 'voting':
      result = (
        <Image style={styles.accountIcon} source={icVoting} />
      );
      break;
    default:
      break;
  }

  return result;
};

const isFreezing = (freezing) => {
  let result = (
    <View style={{ marginTop: 15 }} />
  );
  if (freezing) {
    result = (
      <Text style={styles.accountFreezing}>
        Freezing
      </Text>
    );
  }

  return result;
};

const AccountItem = ({
  account,
  onPress,
  settings,
}) => {
  const Strings = strings[settings.language].ComponentText;

  return (
    <TouchableOpacity
      style={styles.accountItem}
      onPress={account ? () => {
        onPress(NavAction.pushScreen(NavAction.Screens.TRANSACTION_LIST, { account }));
      } : null}
    >
      <View style={styles.accoutnItemHead}>
        <Text style={styles.accountName}>
          {account.name}
        </Text>
      </View>
      <View style={styles.accountItemContent}>
        <Text style={styles.accountBalance}>{ !isNaN(account.balance) ? new BigNumber(account.balance).toFormat(7).replace(/[0]+$/, '').replace(/[.]+$/, '') : Strings.ON_DELAYING}</Text>
        <Text style={styles.accountUnit}>{ !isNaN(account.balance) ? 'BOS' : ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

AccountItem.propTypes = {
  onPress: PropTypes.func,
  action: PropTypes.shape({ type: {} }),
  textColor: PropTypes.string,
};

AccountItem.defaultProps = {
  onPress: null,
  action: null,
  textColor: colors.itemTextBlack,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  onPress: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountItem);
