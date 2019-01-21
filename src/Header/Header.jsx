import React from 'react';
import './Header.scss';
import {Flex, Txt, DropDownButton } from 'rendition';
import Moment from 'moment';

const Header = () => (
    <Flex justify="space-between" className={'Header'}>
        <Txt className={'Header_txt_sm'}>{Moment(new Date()).format('D MMMM, YYYY \\at H:mm A')}</Txt>
        <Txt className={'Header_txt_xs'}>{Moment(new Date()).format('D/MM/YYYY H:mm A')}</Txt>
        <Txt className={'Header_txt'}>{Moment(new Date()).format('dddd D MMMM, YYYY')}</Txt>
        <Txt className={'Header_txt'}>{Moment(new Date()).format('H:mm A')}</Txt>
        <Flex className={'Header_user'} justify="space-between">
            <Txt className={'Header_txt'}>John Gomez</Txt>
            <Txt className={'Header_txtCircle'}>JG</Txt>
            <DropDownButton mx={0} joined tertiary className={'Header_user_menu'} >
                <div>Item</div>
                <div>Item</div>
                <div>Item</div>
                <div>Item</div>
            </DropDownButton>
        </Flex>
    </Flex>
);

export default Header;
