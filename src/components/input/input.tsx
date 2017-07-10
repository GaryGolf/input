import * as React from 'react'
import * as styles from './input.css'
import * as Status from './status'

interface Icon {
    className:string
    onClick():void
}

interface Props {
    className?: string
    name?: string
    value?: string
    type?: string
    placeholder?: string
    pattern?: string
    title?: string
    maxLength?: number
    onFocus?:()=>void
    onBlur?:()=>void
    onChange?:(value:string)=>void
    onSubmit?:(value:string)=>void
}

interface State {
    status: string
}


export default class Input extends React.Component<Props, State> {

    private input: HTMLInputElement

    constructor(props:Props){
        super(props)
        this.state = {
            status: Status.normal
        }
    }

    handleFocus(){
        const status = Status.focused
        this.setState({status})
        if(!!this.props.onFocus) this.props.onFocus()
    }
    handleBlur(){
        const status = Status.normal
        this.setState({status})
        if(!!this.props.onBlur) this.props.onBlur()
    }
    handleChange(event){
        const value = event.target.value
        const status = !value? Status.normal:Status.changed
        this.setState({status})
        if(!!this.props.onChange) this.props.onChange(value)
    }

    handleSelect(event){
        const {onChange, onSubmit} = this.props
        const value = event.target.value
        if(!!onChange) onChange(value)
        if(!!onSubmit) onSubmit(value)
    }

    handleKeyUp(event) {
        const value = event.target.value
        const {onChange, onSubmit} = this.props

        switch(event.key){
            case 'Escape' :
                this.input.value = ''
                break
            case 'Enter' :
                this.setState({status: !value? Status.normal:Status.submited})
                if(!!onSubmit) onSubmit(value)
                break
        }
    }

    render(){

        const {name, type, placeholder, pattern, title, maxLength} = this.props

        const children = React.Children.toArray(this.props.children)
            .filter(item=>item['type']=='span')
            .map((item, idx) => <div key={idx} className={[styles['icon-container'],styles['icon-'+idx]].join(' ')}>{item}</div>)
       
        const inputProps = {name, type, placeholder, pattern, title, maxLength}
       
        return (
        <div className={styles.container} 
            data-status={this.state.status}>
            {!children[2]?<span className={styles['left-spacer']}/>:children[2]}
            <input {...inputProps} 
                ref={element=>this.input=element}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
                onKeyUp={this.handleKeyUp.bind(this)}
                onSelect={this.handleSelect.bind(this)}
            />
            {children.slice(0,2)}
        </div>
        )
    }
}