# React Components

__API will change, under active development__

## Local setup

- Install dependencies with `npm install`
- Run demo with `npm start`

## Components

### Input

- name: string 
- defaultValue: string
- className: string
- placeholder: string
- pattern: string
- title: string
- disabled: boolean
- autoFocus: boolean
- maxLength: number
- error: string
- warning: string
- onFocus():void
- onBlur():void
- onChange(value:string):void
- onSubmit(value:string):void
- children up to 3 icons: `<span className="glyphicon glyphicon-ok" onClick={this.handleClick.bind(this)}/>`
