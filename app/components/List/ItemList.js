import React from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
} from 'react-native';
import PropTypes from 'prop-types';

import FlatItem from './FlatItem';
import SectionItem from './SectionItem';
import SortableItem from './SortableItem';
import { AlertPanel } from '../Panel';

import styles from './styles';
import { types, colors } from '../../resources';

import icEmpty from '../../resources/images/empty.png';

const ItemList = ({ listType, listData, noDataText, onEndReached }) => {
  const getListByType = () => {
    switch (listType) {
      case types.ListType.FLAT:
        if (listData.data.length > 0) {
          return (
            <FlatList
              data={listData.data}
              renderItem={FlatItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.05}
            />
          );
        }
        return (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 50,
              paddingRight: 30,
              justifyContent: 'center',
              alignItems: 'stretch',
              alignSelf: 'center',
            }}
          >
            <AlertPanel
              icon={icEmpty}
              color={colors.alertTextLightGrey}
              text={
                noDataText
              }
            />
          </View>
        );
      case types.ListType.SECTION:
        return (
          <SectionList
            sections={listData.data}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            renderSectionFooter={() => (
              <View style={styles.sectionFotter} />
            )}
            renderItem={SectionItem}
            keyExtractor={(item, index) => item + index}
          />
        );
      default:
        if (listData.data.length > 0) {
          return (
            <FlatList
              data={listData.data}
              renderItem={FlatItem}
            />
          );
        }
        return (
          <AlertPanel
            icon={icEmpty}
            color={colors.alertTextLightGrey}
            text={
              '아직 등록된\n'
              + 'Account가 없습니다'
            }
          />
        );
    }
  };
  return (
    <View style={styles.itemList}>
      {getListByType()}
    </View>
  );
};

ItemList.propTypes = {
  listType: PropTypes.string.isRequired,
  listData: PropTypes.shape({ data: PropTypes.arrayOf(PropTypes.object) }).isRequired,
};

export default ItemList;
