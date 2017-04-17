/**
* Conversation UI
*/

import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'

import Container from '../primitives/Container'
import Message from '../components/Message'
import MessageArea from '../primitives/MessageArea'
import Loading from '../components/Loading'

class Conversation extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      questions: props.questions.map(question => {
        return {
          ...question,
          sender: 'BOT'
        }
      }),
      questionNumber: 0,
      disableUserInput: false,
      messages: [],
      loadingBot: false
    }
    console.log(this.state)
  }

  componentWillMount () {
    const { questions, questionNumber } = this.state

    this.setState({
      ...this.state,
      messages: [
        questions[questionNumber]
      ]
    })
  }

  handleUserInput (e) {
    e.preventDefault()
    this.setState({
      userInput: e.target.value
    })
  }

  handleButtonSelect (select) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          text: select.text,
          type: 'USER'
        }
      ]
    }, () => {
      this.nextQuestion(select.connect)
    })
  }

  nextQuestion (connect = 0) {
    this.setState({
      questionNumber: connect,
      loadingBot: true
    }, () => {
      this.setState({
        messages: [
          ...this.state.messages,
          this.state.questions[this.state.questionNumber]
        ],
        loadingBot: false
      }, () => {
        if (this.state.questions[this.state.questionNumber].connect) {
          this.nextQuestion(this.state.questions[this.state.questionNumber].connect)
        }
        // if (this.state.questions[this.state.questionNumber].type == 'end') {
        //   this.setState({
        //     messages: [
        //       ...this.state.messages,
        //       this.state.questions[this.state.questionNumber]
        //     ],
        //     loadingBot: false
        //   })
        // }
      })
    })
  }

  nextQuestion1 () {
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      loadingBot: true
    }, () => {
      if (this.state.questionNumber < this.state.questions.length) {
        setTimeout(() => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.state.questions[this.state.questionNumber]
            ],
            loadingBot: false
          })

          if (this.state.questions[this.state.questionNumber].buttons) {
            this.setState({
              disableUserInput: true
            })
          } else {
            this.setState({
              disableUserInput: false
            })
            this.userInput.focus()
          }
        }, 500)
      } else {
        setTimeout(() => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.finalMessage()
            ],
            loadingBot: false,
            disableUserInput: true
          })
          this.props.onEnded(this.state.answers)
        }, 500)
      }
    })
  }

  submitUserInput (e) {
    e.preventDefault()
    if (this.state.userInput.length > 0) {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: this.state.userInput,
            type: 'USER'
          }
        ],
        answers: this.state.questions[this.state.questionNumber].key ? {
          ...this.state.answers,
          [this.state.questions[this.state.questionNumber].key]: this.state.userInput
        } : {
          ...this.state.answers
        },
        userInput: ''
      }, () => {
        this.nextQuestion()
      })
    }
  }

  render () {
    const { messages, answers } = this.state

    return (
      <ThemeProvider theme={this.props.theme || theme}>
        <Container>
          <MessageArea
            innerRef={div => this.messageArea = div}
          >
            {messages.map((message, index) =>
              <Message
                key={index}
                message={message}
                answers={answers}
                onButtonSelect={this.handleButtonSelect}
                active={messages.length === index + 1}
            />
          )}
            {this.state.loadingBot && <Loading bot />}
          </MessageArea>
        </Container>
      </ThemeProvider>
    )
  }
}

export default Conversation
