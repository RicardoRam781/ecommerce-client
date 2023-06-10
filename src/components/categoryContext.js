import React,{Children, createContext,useState} from 'react'

export const CategoryContext = createContext(null)


export default function CategoryProvider({children}) {
    const [category,setCategory] = useState("general")
  return (
    <CategoryContext.Provider value={[category,setCategory]}>
        {children}
    </CategoryContext.Provider>
  )
}
