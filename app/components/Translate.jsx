
import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'
import { googleTranslate } from '../reducers/translate'


class Translate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let input = e.target.value
    this.props.translateActionCreator(1, 'en', input)
    // this.setState ({ text: input })
  }




  render () {
    let text = this.state.text
    let handleChange = this.handleChange
    let googleTranslate = this.props.googleTranslate


    return (
      <div>
        <input name="input" type='textarea' value={text} onChange={handleChange}></input>

        <h2> {this.props.en}</h2>
        <h2> {this.props.fr}</h2>
        <h2> {this.props.ko}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    en: state.translations.en,
    fr: state.translations.fr,
    ko: state.translations.ko
  }
}

import { translateActionCreator } from '../reducers/translate'

export default connect(mapStateToProps, {translateActionCreator})(Translate)
