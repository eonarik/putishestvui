// клонирование многоуровневого объекта или массива
export const clone = obj => JSON.parse(JSON.stringify(obj));

// случайное число от min до max
export const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// генерация уникального числа
export const uid = () => Number(String(Math.random()).replace(/\D/g, ""));
