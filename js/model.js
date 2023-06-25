
const budget = [];

function createRecord(formData) {
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
    type: formData.type,
    title: formData.title.trim(),
    value: +formData.value,
  };

  //! добавляем запись расходов/доходов в массив
  budget.push(record);
  return record;
}

function deleteRecord(id) {
    const index = budget.findIndex((element) => {
        if (+id === element.id) return true;
    })
    //! Удаление записи доходов/расходов из массива
    budget.splice(index, 1);
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

    return {
        totalIncome,
        totalExpense,
        totalBudget,
        expensePercents,
    }
}

function getTestData() {
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
    return testData[randomIndex];
}

function getMonthYear() {
    const now = new Date();
    const year = now.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
    })
    const month = timeFormatter.format(now);
    return {month, year};
}

export {createRecord, deleteRecord, calcBudget, getTestData, getMonthYear  }