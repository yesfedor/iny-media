import toastr from '../mixins/Toastr'

const Handler = {
  user (status) {
    switch (status) {
      case 1001:
        toastr.info('Enter your real name')
        break
      case 1002:
        toastr.info('Enter your real surname')
        break
      case 1003:
        toastr.info('Enter your real date of birth, you must be over 13 years old')
        break
      case 1004:
        toastr.info('You must be over 13 years old')
        break
      case 1006:
        toastr.info('The account with the specified email address was not found')
        break
      case 1007:
        toastr.info('This email already has an account')
        break
      case 1008:
        toastr.info('The specified email address is not valid')
        break
      case 1009:
        toastr.info('Enter a password that exceeds 7 characters')
        break
      case 1010:
        toastr.info('Invalid password')
        break
    }
  }
}

export default Handler
