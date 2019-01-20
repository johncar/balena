import React from 'react';
import { Flex, Box, Table, Txt, ArcSlider } from 'rendition';
import _cloneDeep from 'lodash/cloneDeep';

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
        }

        this.rowClicked = (row, event) => {
            let light = row;
            if (light !== undefined) {
                light.active = !light.active;
                if (!light.active) {
                    light.brightness = 0;
                }
                this.changeData( light, { brightness:light.brightness, active:light.active })
            }
            this.setState({ selectedLight: light });
        }

        this.lightHandler = sliderValue => {
            this.changeData( this.state.selectedLight,
                { brightness: Math.round(sliderValue * 100) })
        }

        this.changeData = (item, change) => {
            const newData =  this.state.data

            for (let i = 0, len = newData.length; i < len; i++) {
                if (item !== undefined) {
                    if (newData[i].id === item.id) {
                        //light.brightness = sliderValue * 100;
                        newData[i] = Object.assign({}, newData[i], change)
                    }
                }
            }

            this.setState({ data: newData })
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
                    onRowClick={this.rowClicked}/>
                </Box>);
        }

        return(<Flex justify='right' flexDirection={['column','row']}>
            <Box m={2} className={'Lightning_table'}>
              <Table
                columns={columns}
                data={this.state.data}
                rowKey='id'
                onRowClick={this.rowClicked}/>
            </Box>
            <Box m={2} bg={'#4D5057'} className={'Lightning_slider'}>
              <Slider lightHandler={this.lightHandler} value={ this.state.selectedLight.brightness / 100 }/>
            </Box>
        </Flex>);
    }

}

class Slider extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: 0.4,
    }

    this.handleChange = value => {
      this.setState({ value })
      this.props.lightHandler(value);
    }
  }

  render () {
      return (
          <ArcSlider background='#c6c8c9' value={this.props.value} onValueChange={this.handleChange}>
            <p><TiStarburstOutline/></p>
            <h2>{Math.round(this.state.value * 100)}%</h2>
            <p>Brightness</p>
          </ArcSlider>);

  }
}


export default Lightning;
