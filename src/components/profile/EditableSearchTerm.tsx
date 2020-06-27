import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

interface OwnProps {
  searchTerm: string,
  onTermChanged(existingTerm: string, newSearchTerm: string): void
}

interface OwnState {
  text: string
}

class EditableSearchTerm extends React.Component<OwnProps, OwnState> {
  contentEditable: any

  constructor(props: OwnProps) {
    super(props)
    this.contentEditable = React.createRef()
    this.state = {
      text: props.searchTerm
    }
  }

  handleChange = (event: ContentEditableEvent) => {
    this.setState({ text: event.target.value })
  }

  pastePlainText = (evt: React.ClipboardEvent) => {
    evt.preventDefault()

    const text = evt.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  disableNewlines = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const keyCode = evt.keyCode || evt.which

    if (keyCode === 13) {
      evt.preventDefault()
      this.props.onTermChanged(this.props.searchTerm, evt.currentTarget.innerText.trim())
    }
  }

  handleBlur = () => {
    this.props.onTermChanged(
      this.props.searchTerm,
      this.state.text.trim()
    )
  }

  render() {
    return <ContentEditable
      className='editableSearch'
      innerRef={this.contentEditable}
      html={this.state.text}
      onPaste={this.pastePlainText}
      onKeyPress={this.disableNewlines}
      onBlur={this.handleBlur}
      onChange={this.handleChange}
    />
  }

}
export { EditableSearchTerm }
