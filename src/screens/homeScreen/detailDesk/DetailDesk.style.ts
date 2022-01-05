import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { mainColors, Fonts } from '../../../constants';

const styles = StyleSheet.create({
  header: {

    height: hp(6), width: '100%',
    backgroundColor: mainColors.greenscolor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 5
  },
  heder_bottom_text: {
    height: hp(5), width: '100%', marginTop: 5, paddingLeft: 15, paddingRight: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  view_bottom_icon: {

    width: '100%', height: 'auto', marginTop: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
  },
  ImageViewButton: {
    paddingLeft: 3.5,
    shadowColor: mainColors.titleColor,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 15,
    width: 75,
    height: 75,
    backgroundColor: mainColors.buttoncolor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  ImageButton: {
    width: 42,
    height: 42,
  },

  rowBack: {
    alignItems: 'center',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

});


export default styles;