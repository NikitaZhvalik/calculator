import * as model from './model.js';
import * as view from './view.js';

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
    view.renderTestData(randomData);
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

    const budgetSummery = {
        totalIncome,
        totalExpense,
        totalBudget,
        expensePercents,
    };
    view.renderBudget(budgetSummery);
}

function displayMonth() {
    //! добавление в шапку сайта года и месяца
    const now = new Date();
    const year = now.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
    })
    const month = timeFormatter.format(now);
    view.renderMonth(month, year);
}

//! Actions
displayMonth();
insertTestData();
// calcBudget();

//! Добавление записи доходов/расходов
view.elements.form.addEventListener("submit", (e) => {
  e.preventDefault();

    if (!view.checkEmptyFields()) return;

    const formData =  view.getFormData();

    const record = model.createRecord(formData);
    view.renderRecord(record);

  //! чистим form после добавления
  view.clearForm();
  insertTestData();
  //! пересчетать бюджет
//   calcBudget();
});

//! Удаление записи доходов/расходов
document.body.addEventListener('click', function (e) {
    if (e.target.closest('button.item__remove')) {
        const id = view.removeRecord(e);
        model.deleteRecord(id);
    }
    //! пересчетать бюджет
    // calcBudget();
})

