import React from 'react';
import { Flex, Button, Txt } from 'rendition';

import './Toolbar.scss';
import * as FaHome from 'react-icons/lib/fa/home'
import * as FaChevronLeft from 'react-icons/lib/fa/chevron-left'
import * as FaLightbulb from 'react-icons/lib/ti/lightbulb'

const Toolbar = () => (
    <Flex>
        <Button m={2} quartenary square className={'Toolbar_button'}>
          <FaHome />
        </Button>
        <Button m={2} quartenary iconElement={<FaChevronLeft />} className={'Toolbar_button'}>
            Back
        </Button>
        <Txt className={'Toolbar_title'}><FaLightbulb /> Lighting</Txt>

    </Flex>
);

export default Toolbar;
