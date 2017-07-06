import * as React from 'react'
import * as styles from './tag-input.css'

interface Props {
    visible: boolean
    options:Array<MenuOption>
    onSelect(menuItem):void
    onClose():void
}

export default class Menu extends React.Component <Props, null> {

    render(){
        const {visible, options, onClose, onSelect} = this.props
        if(!visible || options.length) return null
        const menu = options
            .filter(item=>!item.selected)
            .map((item, idx)=>(
                <li key={idx}>
                    <a onClick={e=>onSelect(item)}>{item.name}</a>
                </li>
            ))
        if(!menu.length) return null
        return (
            <div>
                <div className={styles.overlay} onClick={onClose}/>
                <ul className="dropdown-menu" style={{display:'block'}}>
                    {menu}
                </ul>
            </div>
        )
    }
}