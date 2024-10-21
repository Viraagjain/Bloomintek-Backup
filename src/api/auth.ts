export const signupApi = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Signup successful!' });
    }, 1000);
  });
};

export const loginApi = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Login successful!' });
    }, 1000);
  });
};
