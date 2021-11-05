export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userAvatar = document.querySelector(userAvatar)
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    const dataUser = {};
    dataUser.username = this._userName.textContent;
    dataUser.userjob = this._userJob.textContent;

    return dataUser;
  }

  // метод принимает новые данные пользователя
  setUserInfo({ username, userjob }) {
    this._userName.textContent = username;
    this._userJob.textContent = userjob
  }

  setUserAvatar({ useravatar }) {
    this._userAvatar.src = useravatar
  }
}
