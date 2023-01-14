import React from 'react';
import {SvgXml} from 'react-native-svg';
import {widthToDp} from '../../helpers/responsive';

const xml: string = `
<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7L7 1L13 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default (props: {width: number; height: number}) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
