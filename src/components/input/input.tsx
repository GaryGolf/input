import * as React from 'react'
import * as styles from './input.css'
interface Props {}
interface State {}

export default class Input extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
    }

    render(){
        return (
        <div className={styles.container}>
            <input type="text" placeholder="введите текст"/>
        </div>
        )
    }
}