import * as React from 'react'
import * as styles from './tag-input.css'

import DropDownMenu from './menu'

interface MenuItem {
    name: string
    value: string
    selected?: boolean
}
declare type Menu = Array<MenuItem>

interface Props {
    onSelect(selected:string[]):void
    selected: Array<string>
}
interface State {
    menu: Menu
    input: string
}
interface Child {
    props: {
        children: string
        value: string
        selected?: boolean
    }
}

export default class TagInput extends React.Component <Props, State> {
    private menu: MenuItem[]
    private selected: string[]
    private input: HTMLInputElement

    private hidden: HTMLSpanElement
    private inputValue: string
    private inputWidth: number

    constructor(props){
        super(props)
        this.state = {
            menu: [],
            input: ''
        }

        this.handleInput = this.handleInput.bind(this)
        this.inputValue = ''
        this.inputWidth = 30
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({value: v.props.value, name: v.props.children, selected: v.props.selected || false}))
        this.selected = this.menu.filter(item=>item.selected).map(item=>item.value) 
       
    }

    componentWillReceiveProps(nextProps){
        const children =  React.Children.toArray(nextProps.children) as Child[]
        this.menu = children.map(v=>({value: v.props.value, name: v.props.children, selected: v.props.selected || false}))
        this.selected = this.menu.filter(item=>item.selected).map(item=>item.value) 
    }

    handleFocus(){
        this.setState({menu:this.menu})
        if(this.input) this.input.focus()
    }

    handleInput(event: React.KeyboardEvent<HTMLInputElement>) {

        const val = event.target['value']
        const input = val.length > 30 ? this.inputValue : val

        switch(event.key){
            case 'Escape' :
                this.setState({menu:[]})
                break
            case 'Backspace' :
                if(!this.inputValue) this.removeLastTag()
                break
            case 'Enter' :
                console.log(input)
                if (!!this.input.value && !!this.menu.length) {
                    const menuItem = this.menu
                        .filter(item=>!item.selected)
                        .find(v => v.name.toLowerCase().includes(input.toLowerCase()))
                    if(!menuItem) break
                   this.addTag(menuItem)
                }
                break
            default :        
                this.setState({menu:this.menu.filter(item=>item.name.toLowerCase().includes(input.toLowerCase()))})
        }
        this.input.value = input
        this.inputValue = input
        this.inputWidth = this.hidden.offsetWidth + 30
        this.setState({input})
    }

    addTag(tag:MenuOption){

        // console.log('addTag',tag.name)
        const menuItem = this.menu
            .find(item=>item.value==tag.value)
        menuItem.selected = true
        this.selected.push(menuItem.value)
        this.setState({menu:this.menu})
        this.props.onSelect(this.selected)
    }

    removeTag(tag: string): void {
        // console.log(tag)
        const menuItem = this.menu.find(item=>item.value==tag)
        menuItem.selected = false
        this.selected = this.selected.filter(item=>item!=tag)
        this.setState({menu:[]})
        this.props.onSelect(this.selected)
    }

    removeLastTag(): void {


        if(!this.selected.length) return this.setState({menu:[]})
        const val = this.selected.pop()
        // this.setState({selected}, this.onSelect)
        const tag = this.menu.find(item=>item.value==val)
        if(!tag) return
        tag.selected = false
        // if(!this.state.menu.length) return
        this.setState({menu:[]})
         this.props.onSelect(this.selected)
    }

    closeMenu(){
        console.log('close menu')
        const menu = []
        this.setState({menu})
    }




    onSelect(){
        // if(this.props.onSelect) this.props.onSelect(this.state.selected)
    }

    // getMenu(): MenuItem[] {
    //     return this.menu
    //         .filter(item => !this.state.selected.some(key => item.key==key))
    //         .filter(item => item.value.toUpperCase().includes(this.inputValue.toUpperCase()))
    // }

  

    render(){

        // console.log('render', this.selected)

        if(!this.menu) return null

        const tagStyle = ['label', 'label-default',  styles.tag].join(' ')
        const inputStyle = [styles.input].join(' ')
        const formStyle = [styles.form].join(' ')
        const containerStyle = [
            'form-control',
            styles.container,
            !this.state.menu.length ? null : styles.active
        ].join(' ')

        const tags = this.menu
            .filter(item=>item.selected)
            .map((item, idx)=>(
             <span key={idx}
                className={tagStyle}
                onClick={event => {
                    event.stopPropagation()
                    this.removeTag(item.value) 
                    console.log('huh')
                }}
            >
                {item.name}
                <span data-role="remove"></span>
            </span>
        ))
        
        const width = this.inputWidth+'px'

        return (
            <div 
                className={containerStyle}
                onDoubleClick={()=>this.removeTag('')}
                onClick={this.handleFocus.bind(this)}
                >
                <div className={styles.form}>
                    {tags}
                    <input 
                        type="text" 
                        style={{width}}
                        className={inputStyle}
                        ref={element=>this.input=element}
                        onKeyUp={this.handleInput}/>
                </div>
                <span className={styles.hidden}
                    ref={span=>this.hidden = span}>
                    {this.state.input}
                </span>
                <DropDownMenu
                    onSelect={this.addTag.bind(this)}
                    onClose={this.closeMenu.bind(this)}
                    options={this.state.menu.filter(o=>!o.selected)}
                />
            </div>
        )
    }
}