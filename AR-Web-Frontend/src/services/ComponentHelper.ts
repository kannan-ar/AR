import { Component } from 'vue';
import Components from './Component';

const getComponents = () => {
    const components: any = {};

    for (let i = 0; Components.length > i; i++) {
        components[Components[i].Name] = Components[i].Component;
    }

    return components;
}

const getComponent = (id: number): Component | null => {
    const result = Components.filter(x => x.Id == id);

    if (result != null && result.length > 0) {
        return result[0].Component
    }

    return null;
}

export { getComponents, getComponent }