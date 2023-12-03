import { LightningElement } from 'lwc';

export default class TextEditor extends LightningElement {
    quillInitialized = false;
    vfRoot = "https://cunning-impala-iuaae5-dev-ed--c.vf.force.com";
    messageFromVF = ''
 
    connectedCallback() {
        window.addEventListener("message", (message) => {
            console.log('message.origin',message.origin);
            if (message.origin !== this.vfRoot) {
                //Not the expected origin
                return;
            }
            //handle the message
            if (message.data.name == "SampleVFToLWCMessage") {
                this.messageFromVF = message.data.payload;
                console.log('Ffrom VF ',this.messageFromVF);
            }
        });
    }

        callVFPageMethod() {
        var vfWindow = this.template.querySelector("iframe").contentWindow;
        let paramData = "Dummy Data from LWC";
        vfWindow.postMessage(paramData, this.vfRoot);
    }
}