//! DATA
const budget = [];

//! DOM
const form = document.querySelector('#form');

const type = document.querySelector('#type');
const title = document.querySelector('#title');
const value = document.querySelector('#value');

//! Actions
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //! расчет id
    let id = 1;
    if (budget.length > 0) {
        const lastElement = budget[budget.length - 1];
        const lastElId = lastElement.id;
        id = lastElement.id + 1;
    }

    //! формируем запись расхода/дохода
    const record = {
        id: id,
        type: type.value,
        title: title.value,
        value: value.value,
    }

    budget.push(record);
    console.log(budget);
})

