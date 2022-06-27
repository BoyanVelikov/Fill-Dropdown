import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';

function addItem() {
    let baseUrl = 'http://localhost:3030/jsonstore/advanced/dropdown';
    let optionMenu = document.getElementById('menu');
    let addButton = document.querySelector('input[type="submit"]');
    addButton.addEventListener('click', postData);
    const optionsTemplate = (text, _id) => {
        return html `<option value="${_id}">${text}</option>`;
    };

    async function getData() {
        const response = await fetch(baseUrl);
        const data = await response.json();

        const getInitialOptions = Object.entries(data).map((item) => optionsTemplate(item[1].text, item[1]._id));
        render(getInitialOptions, optionMenu);
    }

    getData();

    async function postData(e) {
        e.preventDefault();
        
        let inputText = document.getElementById('itemText');

        let newInfo = {
            text: inputText.value
        };

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newInfo)
        });

      getData();
        
    }
    
}

addItem();