import { LightningElement, track, wire, api } from 'lwc';
import sObjectList from '@salesforce/apex/GetSObjectList.getObjects';
import GetCustomRecord from '@salesforce/apex/GetCustomRecords.getRecords';
import { refreshApex } from '@salesforce/apex';
import CredexLogo from "@salesforce/resourceUrl/CredexLogo";

export default class CustomObjectRecordsAdd extends LightningElement {
    @track objectList;
    @track selectedObject = null;
    @track selectedObjectList;
    @track records;
    @track fields = [];
    @track selectedRecordIds = [];
    @track wiredResult;
    @track filteredFields = [];
    @track wiredRecordList = [];
    @track isChecked = false;


    objectNameSentToHtml;
    selectedId;
    index;
    showTable2 = false;
    showModal = false;
    showTable1 = true;
    logo = CredexLogo;

    connectedCallback() {
        sObjectList()
            .then(result => {
                this.objectList = result;
            })
            .catch(error => {
                this.error = error;
            });
    }

    handleCheckboxChange(event) {
        const objectName = event.target.dataset.name;

    if (event.target.checked) {
        if (this.selectedObject !== objectName) {
            const previousCheckbox = this.template.querySelector(`[data-name="${this.selectedObject}"]`);

            if (previousCheckbox) {
                previousCheckbox.checked = false;
            }
        }
        this.selectedObject = objectName;
        this.objectNameSentToHtml = objectName;
        this.selectedId = event.target.dataset.id;
        console.log('this.selectedObject', this.selectedObject);
    }
}

    handleSelect() {
        this.selectedObjectList = this.selectedObject;
        this.showTable2 = true;
        this.showTable1 = false;
    }

    // isCheckboxChecked(object) {
    //     return object === this.selectedObject;
    // }
    

    @wire(GetCustomRecord, { selectedObjectList: '$selectedObjectList' }) list(result) {
        this.wiredRecordList = result;
        if (result.data) {
            this.records = structuredClone(result.data);
            this.error = undefined;
            const excludedFields = ['CreatedDate', 'LastModifiedDate', 'LastModifiedByID', 'SystemModstamp', 'LastViewedDate', 'LastReferencedDate', 'CreatedByID', 'IsDeleted', 'CreatedById', 'LastModifiedById', 'Record ID'];
            const nonFilteredFields = Object.keys(result.data[0] || {});
            console.log('nonFilteredFields', JSON.stringify(nonFilteredFields));
            const filteredFields = Object.keys(result.data[0] || {}).filter(field => !excludedFields.includes(field));
            console.log('filteredFields--->', JSON.stringify(filteredFields));

            this.fields = filteredFields;
        }
        else if (result.error) {
            this.error = result.error;
            this.records = [];
        }
    }

    get recordData() {
        if (this.records) {
            return this.records.map(record => ({
                OwnerId: record.OwnerId,
                Name: record.Name
            }));
        }
    }
    handleDeleteCheckbox(event) {
        this.index = event.target.dataset.index;
        this.selectedId = event.target.dataset.id;

        if (event.target.checked) {

            this.selectedRecordIds.push(this.selectedId);
        } else {
            const index = this.selectedRecordIds.indexOf(this.selectedId);
            if (index !== -1) {
                this.selectedRecordIds.splice(index, 1);
            }
        }
    }

    handleDeleteSelected() {
            if (this.selectedRecordIds.length > 0 && this.selectedRecordIds.length!= this.records.length && this.records.length >1) {
                const recordsCopy = this.records;
                this.selectedRecordIds.forEach((selectedId) => {
                    const index = recordsCopy.findIndex((record) => record.OwnerId === selectedId);
                    if (index !== -1) {
                        recordsCopy.splice(index, 1);
                    }
                });
                this.records = recordsCopy;
                //this.selectedRecordIds = [];
                console.log('this.selectedObject', this.selectedObject);
            }
        
        else {
            alert('Minimum One Records should be present');
        }
    }

    addRecordsButton() {
        this.showModal = true;
    }

   handleRecordCreateSuccess() {
       refreshApex(this.wiredRecordList);
}


}
