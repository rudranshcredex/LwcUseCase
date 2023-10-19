import { LightningElement, track, wire } from 'lwc';
import sObjectList from '@salesforce/apex/GetSObjectList.getObjects';

export default class LifeCycleHooksImplementation extends LightningElement {
    @track textVariable;
    @track isSpinner = false;
    @track objectList;
    child = true;
    showChild;

    count = 0;

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


    renderedCallback() {
        console.log('rendered callback-----');
        const button = this.template.querySelector('.btn');

        button.addEventListener('click', () => {
            this.count += 1;
            console.log('button clicked', this.count);
        });
    }

    errorCallback(error, stack) {
        console.log('inside error');
        console.error('errror ', error);
        console.error('stack trace', stack);
    }

     handleClick() {
         this.showChild = !this.showChild;
    }
    
    disconnectedCallback() {
        if (!this.showChild) {
            console.log('disconnected callback');
        }
        
    }
    
   
}