import React from 'react';
import { Flex, Box, Table, Txt, ArcSlider } from 'rendition';

import './Lightning.scss';

import * as FaToggleOn from 'react-icons/lib/fa/toggle-on';
import * as FaToggleOff from 'react-icons/lib/fa/toggle-off';
import * as TiStarburstOutline from 'react-icons/lib/ti/starburst-outline';

const columns = [
    {
        field: 'name',
        label: 'Room',
        sortable: true,
    },
    {
        field: 'active',
        label: 'State',
        sortable: false,
        render: value => {
            return (value) ?
            (<Txt><FaToggleOn color="#4DB313"/> On</Txt>) :
            (<Txt><FaToggleOff/> Off</Txt>);
        }
    },
    {
        field: 'brightness',
        label: 'Brightness',
        sortable: false,
        render: value => value + '%'
    }
]

class Lightning extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLight: undefined,
            data: [],
            sliderValue: 0,
            highlightedRows: []
        }

        this.rowClicked = (row, event) => {
            const sliderValue = row.brightness /100;
            this.setState({
                'selectedLight': row,
                'sliderValue': sliderValue,
                'highlightedRows': [row.id] });
        }

        this.lightHandler = sliderValue => {
            let changes = {};
            if (sliderValue > 0) {
                changes['active'] = true;
                changes['brightness'] = Math.round(sliderValue * 100);
            } else {
                changes['active'] = false;
                changes['brightness'] = 0;
            }
            this.changeData( this.state.selectedLight, changes);
            this.setState({ 'sliderValue': sliderValue });
        }

        this.changeData = (item, change) => {
            const newData =  this.state.data
            for (let i = 0, len = newData.length; i < len; i++) {
                if (item !== undefined) {
                    if (newData[i].id === item.id) {
                        newData[i] = Object.assign({}, newData[i], change);
                    }
                }
            }
            this.setState({ data: newData });
        }
    }

    static getDerivedStateFromProps(prevProps, prevState) {
        let data = prevProps.data !== undefined ? prevProps.data : [];
        data.map(light => {
            if (!light.active) {
                light.brightness = 0;
            }
            return light;
        });
        return {'data': data};
    }

    render() {
        if (this.state.selectedLight === undefined) {
            return (
                <Box m={2} className={'Lightning_table'}>
                  <Table
                    columns={columns}
                    data={this.state.data}
                    rowKey='id'
                    onRowClick={this.rowClicked}
                    highlightedRows={this.state.highlightedRows}/>
                </Box>);
        }

        return(<Flex justify='right' flexDirection={['column','row']}>
            <Box m={2} className={'Lightning_table'}>
              <Table
                columns={columns}
                data={this.state.data}
                rowKey='id'
                onRowClick={this.rowClicked}
                highlightedRows={this.state.highlightedRows}/>
            </Box>
            <Box m={2} bg={'#4D5057'} className={'Lightning_slider'}>
              <ArcSlider value={this.state.sliderValue} onValueChange={this.lightHandler}
                  className={'Lightning_arc_slider'}>
                  <p><TiStarburstOutline/></p>
                  <h2>{Math.round(this.state.sliderValue * 100)}%</h2>
                  <p>Brightness</p>
              </ArcSlider>
            </Box>
        </Flex>);
    }

}



export default Lightning;
