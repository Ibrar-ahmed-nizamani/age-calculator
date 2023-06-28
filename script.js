'use strict';

let dayDate;
let monthDate;
let yearDate;
let birthDay;
let birthMonth;
let birthYear;

const dayDisplay = document.querySelector('.day-display');
const monthDisplay = document.querySelector('.month-display');
const yearDisplay = document.querySelector('.year-display');
const formEl = document.querySelector('form');
const btn = document.querySelector('button');

const curDateYear = new Date().getFullYear();

const correctInputFields = function (date) {
  document.querySelector(`.${date}-input`).classList.remove('border-error');
  document.querySelector(`.valid--${date}`).classList.add('hidden');
  document.querySelector(`.no-field-${date}`).classList.add('hidden');
  document.querySelector(`.label_${date}`).classList.remove('error-show');
};

const noInputField = function (date) {
  document.querySelector(`.valid--${date}`).classList.add('hidden');
  document.querySelector(`.label_${date}`).classList.add('error-show');
  document.querySelector(`.no-field-${date}`).classList.remove('hidden');
  document.querySelector(`.${date}-input`).classList.add('border-error');
};
const inValidInput = function (date) {
  document.querySelector(`.${date}-input`).classList.add('border-error');
  document.querySelector(`.no-field-${date}`).classList.add('hidden');
  document.querySelector(`.valid--${date}`).classList.remove('hidden');
  document.querySelector(`.label_${date}`).classList.add('error-show');
};

const calculateAge = (dd, mm, yyyy) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  birthYear = currentYear - yyyy;
  birthMonth = currentMonth - mm;
  birthDay = currentDay - dd;

  // Adjust for cases where birth month/day is later than current month/day
  if (birthMonth < 0 || (birthMonth === 0 && birthDay < 0)) {
    birthYear--;
    birthMonth += 12;
  }
  // new Date(yyyy, mm - 1, 0).getDate()
  if (birthDay < 0) {
    const daysInPreviousMonth = 31;
    birthDay += daysInPreviousMonth;
    birthMonth--;
  }

  return birthYear, birthMonth, birthDay;
};

btn.addEventListener('click', function () {
  let dayInput = +document.querySelector('.day-input').value;
  let monthInput = +document.querySelector('.month-input').value;
  let yearInput = +document.querySelector('.year-input').value;

  if (
    dayInput <= new Date(yearInput, monthInput, 0).getDate() &&
    dayInput >= 1
  ) {
    correctInputFields('day');
    dayDate = dayInput;
  } else if (!dayInput) {
    noInputField('day');
  } else if (
    dayInput > new Date(yearInput, monthInput, 0).getDate() ||
    dayInput <= 0 ||
    dayInput > 31
  ) {
    inValidInput('day');
  }

  if (monthInput <= 12 && monthInput >= 1) {
    correctInputFields('month');
    monthDate = monthInput;
  } else if (!monthInput) {
    noInputField('month');
  } else if (monthInput > 12 || monthInput <= 0) {
    inValidInput('month');
  }
  if (yearInput <= curDateYear && yearInput >= 1900) {
    correctInputFields('year');
    yearDate = yearInput;
  } else if (!yearInput) {
    noInputField('year');
  } else if (yearInput > curDateYear || yearInput < 1900) {
    inValidInput('year');
  }

  if (!monthDate || !dayDate || !yearDate) return;

  calculateAge(dayDate, monthDate, yearDate);

  if (birthYear < 0) return;

  // dayDisplay.textContent = birthDay;
  // monthDisplay.textContent = birthMonth;
  // yearDisplay.textContent = birthYear;

  let countDay = 0;
  let countMonth = 0;
  let countYear = 0;

  const animateDay = function () {
    dayDisplay.textContent = countDay;

    countDay++;
    if (countDay <= birthDay) {
      setTimeout(animateDay, 40);
    }
  };
  animateDay();
  const animateMonth = function () {
    monthDisplay.textContent = countMonth;

    countMonth++;
    if (countMonth <= birthMonth) {
      setTimeout(animateMonth, 40);
    }
  };
  animateMonth();
  const animateYear = function () {
    yearDisplay.textContent = countYear;

    countYear++;
    if (countYear <= birthYear) {
      setTimeout(animateYear, 40);
    }
  };
  animateYear();

  dayDate = 0;
  dayInput = 0;
  monthDate = 0;
  monthInput = 0;
  yearInput = 0;
  yearDate = 0;
});
