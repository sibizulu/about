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
        text: 'Who am i',
        connect: 1,
        value: 'whoami'
      },
      {
        text: 'You know me',
        connect: 2,
        value: 'youknowme'
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
