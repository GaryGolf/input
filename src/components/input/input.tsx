import * as React from 'react'
import * as styles from './input.css'

interface Icon {
    className:string
    onClick():void
}

interface Props {
    className?: string
    type?: string
    placeholder?: string
    name?: string
    title?: string
    icons?: Array<string>
}
interface State {}

export default class Input extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
    }

    render(){
      
        const icons = [
            !this.props.icons || !this.props.icons[0] ? null : 
            <div className={styles['icon-container']}>
                <span className={this.props.icons[0]}/>
            </div>,
            !this.props.icons || !this.props.icons[1] ? null : 
            <div className={styles['icon-container']}>
                <span className={this.props.icons[1]}/>
            </div>,
            !this.props.icons || !this.props.icons[2] ? <div className={styles['left-spacer']}/> : 
            <div className={styles['icon-container']}>
                <span className={this.props.icons[2]}/>
            </div>
        ]
        return (
        <div className={styles.container}>
            {icons[2]}
            <input type="text" placeholder="введите текст"/>
            <div className={styles.spacer}/>
            {icons[1]}
            {icons[0]}
        </div>
        )
    }
}