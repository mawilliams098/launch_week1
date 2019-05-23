import React, { Component } from 'react'


export class Search extends Component {



    constructor(props) {
        super(props);
        this.state = {
            restaraunts: props.restaraunt
        };

    }


    render() {
        return (
            
            <div>
                <form>
                    <input type="text"></input>
                </form>
            </div>
        )
    }
}

export default Search
