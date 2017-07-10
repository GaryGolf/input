import * as React from 'react'

import Input from './input'
import TagInput from './tag-input'

interface Props {}
interface State {
    error: string
    warning: string
}

export default class Demo extends React.Component<Props, State> {
    
    constructor(props:Props){
        super(props)

        this.state = {
            error: null,
            warning: null,
        }
    }

    handleInputSubmit(value: string){
        if(value.length!=12){
            const error = 'Номер ИНН должен содержать 12 цифровых символов'
            const warning = null
            return this.setState({error, warning})
        } else if(value!="334500002334") {
            const error = null;
            const warning = 'Желательно, чтобы ИНН совпадал с "334500002334"'
            return this.setState({error, warning})
        } else {
            const error = null;
            const warning = null
            return this.setState({error, warning})
        }
    }

    render(){


        return (
            <div style={{margin:'20px'}}>
                <br/><br/>
              
                <form onSubmit={e=>e.preventDefault()}>
                <Input
                    placeholder="ИНН"
                    name="inn"
                    defaultValue="334500002334"
                    maxLength={12}

                    pattern="[0-9]{12}"
                    title="Номер ИНН должен содержать 12 цифровых символов"
                    // onFocus={()=>console.log('focus')}
                    // onBlur={()=>console.log('blur')}
                    // onChange={console.log}
                    onSubmit={this.handleInputSubmit.bind(this)}
                    error={this.state.error}
                    warning={this.state.warning}
                >
                    <span 
                        className="glyphicon glyphicon-ok-sign"
                        onClick={()=>console.log('ok')}
                    />
                    <span 
                        className="glyphicon glyphicon-plus-sign"
                        onClick={()=>console.log('plus')}
                    />
                    <span 
                        className="glyphicon glyphicon-question-sign"
                        onClick={()=>console.log('question')}
                    />
                </Input>
                </form>
            </div>
        )
    }
}