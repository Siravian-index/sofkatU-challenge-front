import * as React from 'react'
import { useCategoryState } from '../stateManagement/ContextProvider'

interface Props {}

const CategoryList: React.FunctionComponent<Props> = () => {
  const { state: categoryList } = useCategoryState()

  return (
    <div>
      <div>{/* {categoryList.map((category) => )} */}</div>
    </div>
  )
}

export default CategoryList
