export const useAuth = () => {
  const user = ref(null);
  const token = ref(null);

  const loadAuth = () => {
    const storedUser = process.client ? localStorage.getItem('user') : null;
    const storedToken = process.client ? localStorage.getItem('token') : null;
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    }
  };

  const saveAuth = (userData, userToken) => {
    user.value = userData;
    token.value = userToken;
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userToken);
    }
  };

  const login = async (username, password) => {
    const config = useRuntimeConfig();
    const { data } = await useFetch(`${config.public.apiBase}/auth/signin`, {
      method: 'POST',
      body: { username, password }
    });

    console.log(config.public.apiBase+"apiBASE")
    
    if (data.value && data.value.accessToken) {
      saveAuth(data.value, `${data.value.tokenType} ${data.value.accessToken}`);
    }
  };

  const signup = async (username, email, password) => {
    const config = useRuntimeConfig();
    const { data } = await useFetch(`${config.public.apiBase}/auth/signup`, {
      method: 'POST',
      body: { username, email, password }
    });
    if (data.value && data.value.id) {
      await login(username, password); // 회원가입 후 자동으로 로그인
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    if (process.client) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    useRouter().push('/login')
  };

  loadAuth();

  return { user, token, login, signup, logout };
};
