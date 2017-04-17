import React from 'react'
import { withTheme } from 'styled-components'

import { MessageBlobBot, MessageBlobUser } from '../primitives/MessageBlob'
import Avatar from '../primitives/Avatar'
import AnswerButton from '../primitives/AnswerButton'
import Image from '../primitives/Image'

const Message = (props) => {
  const { message, active, theme } = props
  return (
    <section>
      {message.sender === 'BOT' ?
        <div>
          <Avatar left>
            {theme.bot}
          </Avatar>
          <MessageBlobBot>
            {message.text}
          </MessageBlobBot>
          {message.image &&
            <Image>
              <img src={message.image} alt={message.text} />
            </Image>
          }
          {message.buttons && active &&
            <div>
              {message.buttons.map((button, index) =>
                <AnswerButton key={index} onClick={() => props.onButtonSelect(button)}>
                  {button.text}
                </AnswerButton>
              )}
            </div>
          }
        </div>
        :
        <div>
          <Avatar right>
            {theme.user}
          </Avatar>
          <MessageBlobUser>
            {message.text}
          </MessageBlobUser>
        </div>
      }
    </section>
  )
}

export default withTheme(Message)
