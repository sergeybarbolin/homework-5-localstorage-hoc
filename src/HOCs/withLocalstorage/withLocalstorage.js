import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (key, initValue) => WrappedComponent => {
    return class LocalStorage extends Component {
        loadData = () => load(key) || initValue

        saveData = data => {
            save(key, data);
            this.forceUpdate();
        }

        render() {
            const {...props} = this.props
            
            return <WrappedComponent {...props} savedData={this.loadData()} saveData={this.saveData} />
        }
    }
};

export default withLocalstorage;
