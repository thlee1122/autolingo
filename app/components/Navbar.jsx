
import React, {Component} from 'react';
import { Link } from 'react-router';
import Instructions from './Instructions.jsx';
import languages from '../data/languages'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
    this.showInstruction = this.showInstruction.bind(this);
  }
      
  componentDidMount() {
    $('[data-submenu]').submenupicker();
  }

  showInstruction(event) {
    let show = !this.state.show;
    console.log(show);
    this.setState({show});
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <Link to="/" className="navbar-brand" >Auto<span className="lingo-blue">Lingo</span></Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">

              <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter Country" />
                </div>
                <button type="submit" className="btn btn-default">Go</button>
              </form>

              <li className="dropdown">
                <a data-submenu="" data-toggle="dropdown" className="dropdown-toggle" role="button" aria-expanded="false">Select Language <span className="caret"></span></a>
                <ul id="language-list" className="dropdown-menu">

                  {
                    languages.map( language => {
                        if ( language.length > 2 ) { //if there is more than 1 dialect
                          let dialects = language.slice(1,language.length) //we don't want to iterate over the main language
                          
                          return (
                            <li key={language} className="dropdown-submenu">
                              <a tabIndex="0">{language[0]}</a>
                              <ul className="dropdown-menu">
                                <li className="dropdown-header">Select Dialect</li>
                                { 
                                  dialects.map( dialect => {
                                    return (
                                    <li key={dialect}>
                                      <a onClick={()=>{
                                        dialect[0].split('-')[0] !== 'zh' ? 
                                          this.props.setUserLanguage(dialect[0].split('-')[0], dialect[0]) :
                                          this.props.setUserLanguage(dialect[0], dialect[0])
                                        }
                                      } data-langcode={

                                        dialect[0]

                                      } tabIndex="0">{dialect[1]}</a>
                                    </li>
                                    )} 
                                  ) 
                                }
                              </ul>
                            </li>
                          )
                        } else {
                          let dialect = language[1][0]
                          let langCode = language[1][0].split('-')[0]

                          return (
                            <li key={language}>
                              <a onClick={()=>{this.props.setUserLanguage(langCode, dialect)}} data-langcode={dialect} >{language[0]}</a>
                            </li>
                          )
                        }
                      }
                    )
                  }

                </ul>
              </li>
              
              {this.state.show && <Instructions showInstruction={this.showInstruction}/>}
              
              <li><a href="#" onClick={this.showInstruction}>Instructions</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
