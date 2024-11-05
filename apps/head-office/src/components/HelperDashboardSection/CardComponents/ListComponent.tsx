import React from 'react'

const ListComponent = ({componentValue}: {componentValue: any}) => {
    return (
        <div className='w-full h-full'>
            {
                componentValue?.listItemData.map((item: any) => {
                    return (
                        <li key={Object.keys(item)[0]} className='text-xl'>
                            <div className='flex items-start justify-between'>
                                <div className='text-md'>{Object.keys(item)[0]}</div>
                                <div className='text-md'>{item[Object.keys(item)[0]]}</div>
                            </div>
                        </li>
                    )
                })
            }
        </div>
    )
}

export default ListComponent