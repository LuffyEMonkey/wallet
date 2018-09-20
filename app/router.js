  
import Walkthrough from './screens/OnBoarding';
import HomeScreen from './screens/HomeScreen';

import {
  WarningScreen,
  SettingsScreen,
  SortAccounts,
  AddressBook,
  ModifyAddress,
  MembershipScreen,
} from './screens/Settings';

import {
  SetPassword,
  SelectImportType,
  ImportAccount,
} from './screens/Accounts';

import {
  Referrer,
  JoinMembership,
} from './screens/Membership';

import QRScan from './screens/QRScan';

import {
  ManageScreen as TransactionManageScreen,
  WarningKeyLeakage,
  WarningQuitMembership,
  ConfirmRemove,
  ConfirmBackup,
  ReceiveBalance,
  AuthChangePassword,
  CreateTransaction,
  SelectWithdrawAccount,
  TransactionDetail,
  SendBalance,
  ReceiveAccount,
  TransactionList,
  TransactionList1,
  TransactionList2,
  TransactionList3,
} from './screens/Transaction';

import TestScreen from './screens/TestScreen';

const router = {
  Home: { screen: HomeScreen },
  Walkthrough: { screen: Walkthrough },
  Settings: { screen: SettingsScreen },
  SortAccounts: { screen: SortAccounts },
  SetPassword: { screen: SetPassword },
  Membership: { screen: MembershipScreen },
  Warning: { screen: WarningScreen },
  AddressBook: { screen: AddressBook },
  ModifyAddress: { screen: ModifyAddress },
  TransactionManage: { screen: TransactionManageScreen },
  Referrer: { screen: Referrer },
  WarningKeyLeakage: { screen: WarningKeyLeakage },
  WarningQuitMembership: { screen: WarningQuitMembership },
  ConfirmRemove: { screen: ConfirmRemove },
  ConfirmBackup: { screen: ConfirmBackup },
  ReceiveBalance: { screen: ReceiveBalance },
  AuthChangePassword: { screen: AuthChangePassword },
  SelectImportType: { screen: SelectImportType },
  ImportAccount: { screen: ImportAccount },
  Test: { screen: TestScreen },
  QRScan: { screen: QRScan },
  CreateTransaction: { screen: CreateTransaction },
  SelectWithdrawAccount: { screen: SelectWithdrawAccount },
  TransactionDetail: { screen: TransactionDetail },
  SendBalance: { screen: SendBalance },
  JoinMembership: { screen: JoinMembership },
  ReceiveAccount: { screen: ReceiveAccount },
  TransactionList: { screen: TransactionList },
  TransactionList1: { screen: TransactionList1 },
  TransactionList2: { screen: TransactionList2 },
  TransactionList3: { screen: TransactionList3 },
};

export default router;