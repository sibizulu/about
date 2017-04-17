import React from 'react'
import Conversation from '../containers/Conversation'

const theme = {
  blobColor: 'cyan',
  userBlobColor: 'deeppink',
  user: '👀',
  bot: '🙂',
  baseColor: '#ccc',
  font: "'courier', monotype",
  height: '100%',
  width: '500px'
}

const questions = [
  {
    buttons: [
      {
        text: 'Who are you?',
        connect: 1,
        value: 'whoareyou'
      },
      {
        text: 'I know you',
        connect: 2,
        value: 'iknowyou'
      }
    ],
    text: 'Hello',
    type: 'action'
  },
  {
    text: 'Sibiraj PP | Entrepreneur | Blockchain enthusiast | https://www.linkedin.com/in/sibizulu/',
    type: 'flash',
    connect: 3
  },
  {
    text: 'Oh! great 🙂',
    type: 'flash',
    connect: 3
  },
  {
    text: 'Thank You',
    type: 'end'
  }
]

const App = (props) => {
  return (
    <main>
      <Conversation
        questions={questions}
        theme={theme}
      />
    </main>
  )
}

export default App
