import { createContext, PropsWithChildren, useState } from "react";

export type CountryType = {
  id: string,
  name?: {
    common?: string,
    official?: string,
    nativeName?: any,
  },
  capital?: string,
  region?: string,
  subregion?: string,
  population?: number,
  languages?: any,
  currencies?: string[],
  borderCountries?: string[],
  tdl?: string[],
  flags?: {
    svg?: string,
    alt?: string
  }
}

export type AppContextType = {
  appState: AppStateType,
  toggleTheme:  () => void
}

export type AppStateType = {
  themeLight: boolean
}

const initialState: AppStateType = {
  themeLight: true
} 

export const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppContextProvider = ({children}: PropsWithChildren) =>{
  const [appState, setAppState] = useState(initialState)

  const toggleTheme = () => {
    const theme = !appState.themeLight
    setAppState({...appState, themeLight: theme})
  }

  const value: AppContextType = {
    appState,
    toggleTheme
  }

  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  )
}

export default AppContext