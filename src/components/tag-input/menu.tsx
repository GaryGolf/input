import * as React from 'react'
import * as styles from './tag-input.css'

interface Props {
    options:Array<MenuOption>
    onSelect(menuItem):void
    onClose():void
}

export default class Menu extends React.Component <Props, null> {

    render(){
        const {options, onClose, onSelect} = this.props
        if(!options || !options.length) return null
        const menu = options.map((item, idx)=>(
            <li key={idx}>
                <a onClick={e=>{e.stopPropagation();onSelect(item)}}>{item.name}</a>
            </li>
        ))
        if(!menu.length) return null
        return (
            <div>
                <div className={styles.overlay} onClick={e=>{e.stopPropagation();onClose()}}/>
                <ul className="dropdown-menu" style={{display:'block'}}>
                    {menu}
                </ul>
            </div>
        )
    }
}