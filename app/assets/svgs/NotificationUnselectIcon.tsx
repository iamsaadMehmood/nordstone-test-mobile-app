import React from 'react';
import {SvgXml} from 'react-native-svg';
import {widthToDp} from '../../helpers/responsive';

const xml: string = `
<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5 8.66675C19.5 6.94284 18.8152 5.28954 17.5962 4.07055C16.3772 2.85157 14.7239 2.16675 13 2.16675C11.2761 2.16675 9.62279 2.85157 8.40381 4.07055C7.18482 5.28954 6.5 6.94284 6.5 8.66675C6.5 16.2501 3.25 18.4167 3.25 18.4167H22.75C22.75 18.4167 19.5 16.2501 19.5 8.66675Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.8743 22.75C14.6838 23.0783 14.4105 23.3509 14.0816 23.5403C13.7526 23.7298 13.3797 23.8295 13.0001 23.8295C12.6206 23.8295 12.2476 23.7298 11.9187 23.5403C11.5898 23.3509 11.3164 23.0783 11.126 22.75" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default (props: {width: number; height: number}) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
