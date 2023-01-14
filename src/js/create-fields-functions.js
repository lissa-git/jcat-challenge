export function createBtn(prop, buttonText) {
  const btn = document.createElement('button');
  btn.className = `plan-selection__form-${prop} form-btn`;
  if (prop === 'prev') btn.classList.remove('form-btn');
  btn.setAttribute('data-btn', prop);
  btn.innerText = buttonText;
  return btn;
}

export function createPersonalInfoForm(nameValue, emailValue, phoneValue) {
  const nameInput = createInput('Name', 'e.g. Stephen King', 'name', 'text', nameValue);
  const emailInput = createInput('Email Address', 'e.g. stephenking@lorem.com', 'email', 'email', emailValue);
  const phoneInput = createInput('Phone Number', 'e.g. +1 234 567 890', 'phone', 'tel', phoneValue);
  return [nameInput, emailInput, phoneInput];
}

export function createPlanSelectionForm(plansArr, selectedPlan, selectedPeriod) {
  const isYearly = selectedPeriod === 'Yearly';
  const selectGroup = document.createElement('div');
  selectGroup.className = 'select-group d-flex flex-sm-row flex-column';
  plansArr.forEach(plan => {
    selectGroup.append(createSelectItem('plan', plan.name, plan.cost, plan.img.path, plan.img.alt, isYearly));
  });
  selectGroup.querySelector(`#${selectedPlan}`).checked = true;
  const switcher = createSwitcher('Monthly', 'Yearly', isYearly);
  return [selectGroup, switcher];
}

export function createSummaryInfo(plan, cost, period) {
  const selectedPlan = document.createElement('div');
  selectedPlan.className = 'selected-plan d-flex justify-content-between align-items-center';

  const selectedPlanInfo = document.createElement('div');
  selectedPlanInfo.className = 'selected-plan__info';

  const selectedPlanName = document.createElement('p');
  selectedPlanName.className = 'selected-plan__name font-bold';
  selectedPlanName.innerText = plan;

  const selectedPlanPeriodicity = document.createElement('span');
  selectedPlanPeriodicity.className = 'selected-plan__periodicity';
  selectedPlanPeriodicity.innerText = `(${period})`;

  const selectedPlanChange = document.createElement('button');
  selectedPlanChange.className = 'selected-plan__change-btn';
  selectedPlanChange.innerText = 'Change';

  const selectedPlanPrice = document.createElement('div');
  selectedPlanPrice.className = 'selected-plan__price font-bold';
  selectedPlanPrice.innerText = cost;

  selectedPlanName.append(selectedPlanPeriodicity);
  selectedPlanInfo.append(selectedPlanName, selectedPlanChange);
  selectedPlan.append(selectedPlanInfo, selectedPlanPrice);

  const summary = document.createElement('div');
  summary.className = 'selection-summary d-flex justify-content-between';

  const summaryInfo = document.createElement('p');
  summaryInfo.className = 'selection-summary__info';
  summaryInfo.innerText = 'Total';

  const summaryPeriodicity = document.createElement('span');
  summaryPeriodicity.className = 'selection-summary__periodicity';
  const summaryPeriodicityVal = period === 'Monthly' ? 'per month' : 'per year';
  summaryPeriodicity.innerText = `(${summaryPeriodicityVal})`;

  const summaryPrice = document.createElement('p');
  summaryPrice.className = 'selection-summary__price font-bold';
  summaryPrice.innerText = `+${cost}`;

  summaryInfo.append(summaryPeriodicity);
  summary.append(summaryInfo, summaryPrice);

  return [selectedPlan, summary];
}

export function createSucceedMessage() {
  const message = document.createElement('div');
  message.className = 'd-flex flex-column align-items-center';
  message.innerHTML = `
  <p class="success-message">Thank you! Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at
    <a class="success-message__link" href="mailto:support@loremgaming.com">support@loremgaming.com</a>. 
  </p> 
  <img class="success-img" src="./src/images/icon-thank-you.svg" alt="">`;
  return message;
}

function createInput(labelText, placeholder, id, type, value) {
  const inputWrapper = document.createElement('div');
  inputWrapper.className = '_input-wrapper d-flex flex-column';

  const label = document.createElement('label');
  label.className = '_input-label d-flex justify-content-between font-bold';
  label.htmlFor = id;

  const labelSpan = document.createElement('span');
  labelSpan.className = 'label-value';
  labelSpan.innerText = labelText;

  const labelError = document.createElement('span');
  labelError.className = 'label-error';

  const input = document.createElement('input');
  input.className = '_input';
  input.type = type;
  input.placeholder = placeholder;
  input.setAttribute('id', id);
  input.value = value;

  label.append(labelSpan, labelError);
  inputWrapper.append(label, input);
  return inputWrapper;
}

function createSelectItem(groupName, inputName, cost, imgPath, imgAlt, isYearly) {
  const selectItem = document.createElement('div');
  selectItem.className = 'select-item';

  const selectItemInput = document.createElement('input');
  selectItemInput.className = 'select-item__input';
  selectItemInput.type = 'radio';
  selectItemInput.name = groupName;
  selectItemInput.setAttribute('id', inputName);

  const selectItemLabel = document.createElement('label');
  selectItemLabel.className = 'select-item__label d-flex flex-sm-column flex-row';
  selectItemLabel.htmlFor = inputName;

  const selectItemImg = document.createElement('img');
  selectItemImg.className = 'select-item__img';
  selectItemImg.src = `src/${imgPath}`;
  selectItemImg.alt = imgAlt;

  const selectItemInfo = document.createElement('div');
  selectItemInfo.className = 'select-item__info d-flex flex-column justify-content-center';

  const selectItemName = document.createElement('p');
  selectItemName.className = 'select-item__name font-bold';
  selectItemName.innerText = inputName;

  const selectItemCost = document.createElement('p');
  selectItemCost.className = 'select-item__cost';

  if (isYearly) {
    selectItemCost.innerText = `$${cost}0/yr`;
    const selectItemSale = document.createElement('p');
    selectItemSale.className = 'select-item__sale';
    selectItemSale.innerText = '2 months free';
    selectItemInfo.append(selectItemName, selectItemCost, selectItemSale);
  } else {
    selectItemCost.innerText = `$${cost}/mo`;
    selectItemInfo.append(selectItemName, selectItemCost);
  }
  selectItemLabel.append(selectItemImg, selectItemInfo);
  selectItem.append(selectItemInput, selectItemLabel);
  return selectItem;
}

function createSwitcher(from, to, isChecked) {
  const switcher = document.createElement('div');
  switcher.className = 'switch-group d-flex justify-content-center';
  switcher.setAttribute('data-selected', from);

  const switcherLabel = document.createElement('label');
  switcherLabel.className = 'switch-label d-flex align-items-center';

  const switcherInput = document.createElement('input');
  switcherInput.className = 'switch-input';
  switcherInput.type = 'checkbox';
  switcherInput.checked = isChecked;

  const switcherFrom = document.createElement('span');
  switcherFrom.className = 'switch-item switch-from';
  switcherFrom.innerText = from;

  const switcherBtn = document.createElement('span');
  switcherBtn.className = 'switch-switcher';

  const switcherTo = document.createElement('span');
  switcherTo.className = 'switch-item switch-to';
  switcherTo.innerText = to;

  switcherLabel.append(switcherInput, switcherFrom, switcherBtn, switcherTo);
  switcher.append(switcherLabel);
  return switcher;
}
