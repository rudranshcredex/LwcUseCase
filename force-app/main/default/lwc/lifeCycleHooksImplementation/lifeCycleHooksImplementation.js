
import { LightningElement, track, wire } from 'lwc';
import sObjectList from '@salesforce/apex/GetSObjectList.getObjects';

export default class LifeCycleHooksImplementation extends LightningElement {
    @track textVariable;
    @track isSpinner = false;
    @track objectList;

    constructor() {
        super();
        console.log('Inside Constructor');
        let text = 'ABC';
        this.textVariable = text;

    }

    @wire(sObjectList) fetchList(result) {
        this.isSpinner = false;
        console.log('result.data', result.data);
        if (result.data) {
            this.objectList = result.data;
        }
        else if (result.error) {
            this.error = result.error;
            console.log('error', this.error);
        }
    }

    connectedCallback() {
        console.log('inside connectedcallback');
        this.isSpinner = true;
    }
}