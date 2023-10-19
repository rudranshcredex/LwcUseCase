import { LightningElement } from 'lwc';

export default class Child extends LightningElement {
//     connectedCallback() {
//        throw new Error('Error');
    //   }
    
    disconnectedCallback() {
        console.log('child disconnected callback')
    }
}