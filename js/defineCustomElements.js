//
// Taken from https://github.com/mdn/web-components-examples/blob/master/editable-list/main.js
// First idea was to have class outside of async function,
// but this only one way Custom WebComponents properly works with async/await-ed data
//

// REMOVE LATER
customElements.define('expertise-list', class extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('listTemplate');
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({
            mode: 'open'
        }) // so we create shadow DOM and
            .appendChild(templateContent.cloneNode(true)); // append with cloned content
    }
});

// REMOVE LATER
customElements.define('expertise-item', class extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('listItemTemplate');
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({
            mode: 'open'
        }) // so we create shadow DOM and
            .appendChild(templateContent.cloneNode(true)); // append with cloned content
    }
});