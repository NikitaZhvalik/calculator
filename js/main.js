//! DATA
const budget = [];

//! DOM
const form = document.querySelector("#form");

const type = document.querySelector("#type");
const title = document.querySelector("#title");
const value = document.querySelector("#value");

const incomesList = document.querySelector("#incomes-list");
const expensesList = document.querySelector("#expenses-list");

//! Function
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

//! Actions
insertTestData();
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
    value: value.value,
  };

  //! добавляем запись расходов/доходов в массив
  budget.push(record);

  //! отображем запись доходов
  if (record.type === "inc") {
    const html = `
        <li class="budget-list__item data-id=${record.id} item item--income">
            <div class="item__title">${record.title}</div>
            <div class="item__right">
                <div class="item__amount">${record.value}</div>
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
                <li class="budget-list__item data-id=${record.id} item item--expense">
                <div class="item__title">${record.title}</div>
                <div class="item__right">
                    <div class="item__amount">
                        ${record.value}
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
});
