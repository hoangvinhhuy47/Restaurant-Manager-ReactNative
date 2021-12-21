import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { mainColors, Fonts } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: '100%',
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems:'center'

  }
});


export default styles;
      ''