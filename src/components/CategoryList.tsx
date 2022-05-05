import * as React from 'react'
import { useCategoryState } from '../stateManagement/ContextProvider'
import Category from './Category'

interface Props {}

const CategoryList: React.FunctionComponent<Props> = () => {
  const { state: categoryList } = useCategoryState()
  // dispatch actions related with category

  return (
    <div className='flex flex-col md:flex-row md:flex-wrap'>
      {categoryList.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoryList
