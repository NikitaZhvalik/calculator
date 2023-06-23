//! DATA
const budget = [];

//! DOM
const form = document.querySelector("#form");

const type = document.querySelector("#type");
const title = document.querySelector("#title");
const value = document.querySelector("#value");

const incomesList = document.querySelector("#incomes-list");
const expensesList = document.querySelector("#expenses-list");



//! Actions
form.addEventListener("submit", (e) => {
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
});
