abstract class ApiConnector {
    
    url: string;
    //parameters = new Map<string, any>();

    constructor(url: string) {
        this.url = url;
    }

    public addParameter(name: string, dataType: any) {
        //this.parameters.set(name, dataType)
    }
}