// Node modules.
import { readFileSync } from 'fs-extra';
import appRoot from 'app-root-path';

const resourceRaw = readFileSync(`${appRoot.path}/rawdata/resources.txt`, 'utf-8');

interface Resource {
    [id: string]: string;
}

const filterResources = (filterPattern: RegExp) => {
    return resourceRaw.match(/RESOURCE ID: \w+\nTEXT: [^\n]+/sg)?.reduce<Resource>((prev, resource) => {
        const { 1: id, 2: text } = resource.match(/RESOURCE ID: (\w+)\nTEXT: ([^\n]+)/)!;
        if (filterPattern.test(id)) {
            const { 1: key } = id.match(filterPattern)!;
            prev[key] = text;
        }
        return prev;
    }, {})!;
};

export {
    filterResources,
};
