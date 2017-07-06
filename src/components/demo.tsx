import * as React from 'react'

import Input from './input'

interface Props {}
interface State {}

export default class Demo extends React.Component<null, null> {
    render(){
        return <Input
         icons={["glyphicon glyphicon-ok-sign","glyphicon glyphicon-plus-sign"]} 
            // icons={["glyphicon glyphicon-ok-sign","glyphicon glyphicon-plus-sign","glyphicon glyphicon-question-sign"]}
        />
    }
}