import * as React from 'react'

import Input from './input'
import TagInput from './tag-input'

interface Props {}
interface State {}

export default class Demo extends React.Component<null, null> {
    render(){
        return (
            <div>
                <br/><br/>
                <TagInput
                    selected={[]}
                    onSelect={console.log}
                >
                    <option value='1234134' selected>Cabbalah</option>
                    <option value='1234s3454' selected>Cabbage</option>
                </TagInput>
                <Input
                icons={["glyphicon glyphicon-ok-sign","glyphicon glyphicon-plus-sign"]} 
                    // icons={["glyphicon glyphicon-ok-sign","glyphicon glyphicon-plus-sign","glyphicon glyphicon-question-sign"]}
                />
            </div>
        )
    }
}