import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { mainColors, Fonts } from '../../../constants';

const styles = StyleSheet.create({
  MainContainer: {
    height: '100%',
    flex: 1,
    width: '100%',
  },
  header: {
    backgroundColor: mainColors.greenscolor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
  },
  iconExit: {
    justifyContent: 'center',
    height: hp(4),
  },
  iconAvatar: {
    width: hp(4),
    height: hp(4),
  },
  menuText: {
    marginRight: wp(2),
    marginLeft: 10,
    color: 'white',
    fontSize: hp(2),
    fontWeight: '600',
    fontFamily: Fonts.Roboto_Stab_Bold,
    textTransform: 'uppercase'
  },
});


export default styles;