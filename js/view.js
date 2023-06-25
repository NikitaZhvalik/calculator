//! DOM
const elements = {
    form: document.querySelector("#form"),
    type: document.querySelector("#type"),
    title: document.querySelector("#title"),
    value: document.querySelector("#value"),
    incomesList: document.querySelector("#incomes-list"),
    expensesList: document.querySelector("#expenses-list"),
    budgetEl: document.querySelector('#budget'),
    totalIncomeEl: document.querySelector('#total-income'),
    totalExpenseEl: document.querySelector('#total-expense'),
    percentsWrapper: document.querySelector('#expense-percents-wrapper'),
    monthEl: document.querySelector('#month'),
    yearEl: document.querySelector('#year'),
}

function checkEmptyFields() {
      //! проверка input на заполненность
    if (elements.title.value.trim() === '') {
        elements.title.classList.add('form__input--error');
        return false;
    } else {
        elements.title.classList.remove('form__input--error');
    }

    if (elements.value.value.trim() === '' || +elements.value.value <= 0) {
        value.classList.add('form__input--error');
        return false;
    } else {
        elements.value.classList.remove('form__input--error');
    }
 
    return true;
}


const priceFormatter = new Intl.NumberFormat('ru-RU', {
    //! добавление пробелов и знака $ у сумм
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
})



export { elements, priceFormatter, checkEmptyFields}