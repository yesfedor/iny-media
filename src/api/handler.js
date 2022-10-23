import toastr from '../mixins/Toastr'

const Handler = {
  user (status) {
    switch (status) {
      case 1001:
        toastr.info('Укажите свое настоящее имя')
        break
      case 1002:
        toastr.info('Укажите настоящую фамилию')
        break
      case 1003:
        toastr.info('Введите свою реальную дату рождения, вам должно быть больше 13 лет')
        break
      case 1004:
        toastr.info('Вам должно быть больше 13 лет')
        break
      case 1006:
        toastr.info('Учетная запись с указанным адресом электронной почты не найдена')
        break
      case 1007:
        toastr.info('У этой эл почты уже есть учетная запись')
        break
      case 1008:
        toastr.info('Указанный адрес электронной почты недействителен')
        break
      case 1009:
        toastr.info('Введите пароль, длина которого превышает 7 символов')
        break
      case 1010:
        toastr.info('Неверный пароль')
        break
    }
  }
}

export default Handler
