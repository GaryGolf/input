import * as React from 'react'

import Input from './input'
import TagInput from './tag-input'

interface Props {}
interface State {}

export default class Demo extends React.Component<null, null> {
    render(){

       

        return (
            <div style={{margin:'20px'}}>
                <br/><br/>
              
                <form onSubmit={e=>e.preventDefault()}>
                <Input
                    placeholder="ИНН"
                    name="inn"
                    value="334500002334"
                    maxLength={12}

                    pattern="[0-9]{12}"
                    title="Номер ИНН должен содержать 12 цифровых символов"
                    onFocus={()=>console.log('focus')}
                    // onBlur={()=>console.log('blur')}
                    // onChange={console.log}
                    onSubmit={console.log}
                    disabled
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