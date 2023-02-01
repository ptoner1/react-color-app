import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import './Navbar.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex',
            snackbar: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
    }

    handleFormatChange(e) {
        this.setState({ format: e.target.value, snackbar: true },
            this.props.handleChange(e.target.value));
    }

    render() {
        const { level, changeLevel, isPaletteNav } = this.props;

        const slider =
            (<div className='slider-container'>
                <span>Level: {level} </span>
                <div className='slider'>
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onChange={changeLevel}
                        handleStyle={{
                            border: '2px solid green',
                            boxShadow: 'none'
                        }}
                    />
                </div>
            </div>
            )
        return (
            <header className='Navbar'>
                <div className='logo'>
                    <Link to='/'>ReactColorPicker</Link>
                </div>
                {isPaletteNav ? slider : ''}
                <div className='select-container'>
                    <Select value={this.state.format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX -#ffffff</MenuItem>
                        <MenuItem value="rgb">RGB -rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA -rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    onClose={() => { this.setState({ snackbar: false }) }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.snackbar}
                    autoHideDuration={1200}
                    message={<span id='msg'>Format Changed to {this.state.format.toUpperCase()}</span>}
                    ContentProps={{ 'aria-describedby': 'msg' }}
                    action={[
                        <IconButton
                            onClick={() => { this.setState({ snackbar: false }) }}
                            color='inherit'
                            key='close'
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}

export default Navbar