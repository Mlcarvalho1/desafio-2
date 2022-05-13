// // -----------------------------
// // paginação
// const pageQuery = 3;
// const page = ~~pageQuery || 1;
// const limit = 2;
// const offset = (page - 1) * limit;
// const total = linesArray.length;
// const itens = linesArray.slice(offset, offset + limit);

// function pagination(page, total, limit){

//     const pageSize = Math.ceil(total/limit);
//     let pagination = {
//         page: page,
//         total: total,
//         limit: limit,
//         pages: pageSize,
//     } 

//     return pagination
// }
// console.log(itens)
// console.log(pagination(page,total,limit))
const estrut = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://nosbastidores.com.br/wp-content/uploads/2019/12/James-Cameron-diz-que-tem-certeza-que-Avatar-ultrapassar%C3%A1-Vingadores.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2021-04-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2021-04-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2021-04-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2021-04-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
};

const btn = document.querySelector('#btn');
const sb = document.querySelector('#framework');
const input = document.querySelector('#search-input');
const table = document.querySelector('.table');
const footer = document.getElementById('footer-navigation');
let currentPage = 1;
let totalPages = ''
const initialDate = document.getElementById('initial-date');
const finalDate = document.getElementById('final-date');
// const montButton =  document.getElementById('month-button');
// const todayButton =  document.getElementById('today-button');

searchMaker(estrut);

function searchMaker(data) {
    const select = document.getElementById('framework');
    select.innerHTML = `<option value="0">Todos os planos</option>`
    data.insurances.forEach(insurance => {
        select.innerHTML += `<option value="${insurance.id}">${insurance.name}</option>`
    });
};

function renderTable(data) {
    const table = document.querySelector('.table');

    let html = `
        <thead>
            <tr class="tr">
            <th><i id="sort" class="fa-solid fa-sort-up" onclick="sortTable()" >nome</i></th>
            <th scope="col">Data</th>
            <th scope="col">Número</th>
            <th scope="col">Paciente</th>
            <th scope="col">convênio</th>
            <th scope="col">Preço</th>
            </tr>
        </thead>`;

    if (!data.length) {
        table.innerHTML = `<tr><td colspan='5' id="feet" >Nenhuma guia encontrada</td></tr>`;
        return;
    }

    data.forEach((element,i) => {
        let classe;
        let titulo = element.health_insurance.name;

        if (element.health_insurance.is_deleted) {
            titulo = "Convenio deletado";
            classe = "conv-deleted"
        }
        
        html += `
            <tr>
                <td>
                <label class="container-checkbox">
                <input type="checkbox" id="${element.number}" class="checkbox" ${element.selected ? 'checked' : ''}>
                <span class="checkmark"></span>
                </label>
                </td>
                <td scope="col">${new Date(element.start_date).toLocaleDateString('pt-BR')}</td>
                <td scope="col">${element.number}</td>
                <td scope="col" class="names">
                    <img class = "profile-pick" src="${element.patient.thumb_url || "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}" alt="ProfilePick"/>
                    ${element.patient.name}
                </td>
                <td scope="col" title="${titulo}" class="conv ${classe}">${element.health_insurance.name}</td>
                <td scope="col">${element.price.toLocaleString('pt-Br', { style: `currency`, currency: 'BRL' })}</td>
            </tr>
        `;
        
    });
    
    table.innerHTML = html;
}

// const sortTable = () =>{
//     let table, rows, switching, i, x, y, showdSwitch, button;
//     button = document.getElementById('sort')
//     table = document.querySelectorAll('td.names')
//     // switching = true
//     // while(switching){
//     //     switching = false;
//     //     rows = table.rows;
//     //     for(i = 1; i < (rows.length -1); i++){
//     //         showdSwitch = false;
//     //         x = rows[i].getElementsByTagName('td')[0];
//     //         y = rows[i + 1].getElementsByTagName("TD")[0];
//     //         console.log(x)
//     //     };
//     //     if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//     //         showdSwitch = true;
//     //         break
//     //     };
//     //     if(showdSwitch){
//     //         rows[i].parentNode.insertBefore(rows[i+1],rows[i])
//     //     };
//     // };
//     // button.classList.remove('fa-sort-up')
//     // button.classList.add('fa-sort-down')
// };

const renderPagination = totalItems => {
    let html = `
        <li class="page-item">
            <button onclick="previousPage(event)" type="button" class="page-link" id="btn-previous" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    const itemsPerPage = 2;
    totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const activeClass = currentPage === i ? 'active' : '';

        html += `<li class="page-item ${activeClass}">
            <a class="page-link" id=${i} onclick="paginate(event, ${i})">${i}</a>
        </li>`
    };

    html += `
    <li class="page-item">
        <button type="button" onclick="nextPage(event)" class="page-link" id="btn-next" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
    `;

    document.getElementById('pagination').innerHTML = html;
    
    return totalPages
}

const filter = (event) => {
    if(event){
    event.preventDefault();
    };
    const insuranceId = ~~sb.value;
    const searchText = input.value;
    const validInitialDate = initialDate.value;
    const validFinalDate = finalDate.value;
    // const validFinalDate = new Date(finalDate.value).toLocaleDateString('pt-BR')
    filteredGuides = estrut.guides.filter(guide => {
        let isValid = true;
        const patientDate = new Date(guide.start_date).toISOString().slice(0, 10);
        const checkbox = document.getElementById(`${guide.number}`);

        if (insuranceId && guide.insurance_id !== insuranceId) {
            isValid = false;
        }
        if (searchText && !guide.patient.name.toLowerCase().includes(input.value.toLowerCase()) && !guide.number.includes(input.value)) {
            isValid = false;
        }

        if(validInitialDate && validFinalDate && (validInitialDate > patientDate || validFinalDate < patientDate)){
            isValid = false
        }

        if(validInitialDate && validInitialDate > patientDate ){
            isValid = false
        }

        if(validFinalDate && validFinalDate < patientDate ){
            isValid = false
        }

        if (checkbox && checkbox.checked){
            guide.selected = true
            isValid = true;
        }     

        return isValid;
    });
    
    renderPagination(filteredGuides.length);
    renderTable(filteredGuides.slice((currentPage - 1)*2,((currentPage-1)*2)+2));
    // pageSelected(currentPage);
    totalPages = filteredGuides.length;
    colunsPerPage = filteredGuides.slice((currentPage - 1)*2,((currentPage-1)*2)+2).length;
    return totalPages, colunsPerPage
};
const previousPage = (event) => {
    if(currentPage <= 1){
        return
    }
    currentPage -= 1;
    paginate(event, currentPage);
    return currentPage
};

const nextPage = (event) => {
    if(currentPage > Math.ceil(totalPages/colunsPerPage)){
        return    
    };

    currentPage++;
    paginate(event, currentPage);
    return currentPage
};

const paginate = (event, page) => {
    event.preventDefault();

    const items = filteredGuides.slice((page - 1)*2,((page-1)*2)+2);

    currentPage = page;

    renderTable(items);
    renderPagination(filteredGuides.length);
};
filter();


