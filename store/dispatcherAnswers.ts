/*
There is set of answers for dispatcher
*/

interface IConstruction {
  type: "addNotification";
  payload: {
    type: "bad" | "good";
    title: string;
    text: string;
  };
}

export const badAnswer: IConstruction = {
  type: "addNotification",
  payload: {
    type: "bad",
    title: "Помилка ;(",
    text: "Спробуйте пізніше, або перезайдіть в аккаунт."
  }
};
