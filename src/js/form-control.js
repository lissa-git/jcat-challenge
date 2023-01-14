import { createBtn, createPersonalInfoForm, createPlanSelectionForm, createSucceedMessage, createSummaryInfo } from "./create-fields-functions.js";

export default function formControl() {
  const state = {
    planSelectionForm: {
      currentStep: 'personal-info',
      data: {
        name: '',
        email: '',
        phone: '',
        selectedPlan: {
          name: 'Arcade',
          periodicity: 'Monthly',
        },
      },
      errors: [],
    },
  };

  const plans = [
    {
      name: 'Arcade',
      cost: '9',
      img: {
        path: 'images/icon-arcade.svg',
        alt: 'plan icon',
      },
    },
    {
      name: 'Advanced',
      cost: '12',
      img: {
        path: 'images/icon-advanced.svg',
        alt: 'plan icon',
      },
    },
    {
      name: 'Pro',
      cost: '15',
      img: {
        path: 'images/icon-pro.svg',
        alt: 'plan icon',
      },
    },
  ];

  const steps = [
    {
      id: '1',
      name: 'personal-info',
    },
    {
      id: '2',
      name: 'plan',
    },
    {
      id: '3',
      name: 'summary',
    },
    {
      id: '4',
      name: 'succeed',
    },
    {
      id: 'errors',
      name: 'invalid-inputs',
    },
  ];

  const form = document.querySelector('.plan-selection__form');
  const formTitle = form.querySelector('.plan-selection__form-title');
  const formDescr = form.querySelector('.plan-selection__form-descr');
  const formFields = form.querySelector('.plan-selection__form-fields');
  const formBtns = form.querySelector('.plan-selection__form-btns');
  const formSidebar = document.querySelector('.plan-selection__sidebar');
  const formSidebarSteps = formSidebar.querySelectorAll('.plan-selection__sidebar-step');

  function render() {
    formBtns.innerHTML = '';
    form.dataset.state = steps.find(el => el.name === (state.planSelectionForm.currentStep)).id;
    formSidebarSteps.forEach(step => {
      step.classList.remove('step--active');
    });

    switch (state.planSelectionForm.currentStep) {
      case 'personal-info': {
        formTitle.innerText = 'Personal Info';
        formDescr.innerText = 'Please provide your name, email address, and phone number.';
        formFields.innerHTML = '';
        const nameValue = state.planSelectionForm.data.name;
        const emailValue = state.planSelectionForm.data.email;
        const phoneValue = state.planSelectionForm.data.phone;
        formFields.append(...createPersonalInfoForm(nameValue, emailValue, phoneValue));
        formBtns.append(createBtn('next', 'Next Step'));
        formSidebar.querySelector('[data-name="personal-info"]').classList.add('step--active');
        break;
      }
      case 'invalid-inputs': {
        formTitle.innerText = 'Personal Info';
        formDescr.innerText = 'Please provide your name, email address, and phone number.';
        const errorsText = formFields.querySelectorAll('.label-error');
        errorsText.forEach(errorText => {
          errorText.innerText = '';
          errorText.parentElement.nextElementSibling.classList.remove('_errror');
        });
        state.planSelectionForm.errors.forEach(error => {
          formFields.querySelector(`#${error.errorName}`).previousElementSibling.lastElementChild.innerText = error.errorValue;
          formFields.querySelector(`#${error.errorName}`).classList.add('_errror');
        });
        formBtns.append(createBtn('next', 'Next Step'));
        formSidebar.querySelector('[data-name="personal-info"]').classList.add('step--active');
        break;
      }
      case 'plan': {
        formTitle.innerText = 'Select your plan';
        formDescr.innerText = 'You have the option of monthly or yearly billing.';
        formFields.innerHTML = '';
        const selectedPlanName = state.planSelectionForm.data.selectedPlan.name;
        const selectedPlanPeriodicity = state.planSelectionForm.data.selectedPlan.periodicity;
        formFields.append(...createPlanSelectionForm(plans, selectedPlanName, selectedPlanPeriodicity));
        formBtns.append(createBtn('prev', 'Go Back'), createBtn('next', 'Next Step'));
        formSidebar.querySelector('[data-name="plan"]').classList.add('step--active');
        break;
      }
      case 'summary': {
        formTitle.innerText = 'Finishing up';
        formDescr.innerText = 'Double-check everything looks OK before confirming.';
        formFields.innerHTML = '';
        const planName = state.planSelectionForm.data.selectedPlan.name;
        const planPeriodicity = state.planSelectionForm.data.selectedPlan.periodicity;
        const planCost = (plans.find(el => el.name === planName)).cost;
        const summaryPlanCost = planPeriodicity === 'Monthly' ? `$${planCost}/mo` : `$${planCost}0/yr`;
        formFields.append(...createSummaryInfo(planName, summaryPlanCost, planPeriodicity));
        formBtns.append(createBtn('prev', 'Go Back'), createBtn('confirm', 'Confirm'));
        formSidebar.querySelector('[data-name="summary"]').classList.add('step--active');
        break;
      }
      case 'succeed':
        formTitle.innerText = '';
        formTitle.hidden = true;
        formDescr.innerText = '';
        formDescr.hidden = true;
        formFields.innerHTML = '';
        formFields.append(createSucceedMessage());
        formSidebar.classList.add('_locked');
        break;
      default:
        break;
    }
  }

  function grabInputsData() {
    const inputsData = [];
    const inputs = formFields.querySelectorAll('input');
    inputs.forEach(input => {
      inputsData.push({
        name: input.getAttribute('id'),
        value: input.value,
      });
    });
    return inputsData;
  }

  function validate(data) {
    const errors = [];
    data.forEach(item => {
      if (item.value.trim() === '') {
        errors.push({
          errorName: item.name,
          errorValue: 'This field is required',
        });
      } else {
        switch (item.name) {
          case 'email':
            if (!item.value.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
              errors.push({
                errorName: item.name,
                errorValue: 'Incorrect email address',
              });
            }
            break;
          case 'phone':
            if (!item.value.replace(/[ ()-]/g, '').match(/^[+]{0,}\d{7,15}$/)) {
              errors.push({
                errorName: item.name,
                errorValue: 'Incorrect phone number',
              });
            }
            break;
          default:
            break;
        }
      }
    });
    return errors;
  }

  function updatePersonalInfo() {
    let hasErrors = null;
    const inputsData = grabInputsData();
    state.planSelectionForm.errors = validate(inputsData);
    if (state.planSelectionForm.errors.length === 0) {
      inputsData.forEach(item => {
        state.planSelectionForm.data[item.name] = item.value;
      });
      hasErrors = false;
    } else {
      hasErrors = true;
    }
    return hasErrors;
  }

  function updateSelectedPlanInfo() {
    const plans = formFields.querySelectorAll('.select-item__input');
    plans.forEach(plan => {
      if (plan.checked) state.planSelectionForm.data.selectedPlan.name = plan.id;
    });
    const periodicityRadio = formFields.querySelector('.switch-input');
    state.planSelectionForm.data.selectedPlan.periodicity = periodicityRadio.checked ? 'Yearly' : 'Monthly';
  }

  render();

  let formState = new Proxy(state.planSelectionForm, {
    set(target, name, value) {
      target[name] = value;
      render();
      return true;
    },
  });

  formBtns.addEventListener('click', (e) => {
    const formStepName = form.dataset.state;
    switch (e.target.dataset.btn) {
      case 'prev': {
        if (formStepName === '2') updateSelectedPlanInfo();
        const prevState = steps[+steps.findIndex(el => el.id === formStepName) - 1].name;
        formState.currentStep = prevState;
        break;
      }
      case 'next':
        switch (formStepName) {
          case 'errors':
          case '1': {
            formState.currentStep = updatePersonalInfo() ? 'invalid-inputs' : 'plan';
            break;
          }
          case '2': {
            updateSelectedPlanInfo();
            const nextState = steps[+steps.findIndex(el => el.id === formStepName) + 1].name;
            formState.currentStep = nextState;
            break;
          }
          default: {
            const nextState = steps[+steps.findIndex(el => el.id === formStepName)+1].name;
            formState.currentStep = nextState;
            break;
          }
        }
        break;
      case 'confirm':
        formState.currentStep = 'succeed';
        break;
      default:
        break;
    }
  });

  formSidebar.addEventListener('click', (e) => {
    switch (state.planSelectionForm.currentStep) {
      case 'personal-info':
      case 'invalid-inputs':
        formState.currentStep = updatePersonalInfo() ? 'invalid-inputs' : e.target.closest('.sidebar-step').dataset.name;
        break;
      case 'succeed':
        break;
      case 'plan': {
        updateSelectedPlanInfo();
        formState.currentStep = e.target.closest('.sidebar-step').dataset.name;
        break;
      }
      default:
        formState.currentStep = e.target.closest('.sidebar-step').dataset.name;
        break;
    }
  });

  formFields.addEventListener('click', (e) => {
    if (e.target.closest('.switch-input')) {
      updateSelectedPlanInfo();
      render();
    } else if (e.target.className === 'selected-plan__change-btn') {
      formState.currentStep = 'plan';
    }
  });
}
