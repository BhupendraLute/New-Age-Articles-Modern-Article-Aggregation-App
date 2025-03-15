import { configureStore } from '@reduxjs/toolkit'
import ArticleCategories from './features/ArticleCategories'

export const makeStore = () => {
  return configureStore({
    reducer: {
      ArticleCategories,
    },
  })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']