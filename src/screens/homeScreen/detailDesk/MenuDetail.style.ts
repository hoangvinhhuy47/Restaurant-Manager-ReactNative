import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { mainColors, Fonts } from '../../../constants';

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    height: wp(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    width: '100%',
    height: hp(95),
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 20
  },
  buttonitem: {
    paddingTop: 5,
    height: '100%',
    width: wp(45),
    flexDirection: 'column',
  },
  VImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
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
  VtitleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleButton: {
    textTransform: 'uppercase',
    fontSize: wp(4),
    fontWeight: '600',
    color: mainColors.titleColor,
    fontFamily: Fonts.Roboto_Slab_Regular
  },
});


export default styles;