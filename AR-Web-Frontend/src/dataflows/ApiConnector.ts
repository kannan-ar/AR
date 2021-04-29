import DataTypes from '../models/DataTypes'
import axios from 'axios'

export default class ApiConnector {
    
    url: string;
    parameters = new Map<string, DataTypes>();

    constructor(url: string) {
        this.url = url;
    }

    public addParameter(name: string, dataType: DataTypes) {
        this.parameters.set(name, dataType)
    }

    public async getDataAsync(): Promise<any> {
        return axios.get(this.url);
    }
}