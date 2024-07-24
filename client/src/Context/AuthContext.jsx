import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user-data')) || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openAddTransaction, setOpenAddTransaction] = useState(false)
  const [darkMode, setDarkmode] = useState(localStorage.getItem('theme') || 'dark')
  const [editTransaction, setEditTransaction] = useState(null)
  const [currencySymbol, setCurrencySymbol] = useState(localStorage.getItem("currency-symbol") || '₹')
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, []);

  const setData = (data) => {
    setUserData(data)
    localStorage.setItem('user-data', JSON.stringify(data))
    setIsAuthenticated(true)
  }
  const setTokenValue = (token) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const handleOpenCLose = () => {
    setOpenAddTransaction(!openAddTransaction)
    setEditTransaction(null)
  }
  const signOut = () => {
    console.log("signOut done")
    localStorage.clear('token')
    localStorage.clear('user-data')
    setIsAuthenticated(false)
  }

  const setTheme = () => {
    setDarkmode(() => darkMode === 'light' ? "dark" : "light")
    localStorage.setItem('theme', darkMode)
  }
  return (
    <AuthContext.Provider
      value={{
        userData,
        setData,
        token,
        setTokenValue,
        isAuthenticated,
        openAddTransaction,
        darkMode,
        setTheme,
        editTransaction,
        setEditTransaction,
        currencySymbol,
        setCurrencySymbol,
        signOut,
        setOpenAddTransaction: handleOpenCLose
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
