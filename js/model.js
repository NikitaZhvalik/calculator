
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

export {createRecord, deleteRecord }