import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  ToastAndroid,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';

import styles from '../styles';
import { types } from '../../resources';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';
import { Navigation as NavAction } from '../../actions';

import icCopy from '../../resources/images/ic_list_copy.png';
import AndroidBackHandler from '../../AndroidBackHandler';

class TransactionDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderBalanceArea() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', null);

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.TransactionDetail;

    if (item.amount >= 0) {
      return (
        <View>
          <LabelText
            text={Strings.LABEL_SENDER}
          >
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.show(Strings.TOAST_CLIPBOARD, ToastAndroid.SHORT);
                Clipboard.setString(item.address);
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={icCopy}
              />
            </TouchableOpacity>
          </LabelText>
          <TextArea
            label={item.name}
            text={item.address}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_RECEIVED_AMOUNT}
            text={
              new BigNumber(item.amount)
                .toFormat(7)
                .replace(/[0]+$/, '')
                .replace(/[.]+$/, '')
            }
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_TOTAL}
            text={
              new BigNumber(item.amount)
                .toFormat(7)
                .replace(/[0]+$/, '')
                .replace(/[.]+$/, '')
            }
            type={types.TextArea.BALACNE}
            underline={false}
          />
        </View>
      );
    }

    return (
      <View>
        <LabelText
          text={Strings.LABEL_RECEIVER}
        >
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.show(Strings.TOAST_CLIPBOARD, ToastAndroid.SHORT);
              Clipboard.setString(item.address);
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={icCopy}
            />
          </TouchableOpacity>
        </LabelText>
        <TextArea
          label={item.name}
          text={item.address}
          underline={false}
        />
        <TextArea
          label={Strings.LABEL_SEND_AMOUNT}
          text={
            new BigNumber(0)
              .minus(item.amount)
              .minus(item.fee)
              .toFormat(7)
              .replace(/[0]+$/, '')
              .replace(/[.]+$/, '')
            }
          type={types.TextArea.BALACNE}
          underline={false}
        />
        <TextArea
          label={Strings.LABEL_FEE}
          text={item.fee}
          type={types.TextArea.BALACNE}
          underline={false}
        />
        <TextArea
          label={Strings.LABEL_TOTAL}
          text={
            new BigNumber(0)
              .minus(item.amount)
              .toFormat(7)
              .replace(/[0]+$/, '')
              .replace(/[.]+$/, '')
          }
          type={types.TextArea.BALACNE}
          underline={false}
        />
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', null);

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.TransactionDetail;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: Strings.TITLE,
            },
            right: {
              actionText: Strings.BACK_BUTTON,
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <ScrollView
            contentContainerStyle={styles.alignCenter}
            showsVerticalScrollIndicator={false}
          >
            <TextArea
              label={Strings.LABEL_DATE}
              text={item.date}
              underline={false}
            />
            <TextArea
              label={Strings.LABEL_TYPE}
              text={`${(item.amount < 0) ? Strings.TYPE_SEND : Strings.TYPE_RECV}${item.title ? ` - ${item.title}` : ''}`}
              underline={false}
            />
            <TextArea
              label={Strings.LABEL_TRANSACTION_ID}
              text={item.txHash}
              underline={false}
            />
            {this.renderBalanceArea(item)}
            <View style={{ marginBottom: 30 }} />
          </ScrollView>
          <BottomButton
            actions={[
              {
                text: Strings.BUTTON_TEXT_OK,
                action: NavAction.popScreen(),
              },
              // {
              //   text: Strings.BUTTON_TEXT_EXPLORER,
              //   callback: () => {
              //     Linking.openURL(`https://explorer.boscoin.io/tx/${item.txHash}`);
              //   },
              // },
            ]}
          />
        </View>
        <AndroidBackHandler />
      </View>
    );
  }
}


TransactionDetail.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);

