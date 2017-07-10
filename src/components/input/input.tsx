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
    defaultValue?: string
    type?: string
    placeholder?: string
    pattern?: string
    title?: string
    disabled?: boolean
    maxLength?: number
    error?: string
    warning?: string
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
        const {disabled, error, warning} = props
        const status = disabled? Status.disabled : !!error? Status.error : !!warning? Status.warning :Status.normal
        this.state = { status }
    }

    componentWillReceiveProps(nextProps) {
        const {disabled, error, warning} = nextProps
        const status = disabled? Status.disabled : !!error? Status.error : !!warning? Status.warning :Status.success
        this.setState({status})    
        console.log(status)
    }

    handleFocus(){
        const status = Status.focused
        if(this.props.disabled) return
        this.setState({status})
        if(!!this.props.onFocus) this.props.onFocus()
    }
    handleBlur(){
        const status = Status.normal
        if(this.props.disabled) return
        this.setState({status})
        if(!!this.props.onBlur) this.props.onBlur()
    }
    handleChange(event){
        const value = event.target.value
        if(this.props.disabled) return
        const status = !value? Status.normal:Status.changed
        this.setState({status})
        if(!!this.props.onChange) this.props.onChange(value)
    }

    handleSelect(event){
        const {onChange, onSubmit} = this.props
        const value = event.target.value
        if(!!onChange) onChange(value)
    }

    handleKeyUp(event) {
        const value = event.target.value
        const {onChange, onSubmit} = this.props
        if(this.props.disabled) return

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

        const {name, type, defaultValue, placeholder, pattern, title, maxLength, disabled} = this.props

        const children = React.Children.toArray(this.props.children)
            .filter(item=>item['type']=='span')
            .map((item:any, idx) => <div key={idx} 
                onClick={e=>disabled?e.stopPropagation():item.props.onClick(e)}
                className={[styles['icon-container'],styles['icon-'+idx]].join(' ')}>
                <span className={item.props.className}/>
                </div>)
       
        const inputProps = {name, type, defaultValue, placeholder, pattern, title, maxLength, disabled}
       
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
            <span className={styles['error-message']}>{this.props.error || this.props.warning}</span>
            {children.slice(0,2)}
        </div>
        )
    }
}