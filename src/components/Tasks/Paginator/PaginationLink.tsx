import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PaginationLinkPropsType = DefaultButtonPropsType & {
    active: boolean
}


export const PaginationLink: FC<PaginationLinkPropsType> = (
    {
        active, ...restProps
    }
) => {

    const style = `${active ? 'px-6 py-4' : 'py-3'} 
                 inline-block px-5 mx-2 border-2 text-gb-text text-xl rounded-md border-gb-text 
                 hover:text-gb-light hover:border-gb-light focus:outline-none`
    return (
        <button className={style} {...restProps}/>
    )
}
