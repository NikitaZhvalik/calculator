//! DATA
const budget = [];

//! DOM
const form = document.querySelector("#form");

const type = document.querySelector("#type");
const title = document.querySelector("#title");
const value = document.querySelector("#value");

const incomesList = document.querySelector("#incomes-list");
const expensesList = document.querySelector("#expenses-list");

const budgetEl = document.querySelector('#budget');
const totalIncomeEl = document.querySelector('#total-income');
const totalExpenseEl = document.querySelector('#total-expense');
const percentsWrapper = document.querySelector('#expense-percents-wrapper');

const monthEl = document.querySelector('#month');
const yearEl = document.querySelector('#year');

//! Function
const priceFormatter = new Intl.NumberFormat('ru-RU', {
    //! добавление пробелов и знака $ у сумм
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
})

function insertTestData() {
    const testData = [
        {type: 'inc', title: 'Основная работа', value: 1000,},
        {type: 'inc', title: 'Подработка', value: 500,},
        {type: 'inc', title: 'Пассивный доход', value: 250,},

        {type: 'exp', title: 'Квартира', value: 700,},
        {type: 'exp', title: 'Продукты', value: 300,},
        {type: 'exp', title: 'Прочее', value: 400,},
    ];
    //! рандомный индекс
    function getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }
    const randomIndex = getRandomInt(testData.length);
    const randomData = testData[randomIndex];

    type.value = randomData.type;
    title.value = randomData.title;
    value.value = randomData.value;
}

function clearForm() {
    form.reset();
}

function calcBudget() {
    //! считаем общий доход
    const totalIncome = budget.reduce((total, element) => {
        if (element.type === 'inc') {
            return total + element.value;
        } else {
            return total;
        }
    }, 0)

    //! считаем общий расход
    const totalExpense = budget.reduce((total, element) => {
        if (element.type === 'exp') {
            return total + element.value;
        } else {
            return total;
        }
    }, 0)

    //! считаем общий бюджет
    const totalBudget = totalIncome - totalExpense;

    //! считаем общий бюджет
    let expensePercents = 0;
    if (totalIncome) {
        expensePercents = Math.round((totalExpense * 100) /  totalIncome); 
    }

    //! рендерим доходы, расходы, %, общий бюджет
    budgetEl.innerHTML = priceFormatter.format(totalBudget);
    totalIncomeEl.innerHTML = '+ ' + priceFormatter.format(totalIncome);
    totalExpenseEl.innerHTML = '- ' + priceFormatter.format(totalExpense);

    if (expensePercents) {
        const html = `<div class="badge">${expensePercents}%</div>`;
        percentsWrapper.innerHTML = html;
    } else {
        percentsWrapper.innerHTML = '';
    }
}

function displayMonth() {
    //! добавление в шапку сайта года и месяца
    const now = new Date();
    const year = now.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
    })
    const month = timeFormatter.format(now);

    monthEl.innerHTML = month;
    yearEl.innerHTML = year;
}

//! Actions
displayMonth();
insertTestData();
calcBudget();

//! Добавление записи доходов/расходов
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //! проверка input на заполненность
  if (title.value.trim() === '') {
    title.classList.add('form__input--error');
    return;
  } else {
    title.classList.remove('form__input--error');
  }

  if (value.value.trim() === '' || +value.value <= 0) {
    value.classList.add('form__input--error');
    return;
  } else {
    value.classList.remove('form__input--error');
  }

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
    title: title.value.trim(),
    value: +value.value,
  };

  //! добавляем запись расходов/доходов в массив
  budget.push(record);

  //! отображем запись доходов
  if (record.type === "inc") {
    const html = `
    <li data-id="${record.id}" class="budget-list__item item item--income">
        <div class="item__title">${record.title}</div>
        <div class="item__right">
            <div class="item__amount">+ ${priceFormatter.format(record.value)}</div>
            <button class="item__remove">
                <img
                    src="./img/circle-green.svg"
                    alt="delete"
                />
            </button>
        </div>
    </li>`;
    incomesList.insertAdjacentHTML("afterbegin", html);
  }

  //! отображем запись расходов
  if (record.type === "exp") {
    const html = `
    <li data-id="${record.id}" class="budget-list__item item item--expense">
        <div class="item__title">${record.title}</div>
        <div class="item__right">
            <div class="item__amount">
                - ${priceFormatter.format(record.value)}
            </div>
            <button class="item__remove">
                <img src="./img/circle-red.svg" alt="delete" />
            </button>
        </div>
    </li>`;
    expensesList.insertAdjacentHTML("afterbegin", html);
  }
  //! чистим form после добавления
  clearForm();
  insertTestData();
  //! пересчетать бюджет
  calcBudget();
});

//! Удаление записи доходов/расходов
document.body.addEventListener('click', function (e) {
    if (e.target.closest('button.item__remove')) {
        const recordElement = e.target.closest('li.budget-list__item');
        const id = +recordElement.dataset.id;
        const index = budget.findIndex((element) => {
            if (id === element.id) {
                return true;
            }
        })
        //! Удаление записи доходов/расходов из массива
        budget.splice(index, 1);
        //! Удаление записи доходов/расходов из рендера
        recordElement.remove();
    }
    //! пересчетать бюджет
    calcBudget();
})

