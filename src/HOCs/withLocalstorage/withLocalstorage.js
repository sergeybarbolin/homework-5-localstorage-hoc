import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (key, initValue) => WrappedComponent => {
    class LocalStorage extends Component {
        loadData = () => load(key) || initValue

        saveData = data => {
            save(key, data);
            this.forceUpdate();
        }

        render() {
            const {forwardedRef, ...rest} = this.props
            
            return <WrappedComponent ref={forwardedRef} {...rest} savedData={this.loadData()} saveData={this.saveData} />
        }
    }

    const forwardRef = (props, ref) => {
        return <LocalStorage {...props} ref={ref} /> 
    }
    
    return React.forwardRef(forwardRef);
};

export default withLocalstorage;
