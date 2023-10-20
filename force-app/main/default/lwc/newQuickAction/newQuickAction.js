import { LightningElement, api } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import updateDurationField from '@salesforce/apex/updateFieldDuration.updateDurationField';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class NewQuickAction extends LightningElement {
    startTime;
    endTime;
    openTime;
    @api recordId;

    connectedCallback() {
        this.startTime = new Date();
        console.log('this.startTime', this.startTime);
    }

    disconnectedCallback() {
        this.endTime = new Date();
        this.openTime = (this.endTime - this.startTime) / 1000;

        console.log('this.openTime', this.openTime);
        console.log('this.recordId----->', this.recordId);

        updateDurationField({ accountId: this.recordId, openTime: this.openTime })
            .then(result => {
                console.log('updated', result);
            })
            .catch(error => {
                console.error('Error---->', error);
            });
    }
}
