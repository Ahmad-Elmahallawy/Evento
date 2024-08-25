const getRegistrationErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Your password is too weak. Please use a stronger password.";
    case "auth/operation-not-allowed":
      return "Registration is currently disabled. Please try again later.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};


const getLoginErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

export {getLoginErrorMessage, getRegistrationErrorMessage};