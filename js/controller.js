import * as model from './model.js';
import * as view from './view.js';

//! Function

function insertTestData() {
    const randomData = model.getTestData();
    view.renderTestData(randomData);
}

function displayMonth() {
    //! добавление в шапку сайта года и месяца

    const monthYear = model.getMonthYear();
    view.renderMonth(monthYear.month, monthYear.year);
}

//! Actions
displayMonth();
insertTestData(); 
view.renderBudget(model.calcBudget());

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
  //! пересчет бюджета
  view.renderBudget(model.calcBudget());
});

//! Удаление записи доходов/расходов
document.body.addEventListener('click', function (e) {
    if (e.target.closest('button.item__remove')) {
        const id = view.removeRecord(e);
        model.deleteRecord(id);
    }
    //! пересчет бюджета
    view.renderBudget(model.calcBudget());

})

